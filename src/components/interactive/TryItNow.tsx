import { Zap } from "lucide-react";

interface TryItNowProps {
  children: React.ReactNode;
  title?: string;
}

export function TryItNow({ children, title = "Try it now" }: TryItNowProps) {
  return (
    <div className="my-6 rounded-2xl border-2 border-secondary-400 bg-secondary-50 overflow-hidden">
      <div className="flex items-center gap-2 bg-secondary-400 px-4 py-2.5">
        <Zap size={16} className="text-gray-900" fill="currentColor" />
        <span className="font-bold text-gray-900 text-sm">{title}</span>
      </div>
      <div className="px-4 py-4 text-sm text-gray-800 [&>p]:mb-2 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-1">
        {children}
      </div>
    </div>
  );
}
