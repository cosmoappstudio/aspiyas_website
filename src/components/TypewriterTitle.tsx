import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface TypewriterTitleProps {
  lines: string[];
  className?: string;
  charDelay?: number;
  lineDelay?: number;
  /** Kod/terminal formatı: prompt için "> ", yanıt için '=> "' ... '"' */
  codeFormat?: boolean;
}

/** Kod yazıyormuş gibi typewriter animasyonu - terminal/REPL hissi */
export function TypewriterTitle({ lines, className = '', charDelay = 45, lineDelay = 400, codeFormat = true }: TypewriterTitleProps) {
  const [visibleChars, setVisibleChars] = useState<number[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [phase, setPhase] = useState<'typing' | 'done'>('typing');

  const safeLines = lines?.filter(Boolean) ?? [];

  const getFormattedLength = (line: string, lineIdx: number): number => {
    if (!codeFormat) return line.length;
    if (lineIdx === 0) return line.length + 2; // "> "
    return line.length + 5; // '=> "' + '"'
  };

  useEffect(() => {
    setVisibleChars([]);
    setCurrentLine(0);
    setPhase('typing');
  }, [safeLines.join('')]);

  useEffect(() => {
    if (phase !== 'typing' || currentLine >= safeLines.length) {
      if (currentLine >= safeLines.length) setPhase('done');
      return;
    }

    const line = safeLines[currentLine];
    const lineLen = getFormattedLength(line, currentLine);
    const targetLen = (visibleChars[currentLine] ?? 0) + 1;

    if (targetLen > lineLen) {
      // Satır bitti, sonraki satıra geç
      const t = setTimeout(() => {
        setCurrentLine(c => c + 1);
      }, lineDelay);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => {
      setVisibleChars(prev => {
        const next = [...prev];
        next[currentLine] = targetLen;
        return next;
      });
    }, charDelay);

    return () => clearTimeout(t);
  }, [safeLines, currentLine, visibleChars, phase, charDelay, lineDelay, codeFormat]);

  if (safeLines.length === 0) return <span className={className} />;

  const formatLine = (line: string, lineIdx: number): string => {
    if (!codeFormat) return line;
    if (lineIdx === 0) return `> ${line}`;
    return `=> "${line}"`;
  };

  const formattedLines = safeLines.map((l, i) => formatLine(l, i));

  return (
    <div className={`font-mono text-left w-full max-w-4xl mx-auto ${className}`}>
      <div className="group relative rounded-xl overflow-hidden border border-white/[0.08] bg-gradient-to-b from-white/[0.06] to-transparent shadow-[0_0_60px_-20px_rgba(16,185,129,0.15),inset_0_1px_0_0_rgba(255,255,255,0.05)] backdrop-blur-md">
        {/* Sol accent - VS Code tarzı aktif satır vurgusu */}
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-emerald-400/80 via-emerald-500/50 to-transparent opacity-90" />
        <div className="relative pl-10 pr-8 py-7 md:pl-12 md:pr-10 md:py-8">
          {formattedLines.map((displayLine, lineIdx) => {
            const visibleCount = visibleChars[lineIdx] ?? 0;
            const showCursor = (phase === 'typing' && lineIdx === currentLine) || (phase === 'done' && lineIdx === safeLines.length - 1);
            const isPrompt = lineIdx === 0;
            const words = displayLine.split(/( +)/);
            let charIdx = 0;
            return (
              <div key={lineIdx} className={`overflow-hidden leading-relaxed ${lineIdx > 0 ? 'mt-4' : ''}`}>
                <span className="inline-flex flex-wrap items-baseline tracking-tight">
                  {words.map((word, wi) => (
                    <span key={wi} className="inline-flex items-baseline shrink-0">
                      {word.split('').map((char) => {
                        const idx = charIdx++;
                        const isVisible = visibleCount > idx;
                        const isSpace = char === ' ';
                        const isSyntax = char === '>' || char === '=' || char === '"' || (isPrompt && idx < 2);
                        const isResponseSyntax = !isPrompt && (idx < 4 || idx === displayLine.length - 1);
                        const isAccent = isSyntax || isResponseSyntax;
                        const charClass = isAccent ? 'text-emerald-400' : 'text-white/95';
                        return (
                          <motion.span
                            key={idx}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isVisible ? 1 : 0 }}
                            transition={{ duration: 0.1 }}
                            className={`${isVisible ? charClass : 'invisible'} ${isSpace ? 'inline-block min-w-[0.2em]' : ''}`}
                          >
                            {char}
                          </motion.span>
                        );
                      })}
                    </span>
                  ))}
                  {showCursor && (
                    <motion.span
                      className="inline-block w-0.5 min-w-[3px] h-[1em] bg-emerald-400 ml-0.5 align-middle shrink-0 rounded-sm"
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                    />
                  )}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
