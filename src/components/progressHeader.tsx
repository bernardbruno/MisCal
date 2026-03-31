const ProgressHeader = ({ data, targets }) => {
  return (
    <div className="bg-zinc-900 p-6 rounded-2xl shadow-xl border border-zinc-800 mb-6">
      <div className="grid grid-cols-4 gap-4 text-center">
        <StatItem label="kcal" value={data.kcal} target={targets.kcal} color="text-orange-500" />
        <StatItem label="proteínas" value={data.prot} target={targets.prot} color="text-blue-400" />
        <StatItem label="carbos" value={data.carb} target={targets.carb} color="text-yellow-500" />
        <StatItem label="grasas" value={data.fat} target={targets.fat} color="text-green-400" />
      </div>
    </div>
  );
};

const StatItem = ({ label, value, target, color }) => (
  <div>
    <p className={`text-2xl font-bold ${color}`}>{value}</p>
    <p className="text-zinc-500 text-xs uppercase tracking-wider">{label}</p>
    <p className="text-zinc-600 text-[10px]">meta: {target}</p>
  </div>
);

export default ProgressHeader;