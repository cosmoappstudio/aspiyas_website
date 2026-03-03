import { Link, type LinkProps } from 'react-router-dom';
import { useLanguageContext } from '../contexts/LanguageContext';

export function LocalizedLink({ to, ...props }: LinkProps) {
  const { pathWithLang } = useLanguageContext();
  const path = typeof to === 'string' ? to : to.pathname ?? '/';
  const localizedTo = path.startsWith('/login') || path.startsWith('/yonetimofisi') ? path : pathWithLang(path);
  return <Link to={localizedTo} {...props} />;
}
