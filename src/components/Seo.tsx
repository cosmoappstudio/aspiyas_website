import { useEffect } from 'react';

type JsonLd = Record<string, unknown> | Array<Record<string, unknown>>;

interface SeoProps {
  title: string;
  description: string;
  canonicalPath?: string;
  jsonLd?: JsonLd;
}

function upsertMetaTag(name: string, content: string) {
  const selector = `meta[name="${name}"]`;
  const existing = document.head.querySelector<HTMLMetaElement>(selector);
  if (existing) {
    existing.setAttribute('content', content);
    return;
  }
  const meta = document.createElement('meta');
  meta.setAttribute('name', name);
  meta.setAttribute('content', content);
  document.head.appendChild(meta);
}

function upsertLinkTag(rel: string, href: string) {
  const selector = `link[rel="${rel}"]`;
  const existing = document.head.querySelector<HTMLLinkElement>(selector);
  if (existing) {
    existing.setAttribute('href', href);
    return;
  }
  const link = document.createElement('link');
  link.setAttribute('rel', rel);
  link.setAttribute('href', href);
  document.head.appendChild(link);
}

function upsertJsonLd(jsonLd: JsonLd) {
  const selector = 'script[type="application/ld+json"][data-aspiyas-seo="true"]';
  const existing = document.head.querySelector<HTMLScriptElement>(selector);
  const script = existing ?? document.createElement('script');
  script.type = 'application/ld+json';
  script.setAttribute('data-aspiyas-seo', 'true');
  script.text = JSON.stringify(jsonLd);
  if (!existing) document.head.appendChild(script);
}

export function Seo({ title, description, canonicalPath, jsonLd }: SeoProps) {
  useEffect(() => {
    document.title = title;
    upsertMetaTag('description', description);

    const origin = window.location.origin;
    const canonical = canonicalPath ? new URL(canonicalPath, origin).toString() : window.location.href;
    upsertLinkTag('canonical', canonical);

    if (jsonLd) upsertJsonLd(jsonLd);
  }, [title, description, canonicalPath, jsonLd]);

  return null;
}

