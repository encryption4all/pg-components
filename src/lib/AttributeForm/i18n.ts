import { register, init } from 'svelte-i18n';

register('en', () => import('./en.json'));
register('nl', () => import('./nl.json'));

export default function initWithLang(lang: string): void {
    init({
        initialLocale: lang,
        fallbackLocale: 'en'
    });
}
