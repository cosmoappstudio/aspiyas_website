import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface SiteSettings {
  logo_url: string;
  site_title: string;
  favicon_url: string;
  contact_email: string;
  contact_phone: string;
  contact_address: string;
  social_instagram: string;
  social_linkedin: string;
  social_twitter: string;
  footer_description: string;
  default_language: string;
}

const defaults: SiteSettings = {
  logo_url: '',
  site_title: 'Aspiyas Teknoloji ve Ticaret A.Ş.',
  favicon_url: '',
  contact_email: 'info@aspiyas.com',
  contact_phone: '+90 212 000 00 00',
  contact_address: 'Maslak, İstanbul',
  social_instagram: '',
  social_linkedin: '',
  social_twitter: '',
  footer_description: 'Yapay zeka odaklı medya ve teknoloji alanlarında yenilikçi ürünler üretiyoruz. Geleceği bugünden şekillendiriyoruz.',
  default_language: 'tr',
};

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>(defaults);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from('settings').select('key, value').then(({ data }) => {
      const obj: Record<string, string> = {};
      (data ?? []).forEach((r: { key: string; value: string }) => { obj[r.key] = r.value; });
      setSettings({ ...defaults, ...obj });
      setLoading(false);
    });
  }, []);

  return { settings, loading };
}
