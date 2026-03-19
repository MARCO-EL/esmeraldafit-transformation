import { motion } from "framer-motion";
import { Flame, Zap, Target } from "lucide-react";

interface CalorieRingProps {
  consumed: number;
  goal: number;
  burned: number;
}

export default function CalorieRing({ consumed, goal, burned }: CalorieRingProps) {
  const remaining = Math.max(goal - consumed + burned, 0);
  const pct = Math.min(consumed / goal, 1);
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - pct * circumference;

  const stats = [
    { icon: Flame, label: "Consumidas", value: consumed, color: "text-orange-500", bg: "bg-orange-50" },
    { icon: Zap, label: "Queimadas", value: burned, color: "text-primary", bg: "bg-emerald-light" },
    { icon: Target, label: "Meta", value: goal, color: "text-accent", bg: "bg-gold-light" },
  ];

  return (
    <div className="surface-card p-6">
      <h3 className="font-bold text-sm mb-4 flex items-center gap-2">
        <Flame className="w-4 h-4 text-orange-500" />
        Calorias
      </h3>

      <div className="flex items-center gap-6">
        {/* Ring */}
        <div className="relative w-28 h-28 shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="54" fill="none" stroke="hsl(var(--secondary))" strokeWidth="10" />
            <motion.circle
              cx="60" cy="60" r="54" fill="none"
              stroke="hsl(var(--emerald))"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-data text-xl font-extrabold">{remaining}</span>
            <span className="text-[9px] text-muted-foreground font-medium">restantes</span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex-1 space-y-2">
          {stats.map((s) => (
            <div key={s.label} className={`flex items-center gap-2.5 p-2.5 rounded-xl ${s.bg}`}>
              <s.icon className={`w-4 h-4 ${s.color}`} />
              <div>
                <span className="text-data text-sm font-bold">{s.value}</span>
                <span className="text-[10px] text-muted-foreground ml-1">{s.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
