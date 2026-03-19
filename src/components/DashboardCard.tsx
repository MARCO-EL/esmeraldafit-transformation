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

  return (
    <motion.button
      onClick={() => navigate(path)}
      className={`surface-card-hover w-full p-4 flex items-center gap-4 text-left rounded-2xl transition-all ${
        variant === "accent" ? "bg-emerald-light" : "bg-card"
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
        variant === "accent" ? "bg-primary" : "bg-secondary"
      }`}>
        <Icon className={`w-5 h-5 ${variant === "accent" ? "text-primary-foreground" : "text-primary"}`} />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-sm">{title}</h3>
        <p className="text-xs text-muted-foreground truncate">{description}</p>
      </div>
      <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
    </motion.button>
  );
}
