import { Mic, MicOff, Moon, Sun, ZoomIn, Contrast, Maximize2, Sparkles } from "lucide-react";
import { Button } from "./Button";

export function ControlsPanel({
  mode,
  setMode,
  question,
  setQuestion,
  onAnalyze,
  onAsk,
  onReadText,
  isListening,
  voiceSupported,
  transcript,
  onToggleVoice,
  highContrast,
  setHighContrast,
  lightMode,
  setLightMode,
  fullscreen,
  setFullscreen
}) {
  return (
    <section className="glass rounded-xl p-5" aria-labelledby="controls-title">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 id="controls-title" className="text-xl font-black text-white">
            Voice Assistant
          </h2>
          <p className="mt-1 text-sm text-slate-300">Say “describe image”, “read text”, “stop narration”, or “repeat”.</p>
        </div>
        <button
          className={`relative inline-flex h-14 w-14 items-center justify-center rounded-full border ${
            isListening ? "border-volt bg-volt/15 text-volt" : "border-white/15 bg-white/10 text-white"
          }`}
          onClick={onToggleVoice}
          disabled={!voiceSupported}
          aria-label={isListening ? "Stop voice commands" : "Start voice commands"}
        >
          {isListening && <span className="absolute inset-0 rounded-full border border-volt animate-pulseRing" />}
          {isListening ? <Mic size={24} aria-hidden="true" /> : <MicOff size={24} aria-hidden="true" />}
        </button>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2" role="radiogroup" aria-label="Narration mode">
        {[
          ["short", "Short"],
          ["detailed", "Detailed"],
          ["safety", "Safety"]
        ].map(([value, label]) => (
          <button
            key={value}
            className={`min-h-12 rounded-lg border px-3 text-sm font-bold ${
              mode === value ? "border-cyanflare bg-cyanflare text-night" : "border-white/15 bg-white/10 text-white"
            }`}
            onClick={() => setMode(value)}
            role="radio"
            aria-checked={mode === value}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-5">
        <label className="text-sm font-bold text-slate-200" htmlFor="question">
          Ask about the image
        </label>
        <textarea
          id="question"
          className="mt-2 min-h-28 w-full resize-y rounded-xl border border-white/15 bg-black/35 p-4 text-white placeholder:text-slate-500"
          placeholder="What color is the object? How many people are there? Is there an obstacle?"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <Button onClick={onAnalyze}>
          <Sparkles size={18} aria-hidden="true" /> Describe Image
        </Button>
        <Button variant="secondary" onClick={onAsk}>
          Ask Question
        </Button>
        <Button variant="secondary" onClick={onReadText}>
          Read Text
        </Button>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2">
        <button
          className={`min-h-12 rounded-lg border px-3 text-xs font-bold ${highContrast ? "border-volt bg-volt text-night" : "border-white/15 bg-white/10 text-white"}`}
          onClick={() => setHighContrast((value) => !value)}
        >
          <Contrast className="mx-auto mb-1" size={18} aria-hidden="true" /> Contrast
        </button>
        <button
          className={`min-h-12 rounded-lg border px-3 text-xs font-bold ${lightMode ? "border-volt bg-volt text-night" : "border-white/15 bg-white/10 text-white"}`}
          onClick={() => setLightMode((value) => !value)}
        >
          {lightMode ? <Sun className="mx-auto mb-1" size={18} aria-hidden="true" /> : <Moon className="mx-auto mb-1" size={18} aria-hidden="true" />}
          Theme
        </button>
        <button
          className={`min-h-12 rounded-lg border px-3 text-xs font-bold ${fullscreen ? "border-volt bg-volt text-night" : "border-white/15 bg-white/10 text-white"}`}
          onClick={() => setFullscreen((value) => !value)}
        >
          <Maximize2 className="mx-auto mb-1" size={18} aria-hidden="true" /> Focus
        </button>
      </div>

      <div className="mt-4 rounded-lg border border-white/10 bg-black/24 p-3 text-sm text-slate-300">
        <ZoomIn className="mr-2 inline text-cyanflare" size={16} aria-hidden="true" />
        Last voice input: <span className="text-white">{transcript || "Waiting..."}</span>
      </div>
    </section>
  );
}
