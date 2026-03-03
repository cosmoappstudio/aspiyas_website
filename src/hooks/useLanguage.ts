import { useLanguageContext, type Lang } from '../contexts/LanguageContext';

export type { Lang };

export function useLanguage() {
  const { lang } = useLanguageContext();
  return lang;
}

/** Content can be flat (old) or { tr, en } (new). Returns the right object for the given lang. */
export function pickLangContent<T>(raw: unknown, lang: Lang): T {
  const c = raw as Record<string, T>;
  if (c?.tr != null || c?.en != null) return (c[lang] ?? c.tr ?? c.en ?? c) as T;
  return raw as T;
}
