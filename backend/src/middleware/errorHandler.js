export function errorHandler(error, _req, res, _next) {
  const status = error.status || 500;
  const message = error.message || "Something went wrong while processing the image.";

  if (process.env.NODE_ENV !== "test") {
    console.error("[VisionBridge Error]", error);
  }

  res.status(status).json({
    error: message,
    details: process.env.NODE_ENV === "production" ? undefined : error.details
  });
}
