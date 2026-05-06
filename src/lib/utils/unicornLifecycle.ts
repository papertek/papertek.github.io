import performanceStore from '$lib/stores/performance.js';
import { DEFAULT_FPS_THRESHOLD, fpsMonitor } from '$lib/utils/performanceCheck.js';
import { get } from 'svelte/store';

let initPromise: Promise<void> | null = null;
let unicornInitialized = false;

const POST_INIT_SAMPLE_MS = 400;

// should we be doing this? this is mostly for NetroGlobe.svelte but it affects everything
export function resetUnicornLifecycle() {
    unicornInitialized = false;
    initPromise = null;
}

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

            if (shouldDisable) {
                markGlobalFailureAndDisableAll('post-init-low-fps');
            }
        } catch (error) {
            markGlobalFailureAndDisableAll('unicorn-init-error');
            console.error('Error initializing UnicornStudio', error);
        } finally {
            initPromise = null;
        }
    })();

    return initPromise;
}

export function markGlobalFailureAndDisableAll(reason?: string) {
    unicornInitialized = false;
    performanceStore.update((s) => ({ ...s, globalHardDisabled: true, canUseWebgl: false, disableReason: reason ?? 'global-failure' }));
    destroyAllIfAvailable();
}

export function destroyAllIfAvailable() {
    try {
        if (typeof UnicornStudio !== 'undefined' && typeof UnicornStudio.destroy === 'function') {
            UnicornStudio.destroy();
        }
    } catch (e) {
        console.error('Error destroying UnicornStudio', e);
    }
}

export default { initIfAllowed, markGlobalFailureAndDisableAll, destroyAllIfAvailable, resetUnicornLifecycle };
