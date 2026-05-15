
import { useCallback, useEffect, useRef, useState } from "react";

export function useSpeechSynthesis() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [rate, setRate] = useState(1);
  const [language, setLanguage] = useState("en-US");
  const [voices, setVoices] = useState([]);

  const utteranceRef = useRef(null);
  const lastText = useRef("");

  const supported =
    typeof window !== "undefined" &&
    "speechSynthesis" in window;

  // LOAD VOICES PROPERLY
  useEffect(() => {
    if (!supported) return;

    const loadVoices = () => {
      const availableVoices =
        window.speechSynthesis.getVoices();

      setVoices(availableVoices);
    };

    loadVoices();

    window.speechSynthesis.onvoiceschanged =
      loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, [supported]);

  const stop = useCallback(() => {
    if (!supported) return;

    window.speechSynthesis.cancel();

    setIsSpeaking(false);
    setIsPaused(false);
  }, [supported]);

  const speak = useCallback(
    (text) => {
      if (!supported || !text) return;

      // STOP CURRENT
      window.speechSynthesis.cancel();

      lastText.current = text;

      const utterance =
        new SpeechSynthesisUtterance(text);

      utteranceRef.current = utterance;

      utterance.rate = rate;
      utterance.pitch = 1;
      utterance.volume = 1;
      utterance.lang = language;

      // SELECT VOICE
      const selectedVoice =
        voices.find((voice) =>
          voice.lang
            .toLowerCase()
            .includes(language.toLowerCase())
        ) || voices[0];

      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      utterance.onstart = () => {
        setIsSpeaking(true);
        setIsPaused(false);
        console.log("Speech started");
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        setIsPaused(false);
        console.log("Speech ended");
      };

      utterance.onerror = (event) => {
        console.error("Speech error:", event);

        setIsSpeaking(false);
        setIsPaused(false);
      };

      // IMPORTANT FIX
      setTimeout(() => {
        window.speechSynthesis.speak(utterance);
      }, 300);
    },
    [language, rate, supported, voices]
  );

  const pause = useCallback(() => {
    if (!supported) return;

    window.speechSynthesis.pause();

    setIsPaused(true);
  }, [supported]);

  const resume = useCallback(() => {
    if (!supported) return;

    window.speechSynthesis.resume();

    setIsPaused(false);
    setIsSpeaking(true);
  }, [supported]);

  const replay = useCallback(() => {
    if (lastText.current) {
      speak(lastText.current);
    }
  }, [speak]);

  useEffect(() => {
    return () => {
      if (supported) {
        window.speechSynthesis.cancel();
      }
    };
  }, [supported]);

  return {
    supported,
    isSpeaking,
    isPaused,
    rate,
    setRate,
    language,
    setLanguage,
    speak,
    pause,
    resume,
    stop,
    replay
  };
}

