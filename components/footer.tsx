export default function Footer() {
  return (
    <footer className="bg-[#0d1318] border-t border-[#235789]/20">
      <div className="mx-auto max-w-350 px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <svg viewBox="0 0 36 36" fill="none" className="h-8 w-8">
            <polygon
              points="18,2 34,10 34,26 18,34 2,26 2,10"
              stroke="#235789"
              strokeWidth="1"
              fill="#1b2c3c"
            />
            <polygon
              points="18,8 28,13.5 28,22.5 18,28 8,22.5 8,13.5"
              stroke="#4e9ad0"
              strokeWidth="0.8"
              fill="none"
            />
            <text
              x="18"
              y="22"
              textAnchor="middle"
              fill="#4e9ad0"
              fontSize="10"
              fontFamily="monospace"
              fontWeight="bold"
            >
              T
            </text>
          </svg>
          <span className="font-black tracking-[0.15em] text-[#f2f2f2]/50 uppercase text-sm">
            TRACY
          </span>
          <span className="text-[#235789] mx-1">·</span>
          <span className="font-mono text-xs text-[#f2f2f2]/20">
            Your AI, your infra.
          </span>
        </div>
        <div className="flex items-center gap-8">
          {["GitHub", "Docs", "Discord", "Privacy"].map((l) => (
            <a
              key={l}
              href="#"
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#f2f2f2]/20 hover:text-[#4e9ad0] transition-colors"
            >
              {l}
            </a>
          ))}
        </div>
        <p className="font-mono text-[10px] text-[#235789]/40 uppercase tracking-widest">
          MIT · No telemetry · Ever.
        </p>
      </div>
    </footer>
  );
}
