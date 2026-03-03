import type { Lang } from '../contexts/LanguageContext';

export const commonStrings: Record<Lang, { loading: string; notFound: string }> = {
  tr: { loading: 'Yükleniyor...', notFound: 'Sayfa bulunamadı.' },
  en: { loading: 'Loading...', notFound: 'Page not found.' },
};
