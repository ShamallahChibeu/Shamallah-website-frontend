"use client";

import { useState } from "react";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative border-b border-white/5">
      <div className="px-6 py-5 md:px-12">
        <button onClick={() => setOpen(!open)} aria-label="Menu" className="flex flex-col gap-1.5">
          <span className="block w-8 h-0.5 bg-paper"></span>
          <span className="block w-8 h-0.5 bg-paper"></span>
          <span className="block w-8 h-0.5 bg-paper"></span>
        </button>
      </div>

      {open && (
        <>
          <div onClick={() => setOpen(false)} className="fixed inset-0 z-40" />
          <div className="absolute top-full left-0 w-full bg-panel border-t border-white/5 z-50 font-mono text-sm uppercase tracking-wide">
            <a href="/info" className="block px-6 py-4 md:px-12 text-muted hover:text-paper hover:bg-white/5 transition-colors border-b border-white/5">Info</a>
            <a href="/projects" className="block px-6 py-4 md:px-12 text-muted hover:text-paper hover:bg-white/5 transition-colors border-b border-white/5">Projects</a>
            <a href="/contact" className="block px-6 py-4 md:px-12 text-muted hover:text-paper hover:bg-white/5 transition-colors">Contact</a>
          </div>
        </>
      )}
    </div>
  );
}
