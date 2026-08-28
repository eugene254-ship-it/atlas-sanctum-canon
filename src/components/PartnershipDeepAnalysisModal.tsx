import React, { useState } from "react";
import { PartnershipTarget, SevenCapitalType } from "../types";
import {
  X,
  ShieldCheck,
  CheckCircle2,
  Award,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  Layers,
  ArrowRight,
  Send,
  Download,
  DollarSign,
  Activity,
  FileCheck,
  Zap,
  Globe,
  Sliders
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface PartnershipDeepAnalysisModalProps {
  partner: PartnershipTarget | null;
  isOpen: boolean;
  onClose: () => void;
  onSyncToSystem: (partner: PartnershipTarget) => void;
  isSynced?: boolean;
}

const DEFAULT_7CAP_DATA: Record<
  SevenCapitalType,
  {
    score: number;
    valueCreated: string;
    valuePreserved: string;
    riskOrDisplacement: string;
    leverageMechanism: string;
  }
> = {
  Natural: {
    score: 92,
    valueCreated: "High-resolution geospatial watershed monitoring across 14 Pan-African river basins.",
    valuePreserved: "Prevents irreversible aquifer depletion and urban wetland encroachment.",
    riskOrDisplacement: "Requires continuous local calibration to prevent synthetic satellite bias.",
    leverageMechanism: "Donella Meadows #3 (Information flows & real-time telemetry).",
  },
  Human: {
    score: 88,
    valueCreated: "Agronomic decision support deployed to 10M smallholder farmers via voice/SMS.",
    valuePreserved: "Protects intergenerational indigenous agrarian memory and regenerative crop rotation.",
    riskOrDisplacement: "Mitigates algorithmic dependency through vernacular dialect grounding.",
    leverageMechanism: "Donella Meadows #4 (Power to add, evolve, or self-organize system structure).",
  },
  Social: {
    score: 85,
    valueCreated: "Empowers 5,000 decentralized youth ecological maintenance cooperatives with direct pay rails.",
    valuePreserved: "Strengthens polycentric communal stewardship and civic trust.",
    riskOrDisplacement: "Requires transparent participatory governance to prevent local capture.",
    leverageMechanism: "Donella Meadows #5 (Rules of the system & incentives).",
  },
  Intellectual: {
    score: 96,
    valueCreated: "Sovereign foundation models fine-tuned on African environmental research commons.",
    valuePreserved: "Codifies complex agro-ecological physics into verifiable open algorithms.",
    riskOrDisplacement: "Guards against extractive closed-model intellectual property lock-in.",
    leverageMechanism: "Donella Meadows #2 (Mindset or paradigm out of which the system arises).",
  },
  Financial: {
    score: 90,
    valueCreated: "Unlocks $2.5B blended concessional tranche stack with 40-year patient horizons.",
    valuePreserved: "Insulates sovereign municipalities from predatory foreign currency debt traps.",
    riskOrDisplacement: "Requires strict non-extractive cap on multi-capital return rates.",
    leverageMechanism: "Donella Meadows #8 (Strength of negative feedback loops to maintain balance).",
  },
  Physical: {
    score: 84,
    valueCreated: "Deploys 50,000 edge IoT sensor clusters and decentralized solar chilling nodes.",
    valuePreserved: "Extends physical infrastructure lifespan through proactive predictive maintenance.",
    riskOrDisplacement: "Mitigates electronic waste via modular circular hardware standard.",
    leverageMechanism: "Donella Meadows #10 (Structure of material stocks and flows).",
  },
  Institutional: {
    score: 94,
    valueCreated: "Harmonizes 54-state African DPI standards with verifiable satellite verification.",
    valuePreserved: "Safeguards constitutional human dignity and environmental rights.",
    riskOrDisplacement: "Ensures open auditability across all ministerial workflow integrations.",
    leverageMechanism: "Donella Meadows #1 (Power to transcend paradigms & civilizational design).",
  },
};

export const PartnershipDeepAnalysisModal: React.FC<PartnershipDeepAnalysisModalProps> = ({
  partner,
  isOpen,
  onClose,
  onSyncToSystem,
  isSynced = false,
}) => {
  const [activeTab, setActiveTab] = useState<"capitals" | "moral" | "roadmap" | "telemetry">("capitals");
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  if (!isOpen || !partner) return null;

  const priorityColor =
    partner.strategicPriority === "High"
      ? "bg-emerald-950/80 text-emerald-300 border-emerald-600"
      : partner.strategicPriority === "Medium"
      ? "bg-amber-950/80 text-amber-300 border-amber-600"
      : "bg-sky-950/80 text-sky-300 border-sky-600";

  const handleDownloadReport = () => {
    setExportNotice(`Dossier exported: ${partner.organization}-7Capitals-ReportCard.json`);
    setTimeout(() => setExportNotice(null), 3000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative w-full max-w-5xl bg-[#0a0a0a] border border-[#c5a059]/60 shadow-2xl overflow-hidden my-8"
        >
          {/* Top Decorative Border Accent */}
          <div className="h-1 w-full bg-gradient-to-r from-[#c5a059] via-emerald-400 to-sky-400" />

          {/* Modal Header */}
          <div className="p-6 sm:p-8 bg-[#0e0e0e] border-b border-white/10 flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-2 max-w-3xl">
              <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono uppercase tracking-[0.25em]">
                <span className="px-2.5 py-0.5 bg-[#1a1811] text-[#c5a059] border border-[#c5a059]/40 font-bold flex items-center space-x-1">
                  <Sparkles className="w-3 h-3" />
                  <span>SIMULATED 7-CAPITALS DEEP ANALYSIS REPORT CARD</span>
                </span>
                <span className={`px-2.5 py-0.5 border font-bold ${priorityColor}`}>
                  {partner.strategicPriority || "High"} Strategic Priority
                </span>
                <span className="text-white/40">ID: {partner.id}</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal flex items-center gap-3">
                <span>{partner.organization}</span>
                <span className="text-xs font-mono px-3 py-1 bg-white/5 border border-white/10 text-white/60">
                  {partner.category}
                </span>
              </h2>

              <p className="text-xs sm:text-sm text-white/70 font-sans">
                {partner.strategicRole}
              </p>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 bg-[#141414] hover:bg-[#202020] border border-white/10 text-white/60 hover:text-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap items-center justify-between border-b border-white/10 bg-[#080808] px-6 sm:px-8">
            <div className="flex space-x-1 sm:space-x-4">
              <button
                onClick={() => setActiveTab("capitals")}
                className={`py-3 px-3 text-xs font-mono uppercase tracking-wider border-b-2 transition-all flex items-center space-x-2 ${
                  activeTab === "capitals"
                    ? "border-[#c5a059] text-[#c5a059] font-bold"
                    : "border-transparent text-white/50 hover:text-white"
                }`}
              >
                <DollarSign className="w-3.5 h-3.5" />
                <span>7-Capitals Alignment</span>
              </button>

              <button
                onClick={() => setActiveTab("moral")}
                className={`py-3 px-3 text-xs font-mono uppercase tracking-wider border-b-2 transition-all flex items-center space-x-2 ${
                  activeTab === "moral"
                    ? "border-[#c5a059] text-[#c5a059] font-bold"
                    : "border-transparent text-white/50 hover:text-white"
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Socratic Moral Audit</span>
              </button>

              <button
                onClick={() => setActiveTab("roadmap")}
                className={`py-3 px-3 text-xs font-mono uppercase tracking-wider border-b-2 transition-all flex items-center space-x-2 ${
                  activeTab === "roadmap"
                    ? "border-[#c5a059] text-[#c5a059] font-bold"
                    : "border-transparent text-white/50 hover:text-white"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Multi-Year Ingress Roadmap</span>
              </button>

              <button
                onClick={() => setActiveTab("telemetry")}
                className={`py-3 px-3 text-xs font-mono uppercase tracking-wider border-b-2 transition-all flex items-center space-x-2 ${
                  activeTab === "telemetry"
                    ? "border-[#c5a059] text-[#c5a059] font-bold"
                    : "border-transparent text-white/50 hover:text-white"
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                <span>Falsification & Telemetry</span>
              </button>
            </div>

            {/* Alignment Score Badge */}
            <div className="hidden sm:flex items-center space-x-2 py-2 text-xs font-mono">
              <span className="text-white/40">Readiness Score:</span>
              <span className="text-emerald-400 font-bold text-sm">{partner.readinessScore}%</span>
            </div>
          </div>

          {/* Modal Body Content */}
          <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
            {/* Tab 1: 7-Capitals Alignment */}
            {activeTab === "capitals" && (
              <div className="space-y-6 animate-fadeIn">
                {/* Executive Multi-Capital Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 bg-[#111111] border border-white/10 space-y-1">
                    <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">
                      Net Multi-Capital Yield
                    </div>
                    <div className="font-serif text-2xl text-white font-light">+89.4 / 100</div>
                    <p className="text-[11px] text-white/50 font-sans">
                      Positive generative delta across all 7 ecological, human, and social ledgers.
                    </p>
                  </div>

                  <div className="p-4 bg-[#111111] border border-white/10 space-y-1">
                    <div className="text-[10px] font-mono text-[#c5a059] uppercase tracking-wider">
                      Highest Leverage Capital
                    </div>
                    <div className="font-serif text-2xl text-white font-light">
                      {partner.category.includes("AI")
                        ? "Intellectual & Physical"
                        : partner.category.includes("Finance")
                        ? "Financial & Institutional"
                        : "Natural & Social"}
                    </div>
                    <p className="text-[11px] text-white/50 font-sans">
                      Key systemic fulcrum for catalytic compound acceleration.
                    </p>
                  </div>

                  <div className="p-4 bg-[#111111] border border-white/10 space-y-1">
                    <div className="text-[10px] font-mono text-sky-400 uppercase tracking-wider">
                      Extractive Risk Coefficient
                    </div>
                    <div className="font-serif text-2xl text-white font-light">0.04 (Negligible)</div>
                    <p className="text-[11px] text-white/50 font-sans">
                      Protected by open data standards & decentralized community custodianship.
                    </p>
                  </div>
                </div>

                {/* 7-Capitals Detailed Breakdown Grid */}
                <div className="space-y-3">
                  <h4 className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#c5a059]">
                    Detailed 7-Capitals Ledger Assessment
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(Object.keys(DEFAULT_7CAP_DATA) as SevenCapitalType[]).map((cap) => {
                      const item = DEFAULT_7CAP_DATA[cap];
                      return (
                        <div
                          key={cap}
                          className="p-4 bg-[#0d0d0d] border border-white/10 space-y-3 hover:border-white/20 transition-all"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-serif text-sm text-white font-medium flex items-center space-x-2">
                              <span className="w-2 h-2 rounded-full bg-[#c5a059]" />
                              <span>{cap} Capital</span>
                            </span>
                            <div className="flex items-center space-x-2 font-mono text-xs">
                              <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-[#c5a059] to-emerald-400"
                                  style={{ width: `${item.score}%` }}
                                />
                              </div>
                              <span className="text-emerald-400 font-bold">{item.score}%</span>
                            </div>
                          </div>

                          <div className="space-y-1.5 text-xs font-sans">
                            <div className="text-white/80">
                              <strong className="text-emerald-400 font-mono text-[10px] uppercase">Value Created:</strong>{" "}
                              {item.valueCreated}
                            </div>
                            <div className="text-white/60">
                              <strong className="text-sky-400 font-mono text-[10px] uppercase">Preserved:</strong>{" "}
                              {item.valuePreserved}
                            </div>
                            <div className="text-white/50 text-[11px]">
                              <strong className="text-amber-400 font-mono text-[10px] uppercase">Leverage:</strong>{" "}
                              {item.leverageMechanism}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Socratic Moral Audit */}
            {activeTab === "moral" && (
              <div className="space-y-6 animate-fadeIn">
                <div className="p-4 bg-[#14120b] border border-[#c5a059]/40 space-y-2">
                  <div className="flex items-center space-x-2 text-[10px] font-mono text-[#c5a059] uppercase tracking-[0.2em]">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Moral Intelligence & Human Dignity Verdict: SANCTIONED</span>
                  </div>
                  <p className="text-xs text-white/80 font-sans leading-relaxed">
                    This partnership blueprint strictly satisfies the Atlas Sanctum Moral Intelligence Canon: zero extractive rent-seeking, decentralized community autonomy, open epistemic verification, and complete physical reversibility.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-[#0d0d0d] border border-white/10 space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-white font-bold">1. Human Dignity & Agency</span>
                      <span className="text-emerald-400 font-bold">PASS (100%)</span>
                    </div>
                    <p className="text-xs text-white/60 font-sans">
                      All AI advisories and payment rails are opt-in, decentralized, and respect local customary rights.
                    </p>
                  </div>

                  <div className="p-4 bg-[#0d0d0d] border border-white/10 space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-white font-bold">2. Ecological Stewardship</span>
                      <span className="text-emerald-400 font-bold">PASS (98%)</span>
                    </div>
                    <p className="text-xs text-white/60 font-sans">
                      Strict non-depletion guarantee for soil biomass, biodiversity corridors, and freshwater recharge.
                    </p>
                  </div>

                  <div className="p-4 bg-[#0d0d0d] border border-white/10 space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-white font-bold">3. Distributive Justice</span>
                      <span className="text-emerald-400 font-bold">PASS (94%)</span>
                    </div>
                    <p className="text-xs text-white/60 font-sans">
                      Economic surplus accrues directly to grassroots maintenance guilds and smallholder custodians.
                    </p>
                  </div>

                  <div className="p-4 bg-[#0d0d0d] border border-white/10 space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-white font-bold">4. 100x Reversibility Guarantee</span>
                      <span className="text-emerald-400 font-bold">PASS (96%)</span>
                    </div>
                    <p className="text-xs text-white/60 font-sans">
                      Systems can be dismantled or transitioned to local open-source infrastructure without catastrophic lock-in.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Multi-Year Ingress Roadmap */}
            {activeTab === "roadmap" && (
              <div className="space-y-6 animate-fadeIn">
                <div className="space-y-4">
                  <div className="p-4 bg-[#0d0d0d] border-l-2 border-[#c5a059] space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-[#c5a059] font-bold">Phase 1: Ingress & Protocol Binding (Months 1–6)</span>
                      <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px]">
                        ACTIVE
                      </span>
                    </div>
                    <ul className="text-xs text-white/70 font-sans space-y-1">
                      <li>• Establish secure API gateways and federated data exchange standards.</li>
                      <li>• Align telemetry data formats with Planetary Boundaries and 7-Capitals taxonomies.</li>
                      <li>• Execute bilateral legal charter confirming open-knowledge research commons.</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-[#0d0d0d] border-l-2 border-sky-400 space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-sky-400 font-bold">Phase 2: Living Lab Sandboxes (Months 7–18)</span>
                      <span className="px-2 py-0.5 bg-white/5 border border-white/10 text-white/50 text-[10px]">
                        BLUEPRINT READY
                      </span>
                    </div>
                    <ul className="text-xs text-white/70 font-sans space-y-1">
                      <li>• Deploy field prototypes in Nairobi Basin and Rift Valley agricultural corridors.</li>
                      <li>• Benchmark AI model predictions against randomized controlled trial field outcomes.</li>
                      <li>• Synthesize multi-agent swarm deliberations into published empirical whitepapers.</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-[#0d0d0d] border-l-2 border-emerald-400 space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-emerald-400 font-bold">Phase 3: Continental Sovereign Rollout (Months 19–36)</span>
                      <span className="px-2 py-0.5 bg-white/5 border border-white/10 text-white/50 text-[10px]">
                        EXPLORING
                      </span>
                    </div>
                    <ul className="text-xs text-white/70 font-sans space-y-1">
                      <li>• Integrate verified protocols across 54 AU member states and municipal treasuries.</li>
                      <li>• Mobilize catalytic $10B+ blended finance tranches for regenerative infrastructure.</li>
                      <li>• Transfer full operational custodianship to polycentric African research institutions.</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 4: Falsification & Telemetry */}
            {activeTab === "telemetry" && (
              <div className="space-y-4 animate-fadeIn">
                <div className="p-4 bg-[#0d0d0d] border border-white/10 space-y-3">
                  <h4 className="text-[10px] font-mono uppercase tracking-wider text-[#c5a059]">
                    Falsification Criteria & Empirical Benchmarks
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                    <div className="p-3 bg-[#080808] border border-white/5 space-y-1">
                      <span className="text-white/50 text-[10px]">FALSIFICATION HYPOTHESIS:</span>
                      <p className="text-white/80 font-sans text-xs">
                        If satellite-guided bio-drainage fails to reduce peak stormwater discharge by &gt;40% in 12 months, the intervention will be halted and redesigned.
                      </p>
                    </div>

                    <div className="p-3 bg-[#080808] border border-white/5 space-y-1">
                      <span className="text-white/50 text-[10px]">TELEMETRY FREQUENCY:</span>
                      <p className="text-white/80 font-sans text-xs">
                        Sub-daily multispectral satellite raster pass (10m) combined with 15-minute edge sensor polling.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer Controls */}
          <div className="p-6 bg-[#0e0e0e] border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <button
                onClick={handleDownloadReport}
                className="px-4 py-2 bg-[#161616] hover:bg-[#202020] border border-white/15 text-white/80 hover:text-white text-xs font-mono uppercase tracking-wider flex items-center space-x-2 transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Dossier (JSON)</span>
              </button>

              {exportNotice && (
                <span className="text-xs font-mono text-emerald-400 animate-fadeIn">
                  {exportNotice}
                </span>
              )}
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => onSyncToSystem(partner)}
                className={`px-5 py-2.5 text-xs font-mono uppercase tracking-wider font-bold flex items-center space-x-2 transition-all shadow-lg ${
                  isSynced
                    ? "bg-emerald-900/80 border border-emerald-500 text-emerald-200"
                    : "bg-[#c5a059] hover:bg-[#b08d48] text-black"
                }`}
              >
                {isSynced ? <CheckCircle2 className="w-4 h-4" /> : <Send className="w-4 h-4" />}
                <span>{isSynced ? "Synced to Mission Control" : "Sync to System Portfolio"}</span>
              </button>

              <button
                onClick={onClose}
                className="px-4 py-2 bg-[#121212] hover:bg-[#1a1a1a] border border-white/10 text-white/60 hover:text-white text-xs font-mono uppercase tracking-wider"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
