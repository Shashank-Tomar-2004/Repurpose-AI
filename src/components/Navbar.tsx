"use client";

import { useState, useRef, useEffect } from "react";
import { Copy, Download, RefreshCw, Sparkles, Layers } from "lucide-react";

interface Props {
  hasData: boolean;
  onCopyAll: () => void;
  onDownload: () => void;
  onRegenerate: () => void;
  history: any[];
  onSelectHistory: (item: any) => void;
  onRemoveHistory: (index: number) => void;
}

export default function Navbar({
  hasData,
  onCopyAll,
  onDownload,
  onRegenerate,
  history,
  onSelectHistory,
  onRemoveHistory,
}: Props) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  // Close with ESC
  useEffect(() => {
    function handleEsc(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [open]);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <header className="w-full border-b border-slate-200 bg-white/90 backdrop-blur sticky top-0 z-50">
      <div className="max-w-[1600px] mx-auto px-8 xl:px-16 py-5 flex items-center justify-between">
        {/* LEFT */}
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md">
            <Sparkles size={18} className="text-white" />
          </div>

          <div>
            <h1 className="text-xl font-semibold text-slate-900">
              RepurposeAI
            </h1>
            <p className="text-xs text-slate-500 -mt-1">
              Intelligent Content Repurposing Engine
            </p>
          </div>
        </div>

        {/* RIGHT */}
        {hasData && (
          <div className="flex items-center gap-3 relative">
            <button
              onClick={onRegenerate}
              className="p-2 rounded-lg hover:bg-slate-100 transition cursor-pointer"
            >
              <RefreshCw size={18} className="text-slate-600" />
            </button>

            <button
              onClick={onCopyAll}
              className="p-2 rounded-lg hover:bg-slate-100 transition cursor-pointer"
            >
              <Copy size={18} className="text-slate-600" />
            </button>

            <button
              onClick={onDownload}
              className="p-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:scale-105 transition-transform cursor-pointer"
            >
              <Download size={18} />
            </button>

            {/* HISTORY ICON */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setOpen(!open)}
                className={`p-2 rounded-lg transition cursor-pointer
    ${open ? "bg-indigo-100 text-indigo-600 shadow-inner" : "hover:bg-slate-100"}
  `}
              >
                <Layers size={18} className="text-slate-600" />
              </button>

              {/* DROPDOWN */}
              <div
                className={`absolute right-0 top-12 w-72 bg-white border border-slate-200 rounded-xl shadow-xl p-4 transition-all duration-200 ease-out
                  ${open ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"}
                `}
              >
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
                  Recent Generations
                </p>

                {history.length === 0 && (
                  <div className="text-sm text-slate-400 py-6 text-center">
                    No history yet
                  </div>
                )}

                {history.length > 0 && (
                  <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                    {history.slice(0, 6).map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-lg transition"
                      >
                        <button
                          onClick={() => {
                            onSelectHistory(item);
                            setOpen(false);
                          }}
                          className="text-sm truncate cursor-pointer"
                        >
                          {item.url.replace(/^https?:\/\//, "").split("/")[0]}
                        </button>

                        <button
                          onClick={() => onRemoveHistory(idx)}
                          className="text-slate-400 hover:text-red-500 text-sm cursor-pointer"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
