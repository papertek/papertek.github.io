import performanceStore from '$lib/stores/performance.js';
import type { PerformanceState } from '$lib/stores/performance.js';
import { browser } from '$app/environment';
import { get } from 'svelte/store';

let cachedCheck: Promise<void> | null = null;

export const DEFAULT_FPS_THRESHOLD = 45;
export const DEFAULT_FPS_SAMPLE_MS = 2000;
export const PERFORMANCE_CHECK_TTL_MS = 24 * 60 * 60 * 1000;
const PERFORMANCE_CHECK_STORAGE_KEY = 'netroworks:performance-check:v1';

type PersistedPerformanceCheck = {
    timestamp: number;
    canUseWebgl: boolean;
    initialFps: number | null;
    postInitFps: number | null;
    disableReason: string | null;
};

export const fpsMonitor = (duration: number): Promise<number> => {
    return new Promise((resolve) => {
        let frames = 0;
        const start = performance.now();
        let rafId: number;

        const check = (now: number) => {
            frames++;
            if (now - start >= duration) {
                resolve((frames * 1000) / (now - start));
                return;
            }
            rafId = requestAnimationFrame(check);
        };
        rafId = requestAnimationFrame(check);
    });
};

export async function runGlobalPerformanceCheck(opts?: { duration?: number; fpsThreshold?: number }) {
    if (cachedCheck) return cachedCheck;
    const duration = opts?.duration ?? DEFAULT_FPS_SAMPLE_MS;
    const fpsThreshold = opts?.fpsThreshold ?? DEFAULT_FPS_THRESHOLD;

    cachedCheck = (async () => {
        const current: PerformanceState = get(performanceStore);

        if (current.prefersReducedMotion || current.hardwareConcurrency <= 2) {
            const disableReason = 'low-power or reduced-motion';
            performanceStore.update((s: PerformanceState) => ({ ...s, checked: true, canUseWebgl: false, disableReason }));
            return;
        }

        if (browser) {
            try {
                const raw = localStorage.getItem(PERFORMANCE_CHECK_STORAGE_KEY);
                if (raw) {
                    const cached = JSON.parse(raw) as PersistedPerformanceCheck;
                    const isFresh = Date.now() - cached.timestamp < PERFORMANCE_CHECK_TTL_MS;

                    if (isFresh) {
                        performanceStore.update((s: PerformanceState) => ({
                            ...s,
                            checked: true,
                            canUseWebgl: cached.canUseWebgl,
                            initialFps: cached.initialFps,
                            postInitFps: cached.postInitFps,
                            disableReason: cached.disableReason
                        }));
                        return;
                    }
                }
            } catch (e) {
                console.warn('Unable to read performance check cache', e);
            }
        }

        try {
            const initialFps = await fpsMonitor(duration);
            const can = initialFps >= fpsThreshold;
            const disableReason = can ? null : 'low-fps';
            performanceStore.update((s: PerformanceState) => ({ ...s, checked: true, canUseWebgl: can, initialFps, disableReason }));

            if (browser) {
                try {
                    const current = get(performanceStore);
                    const payload: PersistedPerformanceCheck = {
                        timestamp: Date.now(),
                        canUseWebgl: can,
                        initialFps,
                        postInitFps: current.postInitFps,
                        disableReason
                    };
                    localStorage.setItem(PERFORMANCE_CHECK_STORAGE_KEY, JSON.stringify(payload));
                } catch (e) {
                    console.warn('Unable to persist performance check cache', e);
                }
            }
        } catch (e) {
            performanceStore.update((s: PerformanceState) => ({ ...s, checked: true, canUseWebgl: false, disableReason: 'error' }));
            console.error('Global performance check error', e);
        }
    })();

    return cachedCheck;
}

export function cachePostInitFpsDecision(postInitFps: number | null, canUseWebgl: boolean, disableReason: string | null) {
    if (browser) {
        try {
            const raw = localStorage.getItem(PERFORMANCE_CHECK_STORAGE_KEY);
            if (raw) {
                const cached = JSON.parse(raw) as PersistedPerformanceCheck;
                const updated: PersistedPerformanceCheck = {
                    ...cached,
                    postInitFps,
                    canUseWebgl,
                    disableReason
                };
                localStorage.setItem(PERFORMANCE_CHECK_STORAGE_KEY, JSON.stringify(updated));
            }
        } catch (e) {
            console.warn('Unable to update performance check cache with post-init results', e);
        }
    }
}

export default runGlobalPerformanceCheck;
