// we check performance of the site so we can see if we can use webgl stuff like unicorn

import { browser } from '$app/environment';

export const perfStatus = $state({
    isChecked: false,
    canRunWebGL: false
});

const DEFAULT_THRESHOLD = 45; // frames
const DEFAULT_DURATION = 1000; // miliseconds

// fps counter using requestAnimationFrame
const getFps = (duration: number): Promise<number> => {
    return new Promise((resolve) => {
        let frames = 0;
        const start = performance.now();
        const check = (now: number) => {
            frames++;
            const elapsed = now - start;
            if (elapsed >= duration) {
                resolve((frames * 1000) / elapsed);
                return;
            }
            requestAnimationFrame(check);
        };
        requestAnimationFrame(check);
    });
};

// we check for performance before we enable the webby gl
export async function runFullPerfCheck(threshold = DEFAULT_THRESHOLD, duration = DEFAULT_DURATION) {
    if (!browser) return;

    const isLowPower = (navigator.hardwareConcurrency || 0) <= 2;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || isLowPower) {
        perfStatus.isChecked = true;
        perfStatus.canRunWebGL = false;
        return;
    }

    const initialFps = await getFps(duration);
    if (initialFps < threshold) {
        perfStatus.isChecked = true;
        perfStatus.canRunWebGL = false;
        return;
    }

    perfStatus.canRunWebGL = true;
    perfStatus.isChecked = true;

    await new Promise((resolve) => setTimeout(resolve, 100));

    console.log('Performance check complete, checking post-initial performance...');
    const postFps = await getFps(duration);
    console.log(`Post-initial performance: ${postFps} FPS`);
    if (postFps < threshold) {
        console.error('Danger! bad webgl performance, unmounting');
        perfStatus.canRunWebGL = false;
    }
}
