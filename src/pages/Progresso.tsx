import { motion } from "framer-motion";
import { ArrowLeft, TrendingDown, Ruler, Camera, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const weightData = [
  { week: "Sem 1", value: 85 },
  { week: "Sem 2", value: 84.2 },
  { week: "Sem 3", value: 83.5 },
  { week: "Sem 4", value: 82.8 },
];

const checklist = [
  { label: "Treinos concluídos: 4–6/semana", done: true },
  { label: "Sono: 7–9h/noite", done: true },
  { label: "Água: 30–40 ml/kg", done: false },
  { label: "Proteína batida diária", done: true },
  { label: "Passos/dia: 7–10 mil", done: false },
  { label: "Foto/medidas 1x/semana", done: false },
];

export default function Progresso() {
  const navigate = useNavigate();
  const maxW = Math.max(...weightData.map((d) => d.value));
  const minW = Math.min(...weightData.map((d) => d.value));
  const range = maxW - minW || 1;

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-xl px-4 pt-4 pb-3">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-1">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold">Progresso</h1>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 space-y-4 mt-4">
        {/* Weight Chart */}
        <div className="surface-card p-5">
          <div className="flex items-center gap-2 mb-4">
            <TrendingDown className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-sm">Evolução de Peso</h3>
          </div>
          <div className="flex items-end gap-3 h-32">
            {weightData.map((d, i) => {
              const h = ((d.value - minW) / range) * 80 + 20;
              return (
                <div key={d.week} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-data text-[10px] text-muted-foreground">{d.value}kg</span>
                  <motion.div
                    className="w-full rounded-lg bg-primary"
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                  />
                  <span className="text-[10px] text-muted-foreground">{d.week}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Measurements */}
        <div className="surface-card p-5">
          <div className="flex items-center gap-2 mb-3">
            <Ruler className="w-4 h-4 text-accent" />
            <h3 className="font-semibold text-sm">Medidas Corporais</h3>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { label: "Peito", val: "98 cm" },
              { label: "Cintura", val: "82 cm" },
              { label: "Quadril", val: "96 cm" },
              { label: "Braço", val: "34 cm" },
              { label: "Coxa", val: "56 cm" },
              { label: "Panturrilha", val: "38 cm" },
            ].map((m) => (
              <div key={m.label}>
                <span className="text-data text-sm font-bold">{m.val}</span>
                <p className="text-[10px] text-muted-foreground">{m.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Checklist */}
        <div className="surface-card p-5">
          <h3 className="font-semibold text-sm mb-3">Checklist Semanal</h3>
          <div className="space-y-2">
            {checklist.map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <CheckCircle2
                  className={`w-4 h-4 shrink-0 ${item.done ? "text-primary" : "text-muted-foreground/30"}`}
                />
                <span className={`text-xs ${item.done ? "text-foreground" : "text-muted-foreground"}`}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Photos placeholder */}
        <div className="surface-card p-5">
          <div className="flex items-center gap-2 mb-3">
            <Camera className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-sm">Fotos de Evolução</h3>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-[3/4] rounded-xl bg-secondary flex items-center justify-center">
                <Camera className="w-5 h-5 text-muted-foreground/30" />
              </div>
            ))}
          </div>
          <p className="text-[10px] text-muted-foreground text-center mt-2">
            Tire fotos semanais para acompanhar sua evolução
          </p>
        </div>
      </div>
    </div>
  );
}
