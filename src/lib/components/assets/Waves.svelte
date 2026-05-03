<script lang="ts">
    import { onMount, tick } from 'svelte';

    let {
        style = '',
        className = '',
        wavesType = '',
        backgroundImage = '/images/waves.png',
        backgroundSize = 'cover',
        autoFallback = true,
        fpsThreshold = 45,
        sampleDurationMs = 1000
    } = $props();

    let useWebgl = $state(false);
    let perfChecked = $state(false);
    let embedEl = $state<HTMLDivElement | null>(null);

    const fpsMonitor = (duration: number): Promise<number> => {
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

    const initUnicorn = async () => {
        await tick();
        if (!embedEl || typeof UnicornStudio === 'undefined') return;
        try {
            await UnicornStudio.init();
        } catch (e) {
            console.error('Unicorn oopsie!:', e);
        }
    };

    onMount(() => {
        if (autoFallback && window.matchMedia('(prefers-reduced-motion: reduce)').matches && navigator.hardwareConcurrency <= 2) {
            return;
        }
        let active = true;

        async function runChecks() {
            if (autoFallback) {
                const initialFps = await fpsMonitor(sampleDurationMs);
                if (initialFps < fpsThreshold || !active) return;
            }

            useWebgl = true;
            perfChecked = true;
            await initUnicorn();

            const postFps = await fpsMonitor(sampleDurationMs);
            if (postFps < fpsThreshold && active) {
                console.error('Bad waves performance, unmounting');
                useWebgl = false;
                perfChecked = false;
            }
        }
        runChecks();
        return () => {
            active = false;
        };
    });
</script>

<div class="relative overflow-hidden {className}" style="width: 100%; {style}">
    <div
        class="absolute inset-0 z-0"
        style="background-image: url({backgroundImage}); background-size: {backgroundSize}; background-position: center;"
    ></div>

    {#if useWebgl && perfChecked}
        <div
            bind:this={embedEl}
            class="unicorn-embed pointer-events-none absolute inset-0 z-1"
            data-us-project-src={wavesType}
            data-us-lazyload="true"
            data-us-scale="0.8"
            data-us-dpi="1"
            data-us-fps="60"
        ></div>
    {/if}
</div>
