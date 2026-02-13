import { ArrowRight } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="min-h-[400px] flex items-center justify-center bg-white rounded-xl border border-dashed text-center p-8">
      <div>
        <ArrowRight size={24} className="mx-auto mb-3 text-blue-500" />
        <h3 className="text-lg font-semibold">Ready to create?</h3>
        <p className="text-sm text-slate-500">
          Paste a blog URL and generate platform-ready content instantly.
        </p>
      </div>
    </div>
  );
}
