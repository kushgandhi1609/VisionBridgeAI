const API_BASE_URL = "/api";

export async function analyzeImage({ image, mode, question, signal }) {
  const formData = new FormData();
  formData.append("image", image);
  formData.append("mode", mode);
  if (question) formData.append("question", question);

  let lastError;

  for (let attempt = 1; attempt <= 2; attempt += 1) {
    try {
      const response = await fetch(`${API_BASE_URL}/vision/analyze`, {
        method: "POST",
        body: formData,
        signal
      });

      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Image analysis failed.");
      return payload;
    } catch (error) {
      lastError = error;
      if (signal?.aborted || attempt === 2) break;
      await new Promise((resolve) => setTimeout(resolve, 700));
    }
  }

  throw lastError;
}
