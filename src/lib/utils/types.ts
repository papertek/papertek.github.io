import type { Component } from 'svelte';

export type Categories = 'sveltekit' | 'svelte' | 'legal' | 'other' | 'blog';

export type Article = {
    title: string;
    slug: string;
    author: string;
    description: string;
    date: string;
    categories: Categories[];
    published: boolean;
    image?: string;
};

export interface MdsvexModule {
    default: Component;
    metadata: Omit<Article, 'slug'>;
}
