import { motion } from "framer-motion";

export function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 scan-grid opacity-40" />
      {[...Array(24)].map((_, index) => (
        <motion.span
          key={index}
          className="absolute h-1.5 w-1.5 rounded-full bg-cyanflare/70 shadow-glow"
          initial={{
            x: `${Math.random() * 100}vw`,
            y: `${Math.random() * 100}vh`,
            opacity: 0.25
          }}
          animate={{
            y: [`${Math.random() * 100}vh`, `${Math.random() * 100}vh`],
            opacity: [0.2, 0.8, 0.2]
          }}
          transition={{ duration: 8 + index * 0.35, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-cyanflare/10 blur-3xl" />
    </div>
  );
}
