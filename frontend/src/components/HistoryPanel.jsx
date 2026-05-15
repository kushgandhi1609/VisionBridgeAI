import { Clock, Save } from "lucide-react";

export function HistoryPanel({ history, onSelect }) {
  return (
    <section className="glass rounded-xl p-5" aria-labelledby="history-title">
      <div className="mb-4 flex items-center gap-2">
        <Clock className="text-cyanflare" size={20} aria-hidden="true" />
        <h2 id="history-title" className="text-xl font-black text-white">
          Narration History
        </h2>
      </div>
      <div className="space-y-3">
        {history.length === 0 && <p className="text-sm text-slate-300">Saved descriptions will appear after analysis.</p>}
        {history.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item)}
            className="w-full rounded-lg border border-white/10 bg-white/5 p-4 text-left transition hover:border-cyanflare/40 hover:bg-cyanflare/10"
          >
            <span className="mb-2 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-cyanflare">
              <Save size={14} aria-hidden="true" /> {item.mode}
            </span>
            <span className="line-clamp-3 block text-sm leading-6 text-slate-200">{item.text}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
