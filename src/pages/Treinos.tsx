import { motion } from "framer-motion";
import { ArrowLeft, Play, Check, Clock, Flame, ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface Exercise {
  name: string;
  sets: string;
  reps: string;
}

interface Workout {
  id: string;
  name: string;
  duration: string;
  calories: number;
  exercises: Exercise[];
  videoId?: string;
}

const categories = [
  { id: "emagrecimento", label: "Emagrecer" },
  { id: "hipertrofia", label: "Hipertrofia" },
  { id: "casa", label: "Em Casa" },
];

const workouts: Record<string, Workout[]> = {
  emagrecimento: [
    {
      id: "1", name: "HIIT — Corrida no Lugar", duration: "22 min", calories: 280, videoId: "ml6cT4AZdqI",
      exercises: [
        { name: "Corrida no lugar", sets: "10", reps: "30s forte / 30s leve" },
        { name: "Burpees", sets: "4", reps: "8" },
        { name: "Mountain Climbers", sets: "4", reps: "20" },
      ],
    },
    {
      id: "2", name: "Circuito Corpo Livre", duration: "30 min", calories: 320,
      exercises: [
        { name: "Agachamento", sets: "4", reps: "15" },
        { name: "Flexão", sets: "4", reps: "10" },
        { name: "Prancha", sets: "4", reps: "40s" },
        { name: "Jumping Jacks", sets: "4", reps: "20" },
      ],
    },
    {
      id: "3", name: "Cardio Intervalado", duration: "18 min", calories: 240, videoId: "aclHkVaku9U",
      exercises: [
        { name: "Sprint no lugar", sets: "8", reps: "40s forte / 20s leve" },
        { name: "Polichinelo", sets: "4", reps: "30" },
      ],
    },
  ],
  hipertrofia: [
    {
      id: "4", name: "Treino A — Lower", duration: "55 min", calories: 200,
      exercises: [
        { name: "Agachamento Livre", sets: "4", reps: "8" },
        { name: "Leg Press", sets: "4", reps: "10" },
        { name: "Cadeira Extensora", sets: "3", reps: "12" },
        { name: "Panturrilha", sets: "4", reps: "15" },
      ],
    },
    {
      id: "5", name: "Treino B — Upper", duration: "50 min", calories: 180,
      exercises: [
        { name: "Supino Reto", sets: "4", reps: "10" },
        { name: "Remada Curvada", sets: "4", reps: "12" },
        { name: "Desenvolvimento", sets: "3", reps: "10" },
        { name: "Rosca Direta", sets: "3", reps: "12" },
      ],
    },
  ],
  casa: [
    {
      id: "7", name: "Full Body em Casa", duration: "25 min", calories: 180, videoId: "ml6cT4AZdqI",
      exercises: [
        { name: "Flexão de Braço", sets: "4", reps: "10–12" },
        { name: "Agachamento", sets: "4", reps: "15" },
        { name: "Prancha Isométrica", sets: "4", reps: "30–45s" },
        { name: "Avanço Alternado", sets: "3", reps: "10/perna" },
      ],
    },
    {
      id: "8", name: "Core & Abs", duration: "15 min", calories: 100,
      exercises: [
        { name: "Abdominal Crunch", sets: "4", reps: "15" },
        { name: "Prancha Lateral", sets: "3", reps: "25s/lado" },
        { name: "Elevação de Pernas", sets: "3", reps: "12" },
      ],
    },
  ],
};

export default function Treinos() {
  const navigate = useNavigate();
  const [cat, setCat] = useState("emagrecimento");
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [expandedId, setExpandedId] = useState<string | null>(null);

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
        <div className="flex items-center gap-3 mb-3">
          <button onClick={() => navigate(-1)} className="p-1"><ArrowLeft className="w-5 h-5" /></button>
          <h1 className="text-lg font-bold">Plano de Treino</h1>
        </div>
        <div className="flex gap-2">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => { setCat(c.id); setExpandedId(null); }}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                cat === c.id ? "gradient-gold text-accent-foreground shadow-sm" : "bg-secondary text-secondary-foreground"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 space-y-3 mt-4">
        {workouts[cat]?.map((w, i) => {
          const isExpanded = expandedId === w.id;
          return (
            <motion.div
              key={w.id}
              className="surface-card overflow-hidden"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              {/* Header */}
              <div className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-sm">{w.name}</h3>
                    <div className="flex items-center gap-3 mt-1 text-[11px] text-muted-foreground">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{w.duration}</span>
                      <span className="flex items-center gap-1"><Flame className="w-3 h-3" />{w.calories} kcal</span>
                      <span>{w.exercises.length} exercícios</span>
                    </div>
                  </div>
                  <button
                    onClick={() => toggle(w.id)}
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors shadow-sm ${
                      completed.has(w.id) ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    <Check className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={() => setExpandedId(isExpanded ? null : w.id)}
                  className="mt-2 text-[10px] font-semibold text-primary flex items-center gap-1"
                >
                  {isExpanded ? "Esconder detalhes" : "Ver exercícios"}
                  {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </button>
              </div>

              {/* Expanded exercises */}
              {isExpanded && (
                <div className="px-4 pb-4 space-y-2">
                  {w.exercises.map((ex, ei) => (
                    <div key={ei} className="flex items-center gap-3 p-2.5 rounded-xl bg-secondary/50">
                      <span className="text-[10px] font-bold text-muted-foreground w-5">{ei + 1}</span>
                      <div className="flex-1">
                        <p className="text-xs font-semibold">{ex.name}</p>
                        <p className="text-[10px] text-muted-foreground">{ex.sets}x {ex.reps}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* YouTube Embed */}
              {isExpanded && w.videoId && (
                <div className="px-4 pb-4">
                  <div className="rounded-xl overflow-hidden aspect-video bg-secondary">
                    <iframe
                      src={`https://www.youtube.com/embed/${w.videoId}`}
                      title={w.name}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
