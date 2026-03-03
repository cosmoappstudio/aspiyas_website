import { createContext, useContext, useMemo, useCallback, type ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export type Lang = 'tr' | 'en';

const STORAGE_KEY = 'aspiyas_lang';

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  pathWithLang: (path: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getLangFromPath(pathname: string): Lang | null {
  const match = pathname.match(/^\/(tr|en)(?:\/|$)/);
  return match ? (match[1] as Lang) : null;
}

function getPathWithoutLang(pathname: string): string {
  const m = pathname.match(/^\/(tr|en)(\/.*)?$/);
  return m ? (m[2] || '/') : '/';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();

  const urlLang = getLangFromPath(location.pathname);

  const lang: Lang = urlLang ?? (() => {
    if (typeof window === 'undefined') return 'tr';
    const stored = localStorage.getItem(STORAGE_KEY) as Lang | null;
    return stored === 'tr' || stored === 'en' ? stored : 'tr';
  })();

  const setLang = useCallback((l: Lang) => {
    localStorage.setItem(STORAGE_KEY, l);
    const base = getPathWithoutLang(location.pathname);
    const newPath = (base === '/' || base === '' || base.startsWith('/login') || base.startsWith('/yonetimofisi')) ? `/${l}` : `/${l}${base}`;
    if (location.pathname !== newPath) {
      navigate(newPath);
    }
  }, [location.pathname, navigate]);

  const pathWithLang = useCallback((path: string) => {
    const clean = path.startsWith('/') ? path : `/${path}`;
    if (clean === '/') return `/${lang}`;
    return `/${lang}${clean}`;
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, pathWithLang }), [lang, setLang, pathWithLang]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguageContext() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguageContext must be used within LanguageProvider');
  return ctx;
}
