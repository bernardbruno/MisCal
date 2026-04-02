import { Plus, Trash2 } from "lucide-react";

const FoodRow = ({ item, onDelete }: { item: any; onDelete: (id: number) => void }) => (
  <div className="flex justify-between items-center py-2.5 border-b border-zinc-800/50 last:border-0 group">
    <div className="flex items-center gap-2 min-w-0">
      <button
        onClick={() => onDelete(item.logId)}
        className="shrink-0 p-1 text-zinc-700 hover:text-red-400 transition sm:opacity-0 sm:group-hover:opacity-100"
      >
        <Trash2 size={13} />
      </button>
      <div className="min-w-0">
        <p className="text-sm font-medium text-zinc-200 truncate">
          {item.nombre}
          <span className="text-zinc-500 text-xs font-normal ml-1">
            {item.cantidad}{item.unidad === "gr" ? "g" : "u"}
          </span>
        </p>
        <p className="text-[10px] text-zinc-500 tabular-nums">
          P {item.prot}g · C {item.carb}g · G {item.fat}g
        </p>
      </div>
    </div>
    <p className="text-sm font-semibold text-orange-400 tabular-nums shrink-0 ml-2">
      {item.kcal} kcal
    </p>
  </div>
);

const Meal = ({ title, icon, items, onAddClick, onDelete }) => {
  const totalKcal = items.reduce((acc, i) => acc + i.kcal, 0);

  return (
    <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl overflow-hidden mb-3">
      {/* Header de la comida */}
      <div className="px-4 py-3 flex justify-between items-center border-b border-zinc-800/60">
        <div className="flex items-center gap-2">
          {icon && <span className="text-base leading-none">{icon}</span>}
          <span className="text-sm font-semibold text-zinc-200">{title}</span>
          {items.length > 0 && (
            <span className="text-xs text-zinc-500 tabular-nums">{totalKcal} kcal</span>
          )}
        </div>
        <button
          onClick={onAddClick}
          className="flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-lg bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 transition"
        >
          <Plus size={13} />
          Agregar
        </button>
      </div>

      {/* Lista de alimentos */}
      <div className="px-4 py-1">
        {items.length > 0 ? (
          items.map(item => (
            <FoodRow key={item.logId} item={item} onDelete={onDelete} />
          ))
        ) : (
          <p className="text-center text-zinc-700 text-xs py-4 italic">
            Sin alimentos registrados
          </p>
        )}
      </div>
    </div>
  );
};

export default Meal;