export function downloadTranscript({ narration, ocrText, history }) {
  const content = [
    "VisionBridge AI Transcript",
    `Generated: ${new Date().toLocaleString()}`,
    "",
    "Latest Narration:",
    narration || "No narration generated yet.",
    "",
    "Extracted Text:",
    ocrText || "No OCR text extracted yet.",
    "",
    "Narration History:",
    ...history.map((item, index) => `${index + 1}. [${item.mode}] ${item.text}`)
  ].join("\n");

  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `visionbridge-transcript-${Date.now()}.txt`;
  anchor.click();
  URL.revokeObjectURL(url);
}
