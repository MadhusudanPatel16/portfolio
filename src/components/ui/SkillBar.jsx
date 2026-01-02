export default function SkillBar({ name, level }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span>{name}</span>
        <span className="text-gray-400">{level}%</span>
      </div>
      <div className="h-2 bg-white/10 rounded">
        <div
          className="h-2 bg-emerald-500 rounded"
          style={{ width: `${level}%` }}
        />
      </div>
    </div>
  );
}
