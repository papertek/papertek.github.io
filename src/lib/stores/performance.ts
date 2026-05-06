import { writable } from 'svelte/store';

export interface PerformanceState {
    checked: boolean;
    canUseWebgl: boolean;
    initialFps: number | null;
    postInitFps: number | null;
    disableReason: string | null;
    globalHardDisabled: boolean;
    hardwareConcurrency: number;
    prefersReducedMotion: boolean;
}

export const performanceStore = writable<PerformanceState>({
    checked: false,
    canUseWebgl: false,
    initialFps: null,
    postInitFps: null,
    disableReason: null,
    globalHardDisabled: false,
    hardwareConcurrency: (typeof navigator !== 'undefined' && navigator.hardwareConcurrency) || 1,
    prefersReducedMotion:
        typeof window !== 'undefined' && window.matchMedia
        ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
        : false
});

export default performanceStore;
