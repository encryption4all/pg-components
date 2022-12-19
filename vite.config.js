import { sveltekit } from '@sveltejs/kit/vite';
import { HstSvelte } from '@histoire/plugin-svelte';

/** @type {import('vite').UserConfig} */
const config = {
    plugins: [await sveltekit()],
    histoire: {
        plugins: [HstSvelte()],
        viteIgnorePlugins: ['vite-plugin-sveltekit-compile'],
        tree: {
            groups: [
                {
                    id: 'top',
                    title: ''
                }
            ]
        }
    }
};

export default config;
