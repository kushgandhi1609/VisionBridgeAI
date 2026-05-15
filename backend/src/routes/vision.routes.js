import express from "express";
import multer from "multer";
import fs from "node:fs/promises";
import { analyzeImage } from "../services/groqVision.service.js";

const router = express.Router();

const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 12 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      cb(new Error("Only image uploads are supported."));
      return;
    }
    cb(null, true);
  }
});

router.post("/analyze", upload.single("image"), async (req, res, next) => {
  try {
    const result = await analyzeImage({
      file: req.file,
      question: req.body.question,
      mode: req.body.mode
    });
    res.json(result);
  } catch (error) {
    next(error);
  } finally {
    if (req.file?.path) {
      await fs.rm(req.file.path, { force: true });
    }
  }
});

export default router;
