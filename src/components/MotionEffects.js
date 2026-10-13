import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

const motionGroups = [
  {
    selector: '.hero-copy > *, .service-hero-content > *, .industry-hero-content > *',
    className: 'vx-reveal',
    stagger: 70
  },
  {
    selector: '.hero-image-wrap, .service-hero-image, .industry-hero-image',
    className: 'vx-reveal vx-reveal-image'
  },
  {
    selector: '.services-intro, .about-copy, .process-intro, .trust-copy, .whyus-copy, .contact-copy, .overview-grid > div:first-child, .service-location-grid > div:first-child, .industry-overview-grid > div:first-child',
    className: 'vx-reveal vx-reveal-left'
  },
  {
    selector: '.about-image, .trust-image, .contact-form, .capability-card, .service-applications, .industry-priorities',
    className: 'vx-reveal vx-reveal-right'
  },
  {
    selector: '.section-heading-row, .industry-applications .eyebrow, .industry-applications .section-heading, .industry-related .eyebrow, .industry-related .section-heading, .related-services .eyebrow, .service-cta-band .container, .industry-cta .container',
    className: 'vx-reveal'
  },
  {
    selector: '.service-card, .industry-card, .project-card, .process-step, .whyus-item, .delivery-grid > div, .related-grid > a, .industry-priorities > div, .application-grid > div, .industry-service-grid > a',
    className: 'vx-reveal vx-reveal-card',
    stagger: 65
  }
];

export default function MotionEffects() {
  const location = useLocation();

  useLayoutEffect(() => {
    const elements = new Set();

    motionGroups.forEach(({ selector, className, stagger = 0 }) => {
      document.querySelectorAll(selector).forEach((element, index) => {
        className.split(' ').forEach(name => element.classList.add(name));
        element.style.setProperty('--vx-delay', `${Math.min(index * stagger, 390)}ms`);
        elements.add(element);
      });
    });

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      elements.forEach(element => element.classList.add('vx-in-view'));
      return undefined;
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('vx-in-view');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -7% 0px' });

    const animationFrame = window.requestAnimationFrame(() => {
      elements.forEach(element => observer.observe(element));
    });

    return () => {
      window.cancelAnimationFrame(animationFrame);
      observer.disconnect();
    };
  }, [location.pathname]);

  return null;
}
