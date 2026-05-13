<script lang="ts">
    import ButtonSimple from '$lib/components/ButtonSimple.svelte';
    import NetroLogo from '$lib/components/NetroLogo.svelte';
    import type { Article } from '$lib/utils/types.js';
    import { onMount } from 'svelte';

    let blogArticles = $state<Article[]>([]);
    let loading = $state(true);

    onMount(async () => {
        const res = await fetch('/api/articles?type=blog'),
            articles: Article[] = await res.json();
        blogArticles = articles.slice(0, 2);
        loading = false;
    });
</script>

<svelte:head>
    <title>NetroWorks</title>
</svelte:head>

<section class="relative grid min-h-screen grid-cols-1 grid-rows-[auto_auto] lg:-my-16 xl:-mr-21 xl:grid-cols-[1fr_410px]">
    <div class="lg:transform-0 col-start-1 row-start-1 flex flex-col items-start gap-12">
        <div class="lg:pt-21">
            <a href="/" class="group">
                <NetroLogo
                    class="fill-accent w-70 transition-all duration-300 ease-in-out group-hover:scale-102 hover:fill-white lg:w-135 lg:md:h-29.5"
                />
            </a>
        </div>

        <span class="font-display text-lg md:max-w-206 md:text-xl">
            <p class="md:max-w-200">We own software like NetroHost, Gardens Wiki, Theaceae, and more.</p>
            <br />
            <p>
                We're an independent software collective creating user-first experiences. It's not only because we love to, but we think
                it's ethical. We collaborate to create what's next.
            </p>
        </span>

        <div class="flex flex-col items-start gap-4 text-xl md:flex-row">
            <ButtonSimple text="LEARN MORE" href="/about" />
            <ButtonSimple text="JOIN US" href="/apply" />
        </div>
    </div>

    <div class="col-start-1 row-start-2 mt-12 flex flex-col gap-5 xl:w-fit">
        <div class="flex flex-col gap-12 xl:flex-row xl:gap-8">
            <!-- todo: refactor into component and endpoint -->
            <a
                href="https://netro.host/"
                target="_blank"
                rel="noopener noreferrer"
                class="group relative mt-8 inline-block h-fit w-full xl:mt-0 xl:w-fit"
            >
                <img
                    src="/images/netrohost.webp"
                    alt="NetroHost"
                    loading="lazy"
                    class="outline-accent h-40 w-full object-cover outline-2 transition-transform duration-500 group-hover:scale-102 group-hover:outline-white xl:h-40 xl:w-134"
                />
                <span
                    class="font-display bg-accent absolute top-0 left-0 -translate-x-3 -translate-y-4 py-1.5 pr-10 pl-2.5 text-2xl font-bold text-black transition-all duration-300 group-hover:-translate-y-5 group-hover:bg-white xl:pr-20 xl:text-3xl"
                >
                    NETROHOST
                </span>
                <div
                    class="absolute right-0 bottom-0 bg-black/80 p-3 backdrop-blur-sm transition-transform duration-300 group-hover:bg-white/90"
                >
                    <p
                        class="font-sans text-sm font-medium tracking-tight text-white transition-colors group-hover:text-black xl:text-base"
                    >
                        Hosting that's simple, affordable, fast, and awesome.
                    </p>
                </div>
            </a>

            <a
                href="https://theaceae.org/"
                target="_blank"
                rel="noopener noreferrer"
                class="group relative mt-8 inline-block h-fit w-full xl:mt-0 xl:w-fit"
            >
                <img
                    src="/images/theaceae-banner.webp"
                    alt="Theaceae"
                    loading="lazy"
                    class="outline-accent h-40 w-full object-cover outline-2 transition-transform duration-500 group-hover:scale-102 group-hover:outline-white xl:h-40 xl:w-134"
                />
                <span
                    class="font-display bg-accent absolute top-0 left-0 -translate-x-3 -translate-y-4 py-1.5 pr-10 pl-2.5 text-2xl font-bold text-black transition-all duration-300 group-hover:-translate-y-5 group-hover:bg-white xl:pr-20 xl:text-3xl"
                >
                    THEACEAE
                </span>
                <div
                    class="absolute right-0 bottom-0 bg-black/80 p-3 backdrop-blur-sm transition-transform duration-300 group-hover:bg-white/90"
                >
                    <p
                        class="font-sans text-sm font-medium tracking-tight text-white transition-colors group-hover:text-black xl:text-base"
                    >
                        Helping make personal and community projects come to life.
                    </p>
                </div>
            </a>
        </div>
        <!-- <ButtonSimple text="SEE MORE" href="/services" class="w-fit self-end text-xl" /> -->
    </div>

    <aside
        class="z-5 col-start-1 row-span-1 row-start-3 flex h-full flex-col items-start text-white xl:col-start-2 xl:row-span-2 xl:row-start-1 xl:items-end xl:bg-black/60 xl:py-18 xl:pr-16"
    >
        <h2 class="mt-8 mb-8 text-4xl font-bold xl:mt-0 xl:text-5xl">Blog</h2>

        {#if loading}
            <div class="text-xl">Loading contents...</div>
        {:else if blogArticles.length === 0}
            <div class="text-error text-xl">No articles found!</div>
        {:else}
            <div class="flex w-full flex-col items-center gap-10 xl:items-end xl:gap-6">
                {#each blogArticles as article (article.slug)}
                    <a
                        href={article.slug}
                        class="font-display text-accent relative w-full bg-black/75 text-left transition-colors duration-300 hover:text-white xl:w-100 xl:text-right"
                    >
                        <img
                            loading="lazy"
                            src={article.image || '/images/articles/fallback.png'}
                            alt=""
                            class="h-48 w-full object-cover xl:h-56"
                        />
                        <div
                            class="bg-accent absolute top-auto right-auto -translate-x-2 -translate-y-6 justify-self-end px-2 py-1 text-xl font-bold text-black uppercase"
                        >
                            {article.categories[0]}
                        </div>
                        <div class="border-accent border-b-8 px-6 py-4 xl:border-b-12">
                            <div class="line-clamp-2 text-xl font-bold uppercase xl:text-2xl">
                                {article.title}
                            </div>
                        </div>
                    </a>
                {/each}
            </div>
        {/if}
        <ButtonSimple text="READ MORE" href="/blog" class="mt-8 mb-8 text-xl xl:mb-0 xl:pl-22" />
    </aside>
</section>
