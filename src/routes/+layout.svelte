<script lang="ts">
    import NetroGlobe from '$lib/components/assets/NetroGlobe.svelte';
    import { page } from '$app/state';
    import { dev } from '$app/environment';
    import Waves from '$lib/components/assets/Waves.svelte';
    import DevBanner from '$lib/components/DevBanner.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import { onMount, type Snippet } from 'svelte';
    import '../styles/tailwind.css';

    let { children }: { children: Snippet } = $props();

    import runGlobalPerformanceCheck from '$lib/utils/performanceCheck.js';

    onMount(() => {
        runGlobalPerformanceCheck().catch(console.error);
    });

    let showGlobe = $derived(page.url.pathname === '/');
</script>

<main class="font-display flex flex-col px-21 py-16">
    <!-- this displays in the homepage only -->
    <div class="pointer-events-none absolute inset-0 overflow-hidden" class:invisible={!showGlobe}>
        <NetroGlobe
            style="position: absolute !important; 
                   width: 1400px !important; 
                   height: 1400px !important; 
                   object-position: bottom right !important; 
                   mix-blend-mode: screen; 
                   transform: translate(53%, 0%);"
        />
    </div>

    <div class="fixed top-0 left-0 -z-10 w-full">
        <Waves style="height: 100vh;" wavesType="/netro_waves_dark.json" backgroundImage="/images/waves.png" backgroundSize="cover" />
    </div>
    <h1 class="text-5xl font-bold">{page?.data?.title}</h1>
    {@render children()}
</main>
<Footer />
{#if dev}
    <DevBanner />
{/if}
