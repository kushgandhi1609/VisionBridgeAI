import { motion } from "framer-motion";
import { Captions, Ear, Mic, ScanLine, ShieldAlert, Languages } from "lucide-react";

const features = [
  [ScanLine, "AI image descriptions", "Natural Groq-powered scene narration with short, detailed, and safety-focused modes."],
  [Ear, "Spoken responses", "Automatic narration with play, pause, replay, language, and speed controls."],
  [Mic, "Voice commands", "Say describe image, read text, repeat, or stop narration without touching the screen."],
  [Captions, "OCR text reading", "Tesseract.js extracts printed text and highlights detected words over the image."],
  [ShieldAlert, "Safety awareness", "Prioritizes obstacles, vehicles, stairs, people, and hazards for real-world movement."],
  [Languages, "Multilingual narration", "Switch speech language for a more comfortable listening experience."]
];

export function FeatureSections() {
  return (
    <section id="features" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-cyanflare">Built for access</p>
          <h2 className="mt-4 text-4xl font-black tracking-normal text-white">A premium control center for visual understanding.</h2>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map(([Icon, title, text], index) => (
            <motion.article
              key={title}
              className="card glass rounded-xl p-6"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: index * 0.04 }}
            >
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-cyanflare/14 text-cyanflare">
                <Icon aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-white">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
