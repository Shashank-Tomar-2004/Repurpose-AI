"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface Props {
  title: string;
  content: string;
  charLimit?: number;
  showWarning?: boolean;
}

export default function EditableCard({
  title,
  content,
  charLimit,
  showWarning,
}: Props) {
  const [text, setText] = useState(content);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const overLimit = charLimit && text.length > charLimit;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4 transition hover:shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-900">{title}</h3>

        <button
          onClick={handleCopy}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer
            ${
              copied
                ? "bg-green-100 text-green-600"
                : "bg-slate-100 hover:bg-slate-200 text-slate-600"
            }
          `}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      {/* Textarea */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full text-sm text-slate-700 border border-slate-200 rounded-xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
        rows={text.length > 200 ? 6 : 4}
      />

      {/* Character Counter */}
      {charLimit && (
        <div className="text-xs text-right">
          <span
            className={
              overLimit ? "text-red-500 font-medium" : "text-slate-400"
            }
          >
            {text.length} / {charLimit}
          </span>

          {showWarning && overLimit && (
            <span className="ml-2 text-red-500">
              Likely truncated in search results
            </span>
          )}
        </div>
      )}
    </div>
  );
}
