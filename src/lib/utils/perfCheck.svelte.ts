// we check performance of the site so we can see if we can use webgl stuff like unicorn

import { browser } from '$app/environment';

export const perfStatus = $state({
    isChecked: false,
    canRunWebGL: false
});

const DEFAULT_THRESHOLD = 45; // frames
const DEFAULT_DURATION = 2000; // miliseconds

// fps counter using requestAnimationFrame
export async function getFps(duration = DEFAULT_DURATION) {
    return new Promise((resolve) => {
        let frames = 0;
        const startTime = performance.now();
        console.log(`[Perf] Measuring FPS for ${duration}ms...`);

        function check() {
            const elapsed = performance.now() - startTime;
            if (elapsed >= duration) {
                const fps = Math.round((frames * 1000) / elapsed);
                console.log(`[Perf] Final Reading: ${fps} FPS`);
                resolve(fps);
                return;
            }
            frames++;
            requestAnimationFrame(check);
        }
        requestAnimationFrame(check);
    });
}
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

    const initialFps = (await getFps(DEFAULT_DURATION)) as number;

    if (initialFps < DEFAULT_THRESHOLD) {
        perfStatus.isChecked = true;
        perfStatus.canRunWebGL = false;
        return;
    }

    perfStatus.canRunWebGL = true;
    perfStatus.isChecked = true;

    // console.log('Waiting for 500ms...');
    // await new Promise((resolve) => setTimeout(resolve, 500));

    const postFps = (await getFps(DEFAULT_DURATION)) as number;
    console.log(`Post-initial performance: ${postFps} FPS`);
    if (postFps < DEFAULT_THRESHOLD) {
        console.error('Danger! bad webgl performance, unmounting');
        perfStatus.canRunWebGL = false;
    }

    if (force) {
        console.log('// Forced recheck: waiting for 2000ms before final performance check... //');
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const postFps = (await getFps(DEFAULT_DURATION)) as number;
        console.log(`// Final performance check: ${postFps} FPS //`);
        if (postFps < DEFAULT_THRESHOLD) {
            console.error('Danger! bad webgl performance, unmounting');
            perfStatus.canRunWebGL = false;
            return;
        }
    }

    perfStatus.isChecked = true;
}
