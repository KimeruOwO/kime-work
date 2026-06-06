import { ui, defaultLang, showDefaultLang } from './ui';

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  }
}

export function getRouteFromUrl(url: URL): string | undefined {
  const pathname = new URL(url).pathname;
  const parts = pathname.split('/');
  if (parts[1] in ui) {
    if (parts.length === 2) {
      return '/';
    }
    return '/' + parts.slice(2).join('/');
  }
  return pathname;
}

export function getRelativeLocaleUrl(locale: keyof typeof ui, path: string = '') {
  const cleanPath = path.replace(/^\//, '');
  if (locale === defaultLang && !showDefaultLang) {
    return `/${cleanPath}`;
  }
  return `/${locale}/${cleanPath}`;
}
