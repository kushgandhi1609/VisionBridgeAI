export function Testimonials() {
  const quotes = [
    ["VisionBridge feels calm, fast, and genuinely useful when I need context from a photo.", "Aarav, student"],
    ["The safety mode is the detail that makes it feel designed for the real world.", "Maya, mobility trainer"],
    ["Voice controls make the experience feel hands-free from the first minute.", "Jordan, product mentor"]
  ];

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl font-black text-white">Trusted by accessibility-first teams</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {quotes.map(([quote, name]) => (
            <figure className="glass rounded-xl p-6" key={name}>
              <blockquote className="text-base leading-7 text-slate-100">“{quote}”</blockquote>
              <figcaption className="mt-5 text-sm font-bold text-cyanflare">{name}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
