const ProgressHeader = ({ data, targets }) => {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 mb-5">
      {/* Calorías principal */}
      <div className="flex justify-between items-end mb-4">
        <div>
          <p className="text-3xl font-bold text-orange-400 tabular-nums leading-none">
            {data.kcal}
          </p>
          <p className="text-xs text-zinc-500 uppercase tracking-widest mt-1">kcal consumidas</p>
        </div>
        <div className="text-right">
          <p className={`text-base font-semibold tabular-nums ${data.kcal > targets.kcal ? "text-red-400" : "text-zinc-300"}`}>
            {data.kcal > targets.kcal
              ? `+${data.kcal - targets.kcal} exceso`
              : `${targets.kcal - data.kcal} restantes`}
          </p>
          <p className="text-xs text-zinc-600">meta: {targets.kcal} kcal</p>
        </div>
      </div>

      {/* Barra de calorías */}
      <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden mb-5">
        <div
          className={`h-full rounded-full transition-all duration-500 ${data.kcal > targets.kcal ? "bg-red-500" : "bg-orange-500"}`}
          style={{ width: `${Math.min(100, Math.round((data.kcal / targets.kcal) * 100))}%` }}
        />
      </div>

      {/* Macros */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Proteínas", value: data.prot, target: targets.prot, color: "bg-blue-500",   text: "text-blue-400"   },
          { label: "Carbos",    value: data.carb, target: targets.carb, color: "bg-yellow-500", text: "text-yellow-400" },
          { label: "Grasas",    value: data.fat,  target: targets.fat,  color: "bg-green-500",  text: "text-green-400"  },
        ].map(({ label, value, target, color, text }) => (
          <div key={label}>
            <div className="flex justify-between items-baseline mb-1">
              <span className="text-[10px] text-zinc-500 uppercase tracking-wide">{label}</span>
              <span className={`text-xs font-semibold tabular-nums ${text}`}>{value}g</span>
            </div>
            <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${color} ${value > target ? "opacity-50" : ""}`}
                style={{ width: `${Math.min(100, Math.round((value / target) * 100))}%` }}
              />
            </div>
            <p className="text-[9px] text-zinc-700 mt-0.5 tabular-nums">/{target}g</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressHeader;