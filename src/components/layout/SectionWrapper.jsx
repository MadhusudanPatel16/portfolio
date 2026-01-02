export default function SectionWrapper({ id, children, className = "" }) {
  return (
    <section
      id={id}
      className={`py-20 md:py-28 scroll-mt-28 relative ${className}`}
    >
      {/* Section background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
}
