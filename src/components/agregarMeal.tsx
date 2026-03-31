import { useState, useMemo } from "react";
import { X } from "lucide-react";

const AgregarMeal = ({ isOpen, onClose, foodDatabase, onSelect }) => {
  const [query, setQuery] = useState("");
  const [selectedFood, setSelectedFood] = useState<any>(null);
  const [amount, setAmount] = useState(1);

  const filteredFoods = useMemo(() => {
    if (query === "" || selectedFood) return [];
    return foodDatabase
      .filter((f) => f.nombre.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 5);
  }, [query, foodDatabase, selectedFood]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    let factor = amount;

    if (selectedFood.unidad === "gr") {
      factor = amount / 100;
    }
    onSelect({
      ...selectedFood,
      logId: Date.now(),
      cantidad: amount,
      kcal: Math.round(selectedFood.kcal * factor),
      prot: Number((selectedFood.prot * factor).toFixed(1)),
      carb: Number((selectedFood.carb * factor).toFixed(1)),
      fat: Number((selectedFood.fat * factor).toFixed(1)),
    });

    handleClose();
  };

  const handleClose = () => {
    setQuery("");
    setSelectedFood(null);
    setAmount(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-zinc-900 border border-zinc-800 w-full max-w-md rounded-2xl p-6 relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors p-1"
        >
          <X size={20} />
        </button>
        {!selectedFood ? (
          <>
            <h2 className="text-xl font-bold mb-4 text-white">
              Buscar Alimento
            </h2>
            <input
              autoFocus
              type="text"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 text-white outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Ej: Huevo..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div className="mt-4 space-y-2">
              {filteredFoods.map((food) => (
                <button
                  key={food.id}
                  onClick={() => {setSelectedFood(food);
                  setAmount(food.unidad === 'gr' ? 100 : 1);}}
                  className="w-full text-left p-3 hover:bg-zinc-800 rounded-lg border border-zinc-700/50"
                >
                  <p className="text-zinc-200 font-medium">{food.nombre}</p>
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-xl font-bold mb-2 text-white">
              {selectedFood.nombre}
            </h2>
            <p className="text-zinc-500 mb-6 text-sm">
              ¿Qué cantidad? ({selectedFood.unidad})
            </p>

            <input
              autoFocus
              type="number"
              step={selectedFood.unidad === "gr" ? 50 : 1}
              min={selectedFood.unidad === "gr" ? 50 : 1}
              className="w-32 bg-zinc-800 border border-zinc-700 rounded-xl p-4 text-3xl text-center text-orange-400 font-bold outline-none focus:ring-2 focus:ring-orange-500 mb-6"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />

            <div className="flex gap-3 mb-6">
              <button
                onClick={() => setSelectedFood(null)}
                className="flex-1 bg-zinc-800 py-3 rounded-xl text-zinc-400"
              >
                Volver
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 bg-orange-500 py-3 rounded-xl font-bold text-white"
              >
                Confirmar
              </button>
            </div>

            {/* Preview de Kcal */}
            <div className="bg-zinc-800/30 p-3 rounded-lg border border-zinc-800">
              <p className="text-zinc-500 text-xs uppercase tracking-widest mb-1">
                Total estimado
              </p>
              <p className="text-orange-400 font-bold mt-4">
                {selectedFood && (
                  selectedFood.unidad === 'gr' 
                    ? Math.round(selectedFood.kcal * (amount / 100)) 
                    : Math.round(selectedFood.kcal * amount)
                )} 
                kcal
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgregarMeal;
