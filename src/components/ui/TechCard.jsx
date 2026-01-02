export default function TechCard({ name }) {
  return (
    <div className="p-4 rounded-xl border border-white/10
                    bg-white/5 backdrop-blur
                    hover:bg-white/10 transition">
      {name}
    </div>
  );
}
