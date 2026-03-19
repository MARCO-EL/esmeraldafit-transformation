import { Home, Dumbbell, Apple, TrendingUp, BookOpen } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const tabs = [
  { icon: Home, label: "Início", path: "/" },
  { icon: Dumbbell, label: "Treinos", path: "/treinos" },
  { icon: Apple, label: "Nutrição", path: "/nutricao" },
  { icon: TrendingUp, label: "Progresso", path: "/progresso" },
  { icon: BookOpen, label: "Guia", path: "/guia" },
];

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-t border-border">
      <div className="flex items-center justify-around max-w-lg mx-auto py-2 px-2">
        {tabs.map((tab) => {
          const active = location.pathname === tab.path;
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className="relative flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition-colors"
            >
              {active && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute inset-0 bg-emerald-light rounded-xl"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <tab.icon
                className={`relative z-10 w-5 h-5 transition-colors ${active ? "text-primary" : "text-muted-foreground"}`}
              />
              <span
                className={`relative z-10 text-[10px] font-semibold transition-colors ${active ? "text-primary" : "text-muted-foreground"}`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
