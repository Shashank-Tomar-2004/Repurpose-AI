import { History } from "lucide-react";

export default function HistoryPanel({ history, onSelect }: any) {
  if (!history.length) return null;

  return (
    <div className="bg-white border rounded-xl p-4">
      <div className="flex items-center gap-2 text-sm font-semibold mb-3">
        <History size={16} />
        Recent Generations
      </div>

      <div className="flex flex-wrap gap-2">
        {history.map((item: any, idx: number) => (
          <button
            key={idx}
            onClick={() => onSelect(item)}
            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs cursor-pointer"
          >
            {item.url.replace(/^https?:\/\//, "").split("/")[0]}
          </button>
        ))}
      </div>
    </div>
  );
}
