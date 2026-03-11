import { Lightbulb } from "lucide-react";

interface KeyPointProps {
  children: React.ReactNode;
  title?: string;
  variant?: "info" | "warning" | "tip" | "important";
}

const styles = {
  info: "bg-blue-50 border-blue-200 text-blue-800",
  warning: "bg-amber-50 border-amber-200 text-amber-800",
  tip: "bg-green-50 border-green-200 text-green-800",
  important: "bg-purple-50 border-purple-200 text-purple-800",
};

const icons = {
  info: "ℹ️",
  warning: "⚠️",
  tip: "💡",
  important: "📌",
};

export function KeyPoint({ children, title, variant = "tip" }: KeyPointProps) {
  return (
    <div className={`my-5 rounded-xl border-2 p-4 ${styles[variant]}`}>
      <div className="flex items-start gap-2">
        <span className="text-lg flex-shrink-0">{icons[variant]}</span>
        <div>
          {title && (
            <p className="font-bold text-sm mb-1">{title}</p>
          )}
          <div className="text-sm [&>p]:mb-1 last:[&>p]:mb-0">{children}</div>
        </div>
      </div>
    </div>
  );
}
