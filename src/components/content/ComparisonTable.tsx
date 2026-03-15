interface ComparisonRow {
  left: string;
  right: string;
}

interface ComparisonTableProps {
  title?: string;
  leftHeading: string;
  rightHeading: string;
  leftIcon?: string;
  rightIcon?: string;
  rows: ComparisonRow[];
}

export function ComparisonTable({
  title,
  leftHeading,
  rightHeading,
  leftIcon = "⚠️",
  rightIcon = "✅",
  rows,
}: ComparisonTableProps) {
  return (
    <div className="my-8">
      {title && (
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
          {title}
        </p>
      )}
      <div className="rounded-2xl border-2 border-gray-100 overflow-hidden">
        {/* Header row */}
        <div className="grid grid-cols-2">
          <div className="bg-[#FFB612] px-4 py-3">
            <span className="font-semibold text-sm text-gray-900">{leftHeading}</span>
          </div>
          <div className="bg-[#007A4D] px-4 py-3">
            <span className="font-semibold text-sm text-white">{rightHeading}</span>
          </div>
        </div>

        {/* Body rows */}
        {rows.map((row, idx) => (
          <div
            key={idx}
            className={`grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-gray-100 ${
              idx % 2 === 0 ? "bg-white" : "bg-gray-50"
            } ${idx < rows.length - 1 ? "border-b border-gray-100" : ""}`}
          >
            <div className="px-4 py-3 flex items-start gap-2">
              <span className="flex-shrink-0 text-sm mt-0.5">{leftIcon}</span>
              <span className="text-sm text-gray-700">{row.left}</span>
            </div>
            <div className="px-4 py-3 flex items-start gap-2">
              <span className="flex-shrink-0 text-sm mt-0.5">{rightIcon}</span>
              <span className="text-sm text-gray-700">{row.right}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
