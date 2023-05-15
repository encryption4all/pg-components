import { register, init } from 'svelte-i18n';
register('en', () => import('./locale/en.json'));
register('nl', () => import('./locale/nl.json'));
export default function initLocale(lang) {
    init({
        initialLocale: lang,
        fallbackLocale: 'en'
    });
}
