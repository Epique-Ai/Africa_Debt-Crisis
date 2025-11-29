import { cn } from "@/lib/utils";

interface RiskBadgeProps {
  level: 'Low' | 'Medium' | 'High' | 'Critical';
  className?: string;
}

export const RiskBadge = ({ level, className }: RiskBadgeProps) => {
  const getStyles = () => {
    switch (level) {
      case 'Low':
        return 'bg-success/20 text-success border-success/30';
      case 'Medium':
        return 'bg-warning/20 text-warning border-warning/30';
      case 'High':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'Critical':
        return 'bg-destructive/20 text-destructive border-destructive/30';
    }
  };

  return (
    <span className={cn(
      "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border",
      getStyles(),
      className
    )}>
      {level}
    </span>
  );
};
