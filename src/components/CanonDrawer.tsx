import React, { useState } from "react";
import { X, BookOpen, Sparkles, CheckCircle, ChevronRight, Layers } from "lucide-react";
import { CANON_PILLARS } from "../data/canon";
import { CanonPillar } from "../types";

interface CanonDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPillar?: (pillar: CanonPillar) => void;
}

export const CanonDrawer: React.FC<CanonDrawerProps> = ({
  isOpen,
  onClose,
  onSelectPillar,
}) => {
  const [selectedPillar, setSelectedPillar] = useState<CanonPillar>(CANON_PILLARS[0]);
  const [filterCategory, setFilterCategory] = useState<string>("All");

  if (!isOpen) return null;

  const categories = ["All", "Foundations", "Dynamics", "Structures", "Pragmatics", "Mastery"];

  const filteredPillars = filterCategory === "All"
    ? CANON_PILLARS
    : CANON_PILLARS.filter((p) => p.category === filterCategory);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/90 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#080808] border-l border-white/10 w-full max-w-3xl h-full flex flex-col shadow-2xl text-[#f2f2f2] overflow-hidden">
        {/* Header */}
        <div className="px-8 py-5 border-b border-white/10 flex items-center justify-between bg-[#0c0c0c]">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-gradient-to-tr from-[#c5a059] to-[#8e6e3d] rounded-xs transform rotate-45 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-[#080808] transform -rotate-45" />
            </div>
            <div>
              <div className="flex items-center space-x-3">
                <h2 className="font-serif font-light text-xl tracking-[0.2em] uppercase text-white">
                  The Canon of Greatness
                </h2>
                <span className="text-[9px] uppercase tracking-[0.25em] font-mono px-2 py-0.5 border border-[#c5a059]/40 text-[#c5a059]">
                  20 PILLARS
                </span>
              </div>
              <p className="text-[10px] text-white/40 font-mono tracking-wider uppercase mt-0.5">
                The intellectual architecture & moral grammar of Atlas Sanctum
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white/40 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Pills */}
        <div className="px-8 py-3 border-b border-white/10 bg-[#080808] flex space-x-3 overflow-x-auto text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3.5 py-1 text-[10px] uppercase tracking-[0.25em] font-medium transition-colors whitespace-nowrap ${
                filterCategory === cat
                  ? "bg-[#c5a059] text-[#080808] font-bold"
                  : "text-white/40 hover:text-white border border-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Main Content Area (Two Columns: List + Details) */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Column: Pillar List */}
          <div className="w-2/5 border-r border-white/10 overflow-y-auto p-4 space-y-2 bg-[#0c0c0c]">
            {filteredPillars.map((pillar) => {
              const isSelected = selectedPillar.id === pillar.id;
              return (
                <button
                  key={pillar.id}
                  onClick={() => {
                    setSelectedPillar(pillar);
                    if (onSelectPillar) onSelectPillar(pillar);
                  }}
                  className={`w-full text-left p-3 transition-all flex items-center justify-between group ${
                    isSelected
                      ? "bg-[#141414] border-l-2 border-[#c5a059] text-white"
                      : "hover:bg-[#121212] text-white/40 hover:text-white border-l-2 border-transparent"
                  }`}
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <span
                      className={`text-[10px] font-mono w-5 h-5 flex items-center justify-center shrink-0 ${
                        isSelected
                          ? "bg-[#c5a059] text-[#080808] font-bold"
                          : "bg-white/5 text-white/40"
                      }`}
                    >
                      {pillar.sequenceOrder}
                    </span>
                    <span className="font-sans text-xs truncate">
                      {pillar.name}
                    </span>
                  </div>
                  <ChevronRight
                    className={`w-3.5 h-3.5 shrink-0 ${
                      isSelected ? "text-[#c5a059]" : "text-white/20 group-hover:text-white/60"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column: Selected Pillar Deep-Dive */}
          <div className="w-3/5 overflow-y-auto p-8 space-y-6 bg-[#080808]">
            <div>
              <div className="flex items-center space-x-2 text-[10px] uppercase tracking-[0.3em] font-mono text-[#c5a059] mb-1">
                <span>PILLAR #{selectedPillar.sequenceOrder}</span>
                <span>•</span>
                <span>{selectedPillar.category}</span>
              </div>
              <h3 className="font-serif font-light text-2xl text-white mb-4 tracking-wide">
                {selectedPillar.name}
              </h3>
              <blockquote className="p-4 bg-[#0c0c0c] border-l-2 border-[#c5a059] text-white/80 font-serif italic text-base leading-relaxed">
                "{selectedPillar.aphorism}"
              </blockquote>
            </div>

            {/* First Principles Section */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-mono text-[#c5a059] uppercase tracking-[0.3em] flex items-center space-x-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>First Principles</span>
              </h4>
              <div className="space-y-2">
                {selectedPillar.firstPrinciples.map((fp, i) => (
                  <div key={i} className="flex items-start space-x-2.5 text-xs text-white/70 font-sans">
                    <span className="text-[#c5a059] font-bold mt-0.5">—</span>
                    <span className="leading-relaxed">{fp}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Systemic Implication in Atlas */}
            <div className="p-5 bg-[#0c0c0c] border border-white/10 space-y-2">
              <h4 className="text-[10px] font-mono text-white/40 uppercase tracking-[0.25em] flex items-center space-x-2">
                <Layers className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>Systemic Architecture Implication</span>
              </h4>
              <p className="text-xs text-white/60 font-sans leading-relaxed">
                {selectedPillar.systemicImplication}
              </p>
            </div>

            {/* Sequence Path */}
            <div className="pt-4 border-t border-white/10 text-[10px] text-white/30 font-mono tracking-wider uppercase">
              The Canon Sequence: self-governance → understanding → truth → systems → humans → innovation → building → intelligence → civilization.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
