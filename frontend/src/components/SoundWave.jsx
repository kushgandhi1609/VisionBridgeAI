export function SoundWave({ active }) {
  return (
    <div className="flex h-10 items-center gap-1.5" aria-hidden="true">
      {[...Array(18)].map((_, index) => (
        <span
          key={index}
          className={`w-1.5 rounded-full ${active ? "bg-cyanflare" : "bg-white/20"}`}
          style={{
            height: `${12 + (index % 6) * 5}px`,
            animation: active ? `wave ${0.65 + (index % 5) * 0.08}s ease-in-out infinite` : "none",
            animationDelay: `${index * 0.03}s`
          }}
        />
      ))}
    </div>
  );
}
