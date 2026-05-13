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

<div class="font-display border-accent relative max-h-146 border-b-12 bg-black/75">
    <img loading="lazy" src={image || '/images/fallback.png'} alt="..." class="h-56 w-full object-cover" />
    <div class="bg-accent absolute ml-5 -translate-y-6 justify-self-start px-2 py-1 text-xl font-bold text-black uppercase">{category}</div>
    <div class="grid h-[calc(100%-14rem)] grid-rows-[1fr_auto] gap-6 p-6">
        <div class="flex flex-col">
            <div class="text-accent line-clamp-2 text-2xl font-bold uppercase">{title}</div>
            <p class="line-clamp-2 text-lg">{description}</p>
        </div>
        <ButtonSimple text="READ MORE" href={link} class="justify-self-end text-lg" />
    </div>
</div>
