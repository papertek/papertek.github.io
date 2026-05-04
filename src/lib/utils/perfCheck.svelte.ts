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
export async function runFullPerfCheck(force = false) {
    if (!browser) return;

    // if we already checked performance and we're not forcing a recheck, return
    if (perfStatus.isChecked && !force) return;

    const isLowPower = (navigator.hardwareConcurrency || 0) <= 2;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || isLowPower) {
        perfStatus.isChecked = true;
        perfStatus.canRunWebGL = false;
        return;
    }

    const initialFps = await getFps(DEFAULT_DURATION);
    if (initialFps < DEFAULT_THRESHOLD) {
        perfStatus.isChecked = true;
        perfStatus.canRunWebGL = false;
        return;
    }

    perfStatus.canRunWebGL = true;
    perfStatus.isChecked = true;

    console.log('Waiting for 500ms before checking website loading performance...');
    await new Promise((resolve) => setTimeout(resolve, 500));

    const postFps = await getFps(DEFAULT_DURATION);
    console.log(`Post-initial performance: ${postFps} FPS`);
    if (postFps < DEFAULT_THRESHOLD) {
        console.error('Danger! bad webgl performance, unmounting');
        perfStatus.canRunWebGL = false;
    }

    if (force) {
        console.log('Forced recheck: waiting for 1000ms before final performance check...');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const postFps = await getFps(1000);
        console.log(`Final performance check: ${postFps} FPS`);
        if (postFps < DEFAULT_THRESHOLD) {
            console.error('Danger! bad webgl performance, unmounting');
            perfStatus.canRunWebGL = false;
            return;
        }
    }

    perfStatus.isChecked = true;
}
