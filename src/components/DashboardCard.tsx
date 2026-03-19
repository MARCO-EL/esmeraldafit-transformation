import { motion } from "framer-motion";
import { ChevronRight, LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface DashboardCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  path: string;
  variant?: "default" | "accent";
}

export default function DashboardCard({ icon: Icon, title, description, path, variant = "default" }: DashboardCardProps) {
  const navigate = useNavigate();

  const isAccent = variant === "accent";

  return (
    <motion.button
      onClick={() => navigate(path)}
      className={`w-full p-4 flex items-center gap-4 text-left rounded-2xl transition-all
        ${isAccent ? "bg-emerald-light" : "bg-card"}
        surface-card-hover
      `}
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
        isAccent ? "bg-primary" : "bg-secondary"
      }`}>
        <Icon className={`w-5 h-5 ${isAccent ? "text-primary-foreground" : "text-primary"}`} />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-sm">{title}</h3>
        <p className="text-[11px] text-muted-foreground truncate mt-0.5">{description}</p>
      </div>
      <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
    </motion.button>
  );
}
