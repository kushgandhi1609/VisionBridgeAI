import { Loader2 } from "lucide-react";

export function OcrPanel({ text, isReading, progress }) {
  return (
    <section className="glass rounded-xl p-5" aria-labelledby="ocr-title">
      <div className="flex items-center justify-between">
        <div>
          <h2 id="ocr-title" className="text-xl font-black text-white">
            OCR Text Reader
          </h2>
          <p className="mt-1 text-sm text-slate-300">Extract printed text with Tesseract.js and read it aloud.</p>
        </div>
        {isReading && <Loader2 className="animate-spin text-cyanflare" aria-hidden="true" />}
      </div>
      {isReading && (
        <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10" aria-label={`OCR progress ${progress}%`}>
          <div className="h-full bg-cyanflare transition-all" style={{ width: `${progress}%` }} />
        </div>
      )}
      <div className="mt-5 min-h-36 rounded-xl border border-white/10 bg-black/24 p-4">
        <p className="whitespace-pre-wrap text-base leading-7 text-slate-100">{text || "Detected text will appear here."}</p>
      </div>
    </section>
  );
}
