import { useLanguageContext } from '../contexts/LanguageContext';

export function LanguageSwitcher() {
  const { lang, setLang } = useLanguageContext();

  return (
    <div className="flex rounded-lg overflow-hidden border border-white/10 bg-white/5">
      <button
        type="button"
        onClick={() => setLang('tr')}
        className={`px-3 py-1.5 text-sm font-medium transition-colors ${lang === 'tr' ? 'bg-white text-black' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}
      >
        TR
      </button>
      <button
        type="button"
        onClick={() => setLang('en')}
        className={`px-3 py-1.5 text-sm font-medium transition-colors ${lang === 'en' ? 'bg-white text-black' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}
      >
        EN
      </button>
    </div>
  );
}
