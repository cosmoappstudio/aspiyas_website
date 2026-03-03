import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSiteSettings } from '../hooks/useSiteSettings';

export function DocumentHead() {
  const { settings } = useSiteSettings();
  const location = useLocation();

  useEffect(() => {
    const isHome = /^\/(tr|en)\/?$/.test(location.pathname);
    if (isHome && settings.site_title) {
      document.title = settings.site_title;
    }
  }, [location.pathname, settings.site_title]);

  useEffect(() => {
    const selector = 'link[rel="icon"]';
    const existing = document.head.querySelector<HTMLLinkElement>(selector);
    if (settings.favicon_url) {
      if (existing) {
        existing.setAttribute('href', settings.favicon_url);
      } else {
        const link = document.createElement('link');
        link.setAttribute('rel', 'icon');
        link.setAttribute('href', settings.favicon_url);
        document.head.appendChild(link);
      }
    } else if (existing) {
      existing.remove();
    }
  }, [settings.favicon_url]);

  return null;
}
