const preprocess = require('svelte-preprocess');

module.exports = {
    stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx|svelte)'],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions'
    ],
    framework: '@storybook/svelte',
    core: {
        disableTelemetry: true,
        builder: '@storybook/builder-vite'
    },
    svelteOptions: {
        // The following line doesn't work somehow.
        // preprocess: import('../svelte.config.js').preprocess
        preprocess: preprocess({
            typescript: true
        })
    },
    features: {
        storyStoreV7: true
    }
};
