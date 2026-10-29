import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChatbot } from './useChatbot';
import { X, MessageCircle, Send } from 'lucide-react';

const PROJECT_TYPES = [
  'PLC Panel',
  'VFD Panel',
  'MCC Assembly',
  'BMS Panel',
  'Safety & ESD Panel',
  'Other',
];

const SCALES = ['Single unit', '2–5 panels', '6–10 panels', '10+ panels', 'Full turnkey project'];

const TIMELINES = ['Within 1 month', '1–3 months', '3–6 months', 'Planning stage'];

const LOCATIONS = ['Dubai', 'Abu Dhabi', 'Sharjah', 'Other UAE', 'Outside UAE'];

function StepChips({ options, value, onPick }) {
  return (
    <div className="bot-chips">
      {options.map((opt) => (
        <button
          key={opt}
          className={`bot-chip ${value === opt ? 'active' : ''}`}
          onClick={() => onPick(opt)}
          type="button"
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

export default function ChatbotWidget() {
  const bot = useChatbot();
  const {
    open,
    setOpen,
    showFallback,
    dismissedFallback,
    setDismissedFallback,
    stepIndex,
    stepKey,
    form,
    setAnswer,
    canAdvance,
    advance,
    completed,
    reference,
  } = bot;

  const [contactInput, setContactInput] = useState('');

  useEffect(() => {
    if (!open) return;
    if (stepKey === 'contact') {
      setContactInput(form.contact || '');
    }
  }, [open, stepKey, form.contact]);

  const question = useMemo(() => {
    switch (stepKey) {
      case 'project_type':
        return 'What type of project are you planning?';
      case 'scale':
        return 'How many panels / scope size?';
      case 'timeline':
        return 'What is your timeline?';
      case 'location':
        return 'Where will the project be delivered?';
      case 'contact':
        return 'Last step — your name and best contact (email or phone):';
      default:
        return '';
    }
  }, [stepKey]);

  const options = useMemo(() => {
    switch (stepKey) {
      case 'project_type':
        return PROJECT_TYPES;
      case 'scale':
        return SCALES;
      case 'timeline':
        return TIMELINES;
      case 'location':
        return LOCATIONS;
      default:
        return [];
    }
  }, [stepKey]);

  const onClose = () => setOpen(false);

  const onSubmitContact = async () => {
    // put contact into context form then advance (which will submit)
    setAnswer(contactInput);
    await advance();
  };

  return (
    <>
      <style>{`
        .vx-bot-fab {
          position: fixed;
          bottom: 22px;
          right: 22px;
          z-index: 1000;
          width: 56px;
          height: 56px;
          border-radius: 18px;
          border: 1px solid rgba(0,212,255,0.35);
          background: rgba(21,21,32,0.85);
          backdrop-filter: blur(10px);
          box-shadow: 0 16px 40px rgba(0,0,0,0.45);
          color: #eaf7ff;
          cursor: pointer;
          display: grid;
          place-items: center;
        }
        .vx-bot-panel {
          position: fixed;
          bottom: 92px;
          right: 22px;
          width: 360px;
          max-width: calc(100vw - 44px);
          max-height: 70vh;
          z-index: 1000;
          border-radius: 18px;
          border: 1px solid rgba(225,29,72,0.55);
          background:rgb(206, 19, 13); /* red card background */
          backdrop-filter: blur(14px);
          overflow: hidden;
          box-shadow: 0 22px 60px rgba(0,0,0,0.55);
        }
        .vx-bot-header {
          padding: 14px 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: linear-gradient(135deg, rgba(0,0,0,0.12), rgba(0,0,0,0.22)); /* darker red header */
          border-bottom: 1px solid rgba(0,0,0,0.25);
        }
        .vx-bot-title {
          display: flex;
          gap: 10px;
          align-items: center;
          font-weight: 800;
          color: #0b0b0b; /* black text */
        }
        .vx-bot-body {
          padding: 14px;
          overflow: auto;
          height:400px
        }
        .vx-bot-bubble {
          color: #0b0b0b; /* black content */
          background: rgba(255,255,255,0.92); /* readable light bubble */
          border: 1px solid rgba(0,0,0,0.15);
          padding: 12px;
          border-radius: 14px;
          margin-bottom: 10px;
          line-height: 1.4;
          height:300px;
        }
        .vx-bot-bubble strong { color: #0b0b0b; }
        .bot-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 10px;
        }
        .bot-chip {
          border-radius: 999px;
          padding: 8px 10px;
          border: 1px solid rgba(0,0,0,0.25);
          background: rgba(255,255,255,0.85); /* red card, chips light */
          color: #0b0b0b; /* black label */
          cursor: pointer;
          transition: all .2s ease;
          font-weight: 800;
          font-size: 12.5px;
        }
        .bot-chip:hover { transform: translateY(-1px); border-color: rgba(0,0,0,0.45); }
        .bot-chip.active { background: rgba(255,255,255,1); border-color: rgba(0,0,0,0.55); }
        .bot-input {
          width: 100%;
          margin-top: 10px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(21,21,32,0.7);
          color: #fff;
          padding: 10px 12px;
          outline: none;
        }
        .bot-input:focus { border-color: rgba(0,212,255,0.6); box-shadow: 0 0 0 3px rgba(0,212,255,0.12); }
        .bot-actions {
          display: flex;
          gap: 10px;
          justify-content: flex-end;
          margin-top: 10px;
        }
        .btn-bot {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 12px;
          border-radius: 12px;
          cursor: pointer;
          border: 1px solid rgba(0,212,255,0.35);
          background: rgba(0,212,255,0.14);
          color: black;
          font-weight: 700;
        }
        .btn-bot.secondary {
          background: transparent;
          border-color: rgba(255,255,255,0.15);
          color: black;
        }
        .btn-bot:disabled { opacity: 0.55; cursor: not-allowed; }
        .vx-bot-footer-note {
          font-size: 13px;
          color: black ;
          margin-top: 8px;
        }
        .vx-bot-fallback {
          position: fixed;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 999;
          display: flex;
          justify-content: center;
          padding: 10px 14px;
        }
          .bot-actions{
          margin-top: 60px
          }
        .vx-bot-fallback-inner {
          width: min(920px, 100%);
          background: rgb(206, 19, 13); /* red banner background */
          border: 1px solid rgba(0,0,0,0.25);
          backdrop-filter: blur(12px);
          border-radius: 999px;
          padding: 10px 12px;
          display: flex;
          align-items: center;
          gap: 10px;
          box-shadow: 0 16px 50px rgba(0,0,0,0.5);
        }
        .vx-bot-fallback-text { color: #0b0b0b; font-weight: 900; }
        .vx-bot-fallback-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 9px 12px;
          border-radius: 999px;
          border: 1px solid rgba(0,0,0,0.25);
          background: rgba(255,255,255,0.92); /* light pill on red */
          color: #0b0b0b; /* black text */
          font-weight: 900;
          cursor: pointer;
          text-decoration: none;
        }
        .vx-bot-fallback-link.secondary {
          border-color: rgba(0,0,0,0.25);
          background: rgba(255,255,255,0.35);
          color: #0b0b0b;
        }
      `}</style>

      {/* Bubble FAB */}
      <button className="vx-bot-fab" onClick={() => bot.openChat()} aria-label="Open Voltronix quote assistant" type="button">
        <MessageCircle size={22} />
      </button>

      {/* Panel */}
      <AnimatePresence>
        {open ? (
          <motion.div
            className="vx-bot-panel"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
          >
            <div className="vx-bot-header">
              <div className="vx-bot-title">
                <MessageCircle size={18} />
                <span>Voltronix Quote Assistant</span>
              </div>
              <button className="btn-bot secondary" onClick={onClose} type="button" aria-label="Close chatbot">
                <X size={16} />
              </button>
            </div>

            <div className="vx-bot-body">
              {completed ? (
                <>
                  <div className="vx-bot-bubble">
                    Perfect — our engineering team will be in touch within <strong>2 hours</strong>.
                    <br />
                    <strong>Your reference: {reference}</strong>
                  </div>
                  <div className="vx-bot-footer-note">You can keep browsing the site.</div>
                </>
              ) : (
                <>
                  <div className="vx-bot-bubble">
                    {question}
                    {stepKey !== 'contact' ? (
                      <StepChips
                        options={options}
                        value={form[stepKey]}
                        onPick={(v) => bot.setAnswer(v)}
                      />
                    ) : (
                      <>
                        <input
                          className="bot-input"
                          value={contactInput}
                          onChange={(e) => setContactInput(e.target.value)}
                          placeholder="Name + email or phone"
                          type="text"
                        />
                      </>
                    )}

                    {stepKey !== 'contact' ? (
                      <div className="bot-actions">
                        <button className="btn-bot secondary" type="button" onClick={() => bot.resetChat()}>
                          Reset
                        </button>
                        <button className="btn-bot" type="button" disabled={!canAdvance} onClick={advance}>
                          <Send size={16} />
                          Next
                        </button>
                      </div>
                    ) : (
                      <div className="bot-actions">
                        <button className="btn-bot secondary" type="button" onClick={() => bot.resetChat()}>
                          Reset
                        </button>
                        <button
                          className="btn-bot"
                          type="button"
                          disabled={!contactInput.trim()}
                          onClick={onSubmitContact}
                        >
                          <Send size={16} />
                          Submit
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="vx-bot-footer-note">
                    Fast estimation only — for exact IEC/DEWA compliance, our engineers will confirm during follow-up.
                  </div>
                </>
              )}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Fallback banner (shown if triggered but not completed after 60s) */}
      <AnimatePresence>
        {showFallback ? (
          <motion.div
            className="vx-bot-fallback"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 14 }}
          >
            <div className="vx-bot-fallback-inner">
              <span className="vx-bot-fallback-text">Prefer to reach us directly?</span>

              <a className="vx-bot-fallback-link" href="https://wa.me/971504327804" target="_blank" rel="noreferrer">
                WhatsApp
              </a>

              <button
                className="vx-bot-fallback-link secondary"
                type="button"
                onClick={() => {
                  setDismissedFallback(true);
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Contact Form
              </button>

              <button
                className="btn-bot secondary"
                type="button"
                onClick={() => setDismissedFallback(true)}
                aria-label="Dismiss fallback banner"
              >
                <X size={16} />
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
