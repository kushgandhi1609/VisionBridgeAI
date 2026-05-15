import { ImageUp, Loader2 } from "lucide-react";

export function ScannerPreview({ previewUrl, imageRef, isAnalyzing, ocrBoxes, fileInputRef, onImageChange }) {
  return (
    <section className="glass rounded-xl p-4" aria-labelledby="upload-title">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 id="upload-title" className="text-xl font-black text-white">
            Image Scanner
          </h2>
          <p className="mt-1 text-sm text-slate-300">Upload a photo and let VisionBridge inspect the scene.</p>
        </div>
        <label className="inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-lg bg-cyanflare px-4 py-3 text-sm font-black text-night transition hover:bg-white">
          <ImageUp size={18} aria-hidden="true" />
          Upload
          <input ref={fileInputRef} type="file" accept="image/*" className="sr-only" onChange={onImageChange} />
        </label>
      </div>

      <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-white/12 bg-black/35">
        {previewUrl ? (
          <img ref={imageRef} src={previewUrl} alt="Uploaded preview for AI analysis" className="h-full w-full object-contain" />
        ) : (
          <div className="flex h-full flex-col items-center justify-center text-center text-slate-300">
            <ImageUp size={54} className="mb-4 text-cyanflare" aria-hidden="true" />
            <p className="max-w-xs text-sm leading-6">Drop in a street scene, product label, classroom board, screenshot, or document image.</p>
          </div>
        )}

        {isAnalyzing && (
          <div className="absolute inset-0 bg-night/35">
            <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-transparent via-cyanflare/35 to-transparent animate-scan" />
            <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-3 rounded-lg border border-cyanflare/30 bg-black/60 px-4 py-3 text-sm font-bold text-cyan-100">
              <Loader2 className="animate-spin" size={18} aria-hidden="true" />
              Analyzing Scene...
            </div>
          </div>
        )}

        {ocrBoxes.map((box, index) => (
          <div
            key={`${box.text}-${index}`}
            className="absolute rounded border-2 border-volt bg-volt/10"
            style={{
              left: `${Math.min(90, (box.x0 / Math.max(imageRef.current?.naturalWidth || 1, 1)) * 100)}%`,
              top: `${Math.min(90, (box.y0 / Math.max(imageRef.current?.naturalHeight || 1, 1)) * 100)}%`,
              width: `${Math.max(3, ((box.x1 - box.x0) / Math.max(imageRef.current?.naturalWidth || 1, 1)) * 100)}%`,
              height: `${Math.max(2, ((box.y1 - box.y0) / Math.max(imageRef.current?.naturalHeight || 1, 1)) * 100)}%`
            }}
            aria-hidden="true"
          />
        ))}
      </div>
    </section>
  );
}
