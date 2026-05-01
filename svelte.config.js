import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

import { escapeSvelte, mdsvex } from 'mdsvex';
import rehypeFigure from 'rehype-figure';
import { createHighlighter } from 'shiki';

import path from 'path';
import { fileURLToPath } from 'url';
const dirname = path.resolve(fileURLToPath(import.meta.url), '../');

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
    extensions: ['.md'],
    highlight: {
        highlighter: async (code, lang = 'text') => {
            const highlighter = await createHighlighter({
                themes: ['poimandres'],
                langs: ['javascript', 'typescript']
            });
            await highlighter.loadLanguage('javascript', 'typescript');
            const html = escapeSvelte(highlighter.codeToHtml(code, { lang, theme: 'poimandres' }));
            return `{@html \`${html}\` }`;
        }
    },
    rehypePlugins: [rehypeFigure],
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
    extensions: ['.svelte', '.md'],
    preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],
	kit: {
		adapter: adapter({
			fallback: '404.html'
		}),
		paths: {
			base: process.argv.includes('dev') ? '' : process.env.BASE_PATH
		}
	}
};

export default config;
