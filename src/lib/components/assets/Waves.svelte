<script lang="ts">
    import { perfStatus } from '$lib/utils/perfCheck.svelte.js';

    let { style = '', className = '', wavesType = '', backgroundImage = '/images/waves.png', backgroundSize = 'cover' } = $props();
</script>

<div class="relative overflow-hidden {className}" style="width: 100%; {style}">
    <div
        class="absolute inset-0 z-0"
        style="background-image: url({backgroundImage}); background-size: {backgroundSize}; background-position: center;"
    ></div>

    {#if perfStatus.isChecked && perfStatus.canRunWebGL}
        <script>
            console.log('performanced passed in Waves component, loading to layout...');
        </script>

        <div
            class="unicorn-embed pointer-events-none absolute inset-0 z-1"
            data-us-project-src={wavesType}
            data-us-lazyload="true"
            data-us-scale="0.8"
            data-us-dpi="1"
            data-us-fps="60"
        ></div>
    {/if}
</div>
