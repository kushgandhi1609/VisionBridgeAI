import { motion } from "framer-motion";

export function Button({ children, className = "", variant = "primary", ...props }) {
  const styles = {
    primary: "bg-cyanflare text-night shadow-glow hover:bg-white",
    secondary: "bg-white/10 text-white border border-white/15 hover:bg-white/20",
    danger: "bg-red-500/18 text-red-100 border border-red-300/25 hover:bg-red-500/28"
  };

  return (
    <motion.button
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-bold transition ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
