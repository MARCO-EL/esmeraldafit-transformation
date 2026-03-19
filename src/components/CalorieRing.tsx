import { motion } from "framer-motion";

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

  return (
    <div className="surface-card p-6 flex flex-col items-center">
      <div className="relative w-36 h-36">
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
            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-data text-2xl font-bold">{remaining}</span>
          <span className="text-[10px] text-muted-foreground font-medium">kcal restantes</span>
        </div>
      </div>

      <div className="flex gap-6 mt-4 text-xs">
        <div className="text-center">
          <span className="text-data text-sm font-bold">{consumed}</span>
          <p className="text-muted-foreground">Consumidas</p>
        </div>
        <div className="text-center">
          <span className="text-data text-sm font-bold">{burned}</span>
          <p className="text-muted-foreground">Queimadas</p>
        </div>
        <div className="text-center">
          <span className="text-data text-sm font-bold">{goal}</span>
          <p className="text-muted-foreground">Meta</p>
        </div>
      </div>
    </div>
  );
}
