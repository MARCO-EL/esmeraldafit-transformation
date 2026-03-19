import { motion } from "framer-motion";
import { ArrowLeft, Check, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface DayPlan {
  day: number;
  title: string;
  description: string;
}

const weeks: { label: string; days: DayPlan[] }[] = [
  {
    label: "Semana 1 — Base",
    days: [
      { day: 1, title: "Circuito (3x)", description: "Agachamento 12, flexão 8, remada 12, prancha 30s" },
      { day: 2, title: "Cardio HIIT", description: "12 min: 30s forte / 30s leve + core 5 min" },
      { day: 3, title: "Lower Body (3x)", description: "Agachamento 12, avanço 10, ponte glúteo 15, panturrilha 15" },
      { day: 4, title: "Ativo Leve", description: "Caminhada 20–30 min + mobilidade 10 min" },
      { day: 5, title: "Upper Body (3x)", description: "Flexão 8–12, remada 12, desenvolvimento 12, prancha 30–40s" },
      { day: 6, title: "HIIT + Along.", description: "HIIT 12–15 min + alongamento 8 min" },
      { day: 7, title: "Descanso", description: "Recuperação completa" },
    ],
  },
  {
    label: "Semana 2 — Intensidade",
    days: [
      { day: 8, title: "Circuito (4x)", description: "+1 série ou +2 reps por exercício" },
      { day: 9, title: "Cardio HIIT", description: "14–16 min, maior intensidade" },
      { day: 10, title: "Lower Body (4x)", description: "Plank 40–50s, volume aumentado" },
      { day: 11, title: "Ativo Leve", description: "Caminhada + mobilidade avançada" },
      { day: 12, title: "Upper Body (4x)", description: "Progressão de carga/reps" },
      { day: 13, title: "HIIT Intenso", description: "HIIT 16 min + alongamento" },
      { day: 14, title: "Descanso", description: "Recuperação completa" },
    ],
  },
  {
    label: "Semana 3 — Variação",
    days: [
      { day: 15, title: "Circuito (4x)", description: "Agacho com salto 10, flexão joelho 10–12, hollow hold 20s" },
      { day: 16, title: "Cardio Intervalado", description: "18–20 min (40s forte / 20s leve)" },
      { day: 17, title: "Lower (4x)", description: "Agacho búlgaro 8–10, ponte unilateral 10, panturrilha 20" },
      { day: 18, title: "Ativo + Mobilidade", description: "Mobilidade quadril/torácica 15 min" },
      { day: 19, title: "Upper (4x)", description: "Flexão diamante 6–10, elevação lateral 12–15" },
      { day: 20, title: "EMOM", description: "12–16 min: agachos + flexões alternados" },
      { day: 21, title: "Descanso", description: "Recuperação completa" },
    ],
  },
  {
    label: "Semana 4 — Consolidação",
    days: [
      { day: 22, title: "Best of Semanas 1–3", description: "Repita seus melhores treinos + AMRAP final" },
      { day: 23, title: "HIIT Avançado", description: "18–20 min, máxima intensidade" },
      { day: 24, title: "Lower Intenso", description: "Volume alto + série AMRAP" },
      { day: 25, title: "Ativo Leve", description: "Mobilidade e recuperação ativa" },
      { day: 26, title: "Upper Intenso", description: "Volume alto + série AMRAP" },
      { day: 27, title: "Teste Final", description: "Prancha máxima, flexões máximas, agachos 2 min" },
      { day: 28, title: "Reavaliação", description: "Medidas, fotos e metas da próxima fase" },
    ],
  },
];

export default function Desafio() {
  const navigate = useNavigate();
  const [completedDays, setCompletedDays] = useState<Set<number>>(new Set());

  const toggle = (day: number) => {
    setCompletedDays((prev) => {
      const s = new Set(prev);
      s.has(day) ? s.delete(day) : s.add(day);
      return s;
    });
  };

  const progress = Math.round((completedDays.size / 28) * 100);

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-xl px-4 pt-4 pb-3">
        <div className="flex items-center gap-3 mb-3">
          <button onClick={() => navigate(-1)} className="p-1">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold">Desafio 30 Dias</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <span className="text-data text-xs text-muted-foreground">{progress}%</span>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 space-y-6 mt-4">
        {weeks.map((week, wi) => (
          <div key={week.label}>
            <h2 className="font-bold text-sm mb-3 text-primary">{week.label}</h2>
            <div className="space-y-2">
              {week.days.map((day, di) => {
                const done = completedDays.has(day.day);
                return (
                  <motion.button
                    key={day.day}
                    onClick={() => toggle(day.day)}
                    className={`surface-card-hover w-full p-3 flex items-center gap-3 text-left rounded-2xl ${
                      done ? "bg-emerald-light" : "bg-card"
                    }`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: wi * 0.1 + di * 0.03 }}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                      done ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                    }`}>
                      {done ? <Check className="w-4 h-4" /> : day.day}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-xs">{day.title}</h3>
                      <p className="text-[10px] text-muted-foreground truncate">{day.description}</p>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
