/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Inter", "ui-sans-serif", "system-ui"],
        body: ["Inter", "ui-sans-serif", "system-ui"]
      },
      colors: {
        night: "#050713",
        ink: "#0a1024",
        cyanflare: "#35e7ff",
        volt: "#b6ff5c",
        magenta: "#ff4fd8"
      },
      boxShadow: {
        glow: "0 0 45px rgba(53, 231, 255, 0.25)",
        panel: "0 24px 80px rgba(0, 0, 0, 0.42)"
      },
      keyframes: {
        scan: {
          "0%": { transform: "translateY(-20%)", opacity: "0" },
          "18%": { opacity: "1" },
          "100%": { transform: "translateY(420%)", opacity: "0" }
        },
        wave: {
          "0%, 100%": { transform: "scaleY(0.35)" },
          "50%": { transform: "scaleY(1)" }
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" }
        },
        pulseRing: {
          "0%": { transform: "scale(0.72)", opacity: "0.72" },
          "100%": { transform: "scale(1.45)", opacity: "0" }
        }
      },
      animation: {
        scan: "scan 2.2s ease-in-out infinite",
        wave: "wave 1s ease-in-out infinite",
        float: "float 5s ease-in-out infinite",
        pulseRing: "pulseRing 1.8s ease-out infinite"
      }
    }
  },
  plugins: []
};
