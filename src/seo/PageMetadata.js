import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getMetadata } from './metadata';

export default function PageMetadata() {
  const { pathname } = useLocation();
  useEffect(() => {
    const meta = getMetadata(pathname);
    document.title = meta.title;
    const setMeta = (attribute, key, value) => {
      let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }
      element.content = value;
    };
    setMeta('name', 'description', meta.description);
    setMeta('name', 'robots', meta.notFound ? 'noindex, follow' : 'index, follow, max-image-preview:large');
    for (const [key, value] of Object.entries({ title: meta.title, description: meta.description, url: meta.canonical, image: meta.image })) {
      setMeta('property', `og:${key}`, value);
    }
    setMeta('property', 'og:image:alt', meta.title);
    setMeta('name', 'twitter:title', meta.title);
    setMeta('name', 'twitter:description', meta.description);
    setMeta('name', 'twitter:image', meta.image);
    for (const selector of ['link[rel="canonical"]', 'link[hreflang="en-AE"]', 'link[hreflang="x-default"]']) {
      const element = document.head.querySelector(selector);
      if (element) element.href = meta.canonical;
    }
    let schema = document.getElementById('page-structured-data');
    if (!schema) {
      schema = document.createElement('script');
      schema.id = 'page-structured-data';
      schema.type = 'application/ld+json';
      document.head.appendChild(schema);
    }
    schema.textContent = JSON.stringify(meta.structuredData);
  }, [pathname]);
  return null;
}
