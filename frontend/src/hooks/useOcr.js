import { useState } from "react";
import { createWorker } from "tesseract.js";

export function useOcr() {
  const [isReading, setIsReading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState("");
  const [boxes, setBoxes] = useState([]);

  async function readImage(imageFile) {
    if (!imageFile) return "";
    setIsReading(true);
    setProgress(0);

    const worker = await createWorker("eng", 1, {
      logger: (message) => {
        if (message.status === "recognizing text") {
          setProgress(Math.round(message.progress * 100));
        }
      }
    });

    try {
      const result = await worker.recognize(imageFile);
      const extractedText = result.data.text.trim();
      const words = result.data.words
        .filter((word) => word.text.trim() && word.confidence > 45)
        .slice(0, 24)
        .map((word) => ({
          text: word.text,
          x0: word.bbox.x0,
          y0: word.bbox.y0,
          x1: word.bbox.x1,
          y1: word.bbox.y1
        }));
      setText(extractedText || "No readable text was detected.");
      setBoxes(words);
      return extractedText;
    } finally {
      await worker.terminate();
      setIsReading(false);
    }
  }

  return { isReading, progress, text, boxes, readImage };
}
