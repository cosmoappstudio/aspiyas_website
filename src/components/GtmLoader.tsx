import { useEffect } from 'react';
import { supabase } from '../lib/supabase';

const GTM_ID_KEY = 'gtm_container_id';

function injectGtm(containerId: string) {
  if (!containerId || !/^GTM-[A-Z0-9]+$/.test(containerId.trim())) return;
  const id = containerId.trim();

  if (document.querySelector(`script[data-gtm-id="${id}"]`)) return;

  const script = document.createElement('script');
  script.setAttribute('data-gtm-id', id);
  script.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${id}');`;
  document.head.appendChild(script);

  const noscript = document.createElement('noscript');
  noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${id}" height="0" width="0" style="display:none;visibility:hidden" title="GTM"></iframe>`;
  document.body.insertBefore(noscript, document.body.firstChild);
}

export function GtmLoader() {
  useEffect(() => {
    (async () => {
      try {
        const { data } = await supabase.from('settings').select('value').eq('key', GTM_ID_KEY).single();
        const value = (data as { value?: string } | null)?.value?.trim();
        if (value) injectGtm(value);
      } catch {}
    })();
  }, []);

  return null;
}
