import { Download, Pause, Play, RotateCcw, Square } from "lucide-react";
import { Button } from "./Button";
import { SoundWave } from "./SoundWave";

export function NarrationPanel({
  narration,
  isSpeaking,
  isPaused,
  rate,
  setRate,
  language,
  setLanguage,
  onSpeak,
  onPause,
  onResume,
  onStop,
  onReplay,
  onDownload
}) {
  return (
    <section className="glass rounded-xl p-5" aria-labelledby="narration-title">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 id="narration-title" className="text-xl font-black text-white">
            AI Narration
          </h2>
          <p className="mt-1 text-sm text-slate-300">Groq response is spoken automatically after analysis.</p>
        </div>
        <SoundWave active={isSpeaking && !isPaused} />
      </div>

      <div className="mt-5 min-h-40 rounded-xl border border-white/10 bg-black/24 p-4">
        <p className="typewriter whitespace-pre-wrap text-base leading-8 text-slate-100">
          {narration || "Upload an image to generate a spoken, human-friendly description."}
        </p>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <label className="text-sm font-bold text-slate-200">
          Speech speed
          <input
            aria-label="Speech speed"
            className="mt-2 w-full accent-cyanflare"
            type="range"
            min="0.6"
            max="1.6"
            step="0.1"
            value={rate}
            onChange={(event) => setRate(Number(event.target.value))}
          />
          <span className="mt-1 block text-xs text-cyanflare">{rate.toFixed(1)}x</span>
        </label>
        <label className="text-sm font-bold text-slate-200">
          Narration language
          <select
            className="mt-2 min-h-12 w-full rounded-lg border border-white/15 bg-black/40 px-3 text-white"
            value={language}
            onChange={(event) => setLanguage(event.target.value)}
          >
            <option value="en-US">English US</option>
            <option value="en-GB">English UK</option>
            <option value="hi-IN">Hindi India</option>
            <option value="es-ES">Spanish</option>
            <option value="fr-FR">French</option>
          </select>
        </label>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <Button onClick={() => onSpeak(narration)} disabled={!narration}>
          <Play size={18} aria-hidden="true" /> Play
        </Button>
        <Button variant="secondary" onClick={isPaused ? onResume : onPause} disabled={!isSpeaking}>
          <Pause size={18} aria-hidden="true" /> {isPaused ? "Resume" : "Pause"}
        </Button>
        <Button variant="secondary" onClick={onReplay} disabled={!narration}>
          <RotateCcw size={18} aria-hidden="true" /> Replay
        </Button>
        <Button variant="danger" onClick={onStop}>
          <Square size={18} aria-hidden="true" /> Stop
        </Button>
        <Button variant="secondary" onClick={onDownload}>
          <Download size={18} aria-hidden="true" /> Transcript
        </Button>
      </div>
    </section>
  );
}
