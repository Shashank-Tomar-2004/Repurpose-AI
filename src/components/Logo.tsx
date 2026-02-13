export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 20L20 4" />
          <path d="M14 4h6v6" />
        </svg>
      </div>

      <div>
        <div className="text-lg font-semibold tracking-tight text-slate-900">
          RepurposeAI
        </div>
        <div className="text-xs text-slate-500">Content Repurposing Engine</div>
      </div>
    </div>
  );
}
