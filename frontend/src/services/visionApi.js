export async function analyzeImage({
  image,
  mode,
  question,
  signal
}) {
  const formData = new FormData();

  formData.append("image", image);
  formData.append("mode", mode);

  if (question) {
    formData.append("question", question);
  }

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/vision/analyze`,
    {
      method: "POST",
      body: formData,
      signal
    }
  );

  const data = await response.json();

  console.log("BACKEND RESPONSE:", data);

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to analyze image."
    );
  }

  return data;
}