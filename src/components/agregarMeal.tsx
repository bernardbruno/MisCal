import { useState, useMemo } from "react";
import { X, Plus, Minus } from "lucide-react";

const AgregarMeal = ({ isOpen, onClose, foodDatabase, onSelect }) => {
  const [query, setQuery] = useState("");
  const [listaTemporal, setListaTemporal] = useState<any[]>([]);

  const toggleAlimento = (food: any) => {
    const existe = listaTemporal.find(item => item.id === food.id);
    if (existe) {
      setListaTemporal(prev => prev.filter(item => item.id !== food.id));
    } else {
      setListaTemporal(prev => [
        ...prev,
        { ...food, cantidadTemp: food.unidad === "gr" ? 100 : 1 }
      ]);
    }
  };

  const actualizarCantidad = (id: number, valor: number) => {
    setListaTemporal(prev =>
      prev.map(item => item.id === id ? { ...item, cantidadTemp: Math.max(item.unidad === "gr" ? 10 : 1, valor) } : item)
    );
  };

  const filteredFoods = useMemo(() => {
    if (query.trim() === "") return [];
    return foodDatabase
      .filter((f) => f.nombre.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 6);
  }, [query, foodDatabase]);

  const calcKcal = (item: any) => {
    const factor = item.unidad === "gr" ? item.cantidadTemp / 100 : item.cantidadTemp;
    return Math.round(item.kcal * factor);
  };

  const confirmarTodo = () => {
    listaTemporal.forEach(item => {
      const factor = item.unidad === "gr" ? item.cantidadTemp / 100 : item.cantidadTemp;
      onSelect({
        ...item,
        logId: Date.now() + Math.random(),
        cantidad: item.cantidadTemp,
        kcal: Math.round(item.kcal * factor),
        prot: Number((item.prot * factor).toFixed(1)),
        carb: Number((item.carb * factor).toFixed(1)),
        fat:  Number((item.fat  * factor).toFixed(1)),
      });
    });
    handleClose();
  };

  const handleClose = () => {
    setQuery("");
    setListaTemporal([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-4 z-50">
      <div className="bg-zinc-900 border border-zinc-800 w-full max-w-md rounded-2xl relative flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800 shrink-0">
          <div>
            <h2 className="text-base font-semibold text-white">Agregar alimentos</h2>
            <p className="text-zinc-500 text-xs mt-0.5">
              {listaTemporal.length === 0
                ? "Buscá y seleccioná lo que comiste"
                : `${listaTemporal.length} seleccionado${listaTemporal.length > 1 ? "s" : ""}`}
            </p>
          </div>
          <button onClick={handleClose} className="text-zinc-500 hover:text-white transition-colors p-1">
            <X size={20} />
          </button>
        </div>

        {/* Search */}
        <div className="px-5 pt-4 shrink-0">
          <input
            autoFocus
            type="text"
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-500 outline-none focus:ring-1 focus:ring-orange-500 transition"
            placeholder="Buscar alimento... (pollo, arroz, huevo...)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* Body scrollable */}
        <div className="flex-1 overflow-y-auto px-5 py-3 space-y-2">

          {/* Resultados de búsqueda */}
          {filteredFoods.length > 0 && (
            <div className="space-y-1.5">
              {filteredFoods.map(food => {
                const seleccionado = listaTemporal.some(item => item.id === food.id);
                return (
                  <button
                    key={food.id}
                    onClick={() => toggleAlimento(food)}
                    className={`w-full text-left px-4 py-3 rounded-xl border transition-all flex justify-between items-center ${
                      seleccionado
                        ? "border-orange-500 bg-orange-500/10"
                        : "border-zinc-800 bg-zinc-800/40 hover:border-zinc-600"
                    }`}
                  >
                    <div>
                      <p className={`text-sm font-medium ${seleccionado ? "text-orange-400" : "text-zinc-200"}`}>
                        {food.nombre}
                      </p>
                      <p className="text-[10px] text-zinc-500 uppercase tracking-wide mt-0.5">
                        {food.kcal} kcal · {food.unidad === "gr" ? "cada 100g" : "por unidad"}
                      </p>
                    </div>
                    {seleccionado
                      ? <div className="w-2 h-2 rounded-full bg-orange-500 shrink-0" />
                      : <Plus size={15} className="text-zinc-600 shrink-0" />
                    }
                  </button>
                );
              })}
            </div>
          )}

          {query.length > 0 && filteredFoods.length === 0 && (
            <p className="text-center text-zinc-600 text-sm py-6">Sin resultados para "{query}"</p>
          )}

          {query.length === 0 && listaTemporal.length === 0 && (
            <p className="text-center text-zinc-700 text-sm py-6">Escribí algo para buscar</p>
          )}

          {/* Seleccionados con cantidad editable */}
          {listaTemporal.length > 0 && (
            <div className="mt-2">
              <p className="text-xs text-zinc-500 uppercase tracking-widest font-medium mb-2">
                Seleccionados
              </p>
              <div className="space-y-2">
                {listaTemporal.map(item => (
                  <div
                    key={item.id}
                    className="bg-zinc-800/60 border border-zinc-700/60 rounded-xl px-4 py-3 flex items-center gap-3"
                  >
                    {/* Nombre + kcal calculadas */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-zinc-200 truncate">{item.nombre}</p>
                      <p className="text-xs text-orange-400 font-semibold tabular-nums">
                        {calcKcal(item)} kcal
                      </p>
                    </div>

                    {/* Control de cantidad */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => actualizarCantidad(item.id, item.cantidadTemp - (item.unidad === "gr" ? 50 : 1))}
                        className="w-7 h-7 rounded-lg bg-zinc-700 hover:bg-zinc-600 flex items-center justify-center text-zinc-300 transition"
                      >
                        <Minus size={13} />
                      </button>
                      <input
                        type="number"
                        value={item.cantidadTemp}
                        onChange={(e) => actualizarCantidad(item.id, Number(e.target.value))}
                        className="w-14 bg-zinc-900 border border-zinc-700 rounded-lg py-1 text-sm text-center text-orange-400 font-bold outline-none focus:ring-1 focus:ring-orange-500 tabular-nums"
                      />
                      <button
                        onClick={() => actualizarCantidad(item.id, item.cantidadTemp + (item.unidad === "gr" ? 50 : 1))}
                        className="w-7 h-7 rounded-lg bg-zinc-700 hover:bg-zinc-600 flex items-center justify-center text-zinc-300 transition"
                      >
                        <Plus size={13} />
                      </button>
                      <span className="text-xs text-zinc-600 w-4">{item.unidad === "gr" ? "g" : "u"}</span>
                    </div>

                    {/* Eliminar */}
                    <button
                      onClick={() => toggleAlimento(item)}
                      className="text-zinc-600 hover:text-red-400 transition p-1 shrink-0"
                    >
                      <X size={15} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-zinc-800 shrink-0">
          <button
            disabled={listaTemporal.length === 0}
            onClick={confirmarTodo}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-zinc-800 disabled:text-zinc-600 text-white font-semibold py-3 rounded-xl transition-all text-sm"
          >
            {listaTemporal.length === 0
              ? "Seleccioná al menos un alimento"
              : `Confirmar ${listaTemporal.length} alimento${listaTemporal.length > 1 ? "s" : ""}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgregarMeal;