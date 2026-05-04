<script lang="ts">
    import { runFullPerfCheck, perfStatus } from '$lib/utils/perfCheck.svelte.js';
    import { page } from '$app/state';
    import Waves from '$lib/components/assets/Waves.svelte';
    import { afterNavigate } from '$app/navigation';
    import DevBanner from '$lib/components/DevBanner.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import { onMount, type Snippet } from 'svelte';
    import '../styles/tailwind.css';

    let { children }: { children: Snippet } = $props();

    let hasInitialized = false;
    let isInitializing = false; // Add this guard

    async function attemptUnicornInit() {
        if (isInitializing || hasInitialized) return;

        isInitializing = true;

        if (!perfStatus.isChecked) {
            await runFullPerfCheck();
        }

        if (perfStatus.canRunWebGL && typeof UnicornStudio !== 'undefined' && !hasInitialized) {
            try {
                await UnicornStudio.init();
                hasInitialized = true;

                await runFullPerfCheck(true);

                if (perfStatus.canRunWebGL) {
                    console.log('performance test passed!');
                }
            } catch (e) {
                console.error('failed to load unicorn', e);
            }
        }
        isInitializing = false;
    }
    onMount(attemptUnicornInit);
    afterNavigate(() => {
        if (hasInitialized && typeof UnicornStudio !== 'undefined') {
            UnicornStudio.init().catch(console.error);
            console.log('page rescanned');
        }
    });
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
