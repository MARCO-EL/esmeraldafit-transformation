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
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-sm flex items-center gap-2">
          <Droplets className="w-4 h-4 text-blue-500" />
          Hidratação
        </h3>
        <span className="text-data text-xs font-semibold text-muted-foreground">
          {water}ml <span className="text-[10px] font-normal">/ {goal}ml</span>
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-3 bg-secondary rounded-full overflow-hidden mb-4">
        <motion.div
          className="h-full rounded-full"
          style={{ background: "linear-gradient(90deg, hsl(200, 80%, 55%), hsl(190, 90%, 45%))" }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-3 gap-2">
        {[250, 500, 1000].map((ml) => (
          <button
            key={ml}
            onClick={() => add(ml)}
            className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl gradient-gold text-accent-foreground text-xs font-bold shadow-sm active:scale-95 transition-transform"
          >
            <Plus className="w-3.5 h-3.5" />
            {ml}ml
          </button>
        ))}
      </div>
    </div>
  );
}
