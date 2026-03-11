import { Download, FileText, BookOpen, CheckSquare } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { MobileNav } from "@/components/layout/MobileNav";

const resources = [
  {
    id: "checklist",
    title: "Responsibility Checklist",
    description:
      "A one-page checklist to complete before using any AI-generated content in your classroom. Covers accuracy, bias, privacy, and CAPS alignment.",
    icon: CheckSquare,
    color: "text-red-600",
    bg: "bg-red-50",
    filename: "responsibility-checklist.pdf",
    size: "Coming soon",
  },
  {
    id: "parts",
    title: "PARTS Framework Reference Card",
    description:
      "A quick-reference card summarising the PARTS prompting framework: Persona, Aim, Recipients, Theme, Structure. Print and keep near your desk.",
    icon: BookOpen,
    color: "text-blue-600",
    bg: "bg-blue-50",
    filename: "parts-framework-reference.pdf",
    size: "Coming soon",
  },
  {
    id: "prompt-library",
    title: "Printable Prompt Library",
    description:
      "All 25+ SA educator prompts in a printable format. Keep it as a reference when you are away from your computer.",
    icon: FileText,
    color: "text-green-600",
    bg: "bg-green-50",
    filename: "prompt-library-printable.pdf",
    size: "Coming soon",
  },
];

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-surface">
      <Header />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Downloads</h1>
          <p className="text-gray-600">
            Print these resources and keep them nearby for quick reference — especially useful during load shedding.
          </p>
        </div>

        <div className="space-y-4">
          {resources.map((resource) => {
            const Icon = resource.icon;
            return (
              <div
                key={resource.id}
                className="bg-white rounded-2xl border border-gray-200 p-5 flex items-start gap-4"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${resource.bg}`}
                >
                  <Icon size={22} className={resource.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 text-base mb-1">{resource.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{resource.description}</p>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-gray-100 text-gray-400 cursor-not-allowed">
                      <Download size={14} />
                      Download PDF
                    </span>
                    <span className="text-xs text-gray-400">{resource.size}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 rounded-2xl bg-primary-50 border border-primary-200 p-5">
          <h3 className="font-bold text-primary-800 mb-2">🔌 Works offline</h3>
          <p className="text-sm text-primary-700">
            Once you download these resources, they work without an internet connection.
            Print them and keep them in your classroom as a backup for load shedding.
          </p>
        </div>
      </div>
      <div className="pb-24 lg:pb-10" />
      <MobileNav />
    </div>
  );
}
