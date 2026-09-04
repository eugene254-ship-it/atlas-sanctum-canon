import React, { useState, useEffect } from "react";
import {
  ShieldCheck,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock,
  MapPin,
  Users,
  Compass,
  ArrowRight,
  TrendingUp,
  Plus,
  Filter,
  DollarSign,
  Radio,
  Sliders,
  Send,
  X,
  Sparkles,
  Download,
  Flame,
  Droplets,
  Sun,
  Layers,
  FileText,
  Volume2,
  RefreshCw,
  Cpu,
  AlertCircle
} from "lucide-react";
import { AtlasMission, NavigationSpace } from "../../types";
import { ACTIVE_MISSIONS } from "../../data/seedData";
import { useSystemState } from "../../context/SystemContext";

interface MissionControlViewProps {
  onNavigate: (space: NavigationSpace) => void;
  africaMode: boolean;
}

interface TelemetrySensor {
  id: string;
  name: string;
  unit: string;
  currentValue: number;
  targetRange: string;
  status: "optimal" | "warning" | "critical";
  trend: "up" | "down" | "stable";
  history: number[];
}

export const MissionControlView: React.FC<MissionControlViewProps> = ({
  onNavigate,
  africaMode,
}) => {
  const { recordSavedChange } = useSystemState();
  const [missions, setMissions] = useState<AtlasMission[]>(ACTIVE_MISSIONS);
  const [selectedMission, setSelectedMission] = useState<AtlasMission>(ACTIVE_MISSIONS[0]);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<"overview" | "telemetry" | "actions" | "dossier">("overview");
  const [showDeployModal, setShowDeployModal] = useState<boolean>(false);
  const [isLiveStreaming, setIsLiveStreaming] = useState<boolean>(true);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  // New Mission Form State
  const [newMissionForm, setNewMissionForm] = useState({
    codeName: "MSN-04",
    title: "",
    objective: "",
    leadGuild: "Hydrology & Watershed Guild",
    location: "Nairobi River Basin, Kenya",
    targetUSD: 250000,
    communityBeneficiaries: 15000,
  });

  const [newMilestoneText, setNewMilestoneText] = useState("");
  const [newDilemmaText, setNewDilemmaText] = useState("");
  const [newResolutionText, setNewResolutionText] = useState("");

  // Live IoT Sensor Telemetry State
  const [sensors, setSensors] = useState<TelemetrySensor[]>([
    {
      id: "sen-hyd-01",
      name: "Volcanic Pumice Infiltration",
      unit: "mm/hr",
      currentValue: 138,
      targetRange: "> 100 mm/hr",
      status: "optimal",
      trend: "up",
      history: [112, 120, 125, 131, 138],
    },
    {
      id: "sen-hyd-02",
      name: "Peak Storm Runoff Velocity",
      unit: "m/s",
      currentValue: 1.8,
      targetRange: "< 2.0 m/s",
      status: "optimal",
      trend: "down",
      history: [2.8, 2.4, 2.1, 1.9, 1.8],
    },
    {
      id: "sen-bio-03",
      name: "Riparian Soil Carbon Content",
      unit: "% SOC",
      currentValue: 3.4,
      targetRange: "3.0 - 4.5%",
      status: "optimal",
      trend: "up",
      history: [1.8, 2.1, 2.6, 3.1, 3.4],
    },
    {
      id: "sen-sol-04",
      name: "Decentralized Cold Hub Solar Output",
      unit: "kW",
      currentValue: 42.6,
      targetRange: "35 - 50 kW",
      status: "optimal",
      trend: "stable",
      history: [38.2, 40.1, 41.5, 42.0, 42.6],
    },
    {
      id: "sen-gov-05",
      name: "Elder Council Consensus Index",
      unit: "/100",
      currentValue: 96,
      targetRange: "> 90",
      status: "optimal",
      trend: "stable",
      history: [90, 92, 94, 95, 96],
    },
    {
      id: "sen-wat-06",
      name: "Coliform Bacteria Turbidity",
      unit: "NTU",
      currentValue: 4.8,
      targetRange: "< 5.0 NTU",
      status: "warning",
      trend: "down",
      history: [14.2, 11.0, 8.4, 6.1, 4.8],
    },
  ]);

  // Telemetry real-time simulation loop
  useEffect(() => {
    if (!isLiveStreaming) return;
    const timer = setInterval(() => {
      setSensors((prev) =>
        prev.map((s) => {
          const delta = (Math.random() - 0.48) * (s.unit === "% SOC" ? 0.05 : s.unit === "m/s" ? 0.04 : 1.2);
          const rawVal = Math.max(0.1, s.currentValue + delta);
          const nextVal = Number(rawVal.toFixed(1));
          return {
            ...s,
            currentValue: nextVal,
            history: [...s.history.slice(1), nextVal],
            trend: delta > 0 ? "up" : delta < 0 ? "down" : "stable",
          };
        })
      );
    }, 4500);

    return () => clearInterval(timer);
  }, [isLiveStreaming]);

  // Flash action notification
  const triggerActionNotice = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => {
      setActionNotice(null);
    }, 4000);
  };

  const toggleMilestone = (missionId: string, milestoneId: string) => {
    setMissions(
      missions.map((m) => {
        if (m.id !== missionId) return m;
        return {
          ...m,
          milestones: m.milestones.map((ms) => {
            if (ms.id !== milestoneId) return ms;
            const nextStatus = ms.status === "completed" ? "in-progress" : "completed";
            return { ...ms, status: nextStatus };
          }),
        };
      })
    );

    if (selectedMission.id === missionId) {
      setSelectedMission((prev) => ({
        ...prev,
        milestones: prev.milestones.map((ms) => {
          if (ms.id !== milestoneId) return ms;
          const nextStatus = ms.status === "completed" ? "in-progress" : "completed";
          return { ...ms, status: nextStatus };
        }),
      }));
    }
    recordSavedChange("Mission Control: Milestone");
    triggerActionNotice("Field milestone status updated in cryptographic ledger.");
  };

  const handleAddMilestone = () => {
    if (!newMilestoneText.trim()) return;
    const newMs = {
      id: `ms-${Date.now()}`,
      title: newMilestoneText.trim(),
      status: "in-progress" as const,
      responsibleAgent: "Systems Modeling Agent",
      targetDate: "Q4 2026",
    };

    setMissions((prev) =>
      prev.map((m) => {
        if (m.id !== selectedMission.id) return m;
        return { ...m, milestones: [...m.milestones, newMs] };
      })
    );

    setSelectedMission((prev) => ({
      ...prev,
      milestones: [...prev.milestones, newMs],
    }));

    setNewMilestoneText("");
    recordSavedChange("Mission Control: Milestone Added");
    triggerActionNotice(`New target milestone registered for [${selectedMission.codeName}].`);
  };

  const handleAddEthicalLog = () => {
    if (!newDilemmaText.trim() || !newResolutionText.trim()) return;
    const newLog = {
      id: `log-${Date.now()}`,
      date: new Date().toISOString().slice(0, 10),
      dilemma: newDilemmaText.trim(),
      resolution: newResolutionText.trim(),
      decidedBy: "Human Stewardship Guild & Council",
    };

    setMissions((prev) =>
      prev.map((m) => {
        if (m.id !== selectedMission.id) return m;
        return {
          ...m,
          ethicalDecisionLog: [newLog, ...(m.ethicalDecisionLog || [])],
        };
      })
    );

    setSelectedMission((prev) => ({
      ...prev,
      ethicalDecisionLog: [newLog, ...(prev.ethicalDecisionLog || [])],
    }));

    setNewDilemmaText("");
    setNewResolutionText("");
    recordSavedChange("Mission Control: Ethical Audit");
    triggerActionNotice("Socratic ethical resolution committed to verified audit chain.");
  };

  const handleDeployNewMission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMissionForm.title.trim()) return;

    const newMsn: AtlasMission = {
      id: `mission-${Date.now()}`,
      codeName: newMissionForm.codeName || `MSN-0${missions.length + 1}`,
      title: newMissionForm.title,
      objective: newMissionForm.objective || "Regenerative civilizational intervention.",
      leadGuild: newMissionForm.leadGuild,
      location: newMissionForm.location,
      status: "active",
      healthScore: 94,
      capitalTargetUSD: Number(newMissionForm.targetUSD) || 250000,
      capitalMobilizedUSD: 45000,
      communityBeneficiaries: Number(newMissionForm.communityBeneficiaries) || 15000,
      milestones: [
        {
          id: `ms-init-${Date.now()}`,
          title: "Community Elders Consent & Baseline Sensor Swarm Active",
          status: "in-progress",
          responsibleAgent: "Governance & Ethics Agent",
          targetDate: "Q3 2026",
        },
        {
          id: `ms-init-2-${Date.now()}`,
          title: "First Tranche Capital Disbursement & Equipment Procured",
          status: "in-progress",
          responsibleAgent: "Capital Intelligence Agent",
          targetDate: "Q4 2026",
        },
      ],
      activeRisks: [
        {
          id: `risk-${Date.now()}`,
          title: "Local Currency Volatility vs. Imported Solar Pumps",
          severity: "medium",
          mitigation: "Hedge via dual-tranche green bond with local SACCO cooperative guarantee.",
        },
      ],
      ethicalDecisionLog: [
        {
          id: `eth-${Date.now()}`,
          date: new Date().toISOString().slice(0, 10),
          dilemma: "Land tenure disputes between informal settlements and regional water basin authority.",
          resolution: "Drafted perpetual Community Land Trust with 100% youth stewardship rights.",
          decidedBy: "Regional Elders Council & Atlas Legal Agent",
        },
      ],
    };

    setMissions([newMsn, ...missions]);
    setSelectedMission(newMsn);
    setShowDeployModal(false);
    recordSavedChange("Mission Control: Deployed");
    triggerActionNotice(`Mission [${newMsn.codeName}] successfully deployed to Mission Control.`);
  };

  const handleExportDossier = () => {
    const summary = `# ATLAS MISSION CONTROL: OPERATION DOSSIER
Mission Code: ${selectedMission.codeName}
Title: ${selectedMission.title}
Location: ${selectedMission.location}
Lead Guild: ${selectedMission.leadGuild || "Atlas Multi-Guild Council"}
Health Score: ${selectedMission.healthScore}%
Capital Target: $${selectedMission.capitalTargetUSD.toLocaleString()} USD
Capital Mobilized: $${selectedMission.capitalMobilizedUSD.toLocaleString()} USD
Community Beneficiaries: ${selectedMission.communityBeneficiaries.toLocaleString()} residents

## OBJECTIVE
${selectedMission.objective || selectedMission.description}

## EXECUTION MILESTONES
${selectedMission.milestones
  .map(
    (m) =>
      `- [${m.status === "completed" ? "x" : " "}] ${m.title} (Owner: ${m.responsibleAgent || "Field Unit"}, Target: ${m.targetDate || m.dueDate || "Ongoing"})`
  )
  .join("\n")}

## LIVE RISKS & MITIGATIONS
${(selectedMission.activeRisks || [])
  .map((r) => `- [${(r.severity || "medium").toUpperCase()}] ${r.title || r.description}: ${r.mitigation}`)
  .join("\n")}

## ETHICAL DECISION LOG
${(selectedMission.ethicalDecisionLog || selectedMission.decisionLog || [])
  .map(
    (l: any) =>
      `### ${l.date} - ${l.decidedBy || l.decisionMaker}
Dilemma: ${l.dilemma || l.decision}
Resolution: ${l.resolution || l.rationale}
`
  )
  .join("\n")}
`;

    const blob = new Blob([summary], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `atlas-mission-dossier-${selectedMission.codeName || selectedMission.id}.md`;
    a.click();
    URL.revokeObjectURL(url);
    triggerActionNotice(`Exported operational dossier for ${selectedMission.codeName}.`);
  };

  const filteredMissions = missions.filter((m) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "hydrology")
      return (
        (m.leadGuild || "").toLowerCase().includes("hydrology") ||
        m.title.toLowerCase().includes("water") ||
        m.title.toLowerCase().includes("sponge")
      );
    if (activeFilter === "energy")
      return (
        (m.leadGuild || "").toLowerCase().includes("energy") ||
        m.title.toLowerCase().includes("geothermal") ||
        m.title.toLowerCase().includes("solar")
      );
    if (activeFilter === "agriculture")
      return (
        (m.leadGuild || "").toLowerCase().includes("agri") ||
        m.title.toLowerCase().includes("soil") ||
        m.title.toLowerCase().includes("biochar")
      );
    return true;
  });

  return (
    <div className="space-y-8 animate-fadeIn text-[#f2f2f2] pb-20">
      {/* Action Notification Toast */}
      {actionNotice && (
        <div className="fixed top-20 right-6 z-50 animate-bounce">
          <div className="px-4 py-2.5 bg-[#0f0f0f]/95 border border-[#c5a059] text-[#f2f2f2] font-mono text-xs shadow-2xl flex items-center space-x-2.5 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-[#c5a059]" />
            <span>{actionNotice}</span>
          </div>
        </div>
      )}

      {/* Main Header */}
      <div className="p-8 bg-[#0c0c0c] border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2.5 text-[10px] font-mono tracking-[0.3em] uppercase text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>REAL-WORLD FIELD DEPLOYMENT & CYBERNETIC STEWARDSHIP</span>
          </div>
          <h2 className="font-serif font-light text-3xl sm:text-4xl text-white tracking-wide">
            Atlas Mission Control
          </h2>
          <p className="text-xs sm:text-sm text-white/50 font-serif italic max-w-2xl leading-relaxed">
            Live command console for deployed planetary interventions, telemetry sensor grids, community governance checkpoints, and blended capital delivery.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            id="btn-deploy-new-mission"
            onClick={() => setShowDeployModal(true)}
            className="px-4 py-2 bg-[#c5a059] hover:bg-[#b08d48] text-[#080808] font-bold text-xs font-mono uppercase tracking-[0.15em] transition-all flex items-center space-x-1.5 shadow-md"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>DEPLOY MISSION</span>
          </button>

          <button
            onClick={handleExportDossier}
            className="px-4 py-2 bg-[#121212] hover:bg-[#1a1a1a] border border-white/10 text-white/80 hover:text-white text-xs font-mono transition-all flex items-center space-x-1.5"
            title="Download Mission Dossier"
          >
            <Download className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>EXPORT DOSSIER</span>
          </button>

          <div className="px-3.5 py-2 bg-[#080808] border border-white/10 text-[10px] font-mono uppercase tracking-[0.2em] text-emerald-400 flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>ACTIVE: {missions.length} DEPLOYED</span>
          </div>
        </div>
      </div>

      {/* Sub-Tabs Navigation */}
      <div className="flex border-b border-white/10 text-xs font-mono">
        {[
          { id: "overview", label: "ACTIVE MISSIONS & INSPECTION", icon: ShieldCheck },
          { id: "telemetry", label: "LIVE FIELD SENSOR STREAM", icon: Radio },
          { id: "actions", label: "TACTICAL INTERVENTION DECK", icon: Cpu },
          { id: "dossier", label: "GOVERNANCE & AUDIT TRAIL", icon: FileText },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-3 border-b-2 font-bold tracking-wider transition-all flex items-center space-x-2 ${
                activeTab === tab.id
                  ? "border-[#c5a059] text-[#c5a059] bg-[#0c0c0c]"
                  : "border-transparent text-white/40 hover:text-white"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW & MISSION CARDS */}
      {activeTab === "overview" && (
        <>
          {/* Domain Filter Badges */}
          <div className="p-3 bg-[#0a0a0a] border border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-white/40 text-[10px] uppercase px-2">Filter Category:</span>
              {[
                { id: "all", label: "ALL FIELD MISSIONS" },
                { id: "hydrology", label: "HYDROLOGY & WATERSHEDS" },
                { id: "energy", label: "CLEAN THERMAL & ENERGY" },
                { id: "agriculture", label: "SOILS & AGROFORESTRY" },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setActiveFilter(f.id)}
                  className={`px-3 py-1.5 text-[10px] uppercase tracking-wider transition-all ${
                    activeFilter === f.id
                      ? "bg-[#c5a059] text-[#080808] font-bold"
                      : "bg-[#121212] hover:bg-[#181818] text-white/60 hover:text-white border border-white/10"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div className="text-[10px] text-white/40 flex items-center space-x-2">
              <Activity className="w-3 h-3 text-[#c5a059]" />
              <span>Mesh Sync Cycle: 4.5s Active</span>
            </div>
          </div>

          {/* 3-Column Mission Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredMissions.map((msn) => {
              const isSelected = selectedMission.id === msn.id;
              const completedCount = msn.milestones.filter(
                (m) => m.status === "completed" || m.completed
              ).length;
              const progressPct = Math.round((completedCount / msn.milestones.length) * 100);

              return (
                <div
                  key={msn.id}
                  onClick={() => setSelectedMission(msn)}
                  className={`p-6 border cursor-pointer transition-all space-y-4 flex flex-col justify-between ${
                    isSelected
                      ? "bg-[#111111] border-[#c5a059] shadow-md ring-1 ring-[#c5a059]/40"
                      : "bg-[#0c0c0c] hover:bg-[#111111] border-white/10 text-white/70"
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider">
                      <span className="px-2 py-0.5 bg-[#0a1610] text-emerald-300 border border-emerald-700/50">
                        {msn.codeName}
                      </span>
                      <span className="text-white/40">
                        Health: <strong className="text-emerald-400">{msn.healthScore}%</strong>
                      </span>
                    </div>

                    <h3 className="font-serif font-normal text-lg text-white leading-snug">
                      {msn.title}
                    </h3>

                    <p className="text-xs text-white/50 line-clamp-2 font-sans">
                      {msn.objective || msn.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/5 space-y-2 text-xs font-mono">
                    <div className="flex justify-between text-white/40 text-[10px] uppercase">
                      <span>
                        Milestones ({completedCount}/{msn.milestones.length})
                      </span>
                      <span className="text-[#c5a059] font-bold">{progressPct}%</span>
                    </div>
                    <div className="w-full bg-[#080808] h-1.5 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-emerald-500 to-[#c5a059] h-full transition-all duration-500"
                        style={{ width: `${progressPct}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-[10px] text-white/40 pt-1">
                      <span className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3 text-[#c5a059]" />
                        <span>{msn.location}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Users className="w-3 h-3 text-white/40" />
                        <span>{msn.communityBeneficiaries.toLocaleString()} pop</span>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected Mission Deep Inspector */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Milestones & Execution Tasks (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="p-8 bg-[#0c0c0c] border border-white/10 space-y-6">
                <div className="space-y-2 border-b border-white/10 pb-4">
                  <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.25em] text-emerald-400">
                    <span>OPERATION [{selectedMission.codeName}]</span>
                    <span className="text-[#c5a059] font-mono">
                      {selectedMission.leadGuild || "Multi-Guild Coordination"}
                    </span>
                  </div>
                  <h3 className="font-serif font-light text-2xl text-white">
                    {selectedMission.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed bg-[#080808] p-5 border border-white/5 font-sans">
                    {selectedMission.objective || selectedMission.description}
                  </p>
                </div>

                {/* Milestones Execution List */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.2em] text-white/40">
                    <span>Field Execution Milestones</span>
                    <span>Click checkbox to toggle status</span>
                  </div>

                  <div className="space-y-2">
                    {selectedMission.milestones.map((ms) => {
                      const isDone = ms.status === "completed" || ms.completed;
                      return (
                        <div
                          key={ms.id}
                          className={`p-4 border transition-all flex items-center justify-between gap-3 ${
                            isDone
                              ? "bg-[#080808] border-emerald-800/40 text-white/80"
                              : "bg-[#080808] border-white/10 text-white/60"
                          }`}
                        >
                          <div className="flex items-start space-x-3 min-w-0">
                            <button
                              onClick={() => toggleMilestone(selectedMission.id, ms.id)}
                              className={`mt-0.5 w-4 h-4 flex items-center justify-center border transition-colors shrink-0 ${
                                isDone
                                  ? "bg-[#c5a059] border-[#c5a059] text-[#080808]"
                                  : "border-white/20 hover:border-[#c5a059] bg-[#0c0c0c]"
                              }`}
                            >
                              {isDone && <CheckCircle2 className="w-3.5 h-3.5" />}
                            </button>
                            <div className="min-w-0">
                              <div
                                className={`text-xs font-serif ${
                                  isDone ? "line-through text-white/40" : "text-white"
                                }`}
                              >
                                {ms.title}
                              </div>
                              <div className="text-[10px] text-white/40 font-mono flex items-center space-x-2 mt-0.5">
                                <span>Owner: {ms.responsibleAgent || "Field Stewardship Unit"}</span>
                                <span>•</span>
                                <span>Target: {ms.targetDate || ms.dueDate || "Q4 2026"}</span>
                              </div>
                            </div>
                          </div>

                          <span
                            className={`text-[9px] font-mono px-2 py-0.5 border uppercase shrink-0 ${
                              isDone
                                ? "bg-[#0a1610] text-emerald-300 border-emerald-800"
                                : "bg-[#181308] text-[#c5a059] border-[#c5a059]/40"
                            }`}
                          >
                            {isDone ? "Completed" : "In Progress"}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Add New Milestone Input */}
                  <div className="flex items-center space-x-2 pt-2">
                    <input
                      type="text"
                      value={newMilestoneText}
                      onChange={(e) => setNewMilestoneText(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleAddMilestone()}
                      placeholder="Add milestone (e.g. 'Install optical turbidity sensor at junction #09')..."
                      className="flex-1 px-3 py-2 bg-[#080808] border border-white/10 text-xs text-white placeholder-white/30 outline-none focus:border-[#c5a059]/60 font-sans"
                    />
                    <button
                      onClick={handleAddMilestone}
                      className="px-3 py-2 bg-[#181308] border border-[#c5a059]/50 hover:bg-[#c5a059] hover:text-[#080808] text-[#c5a059] text-xs font-mono font-bold transition-all shrink-0"
                    >
                      ADD MILESTONE
                    </button>
                  </div>
                </div>

                {/* Capital Progress Summary */}
                <div className="p-5 bg-[#080808] border border-white/10 space-y-2 font-mono text-xs">
                  <div className="flex justify-between text-white/40 text-[10px] uppercase">
                    <span>Blended Capital Mobilized:</span>
                    <span className="text-white font-bold">
                      ${selectedMission.capitalMobilizedUSD.toLocaleString()} / $
                      {selectedMission.capitalTargetUSD.toLocaleString()} USD
                    </span>
                  </div>
                  <div className="w-full bg-[#121212] h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-emerald-500 to-[#c5a059] h-full transition-all duration-700"
                      style={{
                        width: `${Math.min(
                          100,
                          (selectedMission.capitalMobilizedUSD / selectedMission.capitalTargetUSD) * 100
                        )}%`,
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-[9px] text-white/40 pt-1">
                    <span>
                      Direct Beneficiaries: {selectedMission.communityBeneficiaries.toLocaleString()}{" "}
                      residents
                    </span>
                    <span>100% Non-Extractive Capped Dividend</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Live Field Risks & Moral Decision Log (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Active Field Risks */}
              <div className="p-8 bg-[#0c0c0c] border border-white/10 space-y-4">
                <div className="flex items-center space-x-2 text-[10px] font-mono tracking-[0.25em] uppercase text-rose-400">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>ACTIVE FIELD RISK MONITOR</span>
                </div>

                <div className="space-y-3">
                  {(selectedMission.activeRisks || []).map((risk, idx) => (
                    <div
                      key={risk.id || idx}
                      className="p-4 bg-[#080808] border border-rose-900/30 space-y-1.5 text-xs font-sans"
                    >
                      <div className="flex items-center justify-between font-mono text-[9px] uppercase">
                        <span className="text-rose-400 font-bold">
                          {risk.title || `Risk Alert #${idx + 1}`}
                        </span>
                        <span className="px-1.5 py-0.5 bg-rose-950 text-rose-300 border border-rose-800 text-[8px]">
                          {risk.severity.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-white/70 text-[11px] leading-relaxed">
                        {risk.description || risk.title}
                      </p>
                      <div className="text-[10px] text-emerald-400 font-mono pt-1">
                        Mitigation: {risk.mitigation}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Socratic Human Decision Log */}
              <div className="p-8 bg-[#0c0c0c] border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-[10px] font-mono tracking-[0.25em] uppercase text-[#c5a059]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>HUMAN STEWARDSHIP LOG</span>
                  </div>
                  <span className="text-[9px] font-mono text-white/40">Immutable Audit</span>
                </div>

                <div className="space-y-3">
                  {(selectedMission.ethicalDecisionLog || []).map((log, idx) => (
                    <div
                      key={log.id || idx}
                      className="p-4 bg-[#080808] border border-white/10 space-y-1.5 text-xs font-sans"
                    >
                      <div className="flex items-center justify-between font-mono text-[9px] text-white/40">
                        <span>{log.date}</span>
                        <span className="text-[#c5a059]">{log.decidedBy || log.decisionMaker}</span>
                      </div>
                      <div className="text-white/80 font-serif text-[11px]">
                        <strong>Dilemma:</strong> {log.dilemma || log.decision}
                      </div>
                      <div className="text-emerald-400 font-serif text-[11px]">
                        <strong>Resolution:</strong> {log.resolution || log.rationale}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Decision Log */}
                <div className="space-y-2 pt-2 border-t border-white/10">
                  <input
                    type="text"
                    value={newDilemmaText}
                    onChange={(e) => setNewDilemmaText(e.target.value)}
                    placeholder="Dilemma (e.g. 'Vendor requests price hike on volcanic pumice')..."
                    className="w-full px-3 py-1.5 bg-[#080808] border border-white/10 text-xs text-white placeholder-white/30 outline-none focus:border-[#c5a059]/60 font-sans"
                  />
                  <input
                    type="text"
                    value={newResolutionText}
                    onChange={(e) => setNewResolutionText(e.target.value)}
                    placeholder="Resolution (e.g. 'Agreed to 4% inflation adjustment backed by SACCO buffer')..."
                    className="w-full px-3 py-1.5 bg-[#080808] border border-white/10 text-xs text-white placeholder-white/30 outline-none focus:border-[#c5a059]/60 font-sans"
                  />
                  <button
                    onClick={handleAddEthicalLog}
                    className="w-full py-2 bg-[#181308] border border-[#c5a059]/50 hover:bg-[#c5a059] hover:text-[#080808] text-[#c5a059] text-[10px] font-mono uppercase tracking-wider font-bold transition-all"
                  >
                    COMMIT STEWARDSHIP LOG
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* TAB 2: LIVE FIELD SENSOR STREAM */}
      {activeTab === "telemetry" && (
        <div className="space-y-6">
          <div className="p-8 bg-[#0c0c0c] border border-white/10 flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-[10px] font-mono uppercase tracking-[0.25em] text-[#c5a059]">
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                <span>CYBERNETIC FIELD SENSOR SWARM</span>
              </div>
              <h3 className="font-serif text-2xl text-white">Live Hydro-Ecological Telemetry</h3>
              <p className="text-xs text-white/50 font-serif italic">
                Real-time data feeds from hydrostatic pressure transducers, optical turbidity sieves, and micro-grid solar inverters.
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsLiveStreaming(!isLiveStreaming)}
                className={`px-4 py-2 text-xs font-mono uppercase tracking-wider border transition-all flex items-center space-x-2 ${
                  isLiveStreaming
                    ? "bg-[#0a1610] text-emerald-300 border-emerald-600"
                    : "bg-[#181308] text-[#c5a059] border-[#c5a059]"
                }`}
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLiveStreaming ? "animate-spin" : ""}`} />
                <span>{isLiveStreaming ? "STREAMING LIVE (4.5s)" : "STREAM PAUSED"}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sensors.map((sensor) => (
              <div
                key={sensor.id}
                className="p-6 bg-[#0c0c0c] border border-white/10 space-y-4 hover:border-[#c5a059]/40 transition-all"
              >
                <div className="flex items-center justify-between text-[10px] font-mono text-white/40 uppercase">
                  <span>{sensor.id}</span>
                  <span
                    className={`px-2 py-0.5 border text-[9px] ${
                      sensor.status === "optimal"
                        ? "text-emerald-300 bg-[#0a1610] border-emerald-800"
                        : "text-amber-300 bg-amber-950/40 border-amber-800"
                    }`}
                  >
                    {sensor.status.toUpperCase()}
                  </span>
                </div>

                <div className="space-y-1">
                  <h4 className="font-serif text-lg text-white">{sensor.name}</h4>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-3xl font-serif text-white">{sensor.currentValue}</span>
                    <span className="text-xs font-mono text-[#c5a059]">{sensor.unit}</span>
                  </div>
                </div>

                {/* Visual Mini Sparkline */}
                <div className="space-y-1.5 pt-2 border-t border-white/5">
                  <div className="flex justify-between text-[10px] font-mono text-white/40">
                    <span>Target: {sensor.targetRange}</span>
                    <span className="text-emerald-400">
                      Trend: {sensor.trend === "up" ? "▲ Accretion" : sensor.trend === "down" ? "▼ Infiltration" : "● Stable"}
                    </span>
                  </div>
                  <div className="flex items-end h-8 gap-1 pt-1">
                    {sensor.history.map((val, i) => {
                      const maxVal = Math.max(...sensor.history, 1);
                      const heightPct = Math.min(100, Math.max(15, (val / maxVal) * 100));
                      return (
                        <div
                          key={i}
                          className="flex-1 bg-white/10 hover:bg-[#c5a059] transition-all rounded-t-sm"
                          style={{ height: `${heightPct}%` }}
                          title={`Sample #${i + 1}: ${val} ${sensor.unit}`}
                        ></div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: TACTICAL INTERVENTION DECK */}
      {activeTab === "actions" && (
        <div className="space-y-6">
          <div className="p-8 bg-[#0c0c0c] border border-white/10 space-y-2">
            <div className="flex items-center space-x-2 text-[10px] font-mono uppercase tracking-[0.25em] text-[#c5a059]">
              <Cpu className="w-3.5 h-3.5" />
              <span>RAPID RESPONSE & INTERVENTION DISPATCH</span>
            </div>
            <h3 className="font-serif text-2xl text-white">Operational Command Deck</h3>
            <p className="text-xs text-white/50 font-serif italic max-w-2xl">
              Dispatch immediate field interventions, open emergency stormwater bypass channels, or release catalytic micro-grant tranches to youth maintenance guilds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-[#0c0c0c] border border-white/10 space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="p-2 w-8 h-8 bg-sky-950 text-sky-400 flex items-center justify-center border border-sky-800">
                  <Droplets className="w-4 h-4" />
                </div>
                <h4 className="font-serif text-base text-white">Trigger Storm Bypass</h4>
                <p className="text-xs text-white/50 leading-relaxed font-sans">
                  Electromagnetically opens the secondary volcanic pumice diversion weir during 100-year cloudburst events.
                </p>
              </div>
              <button
                onClick={() => triggerActionNotice("Bypass valve #04 opened: 4,200 m³/hr redirected to retention swale.")}
                className="w-full py-2.5 bg-sky-950 hover:bg-sky-900 border border-sky-600 text-sky-200 text-xs font-mono uppercase tracking-wider font-bold transition-all"
              >
                OPEN BYPASS WEIR
              </button>
            </div>

            <div className="p-6 bg-[#0c0c0c] border border-white/10 space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="p-2 w-8 h-8 bg-emerald-950 text-emerald-400 flex items-center justify-center border border-emerald-800">
                  <DollarSign className="w-4 h-4" />
                </div>
                <h4 className="font-serif text-base text-white">Disburse Youth Guild Tranche</h4>
                <p className="text-xs text-white/50 leading-relaxed font-sans">
                  Direct weekly M-Pesa micro-stipend release ($12.50/day) for 42 youth bioswale maintenance artisans.
                </p>
              </div>
              <button
                onClick={() => triggerActionNotice("Disbursed $3,675 USD directly to 42 youth guild M-Pesa accounts.")}
                className="w-full py-2.5 bg-emerald-950 hover:bg-emerald-900 border border-emerald-600 text-emerald-200 text-xs font-mono uppercase tracking-wider font-bold transition-all"
              >
                DISBURSE $3,675
              </button>
            </div>

            <div className="p-6 bg-[#0c0c0c] border border-white/10 space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="p-2 w-8 h-8 bg-amber-950 text-amber-400 flex items-center justify-center border border-amber-800">
                  <Flame className="w-4 h-4" />
                </div>
                <h4 className="font-serif text-base text-white">Deploy Biochar Inoculation</h4>
                <p className="text-xs text-white/50 leading-relaxed font-sans">
                  Dispatches mobile continuous bagasse pyrolysis kiln unit to Kakamega demonstration sector #3.
                </p>
              </div>
              <button
                onClick={() => triggerActionNotice("Mobile pyrolysis unit #02 dispatched with 14-day mycorrhizal inoculant.")}
                className="w-full py-2.5 bg-amber-950 hover:bg-amber-900 border border-amber-600 text-amber-200 text-xs font-mono uppercase tracking-wider font-bold transition-all"
              >
                DISPATCH KILN UNIT
              </button>
            </div>

            <div className="p-6 bg-[#0c0c0c] border border-white/10 space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="p-2 w-8 h-8 bg-purple-950 text-purple-400 flex items-center justify-center border border-purple-800">
                  <Radio className="w-4 h-4" />
                </div>
                <h4 className="font-serif text-base text-white">Broadcast Community SMS</h4>
                <p className="text-xs text-white/50 leading-relaxed font-sans">
                  Pushes bilingual Swahili/English early-warning micro-flood advisory to 14,000 registered households.
                </p>
              </div>
              <button
                onClick={() => triggerActionNotice("SMS advisory broadcasted to 14,200 mobile numbers in Nairobi sub-basin.")}
                className="w-full py-2.5 bg-purple-950 hover:bg-purple-900 border border-purple-600 text-purple-200 text-xs font-mono uppercase tracking-wider font-bold transition-all"
              >
                BROADCAST SMS
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: GOVERNANCE & AUDIT TRAIL */}
      {activeTab === "dossier" && (
        <div className="p-8 bg-[#0c0c0c] border border-white/10 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h3 className="font-serif text-2xl text-white">
                Cryptographic Governance & Audit Trail: [{selectedMission.codeName}]
              </h3>
              <p className="text-xs text-white/50 font-serif italic">
                Verifiable chain of all field milestones, stakeholder covenants, moral audits, and disbursement proofs.
              </p>
            </div>
            <button
              onClick={handleExportDossier}
              className="px-4 py-2 bg-[#c5a059] hover:bg-[#b08d48] text-[#080808] font-bold text-xs font-mono uppercase tracking-wider flex items-center space-x-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>EXPORT SIGNED DOSSIER</span>
            </button>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="p-4 bg-[#080808] border border-white/10 flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-white/40 uppercase text-[10px]">Master Genesis Hash</span>
                <div className="text-white font-mono text-xs">0x8f2d4e7b1a9c630e1548dbfa04812cc8a4b</div>
              </div>
              <span className="px-2 py-0.5 bg-[#0a1610] text-emerald-300 border border-emerald-800 text-[10px]">
                VERIFIED BY 3 ANCHOR NODES
              </span>
            </div>

            <div className="p-4 bg-[#080808] border border-white/10 flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-white/40 uppercase text-[10px]">Community Land Trust Covenant</span>
                <div className="text-white font-mono text-xs">Irreversible Youth Stewardship Rights (Perpetual 99-Yr Lease)</div>
              </div>
              <span className="px-2 py-0.5 bg-[#0a1610] text-emerald-300 border border-emerald-800 text-[10px]">
                RATIFIED BY ELDER COUNCIL
              </span>
            </div>

            <div className="p-4 bg-[#080808] border border-white/10 flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-white/40 uppercase text-[10px]">Non-Extractive Capital Cap</span>
                <div className="text-white font-mono text-xs">Maximum 4.8% patient investor dividend; 100% upside to community reserve</div>
              </div>
              <span className="px-2 py-0.5 bg-[#0a1610] text-emerald-300 border border-emerald-800 text-[10px]">
                ENFORCED BY SMART CONTRACT
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Deploy New Mission */}
      {showDeployModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#0c0c0c] border border-[#c5a059] p-8 max-w-xl w-full space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="space-y-1">
                <div className="text-[10px] font-mono text-[#c5a059] uppercase tracking-[0.25em]">
                  FIELD EXPEDITION DEPLOYMENT
                </div>
                <h3 className="font-serif text-2xl text-white">Deploy New Atlas Mission</h3>
              </div>
              <button
                onClick={() => setShowDeployModal(false)}
                className="text-white/40 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleDeployNewMission} className="space-y-4 text-xs font-mono">
              <div className="space-y-1">
                <label className="text-white/60 uppercase text-[10px]">Mission Code Name</label>
                <input
                  type="text"
                  value={newMissionForm.codeName}
                  onChange={(e) => setNewMissionForm({ ...newMissionForm, codeName: e.target.value })}
                  className="w-full px-3 py-2 bg-[#080808] border border-white/10 text-white outline-none focus:border-[#c5a059]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-white/60 uppercase text-[10px]">Mission Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lake Victoria Bio-Engineered Riparian Buffer"
                  value={newMissionForm.title}
                  onChange={(e) => setNewMissionForm({ ...newMissionForm, title: e.target.value })}
                  className="w-full px-3 py-2 bg-[#080808] border border-white/10 text-white outline-none focus:border-[#c5a059]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-white/60 uppercase text-[10px]">Objective & Civilizational Scope</label>
                <textarea
                  rows={3}
                  value={newMissionForm.objective}
                  onChange={(e) => setNewMissionForm({ ...newMissionForm, objective: e.target.value })}
                  placeholder="Describe the systemic intervention, physical mechanisms, and community ownership structure..."
                  className="w-full px-3 py-2 bg-[#080808] border border-white/10 text-white outline-none focus:border-[#c5a059] font-sans"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-white/60 uppercase text-[10px]">Target Capital (USD)</label>
                  <input
                    type="number"
                    value={newMissionForm.targetUSD}
                    onChange={(e) =>
                      setNewMissionForm({ ...newMissionForm, targetUSD: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 bg-[#080808] border border-white/10 text-white outline-none focus:border-[#c5a059]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-white/60 uppercase text-[10px]">Beneficiaries (Pop)</label>
                  <input
                    type="number"
                    value={newMissionForm.communityBeneficiaries}
                    onChange={(e) =>
                      setNewMissionForm({
                        ...newMissionForm,
                        communityBeneficiaries: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 bg-[#080808] border border-white/10 text-white outline-none focus:border-[#c5a059]"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowDeployModal(false)}
                  className="px-4 py-2 bg-transparent text-white/60 hover:text-white"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#c5a059] hover:bg-[#b08d48] text-[#080808] font-bold text-xs uppercase tracking-wider"
                >
                  CONFIRM DEPLOYMENT
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
