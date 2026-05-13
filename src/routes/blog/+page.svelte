<script lang="ts">
    import LargePost from '$lib/components/blog/LargePost.svelte';
    import SmallPost from '$lib/components/blog/SmallPost.svelte';
    import type { Article } from '$lib/utils/types.js';
    import { onMount } from 'svelte';

    let blogArticles = $state<Article[]>([]);
    let loading = $state(true);

    onMount(async () => {
        const res = await fetch('/api/articles?type=blog');
        blogArticles = await res.json();
        loading = false;
    });
</script>

<h1 class="text-5xl font-bold">LATEST ARTICLES</h1>
<div class="mt-6 flex max-w-301 flex-col gap-12">
    {#if loading}
        <p class="text-xl">Loading contents please wait...</p>
    {:else if blogArticles.length === 0}
        <p class="text-error text-xl">No articles found!</p>
    {:else}
        <div class="mt-6 flex max-w-301 flex-col gap-12">
            <LargePost
                title={blogArticles[0].title}
                description={blogArticles[0].description}
                link={blogArticles[0].slug}
                category={blogArticles[0].categories[0]}
                image={blogArticles[0].image || '/images/articles/fallback.png'}
            />

            {#if blogArticles.length > 1}
                <div class="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2">
                    {#each blogArticles.slice(1) as article (article.slug)}
                        <SmallPost
                            title={article.title}
                            description={article.description}
                            link={article.slug}
                            category={article.categories[0]}
                            image={article.image || '/images/articles/fallback.png'}
                        />
                    {/each}
                </div>
            {/if}
        </div>
    {/if}
</div>
