<script lang="ts">
    import type { Article } from '$lib/utils/types.js';
    import ButtonSimple from '../ButtonSimple.svelte';

    interface Props {
        title: Article['title'];
        description: Article['description'];
        link: string;
        category: Article['categories'][number];
        image: Article['image'];
    }
    const { title, description, link, category, image }: Props = $props();
</script>

<div class="font-display border-accent relative border-b-12 bg-black/75">
    <img loading="lazy" src={image || '/images/fallback.png'} alt="screenshot of news post" class="h-92 w-full object-cover" />
    <div class="bg-accent absolute ml-8 -translate-y-6 justify-self-start px-2 py-1 text-xl font-bold text-black uppercase">{category}</div>
    <div class="flex flex-col justify-between p-8 xl:flex-row">
        <div class="flex max-w-190 flex-col">
            <div class="text-accent line-clamp-1 text-3xl font-bold uppercase">{title}</div>
            <p class="line-clamp-3 text-xl">
                {description}
            </p>
        </div>
        <ButtonSimple text="READ MORE" href={link} class="self-end text-lg" />
    </div>
</div>
