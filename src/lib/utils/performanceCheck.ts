import performanceStore from '$lib/stores/performance.js';
import type { PerformanceState } from '$lib/stores/performance.js';
import { get } from 'svelte/store';

let cachedCheck: Promise<void> | null = null;

export const DEFAULT_FPS_THRESHOLD = 45;
export const DEFAULT_FPS_SAMPLE_MS = 1000;

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

        try {
            const initialFps = await fpsMonitor(duration);
            const can = initialFps >= fpsThreshold;
            const disableReason = can ? null : 'low-fps';
            performanceStore.update((s: PerformanceState) => ({ ...s, checked: true, canUseWebgl: can, initialFps, disableReason }));

        } catch (e) {
            performanceStore.update((s: PerformanceState) => ({ ...s, checked: true, canUseWebgl: false, disableReason: 'error' }));
            console.error('Global performance check error', e);
        }
  })();

  return cachedCheck;
}

export default runGlobalPerformanceCheck;
