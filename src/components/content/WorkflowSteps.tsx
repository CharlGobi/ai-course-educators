interface Step {
  title: string;
  description: string;
}

interface WorkflowStepsProps {
  steps: Step[];
  title?: string;
}

export function WorkflowSteps({ steps, title }: WorkflowStepsProps) {
  return (
    <div className="my-8">
      {title && (
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
          {title}
        </p>
      )}
      <div className="flex flex-col sm:flex-row gap-3">
        {steps.map((step, idx) => (
          <div key={idx} className="flex sm:flex-col items-start sm:items-center flex-1 gap-3 sm:gap-0">
            {/* Step card */}
            <div className="flex-1 sm:w-full rounded-xl border-2 border-gray-100 bg-white p-4 flex flex-col">
              {/* Number badge */}
              <div className="w-8 h-8 rounded-full bg-[#002395] flex items-center justify-center mb-3 flex-shrink-0">
                <span className="text-white text-sm font-bold">{idx + 1}</span>
              </div>
              <p className="font-semibold text-gray-900 text-sm mb-1">{step.title}</p>
              <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
            </div>

            {/* Connector arrow (hidden after last step) */}
            {idx < steps.length - 1 && (
              <div className="flex-shrink-0 sm:hidden text-gray-300 mt-1">
                <svg className="w-5 h-5 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Desktop connector arrows — rendered as a separate row */}
      <div className="hidden sm:flex mt-1 px-2">
        {steps.map((_, idx) => (
          <div key={idx} className="flex-1 flex justify-end items-center pr-3">
            {idx < steps.length - 1 && (
              <svg className="w-5 h-5 text-gray-300 -mr-6 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
