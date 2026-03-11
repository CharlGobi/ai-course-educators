"use client";

import Link from "next/link";
import {
  Clock, CheckCircle2, BookOpen, MessageSquare, Calendar,
  Lightbulb, Smartphone, Shield, Wrench, Award, ChevronRight
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatMinutes } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import type { Module } from "@/lib/types";

const iconMap: Record<string, LucideIcon> = {
  wave: BookOpen,
  "message-square": MessageSquare,
  calendar: Calendar,
  lightbulb: Lightbulb,
  smartphone: Smartphone,
  shield: Shield,
  toolbox: Wrench,
  award: Award,
};

interface ModuleCardProps {
  module: Module;
  moduleNumber: number;
  progress: number;
  isComplete: boolean;
}

export function ModuleCard({ module, moduleNumber, progress, isComplete }: ModuleCardProps) {
  const Icon = iconMap[module.icon] ?? BookOpen;
  const firstLesson = module.lessons[0];
  const lessonPath = `/modules/${module.id}/${firstLesson.id}`;

  return (
    <Link href={lessonPath} className="group block">
      <div
        className={cn(
          "relative bg-white rounded-2xl border-2 p-5 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5",
          isComplete ? "border-green-200" : "border-gray-100 hover:border-gray-200"
        )}
      >
        {/* Complete badge */}
        {isComplete && (
          <div className="absolute top-3 right-3">
            <CheckCircle2 size={20} className="text-green-500" />
          </div>
        )}

        {/* Icon + number */}
        <div className="flex items-start gap-3 mb-3">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: `${module.color}20` }}
          >
            <Icon size={22} style={{ color: module.color }} />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Module {moduleNumber}
            </p>
            <h3 className="font-bold text-gray-900 text-base leading-snug group-hover:text-primary-600 transition-colors">
              {module.title}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 leading-relaxed mb-3 line-clamp-2">
          {module.description}
        </p>

        {/* Meta row */}
        <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {formatMinutes(module.estimatedMinutes)}
          </span>
          <span>•</span>
          <span>{module.lessons.length} lessons</span>
        </div>

        {/* Progress bar */}
        {progress > 0 && (
          <div className="space-y-1">
            <Progress value={progress} className="h-1.5" />
            <p className="text-xs text-gray-400">{progress}% complete</p>
          </div>
        )}

        {/* CTA arrow */}
        <div
          className={cn(
            "flex items-center gap-1 text-xs font-semibold mt-3 transition-colors",
            isComplete ? "text-green-600" : "text-primary-600 group-hover:text-primary-700"
          )}
        >
          {isComplete ? "Review module" : progress > 0 ? "Continue" : "Start module"}
          <ChevronRight size={13} />
        </div>
      </div>
    </Link>
  );
}
