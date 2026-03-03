import { useState, type ReactNode } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface CollapsibleSectionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export function CollapsibleSection({ title, children, defaultOpen = true }: CollapsibleSectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="bg-zinc-900 rounded-xl border border-white/10 overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 p-4 text-left hover:bg-white/5 transition-colors"
      >
        <h4 className="font-semibold">{title}</h4>
        {open ? <ChevronDown size={20} className="text-white/50" /> : <ChevronRight size={20} className="text-white/50" />}
      </button>
      {open && <div className="p-6 pt-0">{children}</div>}
    </div>
  );
}
