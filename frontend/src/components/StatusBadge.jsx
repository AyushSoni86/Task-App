import { CheckCircle2, Circle, Clock } from "lucide-react";

const StatusBadge = ({ status }) => {
  const configs = {
    OPEN: { color: "bg-blue-100 text-blue-700 border-blue-200", icon: Circle },
    IN_PROGRESS: {
      color: "bg-amber-100 text-amber-700 border-amber-200",
      icon: Clock,
    },
    DONE: {
      color: "bg-green-100 text-green-700 border-green-200",
      icon: CheckCircle2,
    },
  };

  const config = configs[status] || configs.OPEN;
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${config.color}`}
    >
      <Icon className="w-3.5 h-3.5" />
      {status.replace("_", " ")}
    </span>
  );
};

export default StatusBadge;
