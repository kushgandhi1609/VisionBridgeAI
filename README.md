# VisionBridge AI

VisionBridge AI is a modern multimodal accessibility web application for visually impaired users. It combines image upload, Groq-powered scene understanding, voice narration, voice commands, OCR text extraction, narration history, high contrast UI, and a futuristic dashboard experience.

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, Framer Motion, Lucide React
- Backend: Node.js, Express.js
- AI: Groq API multimodal vision
- Accessibility: Web Speech API speech synthesis and recognition
- OCR: Tesseract.js

## Project Structure

```text
frontend/
  src/
    components/
    hooks/
    services/
    utils/
backend/
  src/
    routes/
    services/
    middleware/
```

## Setup

1. Install dependencies:

```bash
npm run install:all
```

2. Create backend environment file:

```bash
cp backend/.env.example backend/.env
```

3. Add your Groq key:

```env
GROQ_API_KEY=your_groq_api_key
PORT=5001
```

4. Run the full app:

```bash
npm run dev
```

Frontend runs at `http://localhost:5173`.
Backend runs at `http://localhost:5001`.

## Notes

- The backend accepts image uploads and sends base64 image payloads to Groq.
- OCR runs in the browser with Tesseract.js.
- Speech synthesis and voice recognition use browser Web Speech APIs, so Chrome-based browsers provide the best experience.
