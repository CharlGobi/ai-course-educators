"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

interface QuizProps {
  questions: QuizQuestion[];
  title?: string;
  lessonKey?: string;
}

export function Quiz({ questions, title = "Quick check" }: QuizProps) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (questionIdx: number, optionIdx: number) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [questionIdx]: optionIdx }));
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length < questions.length) return;
    setSubmitted(true);
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
  };

  const score = submitted
    ? questions.filter((q, i) => answers[i] === q.correct).length
    : 0;

  return (
    <div className="my-6 rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm">
      <div className="bg-accent/5 px-4 py-3 border-b border-gray-200 flex items-center gap-2">
        <span className="text-lg">🧠</span>
        <span className="font-bold text-gray-800 text-sm">{title}</span>
      </div>

      <div className="p-4 space-y-5">
        {questions.map((q, qi) => (
          <div key={qi}>
            <p className="font-semibold text-sm text-gray-800 mb-2.5">
              {qi + 1}. {q.question}
            </p>
            <div className="space-y-2">
              {q.options.map((opt, oi) => {
                const isSelected = answers[qi] === oi;
                const isCorrect = q.correct === oi;
                const showResult = submitted;

                return (
                  <button
                    key={oi}
                    onClick={() => handleSelect(qi, oi)}
                    disabled={submitted}
                    className={cn(
                      "w-full text-left px-4 py-2.5 rounded-xl text-sm border-2 transition-all",
                      !showResult && isSelected
                        ? "border-primary-400 bg-primary-50 text-primary-800 font-medium"
                        : !showResult
                        ? "border-gray-200 hover:border-gray-300 bg-white text-gray-700"
                        : isCorrect
                        ? "border-green-400 bg-green-50 text-green-800 font-medium"
                        : isSelected && !isCorrect
                        ? "border-red-300 bg-red-50 text-red-700"
                        : "border-gray-200 bg-white text-gray-500"
                    )}
                  >
                    <span className="flex items-center gap-2">
                      {showResult && isCorrect && (
                        <CheckCircle2 size={15} className="text-green-500 flex-shrink-0" />
                      )}
                      {showResult && isSelected && !isCorrect && (
                        <XCircle size={15} className="text-red-400 flex-shrink-0" />
                      )}
                      {opt}
                    </span>
                  </button>
                );
              })}
            </div>

            {submitted && (
              <p className="mt-2 text-xs text-gray-600 bg-gray-50 rounded-lg px-3 py-2 border border-gray-100">
                <strong>Explanation:</strong> {q.explanation}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="px-4 pb-4 flex items-center gap-3">
        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={Object.keys(answers).length < questions.length}
            className="px-5 py-2.5 rounded-xl bg-accent text-white text-sm font-semibold disabled:opacity-40 hover:bg-accent-600 transition-colors"
          >
            Check my answers
          </button>
        ) : (
          <>
            <div
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold",
                score === questions.length
                  ? "bg-green-100 text-green-700"
                  : score >= Math.ceil(questions.length / 2)
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              )}
            >
              {score === questions.length ? "🎉" : score >= Math.ceil(questions.length / 2) ? "👍" : "📖"}
              {score} / {questions.length} correct
              {score === questions.length && " — Perfect!"}
            </div>
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-2.5 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <RotateCcw size={13} />
              Retry
            </button>
          </>
        )}
      </div>
    </div>
  );
}
