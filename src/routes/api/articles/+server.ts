import type { Article, MdsvexModule } from '$lib/utils/types.ts';
import { json } from '@sveltejs/kit';

export const prerender = true;

async function getArticles(articleType?: string) {
    let articles: Article[] = [];

    const paths = import.meta.glob<MdsvexModule>('/src/articles/**/*.md', { eager: true });

    for (const { file, slug } of Object.keys(paths)
        .map((path) => ({
            file: paths[path],
            slug: path.replace('/src/articles/', '').replace(/\.md$/, '')
        }))
        .filter((path) => !articleType || path.slug.startsWith(articleType))) {
        const metadata = file.metadata as Omit<Article, 'slug'>;
        const article = { ...metadata, slug } satisfies Article;
        if (article.published) articles.push(article);
    }
    articles = articles.sort((first, second) => new Date(second.date).getTime() - new Date(first.date).getTime());

    return articles;
}

export async function GET({ url }) {
    const articleType = url.searchParams.get('type');

    const articles = await getArticles(
        articleType
            // replace any dangerous characters with dashes
            ?.replace(/[^A-z0-9-_]/g, '-')
            // slugs shouldn't need to be more than 16 characters. if so then change
            .slice(0, 16)
    );
    return json(articles);
}
