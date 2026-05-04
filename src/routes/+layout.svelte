<script lang="ts">
    import { runFullPerfCheck, perfStatus } from '$lib/utils/perfCheck.svelte.js';
    import { page } from '$app/state';
    import Waves from '$lib/components/assets/Waves.svelte';
    import { beforeNavigate, afterNavigate } from '$app/navigation';
    import DevBanner from '$lib/components/DevBanner.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import { onMount, type Snippet } from 'svelte';
    import '../styles/tailwind.css';

    let { children }: { children: Snippet } = $props();

    let hasInitialized = false;

    async function attemptUnicornInit() {
        console.log('[System] Init Check: isChecked?', perfStatus.isChecked);

        if (!perfStatus.isChecked) {
            console.log('[System] Running baseline hardware check...');
            await runFullPerfCheck();
        }

        if (perfStatus.canRunWebGL && typeof UnicornStudio !== 'undefined' && !hasInitialized) {
            try {
                console.log('[Engine] Calling UnicornStudio.init()...');
                await UnicornStudio.init();
                hasInitialized = true;
                console.log('[Engine] Init Successful. Starting Stress Test...');

                await runFullPerfCheck(true);

                if (perfStatus.canRunWebGL) {
                    console.log('[Success] Performance test passed under load!');
                } else {
                    console.warn('[Fail] Post-load stress test failed. Disabling WebGL.');
                }
            } catch (e) {
                console.error('[Error] Unicorn exploded during init:', e);
            }
        }
    }

    onMount(attemptUnicornInit);

    // beforeNavigate(() => {
    //     console.log('[Navigation] Leaving page. Checking for active WebGL...');

    //     const canvas = document.querySelector('.unicorn-embed canvas');

    //     if (canvas instanceof HTMLCanvasElement) {
    //         console.log('[Cleanup] Found active canvas. Killing context to stop loop.');
    //         const gl = canvas.getContext('webgl') || canvas.getContext('webgl2');

    //         if (gl) {
    //             const ext = gl.getExtension('WEBGL_lose_context');
    //             if (ext) {
    //                 ext.loseContext();
    //                 console.log('[Cleanup] Context successfully lost.');
    //             }
    //         }
    //     } else {
    //         console.log('[Cleanup] No canvas found to kill.');
    //     }

    //     hasInitialized = false;
    // });

    afterNavigate(() => {
        if (hasInitialized && typeof UnicornStudio !== 'undefined') {
            console.log('[Navigation] Page Change. Re-scanning for elements...');
            UnicornStudio.init()
                .then(() => console.log('[Navigation] Rescan Complete.'))
                .catch((e) => console.error('[Navigation] Rescan Failed:', e));
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
