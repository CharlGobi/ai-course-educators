import { MapPin } from "lucide-react";

interface SAExampleProps {
  children: React.ReactNode;
  title?: string;
}

export function SAExample({ children, title = "South African example" }: SAExampleProps) {
  return (
    <div className="my-6 rounded-2xl border border-primary-200 bg-primary-50 overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 bg-primary-100 border-b border-primary-200">
        <MapPin size={14} className="text-primary-600 flex-shrink-0" />
        <span className="font-bold text-primary-700 text-xs uppercase tracking-wide">
          {title}
        </span>
      </div>
      <div className="px-4 py-4 text-sm text-gray-800 [&>p]:mb-2 last:[&>p]:mb-0 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-1">
        {children}
      </div>
    </div>
  );
}
