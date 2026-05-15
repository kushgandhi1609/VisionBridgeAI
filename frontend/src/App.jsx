

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, Loader2 } from "lucide-react";
import { AnimatedBackground } from "./components/AnimatedBackground";
import { ControlsPanel } from "./components/ControlsPanel";
import { FeatureSections } from "./components/FeatureSections";
import { Hero } from "./components/Hero";
import { HistoryPanel } from "./components/HistoryPanel";
import { NarrationPanel } from "./components/NarrationPanel";
import { OcrPanel } from "./components/OcrPanel";
import { ScannerPreview } from "./components/ScannerPreview";
import { Sidebar } from "./components/Sidebar";
import { Testimonials } from "./components/Testimonials";
import { useOcr } from "./hooks/useOcr";
import { useSpeechSynthesis } from "./hooks/useSpeechSynthesis";
import { useVoiceCommands } from "./hooks/useVoiceCommands";
import { analyzeImage } from "./services/visionApi";
import { downloadTranscript } from "./utils/download";

export default function App() {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [mode, setMode] = useState("detailed");
  const [question, setQuestion] = useState("");
  const [narration, setNarration] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [history, setHistory] = useState([]);
  const [highContrast, setHighContrast] = useState(false);
  const [lightMode, setLightMode] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  const fileInputRef = useRef(null);
  const imageRef = useRef(null);
  const dashboardRef = useRef(null);
  const abortRef = useRef(null);

  const speech = useSpeechSynthesis();
  const ocr = useOcr();

  const handleImageChange = useCallback((event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setImage(file);
    setPreviewUrl(URL.createObjectURL(file));
    setNarration("");
    setError("");
    setStatus("Image loaded. Choose a mode or ask a question.");

    dashboardRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }, []);

  const runAnalysis = useCallback(
    async ({ userQuestion = "" } = {}) => {
      if (!image) {
        setError("Please upload an image first.");
        fileInputRef.current?.focus();
        return;
      }

      abortRef.current?.abort();
      abortRef.current = new AbortController();

      setIsAnalyzing(true);
      setError("");
      setStatus(
        userQuestion
          ? "Answering your question..."
          : "Analyzing scene..."
      );

      try {
        const result = await analyzeImage({
          image,
          mode,
          question: userQuestion,
          signal: abortRef.current.signal
        });

        const spokenText =
          result?.narration ||
          result?.description ||
          "No narration was generated.";

        setNarration(spokenText);

        setHistory((items) => [
          {
            id: crypto.randomUUID(),
            mode: result.mode,
            text: spokenText,
            createdAt: Date.now()
          },
          ...items.slice(0, 7)
        ]);

        setStatus("Narration ready. Speaking now.");

        speech.speak(spokenText);
      } catch (analysisError) {
        if (analysisError.name !== "AbortError") {
          setError(
            analysisError.message ||
              "Unable to analyze the image."
          );
        }
      } finally {
        setIsAnalyzing(false);
      }
    },
    [image, mode, speech]
  );

  const readText = useCallback(async () => {
    if (!image) {
      setError("Please upload an image before reading text.");
      return;
    }

    setError("");
    setStatus("Extracting text from image...");

    const text = await ocr.readImage(image);

    const spokenText =
      text || "No readable text was detected.";

    setStatus("OCR complete. Reading extracted text.");

    speech.speak(spokenText);
  }, [image, ocr, speech]);

  const commands = useMemo(
    () => [
      {
        matches: [
          "describe image",
          "analyze image",
          "what is in the image"
        ],
        action: () => runAnalysis()
      },
      {
        matches: ["read text", "extract text"],
        action: () => readText()
      },
      {
        matches: [
          "stop narration",
          "stop speaking",
          "silence"
        ],
        action: () => speech.stop()
      },
      {
        matches: ["repeat", "replay"],
        action: () => speech.replay()
      }
    ],
    [readText, runAnalysis, speech]
  );

  const voice = useVoiceCommands(commands);

  useEffect(() => {
    document.body.classList.toggle(
      "high-contrast",
      highContrast
    );

    document.body.style.background = lightMode
      ? "linear-gradient(135deg, #eef7ff 0%, #f8fbff 48%, #e6fff4 100%)"
      : "";

    document.body.style.color = lightMode
      ? "#07111f"
      : "";
  }, [highContrast, lightMode]);

  const appShellClass = fullscreen
    ? "fixed inset-0 z-50 overflow-auto bg-night p-3 sm:p-5"
    : "px-4 py-8 sm:px-6 lg:px-8";

  return (
    <div
      id="top"
      className={lightMode ? "text-slate-950" : "text-white"}
    >
      <AnimatedBackground />

      {!fullscreen && (
        <>
          <Hero
            onTryDemo={() =>
              dashboardRef.current?.scrollIntoView({
                behavior: "smooth"
              })
            }
            onUploadClick={() =>
              fileInputRef.current?.click()
            }
          />

          <FeatureSections />
        </>
      )}

      <main
        id="dashboard"
        ref={dashboardRef}
        className={appShellClass}
      >
        <div className="mx-auto flex max-w-[1500px] gap-5">
          <Sidebar />

          <div className="min-w-0 flex-1">
            <div className="mb-5 flex flex-col justify-between gap-4 rounded-xl border border-white/10 bg-black/20 p-5 backdrop-blur md:flex-row md:items-center">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.24em] text-cyanflare">
                  Dashboard
                </p>

                <h1 className="mt-2 text-3xl font-black text-white md:text-4xl">
                  Accessibility Control Center
                </h1>
              </div>

              <div
                className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-sm text-slate-200"
                role="status"
                aria-live="polite"
              >
                {isAnalyzing || ocr.isReading ? (
                  <Loader2
                    className="animate-spin text-cyanflare"
                    size={18}
                  />
                ) : (
                  <CheckCircle2
                    className="text-volt"
                    size={18}
                  />
                )}

                {status || "Ready for image analysis"}
              </div>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="mb-5 flex items-center gap-3 rounded-xl border border-red-300/30 bg-red-500/15 p-4 text-red-100"
                  role="alert"
                >
                  <AlertTriangle aria-hidden="true" />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
              <div className="space-y-5">
                <ScannerPreview
                  previewUrl={previewUrl}
                  imageRef={imageRef}
                  isAnalyzing={isAnalyzing}
                  ocrBoxes={ocr.boxes}
                  fileInputRef={fileInputRef}
                  onImageChange={handleImageChange}
                />

                <OcrPanel
                  text={ocr.text}
                  isReading={ocr.isReading}
                  progress={ocr.progress}
                />
              </div>

              <div className="space-y-5">
                <ControlsPanel
                  mode={mode}
                  setMode={setMode}
                  question={question}
                  setQuestion={setQuestion}
                  onAnalyze={() => runAnalysis()}
                  onAsk={() =>
                    runAnalysis({
                      userQuestion: question
                    })
                  }
                  onReadText={readText}
                  isListening={voice.isListening}
                  voiceSupported={voice.supported}
                  transcript={voice.transcript}
                  onToggleVoice={
                    voice.isListening
                      ? voice.stop
                      : voice.start
                  }
                  highContrast={highContrast}
                  setHighContrast={setHighContrast}
                  lightMode={lightMode}
                  setLightMode={setLightMode}
                  fullscreen={fullscreen}
                  setFullscreen={setFullscreen}
                />

                <NarrationPanel
                  narration={narration}
                  isSpeaking={speech.isSpeaking}
                  isPaused={speech.isPaused}
                  rate={speech.rate}
                  setRate={speech.setRate}
                  language={speech.language}
                  setLanguage={speech.setLanguage}
                  onSpeak={speech.speak}
                  onPause={speech.pause}
                  onResume={speech.resume}
                  onStop={speech.stop}
                  onReplay={speech.replay}
                  onDownload={() =>
                    downloadTranscript({
                      narration,
                      ocrText: ocr.text,
                      history
                    })
                  }
                />

                <HistoryPanel
                  history={history}
                  onSelect={(item) => {
                    setNarration(item.text);
                    speech.speak(item.text);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {!fullscreen && <Testimonials />}
    </div>
  );
}

