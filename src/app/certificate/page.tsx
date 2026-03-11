"use client";

import { useState } from "react";
import { Award, Download, Check } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { MobileNav } from "@/components/layout/MobileNav";
import { useProgressStore } from "@/store/progressStore";

export default function CertificatePage() {
  const overallProgress = useProgressStore((s) => s.getOverallProgress());
  const certificateName = useProgressStore((s) => s.certificateName);
  const setCertificateName = useProgressStore((s) => s.setCertificateName);
  const [name, setName] = useState(certificateName);
  const [generated, setGenerated] = useState(false);

  const handleGenerate = () => {
    if (!name.trim()) return;
    setCertificateName(name);
    setGenerated(true);
  };

  const today = new Date().toLocaleDateString("en-ZA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-surface">
      <Header />
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-secondary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Award size={32} className="text-secondary-600" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
            Certificate of Completion
          </h1>
          <p className="text-gray-600">
            Complete all lessons to earn your certificate. Your progress: {overallProgress}%
          </p>
        </div>

        {overallProgress < 100 && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-8 text-center">
            <p className="text-sm font-semibold text-amber-800">
              You have completed {overallProgress}% of the course.
            </p>
            <p className="text-sm text-amber-700 mt-1">
              Finish all lessons to unlock your certificate.
            </p>
          </div>
        )}

        {/* Certificate preview */}
        <div
          id="certificate"
          className="bg-white rounded-2xl border-4 border-primary-500 p-8 text-center mb-6 shadow-lg relative overflow-hidden"
        >
          {/* SA flag stripe */}
          <div className="absolute top-0 left-0 right-0 h-2 flex">
            <div className="flex-1 bg-sa-green" />
            <div className="flex-1 bg-sa-gold" />
            <div className="flex-1 bg-sa-blue" />
            <div className="flex-1 bg-white" />
            <div className="flex-1 bg-sa-red" />
            <div className="flex-1 bg-sa-black" />
          </div>

          <div className="mt-4">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award size={24} className="text-primary-600" />
            </div>

            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
              Certificate of Completion
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              AI as Your Teaching Assistant
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              A Guide for South African Educators
            </p>

            <p className="text-sm text-gray-600 mb-2">This certifies that</p>
            <p
              className="text-3xl font-extrabold text-primary-600 mb-2"
              style={{ fontFamily: "Georgia, serif" }}
            >
              {name || "Your Name Here"}
            </p>
            <p className="text-sm text-gray-600 mb-4">
              has successfully completed this self-paced professional development course
              covering AI tools, responsible use, and practical applications for
              South African educators.
            </p>

            <div className="flex items-center justify-center gap-8 mt-4">
              <div className="text-center">
                <p className="text-xs text-gray-500">Completed</p>
                <p className="text-sm font-semibold text-gray-700">{today}</p>
              </div>
              <div className="w-px h-8 bg-gray-200" />
              <div className="text-center">
                <p className="text-xs text-gray-500">Modules</p>
                <p className="text-sm font-semibold text-gray-700">8 completed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Name input */}
        {!generated ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Your full name (as it should appear on the certificate)
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Nomsa Dlamini"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
              />
            </div>
            <button
              onClick={handleGenerate}
              disabled={!name.trim() || overallProgress < 100}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-primary-500 text-white font-bold text-sm hover:bg-primary-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <Award size={16} />
              Generate my certificate
            </button>
            {overallProgress < 100 && (
              <p className="text-xs text-center text-gray-500">
                Complete all lessons first to unlock this button.
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center gap-2 bg-green-50 rounded-xl px-4 py-3 border border-green-200">
              <Check size={16} className="text-green-600" />
              <p className="text-sm font-semibold text-green-700">
                Certificate ready for {name}!
              </p>
            </div>
            <button
              onClick={() => window.print()}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gray-900 text-white font-bold text-sm hover:bg-gray-800 transition-colors"
            >
              <Download size={16} />
              Print / Save as PDF
            </button>
            <p className="text-xs text-center text-gray-500">
              Use your browser's print function and select "Save as PDF" to save a digital copy.
            </p>
          </div>
        )}
      </div>
      <div className="pb-24 lg:pb-10" />
      <MobileNav />
    </div>
  );
}
