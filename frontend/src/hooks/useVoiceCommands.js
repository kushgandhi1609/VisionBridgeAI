import { useCallback, useMemo, useRef, useState } from "react";

export function useVoiceCommands(commands) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef(null);

  const supported = useMemo(() => {
    return "SpeechRecognition" in window || "webkitSpeechRecognition" in window;
  }, []);

  const start = useCallback(() => {
    if (!supported || isListening) return;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const spoken = event.results[event.results.length - 1][0].transcript.toLowerCase().trim();
      setTranscript(spoken);
      const match = commands.find((command) => command.matches.some((phrase) => spoken.includes(phrase)));
      if (match) match.action(spoken);
    };

    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);
    recognition.start();
    recognitionRef.current = recognition;
    setIsListening(true);
  }, [commands, isListening, supported]);

  const stop = useCallback(() => {
    recognitionRef.current?.stop();
    setIsListening(false);
  }, []);

  return { supported, isListening, transcript, start, stop };
}
