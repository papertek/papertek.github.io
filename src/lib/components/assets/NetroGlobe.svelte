<script lang="ts">
    import { perfStatus } from '$lib/utils/perfCheck.svelte.js';
    import { onDestroy } from 'svelte';

    let embedEl: HTMLDivElement | undefined = $state();

    let {
        style = '',
        className = '',
        wavesType = '/netro_glyph_old.json',
        backgroundImage = '/images/logo-ascii.png',
        backgroundSize = 'contain'
    } = $props();

    onDestroy(() => {
        if (embedEl) {
            const canvas = embedEl.querySelector('canvas');
            if (canvas) {
                const gl = canvas.getContext('webgl') || canvas.getContext('webgl2');
                gl?.getExtension('WEBGL_lose_context')?.loseContext();
            }
            embedEl.remove();
            console.log('globe component removed');
        }
    });
</script>

<div class="relative overflow-hidden {className}" style="width: 100%; {style}">
    <div
        class="absolute inset-0 z-0"
        style="background-image: url({backgroundImage}); background-size: {backgroundSize}; background-position: center;"
    ></div>

    {#if perfStatus.canRunWebGL && perfStatus.isChecked}
        <script>
            console.log('performanced passed in globe component, loading to layout...');
        </script>

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
