import { motion } from "framer-motion";
import { ArrowLeft, Play, Check, Clock, Flame } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface Workout {
  id: string;
  name: string;
  sets: string;
  reps: string;
  duration: string;
  calories: number;
  videoId?: string;
}

const categories = [
  { id: "emagrecimento", label: "Emagrecimento" },
  { id: "hipertrofia", label: "Hipertrofia" },
  { id: "casa", label: "Em Casa" },
];

const workouts: Record<string, Workout[]> = {
  emagrecimento: [
    { id: "1", name: "HIIT — Corrida no Lugar", sets: "10", reps: "30s forte / 30s leve", duration: "22 min", calories: 280, videoId: "ml6cT4AZdqI" },
    { id: "2", name: "Circuito Corpo Livre", sets: "4", reps: "12 reps", duration: "30 min", calories: 320 },
    { id: "3", name: "Cardio Intervalado", sets: "8", reps: "40s forte / 20s leve", duration: "18 min", calories: 240 },
  ],
  hipertrofia: [
    { id: "4", name: "Agachamento Livre", sets: "4", reps: "8", duration: "55 min", calories: 200, videoId: "aclHkVaku9U" },
    { id: "5", name: "Supino Reto", sets: "4", reps: "10", duration: "45 min", calories: 180 },
    { id: "6", name: "Remada Curvada", sets: "4", reps: "12", duration: "40 min", calories: 160 },
  ],
  casa: [
    { id: "7", name: "Flexão de Braço", sets: "4", reps: "10–12", duration: "20 min", calories: 120 },
    { id: "8", name: "Prancha Isométrica", sets: "4", reps: "30–45s", duration: "15 min", calories: 80 },
    { id: "9", name: "Avanço Alternado", sets: "3", reps: "10/perna", duration: "18 min", calories: 140 },
  ],
};

export default function Treinos() {
  const navigate = useNavigate();
  const [cat, setCat] = useState("emagrecimento");
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setCompleted((prev) => {
      const s = new Set(prev);
      s.has(id) ? s.delete(id) : s.add(id);
      return s;
    });
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-xl px-4 pt-4 pb-3">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate(-1)} className="p-1">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold">Plano de Treino</h1>
        </div>
        <div className="flex gap-2">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setCat(c.id)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                cat === c.id ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 space-y-3 mt-4">
        {workouts[cat]?.map((w, i) => (
          <motion.div
            key={w.id}
            className="surface-card p-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            {w.videoId && (
              <div className="rounded-xl overflow-hidden mb-3 aspect-video bg-secondary">
                <iframe
                  src={`https://www.youtube.com/embed/${w.videoId}`}
                  title={w.name}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            )}

            <div className="flex items-center gap-3">
              <div className="flex-1">
                <h3 className="font-semibold text-sm">{w.name}</h3>
                <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {w.duration}
                  </span>
                  <span>{w.sets}x{w.reps}</span>
                  <span className="flex items-center gap-1">
                    <Flame className="w-3 h-3" />
                    {w.calories} kcal
                  </span>
                </div>
              </div>

              <button
                onClick={() => toggle(w.id)}
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                  completed.has(w.id) ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                }`}
              >
                <Check className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
