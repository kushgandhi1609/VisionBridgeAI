import { motion } from "framer-motion";
import { ArrowRight, Upload, Waves, ShieldCheck } from "lucide-react";
import { Button } from "./Button";

export function Hero({ onTryDemo, onUploadClick }) {
  return (
    <section className="relative min-h-screen overflow-hidden px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      <nav className="mx-auto flex max-w-7xl items-center justify-between py-4" aria-label="Primary">
        <a href="#top" className="text-lg font-black tracking-wide text-white">
          VisionBridge <span className="text-cyanflare">AI</span>
        </a>
        <div className="hidden items-center gap-3 md:flex">
          <a className="rounded-lg px-4 py-2 text-sm text-white/75 hover:text-white" href="#features">
            Features
          </a>
          <a className="rounded-lg px-4 py-2 text-sm text-white/75 hover:text-white" href="#dashboard">
            Dashboard
          </a>
        </div>
      </nav>

      <div className="mx-auto grid max-w-7xl items-center gap-10 pt-12 lg:grid-cols-[1.05fr_0.95fr] lg:pt-20">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyanflare/25 bg-cyanflare/10 px-4 py-2 text-sm font-semibold text-cyan-100">
            <Waves size={16} aria-hidden="true" /> Voice-first multimodal accessibility
          </div>
          <h1 className="max-w-5xl text-5xl font-black leading-[1.02] tracking-normal text-white sm:text-6xl lg:text-7xl">
            AI Vision for Accessibility
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
            Upload an image, ask what matters, extract printed text, and hear clear spoken guidance powered by Groq vision intelligence.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button onClick={onTryDemo}>
              Try Demo <ArrowRight size={18} aria-hidden="true" />
            </Button>
            <Button variant="secondary" onClick={onUploadClick}>
              Upload Image <Upload size={18} aria-hidden="true" />
            </Button>
          </div>
          <dl className="mt-10 grid max-w-2xl grid-cols-3 gap-3">
            {[
              ["2.2B+", "people affected by vision impairment"],
              ["Voice", "commands and narration"],
              ["OCR", "text extraction"]
            ].map(([value, label]) => (
              <div className="glass rounded-lg p-4" key={value}>
                <dt className="text-2xl font-black text-cyanflare">{value}</dt>
                <dd className="mt-1 text-xs leading-5 text-slate-300">{label}</dd>
              </div>
            ))}
          </dl>
        </motion.div>

        <motion.div
          className="glass relative min-h-[440px] overflow-hidden rounded-2xl p-5"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <div className="absolute inset-x-0 top-1/4 h-24 bg-gradient-to-b from-transparent via-cyanflare/30 to-transparent blur-sm animate-scan" />
          <div className="absolute right-6 top-6 rounded-lg border border-volt/30 bg-volt/10 px-3 py-2 text-xs font-bold text-volt">
            SCENE LOCKED
          </div>
          <div className="relative h-full rounded-xl border border-cyanflare/20 bg-[radial-gradient(circle_at_center,rgba(53,231,255,0.14),rgba(4,8,20,0.9))] p-5">
            <div className="mb-5 flex items-center gap-2 text-sm font-bold text-cyan-100">
              <ShieldCheck size={18} aria-hidden="true" /> Safety scan preview
            </div>
            <div className="relative h-72 overflow-hidden rounded-xl border border-white/10 bg-black/30">
              <div className="absolute left-[18%] top-[22%] h-24 w-20 rounded-lg border-2 border-cyanflare shadow-glow" />
              <div className="absolute left-[48%] top-[32%] h-20 w-32 rounded-lg border-2 border-volt shadow-[0_0_35px_rgba(182,255,92,0.25)]" />
              <div className="absolute bottom-8 left-[12%] h-3 w-[76%] rounded-full bg-white/12" />
              <div className="absolute bottom-16 right-10 rounded-lg border border-magenta/40 bg-magenta/10 px-3 py-2 text-xs text-pink-100">
                Obstacle detected
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <p className="mt-5 text-sm leading-6 text-slate-200">
              “A person is walking near a bright vehicle. The path ahead appears partially blocked on the right.”
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
