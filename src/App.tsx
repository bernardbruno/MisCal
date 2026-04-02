import { useState } from 'react'
import ProgressHeader from './components/ProgressHeader'
import Meal from './components/Meal'
import AgregarMeal from './components/AgregarMeal';

const FOOD_DATABASE = [
  { id: 1, nombre: 'Pechuga de Pollo (100g)', kcal: 165, prot: 31, carb: 0, fat: 3.6, unidad: 'gr' },
  { id: 2, nombre: 'Arroz Integral (100g)', kcal: 111, prot: 2.6, carb: 23, fat: 0.9, unidad: 'gr' },
  { id: 3, nombre: 'Huevo', kcal: 70, prot: 6, carb: 0.5, fat: 5, unidad: 'unidad' },
  { id: 4, nombre: 'Palta ', kcal: 160, prot: 2, carb: 8.5, fat: 14.7, unidad: 'unidad' },
];

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeMeal, setActiveMeal] = useState("");
  const [dailyLogs, setDailyLogs] = useState([]);
  const targets = { kcal: 2000, prot: 150, carb: 200, fat: 65 };

  const openModal = (mealType: string) => {
    setActiveMeal(mealType);
    setIsModalOpen(true);
  };

  const handleAddFood = (food: any) => {
    const newEntry = { ...food, logId: food.logId || Date.now() + Math.random(), meal: activeMeal };
    setDailyLogs(prev => [...prev, newEntry]);
    setIsModalOpen(false);
  };

  const totals = dailyLogs.reduce((acc, curr) => ({
    kcal: Math.round(acc.kcal + curr.kcal),
    prot: Number((acc.prot + curr.prot).toFixed(1)),
    carb: Number((acc.carb + curr.carb).toFixed(1)),
    fat: Number((acc.fat + curr.fat).toFixed(1)),
  }), { kcal: 0, prot: 0, carb: 0, fat: 0 });

  const deleteEntry = (logId: number) => {
  setDailyLogs(dailyLogs.filter(entry => entry.logId !== logId));
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 p-4 md:p-8 font-sans">
      <div className="max-w-2xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl font-extrabold text-white">Mi tracker nutricional</h1>
          <p className="text-zinc-500 text-sm">Registrá tus comidas del día</p>
        </header>

        {/* Los 4 círculos de arriba */}
        <ProgressHeader data={totals} targets={targets} />

        {/* Secciones de comida */}
        {["Desayuno", "Almuerzo", "Merienda", "Cena"].map((meal) => (
          <Meal
            key={meal}
            title={meal}
            items={dailyLogs.filter(item => item.meal === meal)}
            onAddClick={() => openModal(meal)}
            onDelete={deleteEntry}
          />
        ))}

        <AgregarMeal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)}
          foodDatabase={FOOD_DATABASE}
          onSelect={handleAddFood}
        />
      </div>
    </div>
  )
}

export default App