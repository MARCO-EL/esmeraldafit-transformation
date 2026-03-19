import { Flame, Beef, Wheat, Droplet, Droplets, TrendingDown, Dumbbell, Apple, Trophy, BookOpen, Target, Play, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import CalorieRing from "@/components/CalorieRing";
import WaterTracker from "@/components/WaterTracker";
import DashboardCard from "@/components/DashboardCard";
import heroImg from "@/assets/hero-fitness.jpg";
import { useNavigate } from "react-router-dom";

const todayMetrics = [
  { icon: Flame, label: "Calorias", value: "1.450", unit: "kcal", color: "text-orange-500", bg: "bg-orange-50" },
  { icon: Beef, label: "Proteína", value: "98", unit: "g", color: "text-red-500", bg: "bg-red-50" },
  { icon: Wheat, label: "Carbos", value: "160", unit: "g", color: "text-amber-600", bg: "bg-amber-50" },
  { icon: Droplet, label: "Gordura", value: "57", unit: "g", color: "text-purple-500", bg: "bg-purple-50" },
];

const cards = [
  { icon: Dumbbell, title: "Plano de Treino", desc: "Treinos personalizados", path: "/treinos", variant: "accent" as const },
  { icon: Apple, title: "Nutrição", desc: "Dieta e receitas", path: "/nutricao" },
  { icon: Trophy, title: "Desafio 30 Dias", desc: "Comece agora", path: "/desafio", variant: "accent" as const },
  { icon: BookOpen, title: "Guia Fitness", desc: "22 capítulos completos", path: "/guia" },
  { icon: Target, title: "Progresso", desc: "Medidas e fotos", path: "/progresso" },
];

const todayWorkout = {
  name: "HIIT — Queima Rápida",
  duration: "22 min",
  calories: 280,
  exercises: 6,
};

const anim = (i: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: 0.15 + i * 0.07, duration: 0.5 },
});

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Hero */}
      <div className="relative h-52 overflow-hidden">
        <img src={heroImg} alt="EsmeraldaFit" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/30 via-foreground/50 to-foreground/80" />
        <div className="absolute inset-0 flex flex-col justify-end p-5">
          <motion.p
            className="text-primary-foreground/70 text-[10px] font-bold tracking-[0.2em] uppercase"
            {...anim(0)}
          >
            EsmeraldaFit
          </motion.p>
          <motion.h1
            className="text-primary-foreground text-xl font-extrabold leading-tight mt-1"
            {...anim(1)}
          >
            Sua evolução,<br />documentada.
          </motion.h1>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 -mt-8 relative z-10 space-y-5">

        {/* ── TODAY'S PLAN ── */}
        <motion.div {...anim(2)} className="surface-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-sm">📋 Plano de Hoje</h2>
            <span className="text-[10px] text-muted-foreground font-medium">
              {new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "short" })}
            </span>
          </div>

          {/* Metrics Row */}
          <div className="grid grid-cols-4 gap-2 mb-4">
            {todayMetrics.map((m) => (
              <div key={m.label} className={`${m.bg} rounded-xl p-2.5 text-center`}>
                <m.icon className={`w-4 h-4 mx-auto mb-1 ${m.color}`} />
                <span className="text-data text-sm font-bold block">{m.value}</span>
                <span className="text-[9px] text-muted-foreground">{m.label}</span>
              </div>
            ))}
          </div>

          {/* Today's Workout Preview */}
          <button
            onClick={() => navigate("/treinos")}
            className="w-full flex items-center gap-3 p-3 rounded-xl bg-emerald-light/60 hover:bg-emerald-light transition-colors"
          >
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shrink-0">
              <Play className="w-4 h-4 text-primary-foreground ml-0.5" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-xs font-bold">{todayWorkout.name}</p>
              <p className="text-[10px] text-muted-foreground">
                {todayWorkout.duration} · {todayWorkout.exercises} exercícios · {todayWorkout.calories} kcal
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
          </button>

          {/* Water + Deficit mini */}
          <div className="grid grid-cols-2 gap-2 mt-3">
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-blue-50">
              <Droplets className="w-4 h-4 text-blue-500" />
              <div>
                <span className="text-data text-xs font-bold">1.250ml</span>
                <p className="text-[9px] text-muted-foreground">/ 2.500ml água</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-green-50">
              <TrendingDown className="w-4 h-4 text-primary" />
              <div>
                <span className="text-data text-xs font-bold">-330</span>
                <p className="text-[9px] text-muted-foreground">kcal déficit</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── CALORIE RING ── */}
        <motion.div {...anim(3)}>
          <CalorieRing consumed={1450} goal={2100} burned={320} />
        </motion.div>

        {/* ── WATER TRACKER ── */}
        <motion.div {...anim(4)}>
          <WaterTracker />
        </motion.div>

        {/* ── QUICK LINKS ── */}
        <motion.div className="space-y-3" {...anim(5)}>
          {cards.map((c) => (
            <DashboardCard key={c.path} icon={c.icon} title={c.title} description={c.desc} path={c.path} variant={c.variant} />
          ))}
        </motion.div>

        {/* Disclaimer */}
        <p className="text-[10px] text-muted-foreground text-center pt-3 pb-2">
          Conteúdo educativo. Consulte um profissional antes de iniciar qualquer programa.
        </p>
      </div>
    </div>
  );
}
