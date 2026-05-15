import { Accessibility, Captions, History, Home, Image, Mic } from "lucide-react";

const links = [
  [Home, "Overview"],
  [Image, "Scanner"],
  [Mic, "Voice"],
  [Captions, "OCR"],
  [History, "History"]
];

export function Sidebar() {
  return (
    <aside className="glass hidden min-h-[calc(100vh-2rem)] w-72 rounded-xl p-5 lg:block">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyanflare text-night">
          <Accessibility aria-hidden="true" />
        </div>
        <div>
          <p className="text-lg font-black text-white">VisionBridge AI</p>
          <p className="text-xs text-slate-400">Accessibility OS</p>
        </div>
      </div>
      <nav className="mt-8 space-y-2" aria-label="Dashboard">
        {links.map(([Icon, label], index) => (
          <a
            key={label}
            href={index === 0 ? "#top" : "#dashboard"}
            className={`flex min-h-12 items-center gap-3 rounded-lg px-4 text-sm font-bold transition ${
              index === 1 ? "bg-cyanflare text-night" : "text-slate-300 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Icon size={18} aria-hidden="true" /> {label}
          </a>
        ))}
      </nav>
      <div className="mt-8 rounded-xl border border-volt/20 bg-volt/10 p-4">
        <p className="text-sm font-black text-volt">Command examples</p>
        <p className="mt-2 text-sm leading-6 text-slate-200">“Describe image” “Read text” “Repeat” “Stop narration”</p>
      </div>
    </aside>
  );
}
