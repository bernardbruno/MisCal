import { Plus, Sun, Moon, Utensils, Coffee, Apple, Trash2 } from 'lucide-react';

const FoodRow = ({ item, onDelete }: { item: any, onDelete: (id: number) => void }) => {
  return (
    <div className="flex justify-between items-center py-3 border-b border-zinc-800/50 last:border-0 group">
      <div className="flex items-center gap-3">
        <button 
          onClick={() => onDelete(item.logId)} 
          className="opacity-0 group-hover:opacity-100 p-1 text-zinc-600 hover:text-red-500 transition"
        >
          <Trash2 size={14} />
        </button>
        <div>
          <p className="text-sm font-medium text-zinc-200">{item.nombre} <span className="text-zinc-500 text-xs">x{item.cantidad}</span></p>
          <p className="text-[10px] text-zinc-500 uppercase tracking-widest">P: {item.prot}g | C: {item.carb}g | G: {item.fat}g</p>
        </div>
      </div>
      <p className="text-sm font-bold text-orange-400">{item.kcal} kcal</p>
    </div>
  );
};

const Meal = ({ title, items, onAddClick, onDelete }) => {
  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl mb-4 overflow-hidden">
      <div className="p-4 flex justify-between items-center bg-zinc-800/30">
        <div className="flex items-center gap-3">
          <h3 className="font-semibold text-zinc-200">{title}</h3>
        </div>
        <button 
          onClick={onAddClick}
          className="flex items-center gap-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-3 py-1 rounded-lg text-sm transition"
        >
          <Plus size={16} /> Agregar
        </button>
      </div>
      
      <div className="p-4">
        {items.length > 0 ? (
          items.map(item => <FoodRow key={item.id} item={item} onDelete={onDelete}/>)
        ) : (
          <p className="text-center text-zinc-600 py-2 text-sm italic">Sin alimentos registrados</p>
        )}
      </div>
    </div>
  );
};

export default Meal;