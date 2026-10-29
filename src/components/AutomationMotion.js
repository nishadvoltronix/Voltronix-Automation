import React, { createContext, startTransition, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Pause, Play } from 'lucide-react';
import './AutomationMotion.css';

const preferenceKey = 'voltronix-motion-paused';
const MotionContext = createContext({ paused: false, available: false, toggle: () => {} });
const revealSelector = '.hero-badge, .hero-title, .hero-tagline, .hero-subtitle, .hero-description, .hero-cta, .hero-capabilities, .hero-panel, .section-header, .service-card, .whyus-card, .info-card, .contact-card, .service-detail-title, .service-detail-content-title, .service-small-card';
const sceneSelector = '[data-motion-scene], .hero-section, .services-section, .whyus-section, .project-slide, .service-detail-hero';

// CSS does the animation. Observers only switch it on while a scene is visible.
// The server and first client render are static, with all copy already visible.
export function AutomationMotion({ children }) {
  const rootRef = useRef(null);
  const { pathname } = useLocation();
  const [paused, setPaused] = useState(false);
  const [preferences, setPreferences] = useState({ ready: false, allowed: false, compact: true });
  const [pageVisible, setPageVisible] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    const compact = window.matchMedia?.('(max-width: 900px), (hover: none)');
    const connection = navigator.connection;
    const update = () => startTransition(() => setPreferences({
      ready: true,
      allowed: !reduced?.matches && !connection?.saveData && !/^(slow-)?2g$/.test(connection?.effectiveType || '') && typeof IntersectionObserver !== 'undefined',
      compact: compact?.matches ?? true
    }));
    const visibility = () => startTransition(() => setPageVisible(!document.hidden));
    try {
      const savedPause = window.localStorage.getItem(preferenceKey) === 'true';
      startTransition(() => setPaused(savedPause));
    } catch { /* Private browsing can block storage. */ }
    update();
    visibility();
    // addListener supports older Safari versions, too.
    const listen = (query) => {
      if (query?.addEventListener) query.addEventListener('change', update);
      else query?.addListener?.(update);
    };
    const unlisten = (query) => {
      if (query?.removeEventListener) query.removeEventListener('change', update);
      else query?.removeListener?.(update);
    };
    listen(reduced);
    listen(compact);
    connection?.addEventListener?.('change', update);
    document.addEventListener('visibilitychange', visibility);
    return () => {
      unlisten(reduced);
      unlisten(compact);
      connection?.removeEventListener?.('change', update);
      document.removeEventListener('visibilitychange', visibility);
    };
  }, []);

  const enabled = preferences.ready && preferences.allowed && !paused;
  useEffect(() => {
    if (!enabled) return undefined;
    const root = rootRef.current;
    const scenes = new Set();
    const reveals = new Set();
    const sceneObserver = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => { target.dataset.motionScene = isIntersecting ? 'active' : 'idle'; });
    }, { threshold: 0 });
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) return;
        target.dataset.motionReveal = 'entered';
        revealObserver.unobserve(target);
      });
    }, { threshold: 0.15 });
    const discover = (node) => {
      if (node.nodeType !== 1) return;
      const observeScene = (element) => {
        if (scenes.has(element)) return;
        scenes.add(element);
        element.dataset.motionScene = 'idle';
        sceneObserver.observe(element);
      };
      const observeReveal = (element) => {
        if (reveals.has(element) || element.dataset.motionReveal) return;
        reveals.add(element);
        revealObserver.observe(element);
      };
      if (node.matches(sceneSelector)) observeScene(node);
      node.querySelectorAll(sceneSelector).forEach(observeScene);
      if (node.matches(revealSelector)) observeReveal(node);
      node.querySelectorAll(revealSelector).forEach(observeReveal);
    };
    const finishReveal = (event) => {
      if (event.animationName === 'automation-rise') event.target.dataset.motionReveal = 'done';
    };
    discover(root);
    // Detail pages are lazy loaded; observe their headings when they arrive.
    const additions = new MutationObserver((records) => records.forEach((record) => record.addedNodes.forEach(discover)));
    additions.observe(root, { childList: true, subtree: true });
    root.addEventListener('animationend', finishReveal);
    return () => {
      sceneObserver.disconnect();
      revealObserver.disconnect();
      additions.disconnect();
      root.removeEventListener('animationend', finishReveal);
      scenes.forEach((element) => { element.dataset.motionScene = 'idle'; });
      reveals.forEach((element) => { element.dataset.motionReveal = 'done'; });
    };
  }, [enabled, pathname]);

  const toggle = useCallback(() => {
    const next = !paused;
    try { window.localStorage.setItem(preferenceKey, String(next)); } catch { /* The control still works without storage. */ }
    setPaused(next);
  }, [paused]);
  const available = preferences.ready && preferences.allowed;
  const context = useMemo(() => ({ paused, available, toggle }), [paused, available, toggle]);
  const mode = enabled && pageVisible ? (preferences.compact ? 'quiet' : 'full') : 'off';
  return (
    <MotionContext.Provider value={context}>
      <div ref={rootRef} className="automation-motion reference-style" data-motion={mode}>{children}</div>
    </MotionContext.Provider>
  );
}

export function MotionControl() {
  const { paused, available, toggle } = useContext(MotionContext);
  const Icon = paused || !available ? Play : Pause;
  const label = !available ? 'Decorative animations are off' : paused ? 'Play decorative animations' : 'Pause decorative animations';
  return (
    <button type="button" className="motion-control" disabled={!available} aria-pressed={paused}
      aria-label={label}
      title={!available ? 'Motion follows your device preferences and connection.' : label} onClick={toggle}>
      <Icon size={13} aria-hidden="true" />
      <span>{!available ? 'Motion off' : paused ? 'Play motion' : 'Pause motion'}</span>
    </button>
  );
}
