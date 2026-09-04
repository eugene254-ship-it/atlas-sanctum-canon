import React, { useState } from "react";
import {
  Flame,
  Cpu,
  Sparkles,
  ArrowRight,
  MessageSquare,
  Activity,
  CheckCircle2,
  Send,
  Layers,
  Compass,
  Download,
  Trash2,
  Zap,
  Terminal,
  ListTodo
} from "lucide-react";
import { AIAgentProfile, NavigationSpace } from "../../types";
import { ATLAS_AI_AGENTS } from "../../data/seedData";
import { dispatchGeminiInquiry } from "../../services/api";
import { PendingTasksSidebar } from "../agent/PendingTasksSidebar";

interface AgentNetworkViewProps {
  onNavigate: (space: NavigationSpace) => void;
  africaMode: boolean;
}

export const AgentNetworkView: React.FC<AgentNetworkViewProps> = ({
  onNavigate,
  africaMode,
}) => {
  const [agents, setAgents] = useState<AIAgentProfile[]>(ATLAS_AI_AGENTS);
  const [selectedAgent, setSelectedAgent] = useState<AIAgentProfile>(ATLAS_AI_AGENTS[0]);
  const [showPendingTasks, setShowPendingTasks] = useState(true);

  // Deliberation Swarm State
  const [deliberationTopic, setDeliberationTopic] = useState("");
  const [isDeliberating, setIsDeliberating] = useState(false);
  const [targetMode, setTargetMode] = useState<"swarm" | "individual">("swarm");
  const [deliberationHistory, setDeliberationHistory] = useState<{
    agentName: string;
    role: string;
    message: string;
    timestamp?: string;
  }>([
    {
      agentName: "Synthesizer Agent",
      role: "Global Reality Synthesis",
      message: "Observatory node #04 reports watershed runoff velocity in Nairobi Basin is peaking at 4.8 m/s. Initializing multi-agent council.",
      timestamp: "10:14:02"
    },
    {
      agentName: "Systems Modeling Agent",
      role: "Causal Loops & Stocks/Flows",
      message: "Causal loop R1 (Runoff Trap) is dominating. Intervening with porous bioswales shifts Meadows leverage point #4 (Self-Organization) into positive feedback.",
      timestamp: "10:14:08"
    },
    {
      agentName: "Capital Intelligence Agent",
      role: "7-Capitals & Blended Finance",
      message: "Catalytic grant of $45k USD unlocks $140k green bond tranche, providing 100% community equity return to local youth guilds.",
      timestamp: "10:14:15"
    }
  ]);

  const agentPresetPrompts: Record<string, string[]> = {
    "AG-01": [
      "Gather real-time empirical satellite hydrology data on Nairobi sub-basin",
      "Benchmark volcanic pumice infiltration rates across East Africa",
    ],
    "AG-02": [
      "Identify the highest Meadows leverage point for soil siltation control",
      "Model positive and balancing causal feedback loops for community water trusts",
    ],
    "AG-06": [
      "Structure a non-extractive revenue share model for urban sponge infrastructure",
      "Calculate 7-capitals ROI for $350k philanthropic capital infusion",
    ],
    "AG-08": [
      "Draft a customary tenure elder council co-governance agreement",
      "Audit moral risk of algorithmic flood-gate automation",
    ],
  };

  const handleStartDeliberation = async (customPrompt?: string) => {
    const textToSend = customPrompt || deliberationTopic;
    if (!textToSend.trim()) return;

    setIsDeliberating(true);
    if (!customPrompt) setDeliberationTopic("");

    const now = new Date().toLocaleTimeString();

    if (targetMode === "individual") {
      const prompt = `You are ${selectedAgent.name} (Specialization: ${selectedAgent.role}).
Your Mission: ${selectedAgent.mission}
Capabilities: ${selectedAgent.capabilities.join(", ")}

Respond to the following user directive with high rigor, deep systems insight, and zero generic fluff:
"${textToSend}"`;

      const response = await dispatchGeminiInquiry(
        prompt,
        `You are ${selectedAgent.name}, an expert AI in the Atlas Sanctum Swarm.`
      );

      setDeliberationHistory((prev) => [
        ...prev,
        {
          agentName: selectedAgent.name,
          role: selectedAgent.role,
          message: response,
          timestamp: now,
        },
      ]);
    } else {
      const prompt = `You are running the Atlas Sanctum Autonomous Agent Council.
Simulate a rapid 3-agent cooperative deliberation on this civilizational dilemma:
"${textToSend}"

Produce short, crisp, highly rigorous perspectives from:
1. ${selectedAgent.name} (${selectedAgent.role})
2. Systems Modeling Agent (Meadows leverage, feedback loops)
3. Capital Intelligence Agent (7-capitals, blended finance)`;

      const councilResponse = await dispatchGeminiInquiry(
        prompt,
        "You are the Atlas Sanctum AI Agent Council."
      );

      setDeliberationHistory((prev) => [
        ...prev,
        {
          agentName: "Autonomous Swarm Council",
          role: `Multi-Agent Consensus (Anchored by ${selectedAgent.name})`,
          message: councilResponse,
          timestamp: now,
        },
      ]);
    }

    setIsDeliberating(false);
  };

  const handleExportTranscript = () => {
    const content = `# ATLAS SANCTUM MULTI-AGENT SWARM TRANSCRIPT
Exported: ${new Date().toISOString()}

${deliberationHistory
  .map(
    (item) => `### [${item.timestamp || "LOG"}] ${item.agentName} (${item.role})
${item.message}
`
  )
  .join("\n---\n\n")}`;

    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `atlas-swarm-transcript-${new Date().toISOString().slice(0, 10)}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSelectTaskToDeliberate = (taskTitle: string, agentCode: string) => {
    const targetAgent = agents.find((a) => a.code === agentCode);
    if (targetAgent) {
      setSelectedAgent(targetAgent);
    }
    setDeliberationTopic(`Deliberate on pending operation: "${taskTitle}"`);
  };

  return (
    <div className="space-y-8 animate-fadeIn text-[#f2f2f2] pb-20">
      {/* Header */}
      <div className="p-8 bg-[#0c0c0c] border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2.5 text-[10px] font-mono tracking-[0.3em] uppercase text-[#c5a059]">
            <Flame className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>SPECIALIZED MULTI-AGENT REASONING SWARM</span>
          </div>
          <h2 className="font-serif font-light text-3xl sm:text-4xl text-white tracking-wide">
            The 10 Atlas AI Intelligences
          </h2>
          <p className="text-xs sm:text-sm text-white/50 font-serif italic max-w-2xl leading-relaxed">
            Ten autonomous intelligences collaborating in real time: Research, Systems, Questions, Opportunities, Innovation, Capital, Simulation, Governance, Field, and Synthesis.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Toggle Pending Tasks Sidebar Button */}
          <button
            id="btn-toggle-pending-tasks"
            onClick={() => setShowPendingTasks(!showPendingTasks)}
            className={`px-3 py-2 border text-xs font-mono transition-all flex items-center space-x-1.5 shadow-sm ${
              showPendingTasks
                ? "bg-[#161616] border-[#c5a059] text-[#c5a059]"
                : "bg-[#0c0c0c] hover:bg-[#141414] border-white/10 text-white/70 hover:text-white"
            }`}
            title="Toggle Swarm Pending Tasks Sidebar"
          >
            <ListTodo className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>PENDING TASKS</span>
            <span className="px-1.5 py-0.5 bg-[#c5a059]/20 text-[#c5a059] text-[9px] font-bold">
              5
            </span>
          </button>

          <div className="p-3 bg-[#080808] border border-white/10 text-xs font-mono flex items-center space-x-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-white/60 text-[10px] uppercase tracking-wider">10 AGENTS SYNCHRONIZED</span>
          </div>
          <button
            onClick={handleExportTranscript}
            className="p-3 bg-[#121212] hover:bg-[#1c1c1c] border border-white/10 text-white/80 hover:text-white text-xs font-mono transition-all flex items-center space-x-1.5"
            title="Export Swarm Transcript"
          >
            <Download className="w-3.5 h-3.5 text-[#c5a059]" />
          </button>
        </div>
      </div>

      {/* 10 Agents Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {agents.map((ag) => {
          const isSelected = selectedAgent.id === ag.id;
          return (
            <div
              key={ag.id}
              onClick={() => setSelectedAgent(ag)}
              className={`p-4 border cursor-pointer transition-all space-y-1.5 ${
                isSelected
                  ? "bg-[#111111] border-[#c5a059] shadow-md ring-1 ring-[#c5a059]/40"
                  : "bg-[#0c0c0c] hover:bg-[#111111] border-white/10 text-white/70"
              }`}
            >
              <div className="flex items-center justify-between text-[9px] font-mono uppercase">
                <span className="text-[#c5a059] font-bold">{ag.code}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
              </div>
              <h4 className="font-serif font-normal text-xs text-white truncate">
                {ag.name}
              </h4>
              <p className="text-[10px] text-white/40 line-clamp-1 font-sans">
                {ag.role}
              </p>
            </div>
          );
        })}
      </div>

      {/* 2- or 3-Column Split: Selected Agent Profile + Live Cooperative Deliberation Room + Pending Tasks Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Selected Agent Deep-Dive */}
        <div className={showPendingTasks ? "lg:col-span-4 space-y-4" : "lg:col-span-5 space-y-4"}>
          <div className="p-8 bg-[#0c0c0c] border border-white/10 space-y-6">
            <div className="space-y-1.5 border-b border-white/10 pb-4">
              <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.25em] text-[#c5a059]">
                <span>AGENT [{selectedAgent.code}]</span>
                <span className="text-emerald-400">STATUS: {selectedAgent.status.toUpperCase()}</span>
              </div>
              <h3 className="font-serif font-light text-2xl text-white">
                {selectedAgent.name}
              </h3>
              <div className="text-[10px] font-mono text-white/40 uppercase tracking-wider">
                Specialization: <strong className="text-white/80">{selectedAgent.role}</strong>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-white/70 leading-relaxed bg-[#080808] p-5 border border-white/5 font-sans">
              {selectedAgent.mission}
            </p>

            {/* Agent Preset Directives */}
            {agentPresetPrompts[selectedAgent.code] && (
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-[#c5a059] uppercase tracking-[0.25em]">
                  Recommended Directives
                </span>
                <div className="space-y-1.5">
                  {agentPresetPrompts[selectedAgent.code].map((prompt, i) => (
                    <button
                      key={i}
                      onClick={() => handleStartDeliberation(prompt)}
                      className="w-full p-2.5 bg-[#080808] hover:bg-[#141414] border border-white/10 text-left text-xs text-white/80 font-sans flex items-start space-x-2 transition-all"
                    >
                      <Zap className="w-3 h-3 text-[#c5a059] shrink-0 mt-0.5" />
                      <span className="text-[11px] leading-snug">{prompt}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.25em]">
                Autonomous Capabilities
              </span>
              <div className="space-y-1.5">
                {selectedAgent.capabilities.map((cap, i) => (
                  <div key={i} className="p-3 bg-[#080808] border border-white/5 text-xs text-white/80 flex items-center space-x-2 font-sans">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                    <span>{cap}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Center / Right Column: Live Cooperative Deliberation Room */}
        <div className={showPendingTasks ? "lg:col-span-5 space-y-4" : "lg:col-span-7 space-y-4"}>
          <div className="p-8 bg-[#0c0c0c] border border-white/10 space-y-5 flex flex-col h-[600px]">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center space-x-2 text-[10px] font-mono tracking-[0.25em] uppercase text-[#c5a059]">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>LIVE MULTI-AGENT DELIBERATION ROOM</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setTargetMode(targetMode === "swarm" ? "individual" : "swarm")}
                  className="text-[9px] font-mono uppercase px-2 py-1 bg-[#121212] border border-white/10 text-[#c5a059]"
                >
                  Mode: {targetMode === "swarm" ? "Full Swarm Council" : `Solo (${selectedAgent.code})`}
                </button>
                <button
                  onClick={() => setDeliberationHistory([])}
                  className="text-white/40 hover:text-rose-400 p-1"
                  title="Clear Deliberation Stream"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Deliberation Chat Stream */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-2 font-sans text-xs">
              {deliberationHistory.map((item, idx) => (
                <div key={idx} className="p-4 bg-[#080808] border border-white/10 space-y-1.5">
                  <div className="flex items-center justify-between font-mono text-[9px] text-white/40 uppercase tracking-wider">
                    <span className="font-bold text-[#c5a059]">{item.agentName}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-white/40">{item.role}</span>
                      {item.timestamp && <span className="text-white/20">[{item.timestamp}]</span>}
                    </div>
                  </div>
                  <p className="text-white/80 leading-relaxed whitespace-pre-line text-xs font-sans">
                    {item.message}
                  </p>
                </div>
              ))}
              {isDeliberating && (
                <div className="p-4 bg-[#080808] border border-[#c5a059]/40 flex items-center space-x-3 text-xs text-[#c5a059] font-mono">
                  <Activity className="w-4 h-4 animate-spin" />
                  <span>SYNTHESIZING MULTI-AGENT INFERENCES ACROSS CANONICAL GRAPH...</span>
                </div>
              )}
            </div>

            {/* Deliberation Input */}
            <div className="pt-3 border-t border-white/10 flex gap-2">
              <input
                type="text"
                value={deliberationTopic}
                onChange={(e) => setDeliberationTopic(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleStartDeliberation()}
                placeholder={
                  targetMode === "swarm"
                    ? "Instruct Swarm Council (e.g. 'Synthesize capital mix for Nairobi sponge corridor')..."
                    : `Direct instruction to ${selectedAgent.name}...`
                }
                className="flex-1 px-4 py-3 bg-[#080808] border border-white/10 text-xs text-white placeholder-white/30 outline-none focus:border-[#c5a059]/60 font-sans"
              />
              <button
                id="btn-send-agent-deliberation"
                onClick={() => handleStartDeliberation()}
                disabled={isDeliberating}
                className="px-6 py-3 bg-[#c5a059] hover:bg-[#b08d48] text-[#080808] text-[10px] uppercase tracking-[0.25em] font-bold flex items-center space-x-2 transition-all disabled:opacity-50 shrink-0"
              >
                {isDeliberating ? (
                  <>
                    <Activity className="w-3.5 h-3.5 animate-spin" />
                    <span>DELIBERATING...</span>
                  </>
                ) : (
                  <>
                    <span>{targetMode === "swarm" ? "CONVENE" : "DISPATCH"}</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Pending Tasks Sidebar */}
        {showPendingTasks && (
          <div className="lg:col-span-3 space-y-4">
            <PendingTasksSidebar
              onSelectTaskToDeliberate={handleSelectTaskToDeliberate}
              onClose={() => setShowPendingTasks(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
};
