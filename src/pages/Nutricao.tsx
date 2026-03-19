import { motion } from "framer-motion";
import { ArrowLeft, Coffee, Sun, Moon, Cookie, Flame, Beef, Wheat, Droplet, ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface MealOption {
  name: string;
  portion: string;
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface MealCategory {
  icon: typeof Coffee;
  label: string;
  options: MealOption[];
}

const mealCategories: MealCategory[] = [
  {
    icon: Coffee, label: "Café da Manhã",
    options: [
      { name: "Ovos mexidos + torrada integral + frutas", portion: "2 ovos + 2 fatias + 100g", kcal: 380, protein: 24, carbs: 38, fat: 14 },
      { name: "Iogurte natural + granola + mel", portion: "200g + 40g + 10g", kcal: 310, protein: 16, carbs: 42, fat: 8 },
      { name: "Aveia com banana e canela", portion: "50g aveia + 1 banana", kcal: 290, protein: 10, carbs: 52, fat: 5 },
      { name: "Tapioca com queijo cottage e tomate", portion: "2 unid + 60g + 50g", kcal: 260, protein: 18, carbs: 32, fat: 6 },
      { name: "Smoothie proteico de morango", portion: "300ml leite + 30g whey + 100g morango", kcal: 340, protein: 32, carbs: 30, fat: 8 },
    ],
  },
  {
    icon: Sun, label: "Almoço",
    options: [
      { name: "Arroz + feijão + frango grelhado + salada", portion: "120g + 120g + 150g + 100g", kcal: 650, protein: 45, carbs: 70, fat: 15 },
      { name: "Quinoa + salmão + legumes assados", portion: "100g + 150g + 200g", kcal: 580, protein: 42, carbs: 48, fat: 18 },
      { name: "Macarrão integral + carne moída + molho", portion: "100g + 120g + 80g", kcal: 620, protein: 38, carbs: 65, fat: 16 },
      { name: "Bowl de atum + arroz + abacate", portion: "120g + 100g + 50g", kcal: 560, protein: 40, carbs: 52, fat: 20 },
      { name: "Strogonoff de frango + arroz integral", portion: "200g + 120g", kcal: 590, protein: 42, carbs: 58, fat: 14 },
    ],
  },
  {
    icon: Cookie, label: "Lanche da Tarde",
    options: [
      { name: "Maçã + castanhas mix", portion: "1 unid + 30g", kcal: 220, protein: 5, carbs: 22, fat: 14 },
      { name: "Pão integral + pasta de amendoim", portion: "2 fatias + 20g", kcal: 280, protein: 12, carbs: 32, fat: 12 },
      { name: "Iogurte grego + chia + blueberry", portion: "170g + 10g + 50g", kcal: 200, protein: 14, carbs: 18, fat: 8 },
      { name: "Barra proteica + banana", portion: "1 barra + 1 banana", kcal: 310, protein: 20, carbs: 38, fat: 8 },
      { name: "Mix de frutas secas + whey shake", portion: "40g + 250ml", kcal: 290, protein: 26, carbs: 28, fat: 6 },
    ],
  },
  {
    icon: Moon, label: "Jantar",
    options: [
      { name: "Omelete de legumes + salada verde", portion: "3 ovos + 150g legumes + 100g salada", kcal: 380, protein: 28, carbs: 18, fat: 22 },
      { name: "Sopa de legumes com frango desfiado", portion: "400ml + 100g frango", kcal: 320, protein: 30, carbs: 28, fat: 10 },
      { name: "Tilápia grelhada + batata doce + brócolis", portion: "150g + 120g + 100g", kcal: 420, protein: 38, carbs: 40, fat: 8 },
      { name: "Wrap integral com peru e vegetais", portion: "1 wrap + 80g peru + 100g vegetais", kcal: 350, protein: 28, carbs: 32, fat: 10 },
      { name: "Bowl de lentilha + cogumelos + espinafre", portion: "150g + 100g + 80g", kcal: 340, protein: 22, carbs: 42, fat: 6 },
    ],
  },
];

function MacroPill({ icon: Icon, value, label, color }: { icon: typeof Flame; value: string; label: string; color: string }) {
  return (
    <div className="flex items-center gap-1">
      <Icon className={`w-3 h-3 ${color}`} />
      <span className="text-data text-[10px] font-semibold">{value}</span>
      <span className="text-[9px] text-muted-foreground">{label}</span>
    </div>
  );
}

export default function Nutricao() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState<string | null>("Café da Manhã");

  const allOptions = mealCategories.flatMap((c) => c.options);
  const totalKcal = Math.round(allOptions.reduce((s, o) => s + o.kcal, 0) / mealCategories.length);
  const totalP = Math.round(allOptions.reduce((s, o) => s + o.protein, 0) / mealCategories.length);
  const totalC = Math.round(allOptions.reduce((s, o) => s + o.carbs, 0) / mealCategories.length);
  const totalF = Math.round(allOptions.reduce((s, o) => s + o.fat, 0) / mealCategories.length);

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-xl px-4 pt-4 pb-3">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-1"><ArrowLeft className="w-5 h-5" /></button>
          <h1 className="text-lg font-bold">Nutrição</h1>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 space-y-4 mt-2">
        {/* Summary */}
        <div className="surface-card p-5">
          <h3 className="font-bold text-sm mb-3">Resumo Diário (média)</h3>
          <div className="grid grid-cols-4 gap-2">
            {[
              { icon: Flame, label: "Calorias", val: `${totalKcal}`, color: "text-orange-500", bg: "bg-orange-50" },
              { icon: Beef, label: "Proteína", val: `${totalP}g`, color: "text-red-500", bg: "bg-red-50" },
              { icon: Wheat, label: "Carbos", val: `${totalC}g`, color: "text-amber-600", bg: "bg-amber-50" },
              { icon: Droplet, label: "Gordura", val: `${totalF}g`, color: "text-purple-500", bg: "bg-purple-50" },
            ].map((m) => (
              <div key={m.label} className={`${m.bg} rounded-xl p-3 text-center`}>
                <m.icon className={`w-4 h-4 mx-auto mb-1 ${m.color}`} />
                <span className={`text-data text-base font-bold ${m.color}`}>{m.val}</span>
                <p className="text-[9px] text-muted-foreground mt-0.5">{m.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Meal Categories */}
        {mealCategories.map((cat, ci) => {
          const isOpen = expanded === cat.label;
          return (
            <motion.div
              key={cat.label}
              className="surface-card overflow-hidden"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: ci * 0.06 }}
            >
              <button
                onClick={() => setExpanded(isOpen ? null : cat.label)}
                className="w-full flex items-center gap-3 p-4 text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-light flex items-center justify-center shrink-0">
                  <cat.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-sm">{cat.label}</h3>
                  <p className="text-[10px] text-muted-foreground">{cat.options.length} opções disponíveis</p>
                </div>
                {isOpen ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
              </button>

              {isOpen && (
                <div className="px-4 pb-4 space-y-2">
                  {cat.options.map((opt, i) => (
                    <div key={i} className="p-3 rounded-xl bg-secondary/50 border border-border/50">
                      <p className="text-xs font-semibold">{opt.name}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5 mb-2">{opt.portion}</p>
                      <div className="flex flex-wrap gap-3">
                        <MacroPill icon={Flame} value={`${opt.kcal}`} label="kcal" color="text-orange-500" />
                        <MacroPill icon={Beef} value={`${opt.protein}g`} label="prot" color="text-red-500" />
                        <MacroPill icon={Wheat} value={`${opt.carbs}g`} label="carbs" color="text-amber-600" />
                        <MacroPill icon={Droplet} value={`${opt.fat}g`} label="gord" color="text-purple-500" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          );
        })}

        {/* Dicas */}
        <div className="surface-card p-5">
          <h3 className="font-bold text-sm mb-2">Dicas Nutricionais</h3>
          <ul className="space-y-1.5 text-xs text-muted-foreground">
            <li>🔥 Emagrecimento: déficit de 300–500 kcal/dia</li>
            <li>💪 Hipertrofia: superávit de 200–350 kcal/dia</li>
            <li>🥩 Proteína: 1,6–2,2 g/kg/dia</li>
            <li>💧 Água: 30–40 ml/kg/dia</li>
            <li>🥗 Fibra: 25–35g/dia para saciedade</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
