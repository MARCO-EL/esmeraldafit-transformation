import { Dumbbell, Apple, Trophy, BookOpen, Flame, Target, Droplets } from "lucide-react";
import { motion } from "framer-motion";
import CalorieRing from "@/components/CalorieRing";
import WaterTracker from "@/components/WaterTracker";
import DashboardCard from "@/components/DashboardCard";
import heroImg from "@/assets/hero-fitness.jpg";

const cards = [
  { icon: Dumbbell, title: "Plano de Treino", desc: "Treinos personalizados", path: "/treinos", variant: "accent" as const },
  { icon: Apple, title: "Nutrição", desc: "Dieta e receitas", path: "/nutricao" },
  { icon: Trophy, title: "Desafio 30 Dias", desc: "Comece agora", path: "/desafio", variant: "accent" as const },
  { icon: BookOpen, title: "Guia Fitness", desc: "22 capítulos completos", path: "/guia" },
  { icon: Target, title: "Progresso", desc: "Medidas e fotos", path: "/progresso" },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Hero */}
      <div className="relative h-56 overflow-hidden">
        <img src={heroImg} alt="EsmeraldaFit" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/40 to-foreground/70" />
        <div className="absolute inset-0 flex flex-col justify-end p-6">
          <motion.p
            className="text-primary-foreground/80 text-xs font-semibold tracking-widest uppercase mb-1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            EsmeraldaFit
          </motion.p>
          <motion.h1
            className="text-primary-foreground text-2xl font-bold leading-tight"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Sua evolução,
            <br />
            documentada.
          </motion.h1>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 -mt-6 relative z-10 space-y-4">
        {/* Calorie Ring */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <CalorieRing consumed={1450} goal={2100} burned={320} />
        </motion.div>

        {/* Water */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <WaterTracker />
        </motion.div>

        {/* Quick Links */}
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {cards.map((c) => (
            <DashboardCard key={c.path} icon={c.icon} title={c.title} description={c.desc} path={c.path} variant={c.variant} />
          ))}
        </motion.div>

        {/* Disclaimer */}
        <p className="text-[10px] text-muted-foreground text-center pt-4 pb-2">
          Conteúdo educativo. Consulte um profissional antes de iniciar qualquer programa.
        </p>
      </div>
    </div>
  );
}
