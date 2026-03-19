import { useState } from "react";
import { motion } from "framer-motion";
import { Droplets, Plus } from "lucide-react";

export default function WaterTracker() {
  const [water, setWater] = useState(0);
  const goal = 2500;
  const pct = Math.min((water / goal) * 100, 100);

  const add = (ml: number) => setWater((w) => Math.min(w + ml, goal));

  return (
    <div className="surface-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Droplets className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-sm">Hidratação</h3>
        </div>
        <span className="text-data text-sm text-muted-foreground">
          {water}ml / {goal}ml
        </span>
      </div>

      <div className="h-3 bg-secondary rounded-full overflow-hidden mb-4">
        <motion.div
          className="h-full bg-primary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>

      <div className="flex gap-2">
        {[250, 500, 1000].map((ml) => (
          <button
            key={ml}
            onClick={() => add(ml)}
            className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg gradient-gold text-accent-foreground text-xs font-semibold transition-transform active:scale-95"
          >
            <Plus className="w-3 h-3" />
            {ml}ml
          </button>
        ))}
      </div>
    </div>
  );
}
