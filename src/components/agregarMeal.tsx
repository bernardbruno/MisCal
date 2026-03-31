import { useState, useMemo } from 'react';

const AgregarMeal = ({ isOpen, onClose, foodDatabase, onSelect }) => {
  const [query, setQuery] = useState("");

  const filteredFoods = useMemo(() => {
    if (query === "") return [];
    return foodDatabase.filter(food => 
      food.nombre.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5); // Limitamos a 5 resultados para que sea limpio
  }, [query, foodDatabase]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-zinc-900 border border-zinc-800 w-full max-w-md rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-4 text-white">Agregar Alimento</h2>
        
        <input 
          autoFocus
          type="text"
          placeholder="Escribí para buscar... (ej: Pollo)"
          className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <div className="mt-4 space-y-2">
          {filteredFoods.map(food => (
            <button
              key={food.id}
              onClick={() => { onSelect(food); setQuery(""); onClose(); }}
              className="w-full text-left p-3 hover:bg-zinc-800 rounded-lg border border-transparent hover:border-zinc-700 transition group"
            >
              <p className="font-medium text-zinc-200 group-hover:text-orange-400">{food.nombre}</p>
              <p className="text-xs text-zinc-500">{food.kcal} kcal | P: {food.prot}g | C: {food.carb}g | G: {food.fat}g</p>
            </button>
          ))}
          {query !== "" && filteredFoods.length === 0 && (
            <p className="text-zinc-600 text-center py-4">No se encontraron resultados.</p>
          )}
        </div>

        <button onClick={onClose} className="mt-6 w-full text-zinc-500 text-sm hover:underline">
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default AgregarMeal;