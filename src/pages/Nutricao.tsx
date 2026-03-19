import { motion } from "framer-motion";
import { ArrowLeft, Coffee, Sun, Moon, Cookie } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Meal {
  icon: typeof Coffee;
  label: string;
  items: string;
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
}

const meals: Meal[] = [
  { icon: Coffee, label: "Café da Manhã", items: "Iogurte natural 200g + aveia 40g + morangos", kcal: 350, protein: 22, carbs: 45, fat: 8 },
  { icon: Sun, label: "Almoço", items: "Arroz 120g + feijão 120g + frango 150g + salada", kcal: 650, protein: 45, carbs: 70, fat: 15 },
  { icon: Cookie, label: "Lanche", items: "Maçã + castanhas 20g", kcal: 220, protein: 4, carbs: 20, fat: 12 },
  { icon: Moon, label: "Jantar", items: "Ovos mexidos 3 un + legumes salteados 250g", kcal: 420, protein: 27, carbs: 25, fat: 22 },
];

const totalKcal = meals.reduce((s, m) => s + m.kcal, 0);
const totalP = meals.reduce((s, m) => s + m.protein, 0);
const totalC = meals.reduce((s, m) => s + m.carbs, 0);
const totalF = meals.reduce((s, m) => s + m.fat, 0);

export default function Nutricao() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-xl px-4 pt-4 pb-3">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-1">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold">Nutrição</h1>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 space-y-4 mt-4">
        {/* Macro Summary */}
        <div className="surface-card p-5">
          <h3 className="font-semibold text-sm mb-3">Resumo do Dia</h3>
          <div className="grid grid-cols-4 gap-3 text-center">
            {[
              { label: "Calorias", val: `${totalKcal}`, color: "text-primary" },
              { label: "Proteína", val: `${totalP}g`, color: "text-accent" },
              { label: "Carbs", val: `${totalC}g`, color: "text-foreground" },
              { label: "Gordura", val: `${totalF}g`, color: "text-muted-foreground" },
            ].map((m) => (
              <div key={m.label}>
                <span className={`text-data text-lg font-bold ${m.color}`}>{m.val}</span>
                <p className="text-[10px] text-muted-foreground">{m.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Meals */}
        {meals.map((meal, i) => (
          <motion.div
            key={meal.label}
            className="surface-card p-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-light flex items-center justify-center shrink-0">
                <meal.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm">{meal.label}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{meal.items}</p>
                <div className="flex gap-4 mt-2 text-[10px] font-medium text-muted-foreground">
                  <span className="text-data">{meal.kcal} kcal</span>
                  <span>P {meal.protein}g</span>
                  <span>C {meal.carbs}g</span>
                  <span>G {meal.fat}g</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Dicas */}
        <div className="surface-card p-5">
          <h3 className="font-semibold text-sm mb-2">Dicas</h3>
          <ul className="space-y-1 text-xs text-muted-foreground">
            <li>• Emagrecimento: déficit de 300–500 kcal/dia</li>
            <li>• Hipertrofia: superávit de 200–350 kcal/dia</li>
            <li>• Proteína: 1,6–2,2 g/kg/dia</li>
            <li>• Água: 30–40 ml/kg/dia</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
