import { register, init } from 'svelte-i18n';

register('en', () => import('./locale/en.json'));
register('nl', () => import('./locale/nl.json'));

export default function initWithLang(lang: string): void {
    init({
        initialLocale: lang,
        fallbackLocale: 'en'
    });
}
