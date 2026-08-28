import React from "react";
import {
  X,
  Activity,
  AlertTriangle,
  Sparkles,
  Compass,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  ShieldAlert
} from "lucide-react";
import { NavigationSpace } from "../types";

interface DailyBriefModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (space: NavigationSpace) => void;
}

export const DailyBriefModal: React.FC<DailyBriefModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  if (!isOpen) return null;

  const todayStr = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#080808] border border-white/15 max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl text-[#f2f2f2]">
        {/* Header */}
        <div className="px-8 py-5 border-b border-white/10 flex items-center justify-between bg-[#0c0c0c]">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-gradient-to-tr from-[#c5a059] to-[#8e6e3d] rounded-xs transform rotate-45 flex items-center justify-center">
              <Activity className="w-4 h-4 text-[#080808] transform -rotate-45" />
            </div>
            <div>
              <div className="flex items-center space-x-3">
                <h2 className="font-serif font-light text-xl tracking-[0.2em] uppercase text-white">
                  The Daily Atlas Brief
                </h2>
                <span className="text-[9px] uppercase tracking-[0.25em] font-mono px-2 py-0.5 border border-[#c5a059]/40 text-[#c5a059]">
                  VERIFIED
                </span>
              </div>
              <p className="text-[10px] text-white/40 font-mono tracking-wider uppercase mt-0.5">{todayStr} • Regional Focus: Nairobi Basin & Rift Valley</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white/40 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body - Multi-Section Intelligence Matrix */}
        <div className="p-8 overflow-y-auto space-y-6 text-sm bg-[#080808]">
          {/* Section 1: Reality State */}
          <div className="p-6 bg-[#0c0c0c] border border-white/10">
            <div className="flex items-center space-x-2 text-[#c5a059] text-[10px] uppercase tracking-[0.3em] font-mono mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>1. Reality: The Ground Truth</span>
            </div>
            <h3 className="font-serif font-light text-lg text-white mb-2 tracking-wide">
              Sub-Saharan East Africa Watershed Infiltration Anomaly & Thermal Energy Convergence
            </h3>
            <p className="text-white/60 font-sans text-xs sm:text-sm leading-relaxed">
              Satellite radar altimetry and ground sensors in Nairobi Basin reveal that upstream soil sealing in Kilimani/Westlands has shortened flood lag time from 95 minutes to 24 minutes. Simultaneously, Rift Valley geothermal facilities are venting 3.4 MWh/day of low-enthalpy waste heat that could power decentralized ammonia absorption cold storage for smallholder vegetable farmers.
            </p>
          </div>

          {/* 3-Column Intelligence Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Signals */}
            <div className="p-5 bg-[#0c0c0c] border border-white/10">
              <div className="flex items-center space-x-1.5 text-[10px] uppercase tracking-[0.25em] font-mono text-emerald-400 mb-3">
                <Activity className="w-3 h-3" />
                <span>2. Signals</span>
              </div>
              <ul className="text-xs space-y-2.5 text-white/60 font-sans">
                <li className="flex items-start space-x-2">
                  <span className="text-[#c5a059] font-bold">—</span>
                  <span>Informal M-Pesa programmatic escrows in Gikomba reached $1.85M daily volume (+42% YoY).</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#c5a059] font-bold">—</span>
                  <span>Community health promoters in Mathare detected respiratory surge 14 days before public clinics.</span>
                </li>
              </ul>
            </div>

            {/* Risks */}
            <div className="p-5 bg-[#0c0c0c] border border-white/10">
              <div className="flex items-center space-x-1.5 text-[10px] uppercase tracking-[0.25em] font-mono text-rose-400 mb-3">
                <AlertTriangle className="w-3 h-3" />
                <span>3. System Risks</span>
              </div>
              <ul className="text-xs space-y-2.5 text-white/60 font-sans">
                <li className="flex items-start space-x-2">
                  <span className="text-rose-400 font-bold">—</span>
                  <span>Topsoil organic matter in Trans-Nzoia maize belt dropped to 1.3% due to synthetic over-fertilization.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-rose-400 font-bold">—</span>
                  <span>Upstream unmitigated commercial developments adding 18% runoff into Ngong River tributary.</span>
                </li>
              </ul>
            </div>

            {/* Opportunities */}
            <div className="p-5 bg-[#0c0c0c] border border-white/10">
              <div className="flex items-center space-x-1.5 text-[10px] uppercase tracking-[0.25em] font-mono text-[#c5a059] mb-3">
                <Sparkles className="w-3 h-3" />
                <span>4. High Leverage</span>
              </div>
              <ul className="text-xs space-y-2.5 text-white/60 font-sans">
                <li className="flex items-start space-x-2">
                  <span className="text-[#c5a059] font-bold">—</span>
                  <span>Deploying volcanic pumice bioswales at Gatwekera junction to intercept 70% of overland surge.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#c5a059] font-bold">—</span>
                  <span>Converting Lake Victoria water hyacinth into biochar soil conditioner and drop-in bio-crude.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Section 3: Experiments, Missions, and Human Decisions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 bg-[#0c0c0c] border border-white/10">
              <div className="flex items-center space-x-2 text-[10px] uppercase tracking-[0.25em] font-mono text-sky-400 mb-2">
                <Compass className="w-3.5 h-3.5" />
                <span>5. Falsification Experiment</span>
              </div>
              <h4 className="font-serif font-normal text-white text-base mb-1">
                Gatwekera 120-Meter Test Sponge Corridor
              </h4>
              <p className="text-xs text-white/50 font-sans leading-relaxed">
                Testing whether volcanic pumice infiltration (&gt;100 mm/hr) prevents residential flooding with zero silting over 14 continuous days.
              </p>
            </div>

            <div className="p-5 bg-[#0c0c0c] border border-white/10">
              <div className="flex items-center space-x-2 text-[10px] uppercase tracking-[0.25em] font-mono text-[#c5a059] mb-2">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>6. Human Conscience Decision</span>
              </div>
              <h4 className="font-serif font-normal text-white text-base mb-1">
                Right-of-Way Community Consensus
              </h4>
              <p className="text-xs text-white/50 font-sans leading-relaxed">
                Council of Elders and Youth Guilds sign off on bioswale alignment guaranteeing zero household displacement.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-8 py-4 border-t border-white/10 bg-[#0c0c0c] flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-mono">
            Ground Truth Verified by 10 Atlas Agents
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                onClose();
                onNavigate("question-engine");
              }}
              className="px-4 py-2 border border-white/20 text-white/70 hover:text-white hover:border-white/40 text-[10px] uppercase tracking-[0.25em] font-bold transition-colors"
            >
              Inquire Deeper
            </button>
            <button
              onClick={() => {
                onClose();
                onNavigate("studio");
              }}
              className="px-5 py-2 bg-[#c5a059] hover:bg-[#b08d48] text-[#080808] text-[10px] uppercase tracking-[0.25em] font-bold flex items-center space-x-2 transition-colors"
            >
              <span>Launch Studio Experiment</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
