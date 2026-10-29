import React, { act } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { MemoryRouter, Link, useLocation } from 'react-router-dom';
import fs from 'fs';
import path from 'path';
import ServicesSection from '../components/ServicesSection';
import ProjectsSection from '../components/ProjectsSection';
import Navigation from '../components/Navigation';
import ContactSection from '../components/ContactSection';
import SalesIqWidget from '../components/SalesIqWidget';
import PageMetadata from '../seo/PageMetadata';
import App from '../App';
import services from '../data/services.json';
import applications from '../data/applications.json';
import { getMetadata, getPublicRoutes } from '../seo/metadata';

let container;
let root;
const originalIntersectionObserver = global.IntersectionObserver;
const routerOptions = { v7_startTransition: true, v7_relativeSplatPath: true };
const click = (element) => act(() => element.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true })));
const render = (element, initialEntries = ['/']) => {
  act(() => { root = createRoot(container); root.render(<MemoryRouter initialEntries={initialEntries} future={routerOptions}>{element}</MemoryRouter>); });
};

beforeEach(() => {
  jest.useFakeTimers();
  global.IS_REACT_ACT_ENVIRONMENT = true;
  window.scrollTo = jest.fn();
  Element.prototype.scrollIntoView = jest.fn();
  window.matchMedia = jest.fn(() => ({ matches: false, addEventListener: jest.fn(), removeEventListener: jest.fn() }));
  global.IntersectionObserver = class { observe() {} unobserve() {} disconnect() {} };
  window.localStorage.clear();
  document.head.innerHTML = '<link rel="canonical" href="https://voltronixautomation.ae/"><link rel="alternate" hreflang="en-AE"><link rel="alternate" hreflang="x-default">';
  container = document.createElement('div');
  container.id = 'root';
  document.body.appendChild(container);
});
afterEach(() => {
  if (root) act(() => root.unmount());
  root = null;
  container.remove();
  document.getElementById('zsiqscript')?.remove();
  global.IntersectionObserver = originalIntersectionObserver;
  window.localStorage.clear();
  jest.restoreAllMocks();
  jest.useRealTimers();
});

function LocationProbe() {
  const location = useLocation();
  return <output data-testid="location">{location.pathname}{location.hash}</output>;
}

function carouselGeometry(width, count, trackId = 'services-track', cardClass = 'service-card') {
  let visible = count;
  let trackWidth = width;
  const base = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'clientWidth');
  const offset = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetLeft');
  const box = HTMLElement.prototype.getBoundingClientRect;
  Object.defineProperty(HTMLElement.prototype, 'clientWidth', { configurable: true, get() { return this.id === trackId ? trackWidth : 0; } });
  Object.defineProperty(HTMLElement.prototype, 'offsetLeft', { configurable: true, get() {
    if (!this.classList.contains(cardClass)) return 0;
    return [...this.parentElement.children].indexOf(this) * ((trackWidth + 20) / visible);
  } });
  HTMLElement.prototype.getBoundingClientRect = function getRect() {
    const cardWidth = (trackWidth - (visible - 1) * 20) / visible;
    return this.classList.contains(cardClass) ? { width: cardWidth } : { width: 0 };
  };
  HTMLElement.prototype.scrollTo = jest.fn(function scrollTo({ left }) { this.scrollLeft = left; });
  return {
    resize(count, nextWidth = trackWidth) { visible = count; trackWidth = nextWidth; act(() => { window.dispatchEvent(new Event('resize')); jest.advanceTimersByTime(40); }); },
    restore() {
      if (base) Object.defineProperty(HTMLElement.prototype, 'clientWidth', base);
      else delete HTMLElement.prototype.clientWidth;
      if (offset) Object.defineProperty(HTMLElement.prototype, 'offsetLeft', offset);
      else delete HTMLElement.prototype.offsetLeft;
      HTMLElement.prototype.getBoundingClientRect = box;
      delete HTMLElement.prototype.scrollTo;
    }
  };
}

test.each([[288, 1], [358, 1], [720, 2], [1296, 3]])('service arrows reach all six cards with track width %i and %i visible cards', (width, count) => {
  const geometry = carouselGeometry(width, count);
  try {
    render(<ServicesSection />);
    const previous = container.querySelector('[aria-label="Previous services"]');
    const next = container.querySelector('[aria-label="Next services"]');
    expect(container.querySelectorAll('.service-card')).toHaveLength(6);
    expect(container.querySelectorAll('.services-pagination button')).toHaveLength(Math.ceil(6 / count));
    expect(previous.disabled).toBe(true);
    for (let page = 0; page < Math.ceil(6 / count) - 1; page++) click(next);
    expect(next.disabled).toBe(true);
    expect(container.querySelector('.services-status').textContent).toContain('6 of 6');
    click(previous);
    expect(next.disabled).toBe(false);
    expect(container.querySelector('.service-card').getAttribute('href')).toBe('/services/plc-panels/');
  } finally { geometry.restore(); }
});

test('service navigation adapts after resizing and follows touch-scroll position', () => {
  const geometry = carouselGeometry(720, 3);
  try {
    render(<ServicesSection />);
    geometry.resize(1);
    expect(container.querySelectorAll('.services-pagination button')).toHaveLength(6);
    const track = container.querySelector('#services-track');
    act(() => { track.scrollLeft = 740; track.dispatchEvent(new Event('scroll')); jest.advanceTimersByTime(40); });
    expect(container.querySelector('.services-status').textContent).toBe('Services 2–2 of 6');
    act(() => track.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true })));
    expect(container.querySelector('.services-status').textContent).toBe('Services 3–3 of 6');
  } finally { geometry.restore(); }
});

test('service arrows respect reduced motion', () => {
  const geometry = carouselGeometry(288, 1);
  try {
    window.matchMedia.mockReturnValue({ matches: true });
    render(<ServicesSection />);
    click(container.querySelector('[aria-label="Next services"]'));
    expect(HTMLElement.prototype.scrollTo).toHaveBeenLastCalledWith({ left: 308, behavior: 'auto' });
  } finally { geometry.restore(); }
});

test('service arrows still work when a webview lacks element.scrollTo', () => {
  const geometry = carouselGeometry(288, 1);
  try {
    delete HTMLElement.prototype.scrollTo;
    render(<ServicesSection />);
    click(container.querySelector('[aria-label="Next services"]'));
    expect(container.querySelector('#services-track').scrollLeft).toBe(308);
    expect(container.querySelector('.services-status').textContent).toBe('Services 2–2 of 6');
  } finally { geometry.restore(); }
});

test('desktop Services dropdown keeps six panel links, adds site contracting and closes on navigation', () => {
  render(<><Navigation /><LocationProbe /></>);
  click(container.querySelector('[aria-label="Show services"]'));
  expect(container.querySelectorAll('#service-navigation a[href^="/services/"]')).toHaveLength(6);
  expect(container.querySelectorAll('#service-navigation a')).toHaveLength(7);
  expect(container.querySelector('#service-navigation a[href="/#contracting"]').textContent).toBe('From the Panel to the Field');
  click(container.querySelector('#service-navigation a[href="/services/mcc-assemblies/"]'));
  expect(container.querySelector('#service-navigation')).toBeNull();
  expect(container.querySelector('output').textContent).toBe('/services/mcc-assemblies/');
});

test.each(['desktop', 'mobile'])('%s Industries dropdown exposes all six application areas and closes on navigation', (mode) => {
  render(<><Navigation /><LocationProbe /></>);
  if (mode === 'mobile') click(container.querySelector('.mobile-menu-btn'));
  const scope = mode === 'mobile' ? '#mobile-navigation' : '.nav-links.desktop';
  const trigger = container.querySelector(`${scope} [aria-label="Show industries"]`);
  expect(trigger.getAttribute('aria-expanded')).toBe('false');
  click(trigger);
  expect(trigger.getAttribute('aria-expanded')).toBe('true');
  const links = [...container.querySelectorAll('#industry-navigation a')];
  expect(links).toHaveLength(6);
  expect(links.map((link) => link.textContent)).toEqual(applications.map((item) => item.title));
  expect(links.map((link) => link.getAttribute('href'))).toEqual(applications.map((item) => `/applications/${item.slug}/`));
  expect(container.querySelector('#industry-navigation .nav-dropdown-heading').textContent).toBe('Automation for Your Application');
  click(container.querySelector('#industry-navigation a[href="/applications/fountain-water-feature-automation/"]'));
  expect(container.querySelector('output').textContent).toBe('/applications/fountain-water-feature-automation/');
  expect(container.querySelector('#industry-navigation')).toBeNull();
  if (mode === 'mobile') expect(container.querySelector('#mobile-navigation')).toBeNull();
});

test('only one top-menu dropdown opens and navigation links reach their corresponding sections', () => {
  render(<><Navigation /><LocationProbe /></>);
  const servicesTrigger = container.querySelector('[aria-label="Show services"]');
  const industriesTrigger = container.querySelector('[aria-label="Show industries"]');
  click(servicesTrigger);
  click(industriesTrigger);
  expect(servicesTrigger.getAttribute('aria-expanded')).toBe('false');
  expect(container.querySelector('#service-navigation')).toBeNull();
  click(servicesTrigger);
  expect(industriesTrigger.getAttribute('aria-expanded')).toBe('false');
  expect(container.querySelector('#industry-navigation')).toBeNull();
  click(container.querySelector('#service-navigation a[href="/#contracting"]'));
  expect(container.querySelector('output').textContent).toBe('/#contracting');
  expect(container.querySelector('#service-navigation')).toBeNull();
  click(container.querySelector('.nav-industries .nav-link'));
  expect(container.querySelector('output').textContent).toBe('/#applications');
  const projectsLink = container.querySelector('.nav-links.desktop > .nav-link[href="/#projects"]');
  expect(projectsLink.textContent).toBe('Projects');
  click(projectsLink);
  expect(container.querySelector('output').textContent).toBe('/#projects');
  const aboutLink = container.querySelector('.nav-links.desktop > .nav-link[href="/#why-us"]');
  expect(aboutLink.textContent).toBe('About');
  click(aboutLink);
  expect(container.querySelector('output').textContent).toBe('/#why-us');
});

test('Industries dropdown closes on Escape with restored focus and on an outside tap', () => {
  render(<Navigation />);
  const trigger = container.querySelector('[aria-label="Show industries"]');
  click(trigger);
  act(() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })));
  expect(container.querySelector('#industry-navigation')).toBeNull();
  expect(document.activeElement).toBe(trigger);
  click(trigger);
  act(() => document.body.dispatchEvent(new Event('pointerdown', { bubbles: true })));
  expect(container.querySelector('#industry-navigation')).toBeNull();
  expect(trigger.getAttribute('aria-expanded')).toBe('false');
});

test.each([288, 720, 1296])('project arrows, indicators and thumbnails reach all examples at track width %i', (width) => {
  const geometry = carouselGeometry(width, 1, 'projects-track', 'project-slide');
  try {
    render(<ProjectsSection />);
    const previous = container.querySelector('[aria-label="Previous application example"]');
    const next = container.querySelector('[aria-label="Next application example"]');
    expect(previous.disabled).toBe(true);
    click(next);
    expect(container.querySelector('#projects-track').scrollLeft).toBe(width + 20);
    click(next);
    expect(next.disabled).toBe(true);
    expect(container.querySelector('.projects-status').textContent).toBe('Example 3 of 3');
    expect(container.querySelector('.project-slide[aria-hidden="false"] .project-title').textContent).toBe('Chilled Water Control');
    click(previous);
    expect(next.disabled).toBe(false);
    click(container.querySelector('.project-indicators [aria-label="Show HVAC Motor Control"]'));
    expect(previous.disabled).toBe(true);
    click(container.querySelector('.project-thumbnails [aria-label="Show Conveyor Automation"]'));
    expect(container.querySelector('.projects-status').textContent).toBe('Example 2 of 3');
    expect(container.querySelector('.project-indicators [aria-current="true"]').getAttribute('aria-label')).toBe('Show Conveyor Automation');
  } finally { geometry.restore(); }
});

test('project controls follow touch scrolling and support arrow, Home and End keys', () => {
  const geometry = carouselGeometry(358, 1, 'projects-track', 'project-slide');
  try {
    render(<ProjectsSection />);
    const track = container.querySelector('#projects-track');
    act(() => { track.scrollLeft = 378; track.dispatchEvent(new Event('scroll')); jest.advanceTimersByTime(40); });
    expect(container.querySelector('.project-thumbnails .thumbnail.active').textContent).toBe('Conveyor Automation');
    expect(container.querySelector('.projects-status').textContent).toBe('Example 2 of 3');
    const key = (value) => act(() => track.dispatchEvent(new KeyboardEvent('keydown', { key: value, bubbles: true })));
    key('ArrowRight');
    expect(container.querySelector('[aria-label="Next application example"]').disabled).toBe(true);
    key('ArrowLeft');
    expect(container.querySelector('.projects-status').textContent).toBe('Example 2 of 3');
    key('Home');
    expect(track.scrollLeft).toBe(0);
    key('ArrowLeft');
    expect(track.scrollLeft).toBe(0);
    key('End');
    expect(track.scrollLeft).toBe(756);
  } finally { geometry.restore(); }
});

test('project navigation respects reduced motion and works without element.scrollTo', () => {
  const geometry = carouselGeometry(288, 1, 'projects-track', 'project-slide');
  try {
    window.matchMedia.mockReturnValue({ matches: true });
    render(<ProjectsSection />);
    const next = container.querySelector('[aria-label="Next application example"]');
    click(next);
    expect(HTMLElement.prototype.scrollTo).toHaveBeenLastCalledWith({ left: 308, behavior: 'auto' });
    delete HTMLElement.prototype.scrollTo;
    click(next);
    expect(container.querySelector('#projects-track').scrollLeft).toBe(616);
    expect(container.querySelector('.projects-status').textContent).toBe('Example 3 of 3');
  } finally { geometry.restore(); }
});

test('project selection stays visible after a viewport resize', () => {
  const geometry = carouselGeometry(288, 1, 'projects-track', 'project-slide');
  try {
    render(<ProjectsSection />);
    click(container.querySelector('.project-thumbnails [aria-label="Show Chilled Water Control"]'));
    geometry.resize(1, 720);
    expect(container.querySelector('#projects-track').scrollLeft).toBe(1480);
    expect(container.querySelector('.projects-status').textContent).toBe('Example 3 of 3');
    click(container.querySelector('[aria-label="Previous application example"]'));
    expect(container.querySelector('#projects-track').scrollLeft).toBe(740);
  } finally { geometry.restore(); }
});

test('mobile menu opens, reveals panel and contracting services, and closes with Escape', () => {
  render(<Navigation />);
  const trigger = container.querySelector('.mobile-menu-btn');
  click(trigger);
  expect(trigger.getAttribute('aria-expanded')).toBe('true');
  click(container.querySelector('#mobile-navigation [aria-label="Show services"]'));
  expect(container.querySelectorAll('.mobile-service-links a')).toHaveLength(7);
  expect(container.querySelector('.mobile-service-links a[href="/#contracting"]').textContent).toBe('From the Panel to the Field');
  act(() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })));
  expect(container.querySelector('#mobile-navigation')).toBeNull();
  expect(document.activeElement).toBe(trigger);
});

test('mobile menu closes when tapping outside it', () => {
  render(<Navigation />);
  click(container.querySelector('.mobile-menu-btn'));
  act(() => document.body.dispatchEvent(new Event('pointerdown', { bubbles: true })));
  expect(container.querySelector('#mobile-navigation')).toBeNull();
});

test('SEO metadata resets after returning home and unknown URLs are noindex', () => {
  render(<><PageMetadata /><Link id="go-home" to="/">Home</Link><Link id="go-missing" to="/unknown/">Missing</Link></>, ['/services/plc-panels/']);
  expect(document.title).toBe(services[0].seoTitle);
  expect(document.querySelector('[rel="canonical"]').href).toBe('https://voltronixautomation.ae/services/plc-panels/');
  expect(JSON.parse(document.getElementById('page-structured-data').textContent)['@graph'].some((item) => item['@type'] === 'Service')).toBe(true);
  click(container.querySelector('#go-missing'));
  expect(document.querySelector('meta[name="robots"]').content).toBe('noindex, follow');
  click(container.querySelector('#go-home'));
  expect(document.title).toBe(getMetadata('/').title);
  expect(document.querySelector('meta[property="og:url"]').content).toBe('https://voltronixautomation.ae/');
  expect(document.querySelector('meta[name="twitter:title"]').content).toBe(getMetadata('/').title);
  expect(document.querySelector('meta[name="robots"]').content).toContain('index, follow');
  expect(JSON.parse(document.getElementById('page-structured-data').textContent)['@graph'].some((item) => item['@type'] === 'Service')).toBe(false);
});

test('Zoho form validates email, phones and Other while retaining backend field names', () => {
  render(<ContactSection />);
  const form = container.querySelector('form');
  expect(form.action).toContain('forms.zohopublic.com/voltronixswitchgearllc/');
  let valid;
  act(() => { valid = form.checkValidity(); });
  expect(valid).toBe(false);
  for (const [name, value] of Object.entries({ Name_First: 'Test', Name_Last: 'Contact', Email: 'test@example.com', SingleLine: 'Example', PhoneNumber_countrycode: '443278040', PhoneNumber1_countrycode: '504327804', MultiLine: 'Quotation test, never submitted.' })) form.elements[name].value = value;
  click(container.querySelector('input[value="Solutions"]'));
  act(() => { valid = form.checkValidity(); });
  expect(valid).toBe(true);
  form.elements.Email.value = 'invalid-email';
  act(() => { valid = form.checkValidity(); });
  expect(valid).toBe(false);
  form.elements.Email.value = 'test@example.com';
  click(container.querySelector('input[value="zfs-others-zfs"]'));
  act(() => { valid = form.checkValidity(); });
  expect(valid).toBe(false);
  form.elements.Radio_allow_others_text.value = 'Control panel';
  act(() => { valid = form.checkValidity(); });
  expect(valid).toBe(true);
  expect(form.elements.PhoneNumber_countrycodeval.value).toBe('+971');
});

test.each(['+971 50 432 7804', '00971504327804', '0504327804'])('phone field normalizes pasted UAE number %s', (number) => {
  render(<ContactSection />);
  const input = container.querySelector('#PhoneNumber1_countrycode');
  const event = new Event('paste', { bubbles: true, cancelable: true });
  Object.defineProperty(event, 'clipboardData', { value: { getData: () => number } });
  act(() => input.dispatchEvent(event));
  expect(input.value).toBe('504327804');
});

test('chat script is deferred, loaded once, and provides a fallback after a load error', () => {
  render(<SalesIqWidget />);
  expect(document.getElementById('zsiqscript')).toBeNull();
  act(() => jest.advanceTimersByTime(3500));
  const script = document.getElementById('zsiqscript');
  expect(script.async).toBe(true);
  act(() => script.dispatchEvent(new Event('error')));
  expect(container.querySelector('.support-fallback a').href).toBe('https://wa.me/971504327804');
  click(container.querySelector('[aria-label="Dismiss contact suggestion"]'));
  expect(container.querySelector('.support-fallback')).toBeNull();
});

test.each(getPublicRoutes())('production HTML hydrates without mismatches for %s', async (route) => {
  const filename = path.join(process.cwd(), 'build', route, 'index.html');
  const html = fs.readFileSync(filename, 'utf8');
  const parsed = new DOMParser().parseFromString(html, 'text/html');
  document.head.innerHTML = parsed.head.innerHTML;
  container.innerHTML = parsed.getElementById('root').innerHTML;
  const error = jest.spyOn(console, 'error').mockImplementation(() => {});
  await act(async () => {
    root = hydrateRoot(container, <MemoryRouter initialEntries={[route]} future={routerOptions}><App /></MemoryRouter>);
    await Promise.resolve();
    await Promise.resolve();
  });
  expect(container.querySelectorAll('h1')).toHaveLength(1);
  expect(container.querySelectorAll('main')).toHaveLength(1);
  expect(container.querySelector('.automation-motion').dataset.motion).toBe('full');
  expect(error.mock.calls).toEqual([]);
});

test.each(['saved pause', 'reduced motion'])('production homepage hydrates cleanly with %s already enabled', async (preference) => {
  if (preference === 'saved pause') window.localStorage.setItem('voltronix-motion-paused', 'true');
  else window.matchMedia.mockImplementation((query) => ({ matches: query.includes('prefers-reduced-motion'), addEventListener: jest.fn(), removeEventListener: jest.fn() }));
  const parsed = new DOMParser().parseFromString(fs.readFileSync(path.join(process.cwd(), 'build/index.html'), 'utf8'), 'text/html');
  document.head.innerHTML = parsed.head.innerHTML;
  container.innerHTML = parsed.getElementById('root').innerHTML;
  const error = jest.spyOn(console, 'error').mockImplementation(() => {});
  await act(async () => {
    root = hydrateRoot(container, <MemoryRouter future={routerOptions}><App /></MemoryRouter>);
    await Promise.resolve();
    await Promise.resolve();
  });
  expect(container.querySelector('.automation-motion').dataset.motion).toBe('off');
  expect(container.querySelector('h1').textContent).toBe('Control Panel Supplier in Dubai');
  expect(error.mock.calls).toEqual([]);
});

test('homepage adds pool, fountain and contracting content while retaining six original service cards', () => {
  render(<App />);
  expect(container.querySelectorAll('#services .service-card')).toHaveLength(6);
  expect(container.querySelectorAll('#applications .expansion-application-card')).toHaveLength(6);
  expect(container.querySelector('#applications a[href="/applications/swimming-pool-automation/"]').textContent).toContain('Swimming Pool Automation');
  expect(container.querySelector('#applications a[href="/applications/fountain-water-feature-automation/"]').textContent).toContain('Fountains & Water Features');
  expect(container.querySelector('#contracting').textContent).toContain('Control Cable Pulling');
  expect(container.querySelector('#contracting').textContent).toContain('Cable Trays & Containment');
  expect(container.querySelectorAll('#automation-faqs details')).toHaveLength(4);
});

test('hero and mobile-menu motion controls stay synchronized without changing navigation', () => {
  render(<App />);
  const links = [...container.querySelectorAll('.navigation a')].map((link) => link.getAttribute('href'));
  const heroControl = container.querySelector('.hero-motion-control .motion-control');
  expect(container.querySelector('.nav-motion-control')).toBeNull();
  click(heroControl);
  expect(container.querySelector('.automation-motion').dataset.motion).toBe('off');
  expect(heroControl.getAttribute('aria-pressed')).toBe('true');
  expect(heroControl.getAttribute('aria-label')).toBe('Play decorative animations');
  expect([...container.querySelectorAll('.navigation a')].map((link) => link.getAttribute('href'))).toEqual(links);
  click(container.querySelector('.mobile-menu-btn'));
  const mobileControl = container.querySelector('.mobile-motion-control .motion-control');
  expect(mobileControl.getAttribute('aria-pressed')).toBe('true');
  click(mobileControl);
  expect(container.querySelector('.automation-motion').dataset.motion).toBe('full');
  expect(heroControl.getAttribute('aria-pressed')).toBe('false');
  expect(window.localStorage.getItem('voltronix-motion-paused')).toBe('false');
});

test('new application links navigate to their detailed content and back to the homepage', async () => {
  render(<App />);
  await act(async () => {
    container.querySelector('#applications a[href="/applications/swimming-pool-automation/"]').dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
    await Promise.resolve();
  });
  expect(container.querySelector('h1').textContent).toBe('Swimming Pool Automation in Dubai, UAE');
  expect(container.querySelector('#application-quotation')).not.toBeNull();
  click(container.querySelector('a[href="/#applications"]'));
  expect(container.querySelector('#services')).not.toBeNull();
  expect(container.querySelector('#applications')).not.toBeNull();
});

test('unknown application routes remain useful 404 pages with noindex metadata', async () => {
  await act(async () => {
    root = createRoot(container);
    root.render(<MemoryRouter initialEntries={['/applications/not-a-real-application/']} future={routerOptions}><App /></MemoryRouter>);
    await Promise.resolve();
  });
  expect(container.querySelector('.not-found-page')).not.toBeNull();
  expect(document.querySelector('meta[name="robots"]').content).toBe('noindex, follow');
});

test('new application and contracting pages have distinct metadata and return to the original homepage title', () => {
  render(<><PageMetadata /><Link id="pool-page" to="/applications/swimming-pool-automation/">Pool</Link><Link id="contract-page" to="/contracting/">Contracting</Link><Link id="home-page" to="/">Home</Link></>);
  const homeTitle = document.title;
  click(container.querySelector('#pool-page'));
  expect(document.title).toContain('Swimming Pool Automation in Dubai');
  expect(document.querySelector('[rel="canonical"]').href).toBe('https://voltronixautomation.ae/applications/swimming-pool-automation/');
  click(container.querySelector('#contract-page'));
  expect(document.title).toContain('Control Cable & Automation Contracting in Dubai');
  expect(document.querySelector('[rel="canonical"]').href).toBe('https://voltronixautomation.ae/contracting/');
  click(container.querySelector('#home-page'));
  expect(document.title).toBe(homeTitle);
});
