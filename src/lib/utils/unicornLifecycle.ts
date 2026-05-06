import performanceStore from '$lib/stores/performance.js';
import { DEFAULT_FPS_THRESHOLD, fpsMonitor, cachePostInitFpsDecision } from '$lib/utils/performanceCheck.js';
import { get } from 'svelte/store';

let initPromise: Promise<void> | null = null;
let unicornInitialized = false;

const POST_INIT_SAMPLE_MS = 400;

export async function initIfAllowed(embedEl?: HTMLElement | null) {
    if (!embedEl) return;
    const state = get(performanceStore);
    if (state.globalHardDisabled) throw new Error('Global Unicorn disabled');
    if (!state.checked || !state.canUseWebgl) return;
    if (typeof UnicornStudio === 'undefined') return;
    if (unicornInitialized) return;
    if (initPromise) return initPromise;

    initPromise = (async () => {
        try {
            await UnicornStudio.init();
            unicornInitialized = true;

            const postInitFps = await fpsMonitor(POST_INIT_SAMPLE_MS);
            const shouldDisable = postInitFps < DEFAULT_FPS_THRESHOLD;

            performanceStore.update((s) => ({
                ...s,
                postInitFps,
                checked: true,
                canUseWebgl: !shouldDisable,
                disableReason: shouldDisable ? 'post-init-low-fps' : null
            }));

            cachePostInitFpsDecision(postInitFps, !shouldDisable, shouldDisable ? 'post-init-low-fps' : null);

            if (shouldDisable) {
                stopUnicorn('post-init-low-fps');
            }
        } catch (error) {
            stopUnicorn('unicorn-init-error');
            console.error('Error initializing UnicornStudio', error);
        } finally {
            initPromise = null;
        }
    })();

    return initPromise;
}

export function stopUnicorn(reason?: string) {
    if (!unicornInitialized) return;
    try {
        if (typeof UnicornStudio !== 'undefined' && typeof UnicornStudio.destroy === 'function') {
            UnicornStudio.destroy();
        }

        const canvases = document.querySelectorAll('canvas');
        canvases.forEach((canvas) => {
            canvas.width = 1;
            canvas.height = 1;

            const gl = canvas.getContext('webgl') || canvas.getContext('webgl2');
            if (gl) {
                gl.getExtension('WEBGL_lose_context')?.loseContext();
            }

            canvas.remove();
        });

        unicornInitialized = false;
        performanceStore.update((s) => ({ ...s, globalHardDisabled: true, canUseWebgl: false, disableReason: reason ?? 'global-failure' }));
        console.log('KILLED UNICORN DIE DIE DIE. this should fix the cpu thread issue');
    } catch (e) {
        console.error('error trying to kill unicorn:', e);
    }
}

export default { initIfAllowed, stopUnicorn };
