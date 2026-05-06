<script lang="ts">
    import NetroGlobe from '$lib/components/assets/NetroGlobe.svelte';
    import { onMount } from 'svelte';
</script>

<svelte:head>
    <title>NetroWorks</title>
</svelte:head>

<section class="relative -my-16 -mr-21 grid min-h-screen grid-cols-[1fr_410px] grid-rows-[auto_auto]">
    <div class="transform-0 col-start-1 row-start-1 flex flex-col items-start gap-12">
        <div class="pt-21"></div>
        <span class="font-display max-w-194 text-xl">
            <p>We create software, NetroHost, Gardens Wiki, and more.</p>
            <br />
            <p>
                We're a small software collective creating what we love. It's not only because we want to, we need to. We collaborate to
                create what's next.
            </p>
            <a href="/testpage" class="text-blue-500 hover:underline">testpage</a>
        </span>
    </div>
</section>
