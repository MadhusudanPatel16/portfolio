export default function GlassCard({ children, className = "" }) {
  return (
    <div
      className={`
        relative rounded-2xl
        bg-white/5 backdrop-blur
        border border-white/10
        shadow-[0_0_0_1px_rgba(255,255,255,0.02)]
        transition-all duration-300
        hover:bg-white/10
        hover:border-violet-500/40
        hover:shadow-[0_0_30px_-10px_rgba(139,92,246,0.6)]
        ${className}
      `}
    >
      {children}
    </div>
  );
}
