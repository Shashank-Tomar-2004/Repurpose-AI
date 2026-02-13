"use client";

interface Props {
  url: string;
  setUrl: any;
  tone: string;
  setTone: any;
  depth: string;
  setDepth: any;
  cta: string;
  setCta: any;
  hashtags: boolean;
  setHashtags: any;
  loading: boolean;
  loadingStep: string;
  onGenerate: () => void;
  error: string;
  history: any[];
  onSelectHistory: (item: any) => void;
}

export default function LeftPanel({
  url,
  setUrl,
  tone,
  setTone,
  depth,
  setDepth,
  cta,
  setCta,
  hashtags,
  setHashtags,
  loading,
  loadingStep,
  onGenerate,
  error,
  history,
  onSelectHistory,
}: Props) {
  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 space-y-6">
      <div>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
          Content Source
        </p>

        <input
          type="url"
          placeholder="Paste blog URL..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
        />
      </div>

      <select
        value={tone}
        onChange={(e) => setTone(e.target.value)}
        className="w-full p-3 border border-slate-200 rounded-xl text-sm"
      >
        <option>Professional B2B</option>
        <option>Casual & Relatable</option>
        <option>Educational</option>
      </select>

      <select
        value={depth}
        onChange={(e) => setDepth(e.target.value)}
        className="w-full p-3 border border-slate-200 rounded-xl text-sm"
      >
        <option>Short</option>
        <option>Standard</option>
        <option>Detailed</option>
      </select>

      <select
        value={cta}
        onChange={(e) => setCta(e.target.value)}
        className="w-full p-3 border border-slate-200 rounded-xl text-sm"
      >
        <option>No CTA</option>
        <option>Soft CTA</option>
        <option>Hard CTA</option>
      </select>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={hashtags}
          onChange={(e) => setHashtags(e.target.checked)}
        />
        Add Hashtags
      </label>

      <button
        onClick={onGenerate}
        disabled={loading}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium hover:opacity-90 transition"
      >
        {loading ? loadingStep : "Generate Assets"}
      </button>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
