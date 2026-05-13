import type { MdsvexModule } from '$lib/utils/types.js';
import { error } from '@sveltejs/kit';

const articles = import.meta.glob<MdsvexModule>('/src/articles/**/*.md', { eager: true });

export function load({ params }) {
    const slug = params.slug;
    const path = `/src/articles/${slug}.md`;
    const module = articles[path];

    if (!module || !module.metadata.published) {
        error(404, `Could not find ${slug}`);
    }

    return {
        content: module.default,
        meta: module.metadata
    };
}
