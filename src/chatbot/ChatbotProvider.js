import React, { createContext, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { postToAppsScript } from './submitForm';

export const ChatbotContext = createContext(null);

const STEPS = ['project_type', 'scale', 'timeline', 'location', 'contact'];

function random4Digit() {
  return Math.floor(1000 + Math.random() * 9000);
}

function generateRef() {
  return `VX-${random4Digit()}`;
}

export function ChatbotProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [dismissedFallback, setDismissedFallback] = useState(false);

  const [stepIndex, setStepIndex] = useState(0);
  const [form, setForm] = useState({
    project_type: '',
    scale: '',
    timeline: '',
    location: '',
    contact: '',
  });

  const [completed, setCompleted] = useState(false);
  const [reference, setReference] = useState('');

  const [startedAt, setStartedAt] = useState(null);

  const timerRef = useRef(null);
  const scrolledRef = useRef(false);
  const completionTimerRef = useRef(null);

  const openChat = useCallback(() => {
    setOpen(true);
    setStartedAt((prev) => prev ?? Date.now());
  }, []);

  // Trigger logic: whichever comes first
  useEffect(() => {
    const onScroll = () => {
      if (scrolledRef.current) return;
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop || document.body.scrollTop;
      const height = (doc.scrollHeight || document.body.scrollHeight) - doc.clientHeight;
      const pct = height > 0 ? scrollTop / height : 0;

      if (pct >= 0.4) {
        scrolledRef.current = true;
        openChat();
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    timerRef.current = window.setTimeout(() => {
      if (!open) openChat();
    }, 25000);

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, openChat]);

  // Fallback banner logic: show if triggered but not completed after 60s
  useEffect(() => {
    if (!open) return;

    if (completionTimerRef.current) window.clearTimeout(completionTimerRef.current);
    completionTimerRef.current = window.setTimeout(() => {
      // If not completed by 60s and not dismissed, fallback should appear
      // Widget reads `showFallback` based on state, so we only set dismissedFallback false.
      // If already completed, do nothing.
      if (!completed) {
        setDismissedFallback(false);
      }
    }, 60000);

    return () => {
      if (completionTimerRef.current) window.clearTimeout(completionTimerRef.current);
    };
  }, [open, completed]);

  const stepKey = STEPS[Math.min(stepIndex, STEPS.length - 1)];

  const setAnswer = useCallback((value) => {
    const key = STEPS[stepIndex];
    setForm((prev) => ({ ...prev, [key]: value }));
  }, [stepIndex]);

  const canAdvance = useMemo(() => {
    const key = STEPS[stepIndex];
    return Boolean(form[key] && form[key].toString().trim().length > 0);
  }, [form, stepIndex]);

  const advance = useCallback(async () => {
    if (!canAdvance) return;

    if (stepIndex < STEPS.length - 1) {
      setStepIndex((i) => i + 1);
      return;
    }

    // Step 5 submit
    const ref = generateRef();
    setReference(ref);
    setCompleted(true);

    const payload = {
      source: 'bot',
      timestamp: new Date().toISOString(),
      project_type: form.project_type,
      scale: form.scale,
      timeline: form.timeline,
      location: form.location,
      contact: form.contact,
      ref,
    };

    await postToAppsScript(payload);
  }, [canAdvance, form, stepIndex]);

  const resetChat = useCallback(() => {
    setOpen(false);
    setDismissedFallback(false);
    setStepIndex(0);
    setForm({
      project_type: '',
      scale: '',
      timeline: '',
      location: '',
      contact: '',
    });
    setCompleted(false);
    setReference('');
    setStartedAt(null);
  }, []);

  const showFallback = useMemo(() => {
    if (!open) return false;
    if (completed) return false;
    if (dismissedFallback) return false;
    return true;
  }, [open, completed, dismissedFallback]);

  const ctxValue = useMemo(
    () => ({
      open,
      openChat,
      setOpen,
      showFallback,
      dismissedFallback,
      setDismissedFallback,
      stepIndex,
      setStepIndex,
      stepKey,
      form,
      setAnswer,
      canAdvance,
      advance,
      completed,
      reference,
      resetChat,
      startedAt,
    }),
    [
      open,
      openChat,
      showFallback,
      dismissedFallback,
      stepIndex,
      stepKey,
      form,
      setAnswer,
      canAdvance,
      advance,
      completed,
      reference,
      resetChat,
      startedAt,
    ]
  );

  const contextValue = ctxValue;

  return <ChatbotContext.Provider value={contextValue}>{children}</ChatbotContext.Provider>;
}
