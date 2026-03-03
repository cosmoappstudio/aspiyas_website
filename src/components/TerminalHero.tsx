import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface TerminalHeroProps {
  query?: string;
  answer?: string;
  barTitle?: string;
  metaType?: string;
  metaResult?: string;
  metaBadge?: string;
}

const QUERY_DONE = 1550;
const ANSWER_START = 1750;
const CHAR_DELAY = 52;

export function TerminalHero({
  query = 'Aspiyas?',
  answer = 'Teknoloji Odaklı\nYaratıcı Çözümler',
  barTitle = 'aspiyas — version 2026.07 Premium Edition',
  metaType = 'string',
  metaResult = "typeof result === 'innovation'",
  metaBadge = 'V2.0.26',
}: TerminalHeroProps) {
  const [queryVisible, setQueryVisible] = useState(0);
  const [answerVisible, setAnswerVisible] = useState(0);
  const [showRetPrefix, setShowRetPrefix] = useState(false);
  const [showCursor, setShowCursor] = useState(false);
  const [cursorBlink, setCursorBlink] = useState(false);
  const [showMeta, setShowMeta] = useState(false);

  const fullAnswer = `"${answer}"`;
  const answerChars = fullAnswer.split('');
  const answerTokens = fullAnswer.split(/(\s+)/);

  useEffect(() => {
    const queryTimer = setTimeout(() => {
      let i = 0;
      const iv = setInterval(() => {
        i++;
        setQueryVisible(i);
        if (i >= query.length) clearInterval(iv);
      }, 60);
      return () => clearInterval(iv);
    }, 900);
    return () => clearTimeout(queryTimer);
  }, [query]);

  useEffect(() => {
    const retTimer = setTimeout(() => {
      setShowRetPrefix(true);
      setShowCursor(true);
    }, ANSWER_START - 100);
    return () => clearTimeout(retTimer);
  }, []);

  useEffect(() => {
    const answerTimer = setTimeout(() => {
      let i = 0;
      const iv = setInterval(() => {
        i++;
        setAnswerVisible(i);
        if (i >= answerChars.length) {
          clearInterval(iv);
          setCursorBlink(true);
          setTimeout(() => setShowMeta(true), 300);
        }
      }, CHAR_DELAY);
      return () => clearInterval(iv);
    }, ANSWER_START);
    return () => clearTimeout(answerTimer);
  }, [answerChars.length]);

  return (
    <div className="terminal-hero">
      <motion.div
        className="terminal-hero__window"
        initial={{ opacity: 0, y: 18, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
      >
        {/* Title bar */}
        <div className="terminal-hero__bar">
          <div className="terminal-hero__dot terminal-hero__dot--r" />
          <div className="terminal-hero__dot terminal-hero__dot--y" />
          <div className="terminal-hero__dot terminal-hero__dot--g" />
          <div className="terminal-hero__bar-title">{barTitle}</div>
        </div>

        <div className="terminal-hero__body">
          {/* Query row */}
          <div className="terminal-hero__query-row">
            <span className="terminal-hero__prompt">&gt;</span>
            <span className="terminal-hero__query-text">
              {query.split('').slice(0, queryVisible).map((c, i) => (
                <span key={i}>{c}</span>
              ))}
            </span>
          </div>

          {/* Answer row */}
          <div className="terminal-hero__answer-row">
            <span
              className="terminal-hero__prompt terminal-hero__prompt--ret"
              style={{ opacity: showRetPrefix ? 1 : 0 }}
            >
              =&gt;
            </span>
            <span className="terminal-hero__answer-text">
              {(() => {
                let charIdx = 0;
                return answerTokens.map((token, ti) => {
                  const tokenLen = token.length;
                  const visibleInToken = Math.max(0, Math.min(tokenLen, answerVisible - charIdx));
                  charIdx += tokenLen;
                  if (visibleInToken === 0) return null;
                  const visiblePart = token.slice(0, visibleInToken);
                  const isSpace = /^\s+$/.test(token);
                  return (
                    <span
                      key={ti}
                      className={`terminal-hero__word ${isSpace ? 'terminal-hero__word--space' : ''}`}
                    >
                      {visiblePart.split('').map((ch, ci) =>
                        ch === '\n' ? <br key={ci} /> : <span key={ci}>{ch}</span>
                      )}
                    </span>
                  );
                });
              })()}
              {showCursor && (
                <span
                  className={`terminal-hero__cur ${cursorBlink ? 'terminal-hero__cur--blink' : ''}`}
                />
              )}
            </span>
          </div>

          {/* Meta */}
          <motion.div
            className="terminal-hero__meta"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: showMeta ? 1 : 0, y: showMeta ? 0 : 6 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <span>{metaType}</span>
            <span className="terminal-hero__meta-dot">·</span>
            <span>{metaResult}</span>
            <span className="terminal-hero__meta-dot">·</span>
            <span className="terminal-hero__meta-badge">{metaBadge}</span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
