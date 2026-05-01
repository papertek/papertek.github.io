<script lang="ts">
    import { afterNavigate } from '$app/navigation';
    import { page } from '$app/state';
    import { dev } from '$app/environment';
    import Waves from '$lib/components/assets/Waves.svelte';
    import DevBanner from '$lib/components/DevBanner.svelte';
    import { onMount, type Snippet } from 'svelte';
    import '../styles/tailwind.css';
    import Footer from '$lib/components/Footer.svelte';

    let { children }: { children: Snippet } = $props();

    function initUnicorn() {
        UnicornStudio.init().catch(console.error);
    }

    onMount(initUnicorn);
    afterNavigate(initUnicorn);
</script>

<main class="font-display flex flex-col px-21 py-16">
    <div class="fixed top-0 left-0 -z-10 w-full">
        <Waves style="height: 100vh;" wavesType="/netro_waves_dark.json" />
    </div>
    <h1 class="text-5xl font-bold">{page?.data?.title}</h1>
    {@render children()}
</main>
<Footer />
<DevBanner />
