import React, { useState } from "react";
import {
  GitFork,
  Layers,
  Sparkles,
  Search,
  Filter,
  ArrowRight,
  Plus,
  Compass,
  Activity,
  Globe,
  ShieldAlert,
  Info
} from "lucide-react";
import { WorldNode, WorldEdge, NavigationSpace } from "../../types";
import { WORLD_GRAPH_NODES, WORLD_GRAPH_EDGES } from "../../data/seedData";

interface WorldModelViewProps {
  onNavigate: (space: NavigationSpace) => void;
  africaMode: boolean;
}

export const WorldModelView: React.FC<WorldModelViewProps> = ({
  onNavigate,
  africaMode,
}) => {
  const [nodes, setNodes] = useState<WorldNode[]>(WORLD_GRAPH_NODES);
  const [edges, setEdges] = useState<WorldEdge[]>(WORLD_GRAPH_EDGES);
  const [selectedNode, setSelectedNode] = useState<WorldNode>(WORLD_GRAPH_NODES[0]);
  const [selectedFilterType, setSelectedFilterType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const nodeTypes = [
    { id: "all", label: "All Entities" },
    { id: "place", label: "Places & Geography" },
    { id: "ecosystem", label: "Ecosystems & Basins" },
    { id: "problem", label: "Systemic Problems" },
    { id: "intervention", label: "Interventions" },
    { id: "technology", label: "Technologies" },
    { id: "institution", label: "Institutions & Guilds" },
    { id: "capital", label: "Capital Funds" },
    { id: "opportunity", label: "Regenerative Horizons" },
  ];

  const filteredNodes = nodes.filter((node) => {
    const matchesType = selectedFilterType === "all" || node.type === selectedFilterType;
    const matchesSearch =
      node.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      node.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  // Calculate connected edges and nodes for selectedNode
  const connectedEdges = edges.filter(
    (e) => e.source === selectedNode.id || e.target === selectedNode.id
  );

  const getNodeColor = (type: WorldNode["type"]) => {
    switch (type) {
      case "place":
        return "bg-[#181308] text-[#c5a059] border-[#c5a059]/50";
      case "ecosystem":
        return "bg-[#0a1610] text-emerald-300 border-emerald-700/50";
      case "problem":
        return "bg-[#180d0d] text-rose-300 border-rose-700/50";
      case "intervention":
        return "bg-[#0b141a] text-sky-300 border-sky-700/50";
      case "technology":
        return "bg-[#140d1a] text-purple-300 border-purple-700/50";
      case "capital":
        return "bg-[#0a1610] text-emerald-300 border-emerald-600/50";
      case "institution":
        return "bg-[#161616] text-white/80 border-white/20";
      default:
        return "bg-[#111111] text-white/70 border-white/10";
    }
  };

  const getEdgeDirectionColor = (direction: WorldEdge["direction"]) => {
    switch (direction) {
      case "strains":
      case "depletes":
        return "text-rose-400";
      case "funds":
      case "reinforces":
        return "text-emerald-400";
      case "transforms":
        return "text-[#c5a059]";
      default:
        return "text-white/40";
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn text-[#f2f2f2] pb-20">
      {/* Header */}
      <div className="p-8 bg-[#0c0c0c] border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2.5 text-[10px] font-mono tracking-[0.3em] uppercase text-sky-400">
            <GitFork className="w-3.5 h-3.5" />
            <span>RELATIONAL & CAUSAL ONTOLOGY</span>
          </div>
          <h2 className="font-serif font-light text-3xl sm:text-4xl text-white tracking-wide">
            Atlas Living World Model
          </h2>
          <p className="text-xs sm:text-sm text-white/50 font-serif italic max-w-2xl leading-relaxed">
            A dynamic knowledge graph prioritizing causal relationships over isolated records: exploring how hydrology, infrastructure, and capital reinforce or deplete reality.
          </p>
        </div>

        <button
          onClick={() => {
            const label = prompt("Enter new Entity Name (e.g. 'Lake Victoria Bio-Crude Refinery'):");
            if (label && label.trim()) {
              const newNode: WorldNode = {
                id: `node-${Date.now()}`,
                label: label.trim(),
                type: "intervention",
                status: "active",
                metric: "Capacity: Initializing",
                description: "Newly added entity in the Atlas World Model knowledge graph.",
                x: 400 + Math.random() * 100,
                y: 300 + Math.random() * 100
              };
              setNodes([...nodes, newNode]);
              setSelectedNode(newNode);
            }
          }}
          className="px-5 py-2.5 bg-[#c5a059] hover:bg-[#b08d48] text-[#080808] text-[10px] uppercase tracking-[0.25em] font-bold flex items-center space-x-2 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Graph Entity</span>
        </button>
      </div>

      {/* Filter Chips & Search Bar */}
      <div className="p-5 bg-[#0c0c0c] border border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          {nodeTypes.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedFilterType(t.id)}
              className={`px-3.5 py-1.5 text-[10px] uppercase tracking-[0.2em] font-mono transition-colors ${
                selectedFilterType === t.id
                  ? "bg-[#c5a059] text-[#080808] font-bold"
                  : "bg-[#080808] text-white/40 hover:text-white border border-white/10"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 text-[#c5a059] absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search entities, places..."
            className="w-full pl-9 pr-3 py-2 bg-[#080808] border border-white/10 text-xs text-white placeholder-white/30 outline-none focus:border-[#c5a059]"
          />
        </div>
      </div>

      {/* Main Interactive Visual Causal Graph & Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Causal Graph Canvas Area (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="relative w-full h-[520px] bg-[#080808] border border-white/10 overflow-hidden shadow-inner p-4">
            {/* Background Grid Lines */}
            <div className="absolute inset-0 opacity-15 pointer-events-none bg-luxury-grid"></div>

            {/* Top Graph Stats */}
            <div className="absolute top-4 left-4 z-10 flex items-center space-x-3 text-[10px] font-mono tracking-wider uppercase text-white/50 bg-[#0c0c0c]/90 backdrop-blur-md px-4 py-2 border border-white/10">
              <span>Nodes: <strong className="text-white">{nodes.length}</strong></span>
              <span>•</span>
              <span>Links: <strong className="text-white">{edges.length}</strong></span>
              <span>•</span>
              <span className="text-[#c5a059]">Interactive Causal Canvas</span>
            </div>

            {/* SVG Connecting Edges */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <defs>
                <marker
                  id="arrow-amber"
                  viewBox="0 0 10 10"
                  refX="16"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#c5a059" />
                </marker>
                <marker
                  id="arrow-sky"
                  viewBox="0 0 10 10"
                  refX="16"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#38bdf8" />
                </marker>
                <marker
                  id="arrow-rose"
                  viewBox="0 0 10 10"
                  refX="16"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#f43f5e" />
                </marker>
                <marker
                  id="arrow-emerald"
                  viewBox="0 0 10 10"
                  refX="16"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
                </marker>
              </defs>

              {edges.map((edge) => {
                const src = nodes.find((n) => n.id === edge.source);
                const tgt = nodes.find((n) => n.id === edge.target);
                if (!src || !tgt || src.x === undefined || src.y === undefined || tgt.x === undefined || tgt.y === undefined) return null;

                const isConnected = selectedNode.id === src.id || selectedNode.id === tgt.id;
                const strokeColor = isConnected
                  ? edge.direction === "strains" || edge.direction === "depletes"
                    ? "#f43f5e"
                    : "#c5a059"
                  : "#262626";

                return (
                  <g key={edge.id}>
                    <line
                      x1={src.x + 60}
                      y1={src.y + 20}
                      x2={tgt.x + 60}
                      y2={tgt.y + 20}
                      stroke={strokeColor}
                      strokeWidth={isConnected ? 2 : 1}
                      strokeDasharray={edge.direction === "strains" ? "4 4" : undefined}
                      opacity={isConnected ? 0.95 : 0.3}
                      markerEnd={
                        isConnected
                          ? edge.direction === "strains"
                            ? "url(#arrow-rose)"
                            : "url(#arrow-amber)"
                          : undefined
                      }
                    />
                  </g>
                );
              })}
            </svg>

            {/* Interactive Graph Node Badges */}
            <div className="absolute inset-0 w-full h-full">
              {filteredNodes.map((node) => {
                const isSelected = selectedNode.id === node.id;
                const isConnected = edges.some(
                  (e) => (e.source === selectedNode.id && e.target === node.id) || (e.target === selectedNode.id && e.source === node.id)
                );

                return (
                  <div
                    key={node.id}
                    onClick={() => setSelectedNode(node)}
                    style={{
                      left: `${node.x || 100}px`,
                      top: `${node.y || 100}px`,
                    }}
                    className={`absolute z-20 cursor-pointer p-3 border transition-all select-none shadow-lg transform -translate-x-1/2 -translate-y-1/2 ${
                      isSelected
                        ? "scale-105 border-[#c5a059] bg-[#141414] shadow-[#c5a059]/20"
                        : isConnected
                        ? "scale-102 border-[#c5a059]/60 bg-[#0c0c0c]"
                        : "bg-[#0c0c0c]/90 hover:scale-102 border-white/10"
                    }`}
                  >
                    <div className="flex items-center space-x-1.5 text-[9px] font-mono mb-1">
                      <span className={`px-2 py-0.2 uppercase border ${getNodeColor(node.type)}`}>
                        {node.type}
                      </span>
                    </div>
                    <div className="font-serif font-light text-xs text-white max-w-[140px] truncate">
                      {node.label}
                    </div>
                    {node.metric && (
                      <div className="text-[9px] font-mono text-white/40 truncate max-w-[140px] mt-0.5">
                        {node.metric}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Entity Inspector & Causal Relations (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-6 bg-[#0c0c0c] border border-white/10 space-y-6">
            {/* Header info */}
            <div className="space-y-2 border-b border-white/10 pb-4">
              <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider">
                <span className={`px-2 py-0.5 border ${getNodeColor(selectedNode.type)}`}>
                  {selectedNode.type}
                </span>
                <span className="text-white/40">
                  Status: <strong className="text-[#c5a059]">{selectedNode.status}</strong>
                </span>
              </div>
              <h3 className="font-serif font-light text-xl text-white">
                {selectedNode.label}
              </h3>
              {selectedNode.location && (
                <p className="text-[10px] text-white/40 font-mono tracking-wider uppercase">
                  Location: {selectedNode.location}
                </p>
              )}
            </div>

            {/* Description & Metric */}
            <div className="space-y-2 text-xs">
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em]">Entity Narrative</span>
              <p className="text-white/70 leading-relaxed bg-[#080808] p-4 border border-white/5 font-sans">
                {selectedNode.description}
              </p>
              {selectedNode.metric && (
                <div className="p-3 bg-[#080808] border border-white/10 font-mono text-xs text-white/80">
                  <strong className="text-[#c5a059] font-bold">Metric:</strong> {selectedNode.metric}
                </div>
              )}
            </div>

            {/* Causal Linkages */}
            <div className="space-y-3">
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em]">
                Active Causal Relationships ({connectedEdges.length})
              </span>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {connectedEdges.map((e) => {
                  const isSource = e.source === selectedNode.id;
                  const otherNode = nodes.find((n) => n.id === (isSource ? e.target : e.source));
                  if (!otherNode) return null;

                  return (
                    <div
                      key={e.id}
                      onClick={() => setSelectedNode(otherNode)}
                      className="p-3 bg-[#080808] hover:bg-[#141414] border border-white/10 hover:border-[#c5a059]/40 cursor-pointer text-xs transition-colors space-y-1"
                    >
                      <div className="flex items-center justify-between text-[9px] font-mono uppercase tracking-wider">
                        <span className={getEdgeDirectionColor(e.direction)}>
                          {isSource ? "→ [OUTFLOW]" : "← [INFLOW]"} {e.direction}
                        </span>
                        <span className="text-white/40">Strength: {e.strength}/5</span>
                      </div>
                      <div className="text-white font-sans text-xs truncate">
                        {otherNode.label}
                      </div>
                      <div className="text-[10px] text-white/40 font-serif italic">
                        "{e.relationship}"
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
              <button
                onClick={() => onNavigate("systems-modeling")}
                className="w-full py-2.5 px-4 border border-white/15 text-white/70 hover:text-white text-[10px] uppercase tracking-[0.25em] font-mono flex items-center justify-center space-x-2 transition-colors"
              >
                <Layers className="w-3.5 h-3.5 text-sky-400" />
                <span>Simulate Causal Loops</span>
              </button>

              <button
                onClick={() => onNavigate("studio")}
                className="w-full py-2.5 px-4 bg-[#c5a059] hover:bg-[#b08d48] text-[#080808] text-[10px] uppercase tracking-[0.25em] font-bold flex items-center justify-center space-x-2 transition-all"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Intervene in Studio</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
