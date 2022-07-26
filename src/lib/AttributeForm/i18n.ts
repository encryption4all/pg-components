import { register, init } from 'svelte-i18n';

register('en', () => import('./en.json'));

init({
    fallbackLocale: 'en'
});
