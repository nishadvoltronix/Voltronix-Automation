import React, { act, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { MemoryRouter } from 'react-router-dom';
import { AutomationMotion, MotionControl } from '../components/AutomationMotion';

let container;
let root;
let observers;
let reduced;
let compact;
let hidden;
const originalObserver = global.IntersectionObserver;
const connectionDescriptor = Object.getOwnPropertyDescriptor(navigator, 'connection');
const preferenceKey = 'voltronix-motion-paused';
const click = (element) => act(() => element.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true })));

function mediaQuery(matches = false) {
  const listeners = new Set();
  return {
    matches,
    addEventListener: jest.fn((type, listener) => listeners.add(listener)),
    removeEventListener: jest.fn((type, listener) => listeners.delete(listener)),
    update(value) { this.matches = value; act(() => listeners.forEach((listener) => listener())); }
  };
}

function Fixture() {
  const [detail, setDetail] = useState(false);
  return <AutomationMotion>
    <section data-motion-scene="idle"><h1 className="hero-title">Control Panel Supplier <span>in Dubai</span></h1><MotionControl /></section>
    <button type="button" id="details" onClick={() => setDetail(true)}>Show details</button>
    {detail && <h2 className="service-detail-content-title">Application overview</h2>}
  </AutomationMotion>;
}
function render() {
  act(() => { root = createRoot(container); root.render(<MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}><Fixture /></MemoryRouter>); });
}
function visible(element, isIntersecting = true) {
  act(() => observers.filter((observer) => observer.targets.has(element)).forEach((observer) => observer.callback([{ target: element, isIntersecting }])));
}

beforeEach(() => {
  global.IS_REACT_ACT_ENVIRONMENT = true;
  observers = [];
  global.IntersectionObserver = class {
    constructor(callback) { this.callback = callback; this.targets = new Set(); this.disconnect = jest.fn(() => this.targets.clear()); observers.push(this); }
    observe(target) { this.targets.add(target); }
    unobserve(target) { this.targets.delete(target); }
  };
  reduced = mediaQuery();
  compact = mediaQuery();
  window.matchMedia = jest.fn((query) => query.includes('prefers-reduced-motion') ? reduced : compact);
  hidden = false;
  jest.spyOn(document, 'hidden', 'get').mockImplementation(() => hidden);
  Object.defineProperty(navigator, 'connection', { configurable: true, value: undefined });
  window.localStorage.clear();
  container = document.createElement('div');
  document.body.appendChild(container);
});
afterEach(() => {
  if (root) act(() => root.unmount());
  root = null;
  container.remove();
  global.IntersectionObserver = originalObserver;
  if (connectionDescriptor) Object.defineProperty(navigator, 'connection', connectionDescriptor);
  else delete navigator.connection;
  jest.restoreAllMocks();
  window.localStorage.clear();
});

test('decorative scenes start only in view and pause immediately when leaving it', () => {
  render();
  const wrapper = container.querySelector('.automation-motion');
  const scene = container.querySelector('section');
  const title = container.querySelector('h1');
  expect(wrapper.dataset.motion).toBe('full');
  expect(scene.dataset.motionScene).toBe('idle');
  expect(title.textContent).toBe('Control Panel Supplier in Dubai');
  visible(scene);
  expect(scene.dataset.motionScene).toBe('active');
  visible(scene, false);
  expect(scene.dataset.motionScene).toBe('idle');
  visible(title);
  expect(title.dataset.motionReveal).toBe('entered');
  expect(observers.every((observer) => !observer.targets.has(title))).toBe(true);
  const end = new Event('animationend', { bubbles: true });
  Object.defineProperty(end, 'animationName', { value: 'automation-rise' });
  act(() => title.dispatchEvent(end));
  expect(title.dataset.motionReveal).toBe('done');
});

test('pause stops all scenes and persists across a later page visit', () => {
  render();
  const scene = container.querySelector('section');
  visible(scene);
  click(container.querySelector('.motion-control'));
  expect(container.querySelector('.automation-motion').dataset.motion).toBe('off');
  expect(scene.dataset.motionScene).toBe('idle');
  expect(container.querySelector('.motion-control').getAttribute('aria-label')).toBe('Play decorative animations');
  expect(container.querySelector('.motion-control').getAttribute('aria-pressed')).toBe('true');
  expect(window.localStorage.getItem(preferenceKey)).toBe('true');
  expect(observers.every((observer) => observer.disconnect.mock.calls.length === 1)).toBe(true);
  act(() => root.unmount());
  root = null;
  render();
  expect(container.querySelector('.automation-motion').dataset.motion).toBe('off');
  click(container.querySelector('.motion-control'));
  expect(container.querySelector('.automation-motion').dataset.motion).toBe('full');
  expect(window.localStorage.getItem(preferenceKey)).toBe('false');
});

test('device reduced-motion changes override animation and compact devices use a quieter mode', () => {
  reduced.matches = true;
  render();
  expect(container.querySelector('.automation-motion').dataset.motion).toBe('off');
  expect(container.querySelector('.motion-control').disabled).toBe(true);
  expect(observers).toHaveLength(0);
  reduced.update(false);
  expect(container.querySelector('.automation-motion').dataset.motion).toBe('full');
  compact.update(true);
  expect(container.querySelector('.automation-motion').dataset.motion).toBe('quiet');
  reduced.update(true);
  expect(container.querySelector('.automation-motion').dataset.motion).toBe('off');
  expect(container.querySelector('h1').textContent).toContain('Control Panel Supplier');
});

test.each([{ saveData: true }, { effectiveType: 'slow-2g' }, { effectiveType: '2g' }])('a limited connection uses the complete static design: %j', (connection) => {
  Object.defineProperty(navigator, 'connection', { configurable: true, value: connection });
  render();
  expect(container.querySelector('.automation-motion').dataset.motion).toBe('off');
  expect(observers).toHaveLength(0);
  expect(container.querySelector('.motion-control').disabled).toBe(true);
});

test('background tabs suspend animation and restore the visitor pause preference', () => {
  render();
  const wrapper = container.querySelector('.automation-motion');
  const observerCount = observers.length;
  hidden = true;
  act(() => document.dispatchEvent(new Event('visibilitychange')));
  expect(wrapper.dataset.motion).toBe('off');
  hidden = false;
  act(() => document.dispatchEvent(new Event('visibilitychange')));
  expect(wrapper.dataset.motion).toBe('full');
  expect(observers).toHaveLength(observerCount);
  click(container.querySelector('.motion-control'));
  hidden = true;
  act(() => document.dispatchEvent(new Event('visibilitychange')));
  hidden = false;
  act(() => document.dispatchEvent(new Event('visibilitychange')));
  expect(wrapper.dataset.motion).toBe('off');
});

test('headings added by a lazy page are observed without hiding existing content', async () => {
  render();
  await act(async () => { container.querySelector('#details').click(); await Promise.resolve(); });
  const heading = container.querySelector('h2');
  expect(heading.textContent).toBe('Application overview');
  expect(heading.dataset.motionReveal).toBeUndefined();
  expect(observers.some((observer) => observer.targets.has(heading))).toBe(true);
  visible(heading);
  expect(heading.dataset.motionReveal).toBe('entered');
});

test('older browsers without observers retain the complete static page', () => {
  global.IntersectionObserver = undefined;
  render();
  expect(container.querySelector('.automation-motion').dataset.motion).toBe('off');
  expect(container.querySelector('.motion-control').disabled).toBe(true);
  expect(container.querySelector('h1').textContent).toBe('Control Panel Supplier in Dubai');
});

test('the pause control works when browser storage is blocked and listeners clean up on exit', () => {
  jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('Blocked'); });
  jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('Blocked'); });
  render();
  click(container.querySelector('.motion-control'));
  expect(container.querySelector('.automation-motion').dataset.motion).toBe('off');
  click(container.querySelector('.motion-control'));
  expect(container.querySelector('.automation-motion').dataset.motion).toBe('full');
  act(() => root.unmount());
  root = null;
  expect(observers.every((observer) => observer.disconnect.mock.calls.length === 1)).toBe(true);
  expect(reduced.removeEventListener).toHaveBeenCalledWith('change', expect.any(Function));
  expect(compact.removeEventListener).toHaveBeenCalledWith('change', expect.any(Function));
});
