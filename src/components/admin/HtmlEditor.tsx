import { useState, useRef } from 'react';
import { Type, Eye, Code, Link, List, Heading2, Heading3 } from 'lucide-react';

const PROSE_CLASS = 'prose prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:font-bold prose-p:text-white/70 prose-p:font-light prose-p:leading-relaxed prose-a:text-purple-400 prose-img:rounded-3xl prose-strong:text-white';

interface HtmlEditorProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  minHeight?: number;
}

export function HtmlEditor({ value, onChange, placeholder = '', minHeight = 200 }: HtmlEditorProps) {
  const [mode, setMode] = useState<'edit' | 'preview'>('edit');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insert = (before: string, after: string) => {
    const ta = textareaRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const text = value ?? '';
    const newText = text.slice(0, start) + before + (start !== end ? text.slice(start, end) : '') + after + text.slice(end);
    onChange(newText);
    setTimeout(() => ta.focus(), 0);
  };

  return (
    <div className="border border-white/10 rounded-xl overflow-hidden bg-black">
      <div className="flex items-center gap-1 p-2 border-b border-white/10 bg-zinc-900/50">
        <button
          type="button"
          onClick={() => setMode('edit')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${mode === 'edit' ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white'}`}
        >
          <Code size={14} /> HTML
        </button>
        <button
          type="button"
          onClick={() => setMode('preview')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${mode === 'preview' ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white'}`}
        >
          <Eye size={14} /> Önizleme
        </button>
        <div className="flex-1" />
        {mode === 'edit' && (
          <div className="flex items-center gap-1">
            <button type="button" onClick={() => insert('<p>', '</p>')} className="p-1.5 rounded hover:bg-white/10 text-white/60 hover:text-white" title="Paragraf">
              <Type size={14} />
            </button>
            <button type="button" onClick={() => insert('<h2>', '</h2>')} className="p-1.5 rounded hover:bg-white/10 text-white/60 hover:text-white" title="Başlık 2">
              <Heading2 size={14} />
            </button>
            <button type="button" onClick={() => insert('<h3>', '</h3>')} className="p-1.5 rounded hover:bg-white/10 text-white/60 hover:text-white" title="Başlık 3">
              <Heading3 size={14} />
            </button>
            <button type="button" onClick={() => insert('<ul><li>', '</li></ul>')} className="p-1.5 rounded hover:bg-white/10 text-white/60 hover:text-white" title="Liste">
              <List size={14} />
            </button>
            <button type="button" onClick={() => insert('<a href="">', '</a>')} className="p-1.5 rounded hover:bg-white/10 text-white/60 hover:text-white" title="Link">
              <Link size={14} />
            </button>
          </div>
        )}
      </div>
      {mode === 'edit' ? (
        <textarea
          ref={textareaRef}
          value={value ?? ''}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full p-4 text-white font-mono text-sm bg-black resize-none focus:outline-none"
          style={{ minHeight }}
          spellCheck={false}
        />
      ) : (
        <div
          className={`p-6 ${PROSE_CLASS}`}
          style={{ minHeight }}
        >
          {value ? (
            <div dangerouslySetInnerHTML={{ __html: value }} />
          ) : (
            <p className="text-white/40 italic">Önizleme için içerik girin.</p>
          )}
        </div>
      )}
    </div>
  );
}
