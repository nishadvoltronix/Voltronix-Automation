import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useChatbot } from './useChatbot';

export default function FallbackBanner() {
  const bot = useChatbot();
  const { showFallback, setDismissedFallback } = bot;

  return (
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

            <a
              className="vx-bot-fallback-link"
              href="https://wa.me/971504327804"
              target="_blank"
              rel="noreferrer"
            >
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
  );
}
