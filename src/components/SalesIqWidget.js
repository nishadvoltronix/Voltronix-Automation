import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import site from '../data/site.json';

const WIDGET_URL = 'https://salesiq.zohopublic.com/widget?wc=siq6c7caf10ab5558239b53ad29eb5d9801ab28f7cdd7b035124a54dee0b79f78f5e53880139d0b43526df2e43b1a0a42e3';

export default function SalesIqWidget() {
  const [failed, setFailed] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  useEffect(() => {
    let idle;
    let cancelled = false;
    const load = () => {
      if (cancelled || document.getElementById('zsiqscript')) return;
      window.$zoho = window.$zoho || {};
      window.$zoho.salesiq = window.$zoho.salesiq || { ready: () => {} };
      const script = document.createElement('script');
      script.id = 'zsiqscript';
      script.src = WIDGET_URL;
      script.async = true;
      script.onerror = () => { if (!cancelled) setFailed(true); };
      document.body.appendChild(script);
    };
    const timer = window.setTimeout(() => {
      if ('requestIdleCallback' in window) idle = window.requestIdleCallback(load, { timeout: 3000 });
      else load();
    }, 3500);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      if (idle !== undefined) window.cancelIdleCallback(idle);
    };
  }, []);
  if (!failed || dismissed) return null;
  return <aside className="support-fallback" aria-label="Contact support"><p>For a quick reply, <a href={site.whatsapp} target="_blank" rel="noopener noreferrer">contact us on WhatsApp</a>.</p><button type="button" onClick={() => setDismissed(true)} aria-label="Dismiss contact suggestion"><X size={18} aria-hidden="true" /></button></aside>;
}
