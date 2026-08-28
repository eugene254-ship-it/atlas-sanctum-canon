import React, { useState } from "react";
import {
  Compass,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Activity,
  Layers,
  ChevronRight,
  Plus,
  Play,
  FileText,
  AlertCircle
} from "lucide-react";
import { StudioProject, StudioPipelineStep, NavigationSpace } from "../../types";
import { INITIAL_STUDIO_PROJECT } from "../../data/seedData";
import { dispatchGeminiInquiry } from "../../services/api";

interface AtlasStudioViewProps {
  onNavigate: (space: NavigationSpace) => void;
  africaMode: boolean;
}

export const AtlasStudioView: React.FC<AtlasStudioViewProps> = ({
  onNavigate,
  africaMode,
}) => {
  const [project, setProject] = useState<StudioProject>(INITIAL_STUDIO_PROJECT);
  const [activeStepTab, setActiveStepTab] = useState<number>(INITIAL_STUDIO_PROJECT.currentStep);
  const [isDeconstructing, setIsDeconstructing] = useState(false);
  const [deconstructionOutput, setDeconstructionOutput] = useState<string | null>(null);

  const activeStep = project.steps.find((s) => s.stepNumber === activeStepTab) || project.steps[0];

  const handleRunFirstPrinciplesDeconstruction = async () => {
    setIsDeconstructing(true);
    setDeconstructionOutput(null);

    const prompt = `You are the Atlas Sanctum First-Principles Innovation Engine.
Deconstruct the following regenerative engineering project down to its foundational physics, basic material realities, and 10x ambition possibilities:
Project: "${project.title}"
Place Context: "${project.place}"
Problem Statement: "${project.problemStatement}"

Provide:
1. Fundamental Physics / Material Constraints (What is physically true?)
2. Elimination of Fake Costs / Artificial Intermediaries
3. The 10x Ambition Version (How do we achieve 10x greater scale at 1/10th the cost?)
4. The immediate 7-day micro-experiment that falsifies the riskiest assumption.`;

    const result = await dispatchGeminiInquiry(
      prompt,
      "You are the Atlas Studio First-Principles Engineering Engine. Be uncompromisingly rigorous, scientific, and grounded in real material realities."
    );

    setDeconstructionOutput(result);
    setIsDeconstructing(false);
  };

  return (
    <div className="space-y-8 animate-fadeIn text-[#f2f2f2] pb-20">
      {/* Header */}
      <div className="p-8 bg-[#0c0c0c] border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2.5 text-[10px] font-mono tracking-[0.3em] uppercase text-[#c5a059]">
            <Compass className="w-3.5 h-3.5" />
            <span>THE 13-STEP ACTION & INNOVATION PIPELINE</span>
          </div>
          <h2 className="font-serif font-light text-3xl sm:text-4xl text-white tracking-wide">
            Atlas Innovation Studio
          </h2>
          <p className="text-xs sm:text-sm text-white/50 font-serif italic max-w-2xl leading-relaxed">
            Where understanding becomes reality: transitioning from Socratic inquiry to system models, falsifiable experiment design, blended finance, and real-world deployment.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="px-4 py-2 bg-[#080808] border border-white/10 text-[10px] font-mono uppercase tracking-[0.2em] text-white/60">
            Pipeline Progress: <strong className="text-emerald-400">{project.progress}%</strong>
          </div>
        </div>
      </div>

      {/* Active Project Header Card */}
      <div className="p-8 bg-[#0c0c0c] border border-white/10 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2 text-[10px] font-mono uppercase tracking-wider text-[#c5a059]">
              <span className="px-2 py-0.5 bg-[#181308] border border-[#c5a059]/40">
                ACTIVE STUDIO INITIATIVE
              </span>
              <span>•</span>
              <span className="text-white/40">{project.place}</span>
            </div>
            <h3 className="font-serif font-light text-2xl text-white">
              {project.title}
            </h3>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleRunFirstPrinciplesDeconstruction}
              disabled={isDeconstructing}
              className="px-5 py-2.5 bg-[#c5a059] hover:bg-[#b08d48] text-[#080808] text-[10px] uppercase tracking-[0.25em] font-bold flex items-center space-x-2 transition-all disabled:opacity-50"
            >
              {isDeconstructing ? (
                <>
                  <Activity className="w-3.5 h-3.5 animate-spin" />
                  <span>DECONSTRUCTING...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>First-Principles Deconstruct</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="text-xs text-white/70 leading-relaxed font-sans">
          <strong className="text-white">Problem Context:</strong> {project.problemStatement}
        </div>
      </div>

      {/* Gemini First-Principles Live Synthesis Result */}
      {deconstructionOutput && (
        <div className="p-6 bg-[#0c0c0c] border border-[#c5a059]/40 space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-white/10 pb-3 text-[10px] font-mono uppercase tracking-[0.25em] text-[#c5a059]">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4" />
              <span>FIRST-PRINCIPLES DECONSTRUCTION ENGINE OUTPUT</span>
            </div>
            <button
              onClick={() => setDeconstructionOutput(null)}
              className="text-white/40 hover:text-white"
            >
              ✕ Close
            </button>
          </div>
          <div className="text-xs text-white/90 whitespace-pre-line font-mono bg-[#080808] p-5 border border-white/10 leading-relaxed">
            {deconstructionOutput}
          </div>
        </div>
      )}

      {/* 13-Step Horizontal Stepper */}
      <div className="p-6 bg-[#0c0c0c] border border-white/10 space-y-4 overflow-x-auto">
        <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.25em] text-white/40 mb-1">
          <span>THE 13-STEP RIGOROUS PIPELINE</span>
          <span>Step {activeStepTab} of 13</span>
        </div>

        <div className="flex items-center space-x-3 min-w-max">
          {project.steps.map((st) => {
            const isSelected = activeStepTab === st.stepNumber;
            const isCompleted = st.status === "completed";
            const isInProgress = st.status === "in-progress";

            return (
              <button
                key={st.stepNumber}
                onClick={() => setActiveStepTab(st.stepNumber)}
                className={`p-3.5 border text-left transition-all flex flex-col justify-between w-44 h-22 ${
                  isSelected
                    ? "bg-[#141414] border-[#c5a059] text-white shadow-md"
                    : isCompleted
                    ? "bg-[#080808] border-emerald-900/60 text-white/70 hover:border-emerald-700"
                    : isInProgress
                    ? "bg-[#080808] border-[#c5a059]/40 text-[#c5a059] hover:border-[#c5a059]"
                    : "bg-[#080808] border-white/5 text-white/30 hover:border-white/20"
                }`}
              >
                <div className="flex items-center justify-between text-[9px] font-mono">
                  <span>STEP {st.stepNumber.toString().padStart(2, "0")}</span>
                  {isCompleted && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                  {isInProgress && <Activity className="w-3 h-3 text-[#c5a059] animate-pulse" />}
                </div>
                <div className="font-serif text-xs font-light truncate">
                  {st.name}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Step Deep-Dive */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Step Details & Artifacts (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-8 bg-[#0c0c0c] border border-white/10 space-y-6">
            <div className="space-y-1.5 border-b border-white/10 pb-4">
              <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.25em] text-[#c5a059]">
                <span>STEP {activeStep.stepNumber}: {activeStep.name.toUpperCase()}</span>
                <span className="text-white/40">Status: {activeStep.status}</span>
              </div>
              <h3 className="font-serif font-light text-2xl text-white">
                {activeStep.question}
              </h3>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.25em]">
                Step Synthesis & Output
              </span>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed bg-[#080808] p-5 border border-white/5 font-sans">
                {activeStep.outputSummary}
              </p>
            </div>

            {/* Generated Artifacts */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.25em]">
                Connected Artifacts & Verified Proofs
              </span>
              {activeStep.artifacts.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {activeStep.artifacts.map((art, i) => (
                    <div
                      key={i}
                      className="px-3.5 py-2 bg-[#080808] border border-white/10 text-xs font-mono text-white/80 flex items-center space-x-2"
                    >
                      <FileText className="w-3.5 h-3.5 text-[#c5a059]" />
                      <span>{art}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 bg-[#080808] border border-white/5 text-xs font-mono text-white/30">
                  No artifacts generated yet for this pending phase.
                </div>
              )}
            </div>

            {/* Ambition Ladder Preview */}
            <div className="p-5 bg-[#080808] border border-white/10 space-y-3">
              <div className="text-[10px] font-mono text-[#c5a059] uppercase tracking-[0.25em]">
                Ambition Ladder: 10x Breakthrough vs Civilization Horizon
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-3 bg-[#111111] border border-white/5">
                  <strong className="text-emerald-400 font-mono text-[10px] uppercase">10x Breakthrough Path:</strong>{" "}
                  <span className="text-white/70 font-sans">{project.ambitionLadder.breakthrough10xPath}</span>
                </div>
                <div className="p-3 bg-[#111111] border border-white/5">
                  <strong className="text-purple-400 font-mono text-[10px] uppercase">Civilization Horizon:</strong>{" "}
                  <span className="text-white/70 font-sans">{project.ambitionLadder.civilizationPath}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Smallest Real-World Falsification Experiment (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-8 bg-[#0c0c0c] border border-white/10 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="font-serif font-light text-xl text-white flex items-center space-x-2">
                <Activity className="w-4 h-4 text-emerald-400" />
                <span>Smallest Real Experiment</span>
              </h3>
              <span className="text-[9px] font-mono text-emerald-400 uppercase bg-[#0a1610] px-2 py-0.5 border border-emerald-800">
                ACTIVE FIELD TEST
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-4 bg-[#080808] border border-white/10 space-y-1">
                <span className="font-mono text-white/40 uppercase text-[9px] tracking-wider">Experiment Title</span>
                <div className="font-serif font-normal text-white text-sm">
                  {project.smallestExperiment.name}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 bg-[#080808] border border-white/10 space-y-0.5 font-mono">
                  <span className="text-white/40 text-[9px] uppercase tracking-wider">Duration:</span>
                  <div className="text-white font-bold">{project.smallestExperiment.durationWeeks} Weeks</div>
                </div>

                <div className="p-3.5 bg-[#080808] border border-white/10 space-y-0.5 font-mono">
                  <span className="text-white/40 text-[9px] uppercase tracking-wider">Budget Required:</span>
                  <div className="text-[#c5a059] font-bold">${project.smallestExperiment.budgetUSD.toLocaleString()} USD</div>
                </div>
              </div>

              <div className="p-4 bg-[#080808] border border-emerald-900/40 space-y-1.5">
                <span className="font-mono text-emerald-400 uppercase text-[9px] tracking-wider">Success Metric</span>
                <p className="text-white/70 font-sans leading-relaxed">
                  {project.smallestExperiment.successMetric}
                </p>
              </div>

              <div className="p-4 bg-[#080808] border border-rose-900/40 space-y-1.5">
                <span className="font-mono text-rose-400 uppercase text-[9px] tracking-wider">Falsification Condition</span>
                <p className="text-white/70 font-sans leading-relaxed">
                  {project.smallestExperiment.falsificationCondition}
                </p>
              </div>
            </div>

            <button
              onClick={() => onNavigate("mission-control")}
              className="w-full py-3 bg-[#c5a059] hover:bg-[#b08d48] text-[#080808] text-[10px] uppercase tracking-[0.25em] font-bold flex items-center justify-center space-x-2 transition-all"
            >
              <span>Promote to Live Mission Control</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
