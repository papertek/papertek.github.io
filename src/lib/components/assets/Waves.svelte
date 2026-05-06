<script lang="ts">
    import { onMount, tick } from 'svelte';
    import performanceStore from '$lib/stores/performance.js';
    import { initIfAllowed, resetUnicornLifecycle } from '$lib/utils/unicornLifecycle.js';
    import { afterNavigate, beforeNavigate } from '$app/navigation';

    let { style = '', className = '', wavesType = '', backgroundImage = '/images/waves.png', backgroundSize = 'cover' } = $props();

    let useWebgl = $state(false);
    let perfChecked = $state(false);
    let embedEl = $state<HTMLDivElement | null>(null);
    let unicornStarted = false;

    async function startUnicorn() {
        if (unicornStarted) return;
        unicornStarted = true;
        await tick();
        await initIfAllowed(embedEl);
    }

    function doUnicornStuff() {
        const unsubscribe = performanceStore.subscribe((state) => {
            if (!state.checked) return;
            if (state.canUseWebgl && !state.globalHardDisabled) {
                useWebgl = true;
                perfChecked = true;
                startUnicorn().catch((e) => console.error('Unicorn init (waves) failed', e));
            } else {
                useWebgl = false;
                perfChecked = false;
            }
        });

        return () => {
            unsubscribe();
        };
    }

    // check unicornLifecycle.ts
    onMount(() => {
        doUnicornStuff();
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
