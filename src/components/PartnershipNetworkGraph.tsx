import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { motion, AnimatePresence } from "motion/react";
import { PartnershipTarget, SevenCapitalType } from "../types";
import {
  Maximize2,
  Minimize2,
  RotateCcw,
  Sliders,
  Layers,
  Sparkles,
  Info,
  Filter,
  CheckCircle2,
  TrendingUp,
  Award,
  Flame,
  Zap,
  RefreshCw
} from "lucide-react";

export interface NetworkNode extends d3.SimulationNodeDatum {
  id: string;
  label: string;
  type: "core" | "objective" | "partner" | "capital";
  category?: string;
  priority?: "High" | "Medium" | "Low";
  readiness?: number;
  color?: string;
  radius?: number;
  partnerData?: PartnershipTarget;
}

export interface NetworkLink extends d3.SimulationLinkDatum<NetworkNode> {
  source: string | NetworkNode;
  target: string | NetworkNode;
  relationship: string;
  nature: "compute" | "capital" | "policy" | "field" | "payments" | "governance";
  strength: number; // 1 to 5
}

interface PartnershipNetworkGraphProps {
  targets: PartnershipTarget[];
  selectedPartnerId?: string;
  onSelectPartner?: (partner: PartnershipTarget) => void;
  impactHeatmapEnabled?: boolean;
  onToggleHeatmap?: () => void;
  filterTriggerKey?: string;
}

const CORE_OBJECTIVES = [
  {
    id: "obj-bio-digital",
    label: "Bio-Digital Infrastructure",
    description: "Geospatial telemetry, sub-meter satellite feeds, and real-time environmental digital twins.",
    color: "#38bdf8",
  },
  {
    id: "obj-sovereign-ai",
    label: "Sovereign AI & Socratic Reasoning",
    description: "Frontier multi-agent swarm deliberation, chain-of-thought verification, and policy deconstruction.",
    color: "#a855f7",
  },
  {
    id: "obj-7cap-finance",
    label: "7-Capitals Concessional Finance",
    description: "Multi-billion blended finance stacks, sovereign green bonds, and multi-capital ledgers.",
    color: "#34d399",
  },
  {
    id: "obj-grassroots-rails",
    label: "Grassroots & Decentralized Rails",
    description: "Last-mile micro-payments, community pass identity, and youth maintenance guild credits.",
    color: "#fbbf24",
  },
  {
    id: "obj-living-labs",
    label: "Living Labs & Field Pilots",
    description: "Decentralized sponge bioswales, agricultural cold chains, and empirical RCT falsification.",
    color: "#f43f5e",
  },
];

const SEVEN_CAPITALS: { type: SevenCapitalType; label: string; color: string }[] = [
  { type: "Natural", label: "Natural Capital", color: "#10b981" },
  { type: "Human", label: "Human Capital", color: "#f59e0b" },
  { type: "Social", label: "Social Capital", color: "#ec4899" },
  { type: "Intellectual", label: "Intellectual Capital", color: "#8b5cf6" },
  { type: "Financial", label: "Financial Capital", color: "#06b6d4" },
  { type: "Physical", label: "Physical Capital", color: "#64748b" },
  { type: "Institutional", label: "Institutional Capital", color: "#3b82f6" },
];

export const PartnershipNetworkGraph: React.FC<PartnershipNetworkGraphProps> = ({
  targets,
  selectedPartnerId,
  onSelectPartner,
  impactHeatmapEnabled = false,
  onToggleHeatmap,
  filterTriggerKey = "default",
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [activeFilter, setActiveFilter] = useState<string>("ALL");
  const [viewMode, setViewMode] = useState<"full" | "objectives" | "capitals">("full");
  const [showLabels, setShowLabels] = useState<boolean>(true);
  const [hoveredNode, setHoveredNode] = useState<NetworkNode | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [localHeatmap, setLocalHeatmap] = useState<boolean>(impactHeatmapEnabled);
  const [simulationIteration, setSimulationIteration] = useState(0);

  useEffect(() => {
    setLocalHeatmap(impactHeatmapEnabled);
  }, [impactHeatmapEnabled]);

  const handleToggleHeatmapInternal = () => {
    if (onToggleHeatmap) {
      onToggleHeatmap();
    } else {
      setLocalHeatmap(!localHeatmap);
    }
  };

  const isHeatmapActive = onToggleHeatmap ? impactHeatmapEnabled : localHeatmap;

  // Build Graph Nodes & Links
  const generateGraphData = () => {
    const nodes: NetworkNode[] = [];
    const links: NetworkLink[] = [];

    // 1. Central Core Node
    nodes.push({
      id: "atlas-core",
      label: "Atlas Sanctum Core",
      type: "core",
      color: "#c5a059",
      priority: "High",
      radius: 28,
    });

    // 2. Objective Nodes
    if (viewMode === "full" || viewMode === "objectives") {
      CORE_OBJECTIVES.forEach((obj) => {
        nodes.push({
          id: obj.id,
          label: obj.label,
          type: "objective",
          color: obj.color,
          priority: "High",
          radius: 18,
        });

        links.push({
          source: "atlas-core",
          target: obj.id,
          relationship: "Core Strategic Directive",
          nature: "governance",
          strength: 5,
        });
      });
    }

    // 3. 7-Capitals Nodes
    if (viewMode === "full" || viewMode === "capitals") {
      SEVEN_CAPITALS.forEach((cap) => {
        nodes.push({
          id: `cap-${cap.type.toLowerCase()}`,
          label: cap.label,
          type: "capital",
          color: cap.color,
          priority: "High",
          radius: 16,
        });

        links.push({
          source: "atlas-core",
          target: `cap-${cap.type.toLowerCase()}`,
          relationship: "Accounting & Multi-Capital Steward",
          nature: "governance",
          strength: 4,
        });
      });
    }

    // 4. Partner Nodes
    targets.forEach((p) => {
      // Filter out if internal category filter is active
      if (activeFilter !== "ALL" && p.category !== activeFilter) return;

      const priority = p.strategicPriority || (p.readinessScore >= 92 ? "High" : p.readinessScore >= 88 ? "Medium" : "Low");
      const partnerColor =
        p.category === "Frontier AI & Cloud"
          ? "#38bdf8"
          : p.category === "Multilateral & Development Finance"
          ? "#34d399"
          : p.category === "Philanthropic Foundations"
          ? "#fbbf24"
          : "#ec4899";

      nodes.push({
        id: p.id,
        label: p.organization,
        type: "partner",
        category: p.category,
        priority: priority,
        readiness: p.readinessScore,
        color: partnerColor,
        radius: 20 + (p.readinessScore - 80) * 0.4,
        partnerData: p,
      });

      // Link to Core
      links.push({
        source: "atlas-core",
        target: p.id,
        relationship: `Bilateral Alliance (${p.category})`,
        nature: p.category.includes("AI") ? "compute" : p.category.includes("Finance") ? "capital" : "policy",
        strength: Math.round(p.readinessScore / 20),
      });

      // Link to specific Objectives
      if (viewMode === "full" || viewMode === "objectives") {
        if (p.id === "partner-01" || p.id === "partner-04") {
          links.push({
            source: p.id,
            target: "obj-bio-digital",
            relationship: "Planetary Earth Engine & Elastic Compute",
            nature: "compute",
            strength: 5,
          });
        }
        if (p.id === "partner-01" || p.id === "partner-02" || p.id === "partner-03") {
          links.push({
            source: p.id,
            target: "obj-sovereign-ai",
            relationship: "Frontier Multimodal & Socratic Reasoning",
            nature: "compute",
            strength: 5,
          });
        }
        if (p.id === "partner-06" || p.id === "partner-07" || p.id === "partner-09") {
          links.push({
            source: p.id,
            target: "obj-7cap-finance",
            relationship: "Blended Concessional Tranche Syndication",
            nature: "capital",
            strength: 5,
          });
        }
        if (p.id === "partner-10" || p.id === "partner-07") {
          links.push({
            source: p.id,
            target: "obj-grassroots-rails",
            relationship: "Digital Payments & Inclusive Ingress Rails",
            nature: "payments",
            strength: 4,
          });
        }
        if (p.id === "partner-05" || p.id === "partner-08" || p.id === "partner-09") {
          links.push({
            source: p.id,
            target: "obj-living-labs",
            relationship: "Field Prototyping & Grassroots Living Labs",
            nature: "field",
            strength: 5,
          });
        }
      }

      // Link to 7 Capitals
      if (viewMode === "full" || viewMode === "capitals") {
        if (p.category === "Frontier AI & Cloud") {
          links.push({
            source: p.id,
            target: "cap-intellectual",
            relationship: "Neural Compute & AI Models",
            nature: "compute",
            strength: 4,
          });
          links.push({
            source: p.id,
            target: "cap-physical",
            relationship: "Edge Data Centers & Sensor Clusters",
            nature: "field",
            strength: 3,
          });
        } else if (p.category === "Multilateral & Development Finance") {
          links.push({
            source: p.id,
            target: "cap-financial",
            relationship: "Concessional Tranches & Sovereign De-Risking",
            nature: "capital",
            strength: 5,
          });
          links.push({
            source: p.id,
            target: "cap-institutional",
            relationship: "54-State Policy Ingress Standard",
            nature: "policy",
            strength: 4,
          });
        } else if (p.category === "Philanthropic Foundations") {
          links.push({
            source: p.id,
            target: "cap-natural",
            relationship: "Agroforestry & Watershed Soil Health",
            nature: "field",
            strength: 4,
          });
          links.push({
            source: p.id,
            target: "cap-human",
            relationship: "Food Sovereignty & Health RCTs",
            nature: "field",
            strength: 4,
          });
        } else if (p.category === "Digital & Economic Infrastructure") {
          links.push({
            source: p.id,
            target: "cap-social",
            relationship: "Community Pass & Youth Guilds",
            nature: "payments",
            strength: 4,
          });
          links.push({
            source: p.id,
            target: "cap-financial",
            relationship: "Instant Mobile Money Rails",
            nature: "payments",
            strength: 4,
          });
        }
      }
    });

    return { nodes, links };
  };

  // D3 Rendering & Simulation
  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth || 900;
    const height = isFullscreen ? window.innerHeight - 120 : 540;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    svg.attr("viewBox", [0, 0, width, height]);

    const { nodes, links } = generateGraphData();

    // Defs for glowing filter and markers
    const defs = svg.append("defs");

    // Standard Glow filter
    const filter = defs.append("filter").attr("id", "glow").attr("x", "-50%").attr("y", "-50%").attr("width", "200%").attr("height", "200%");
    filter.append("feGaussianBlur").attr("stdDeviation", "4").attr("result", "coloredBlur");
    const feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode").attr("in", "coloredBlur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");

    // Heatmap High Priority Radiant Filter
    const heatFilterHigh = defs.append("filter").attr("id", "heat-high").attr("x", "-100%").attr("y", "-100%").attr("width", "300%").attr("height", "300%");
    heatFilterHigh.append("feGaussianBlur").attr("stdDeviation", "10").attr("result", "blur1");
    heatFilterHigh.append("feGaussianBlur").attr("stdDeviation", "4").attr("result", "blur2");
    const heatMergeHigh = heatFilterHigh.append("feMerge");
    heatMergeHigh.append("feMergeNode").attr("in", "blur1");
    heatMergeHigh.append("feMergeNode").attr("in", "blur2");
    heatMergeHigh.append("feMergeNode").attr("in", "SourceGraphic");

    // Heatmap Medium Radiant Filter
    const heatFilterMed = defs.append("filter").attr("id", "heat-med").attr("x", "-80%").attr("y", "-80%").attr("width", "260%").attr("height", "260%");
    heatFilterMed.append("feGaussianBlur").attr("stdDeviation", "6").attr("result", "blurMed");
    const heatMergeMed = heatFilterMed.append("feMerge");
    heatMergeMed.append("feMergeNode").attr("in", "blurMed");
    heatMergeMed.append("feMergeNode").attr("in", "SourceGraphic");

    // Radial Gradients for Heatmap Auras
    const gradHigh = defs.append("radialGradient").attr("id", "grad-heat-high");
    gradHigh.append("stop").attr("offset", "0%").attr("stop-color", "#10b981").attr("stop-opacity", "0.75");
    gradHigh.append("stop").attr("offset", "60%").attr("stop-color", "#c5a059").attr("stop-opacity", "0.35");
    gradHigh.append("stop").attr("offset", "100%").attr("stop-color", "#000000").attr("stop-opacity", "0");

    const gradMed = defs.append("radialGradient").attr("id", "grad-heat-med");
    gradMed.append("stop").attr("offset", "0%").attr("stop-color", "#f59e0b").attr("stop-opacity", "0.65");
    gradMed.append("stop").attr("offset", "65%").attr("stop-color", "#d97706").attr("stop-opacity", "0.25");
    gradMed.append("stop").attr("offset", "100%").attr("stop-color", "#000000").attr("stop-opacity", "0");

    const gradLow = defs.append("radialGradient").attr("id", "grad-heat-low");
    gradLow.append("stop").attr("offset", "0%").attr("stop-color", "#38bdf8").attr("stop-opacity", "0.5");
    gradLow.append("stop").attr("offset", "70%").attr("stop-color", "#0284c7").attr("stop-opacity", "0.15");
    gradLow.append("stop").attr("offset", "100%").attr("stop-color", "#000000").attr("stop-opacity", "0");

    // Container group with zoom/pan
    const g = svg.append("g").attr("class", "graph-container");

    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.4, 3.5])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });

    svg.call(zoom);

    // Initial Zoom Setup
    svg.call(zoom.transform, d3.zoomIdentity.translate(width / 2, height / 2).scale(0.85).translate(-width / 2, -height / 2));

    // Force simulation
    const simulation = d3
      .forceSimulation<NetworkNode>(nodes)
      .force(
        "link",
        d3
          .forceLink<NetworkNode, NetworkLink>(links)
          .id((d) => d.id)
          .distance((d) => (d.nature === "governance" ? 110 : 150))
          .strength((d) => (d.strength / 5) * 0.7)
      )
      .force("charge", d3.forceManyBody().strength(-480))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide<NetworkNode>().radius((d) => (d.radius || 20) + 20));

    // Draw Links
    const linkGroup = g.append("g").attr("class", "links");

    const link = linkGroup
      .selectAll<SVGLineElement, NetworkLink>("line")
      .data(links)
      .join("line")
      .attr("stroke", (d) => {
        if (isHeatmapActive) {
          if (d.nature === "capital") return "#10b981";
          if (d.nature === "compute") return "#38bdf8";
          return "#c5a059";
        }
        if (d.nature === "compute") return "#38bdf8";
        if (d.nature === "capital") return "#34d399";
        if (d.nature === "payments") return "#fbbf24";
        if (d.nature === "field") return "#f43f5e";
        if (d.nature === "policy") return "#818cf8";
        return "#c5a059";
      })
      .attr("stroke-opacity", (d) => {
        const sourceId = typeof d.source === "string" ? d.source : d.source.id;
        const targetId = typeof d.target === "string" ? d.target : d.target.id;
        if (selectedPartnerId && (sourceId === selectedPartnerId || targetId === selectedPartnerId)) {
          return 0.95;
        }
        return isHeatmapActive ? 0.38 : 0.28;
      })
      .attr("stroke-width", (d) => {
        const sourceId = typeof d.source === "string" ? d.source : d.source.id;
        const targetId = typeof d.target === "string" ? d.target : d.target.id;
        if (selectedPartnerId && (sourceId === selectedPartnerId || targetId === selectedPartnerId)) {
          return 3.5;
        }
        return Math.max(1, d.strength * 0.75);
      })
      .attr("stroke-dasharray", (d) => (d.nature === "payments" || d.nature === "field" ? "4 3" : "none"));

    // Draw Nodes
    const nodeGroup = g.append("g").attr("class", "nodes");

    const node = nodeGroup
      .selectAll<SVGGElement, NetworkNode>("g")
      .data(nodes, (d) => d.id)
      .join("g")
      .attr("class", "node-element")
      .style("cursor", "pointer")
      .call(
        d3
          .drag<SVGGElement, NetworkNode>()
          .on("start", (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on("drag", (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on("end", (event, d) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          })
      );

    // 1. Heatmap Ambient Glow Aura (if enabled)
    if (isHeatmapActive) {
      node
        .append("circle")
        .attr("class", "heat-aura")
        .attr("r", 0)
        .attr("fill", (d) => {
          if (d.priority === "High" || d.type === "core") return "url(#grad-heat-high)";
          if (d.priority === "Medium") return "url(#grad-heat-med)";
          return "url(#grad-heat-low)";
        })
        .attr("filter", (d) => (d.priority === "High" ? "url(#heat-high)" : "url(#heat-med)"))
        .transition()
        .duration(800)
        .delay((_, i) => i * 35)
        .ease(d3.easeCubicOut)
        .attr("r", (d) => {
          const baseR = d.radius || 20;
          if (d.priority === "High" || d.type === "core") return baseR * 2.5;
          if (d.priority === "Medium") return baseR * 1.8;
          return baseR * 1.35;
        });
    }

    // 2. Node outer rings / halos for selected / core
    node
      .append("circle")
      .attr("class", "outer-halo")
      .attr("r", 0)
      .attr("fill", "transparent")
      .attr("stroke", (d) => {
        if (isHeatmapActive && d.priority === "High") return "#10b981";
        return d.color || "#c5a059";
      })
      .attr("stroke-width", (d) => (d.id === selectedPartnerId ? 2.5 : d.type === "core" ? 2 : 1))
      .attr("stroke-opacity", (d) => (d.id === selectedPartnerId ? 0.95 : 0.45))
      .attr("stroke-dasharray", (d) => (d.type === "objective" ? "3 3" : "none"))
      .transition()
      .duration(700)
      .delay((_, i) => i * 30)
      .ease(d3.easeElasticOut.period(0.65))
      .attr("r", (d) => (d.radius || 20) + (d.id === selectedPartnerId || d.type === "core" ? 6 : 2));

    // 3. Node body circles (with Growing Transition)
    node
      .append("circle")
      .attr("class", "node-body")
      .attr("r", 0)
      .attr("fill", (d) => {
        if (d.type === "core") return "#1a160d";
        if (d.type === "objective") return "#0f172a";
        if (d.type === "capital") return "#061814";
        return "#121212";
      })
      .attr("stroke", (d) => {
        if (isHeatmapActive) {
          if (d.priority === "High") return "#10b981";
          if (d.priority === "Medium") return "#f59e0b";
          return "#38bdf8";
        }
        return d.color || "#ffffff";
      })
      .attr("stroke-width", (d) => (d.id === selectedPartnerId ? 3 : 1.5))
      .attr("filter", (d) => (d.id === selectedPartnerId || d.type === "core" || isHeatmapActive ? "url(#glow)" : null))
      .transition()
      .duration(850)
      .delay((_, i) => i * 35)
      .ease(d3.easeElasticOut.period(0.6))
      .attr("r", (d) => d.radius || 20);

    // 4. Priority badge dots on partner nodes
    node
      .filter((d) => d.type === "partner")
      .append("circle")
      .attr("cx", (d) => (d.radius || 20) * 0.7)
      .attr("cy", (d) => -(d.radius || 20) * 0.7)
      .attr("r", 0)
      .attr("fill", (d) => (d.priority === "High" ? "#10b981" : d.priority === "Medium" ? "#f59e0b" : "#38bdf8"))
      .attr("stroke", "#080808")
      .attr("stroke-width", 1.5)
      .transition()
      .duration(600)
      .delay((_, i) => 250 + i * 30)
      .ease(d3.easeBackOut)
      .attr("r", 4.5);

    // 5. Node glyphs / short text in center
    node
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .attr("font-family", "ui-monospace, monospace")
      .attr("font-size", (d) => (d.type === "core" ? "11px" : d.type === "partner" ? "9px" : "8px"))
      .attr("font-weight", "bold")
      .attr("fill", (d) => {
        if (isHeatmapActive && d.priority === "High") return "#34d399";
        return d.color || "#ffffff";
      })
      .attr("opacity", 0)
      .text((d) => {
        if (d.type === "core") return "ATLAS";
        if (d.type === "partner" && d.partnerData) return d.partnerData.carouselPosition;
        if (d.type === "objective") return "OBJ";
        if (d.type === "capital") return "7CAP";
        return "";
      })
      .transition()
      .duration(500)
      .delay((_, i) => 200 + i * 25)
      .attr("opacity", 1);

    // 6. Node full labels underneath
    if (showLabels) {
      node
        .append("text")
        .attr("text-anchor", "middle")
        .attr("dy", (d) => (d.radius || 20) + 14)
        .attr("font-family", "Georgia, serif")
        .attr("font-size", (d) => (d.type === "core" ? "12px" : "10px"))
        .attr("font-weight", (d) => (d.id === selectedPartnerId ? "bold" : "normal"))
        .attr("fill", (d) => (d.id === selectedPartnerId ? "#ffffff" : "#cccccc"))
        .attr("fill-opacity", 0)
        .text((d) => d.label)
        .transition()
        .duration(600)
        .delay((_, i) => 300 + i * 25)
        .attr("fill-opacity", 0.9);
    }

    // Node Interaction Events
    node
      .on("mouseenter", (event, d) => {
        setHoveredNode(d);
        d3.select(event.currentTarget).select("circle.node-body").attr("stroke-width", 3.5);
      })
      .on("mouseleave", (event, d) => {
        setHoveredNode(null);
        d3.select(event.currentTarget).select("circle.node-body").attr("stroke-width", d.id === selectedPartnerId ? 3 : 1.5);
      })
      .on("click", (event, d) => {
        if (d.partnerData && onSelectPartner) {
          onSelectPartner(d.partnerData);
        }
      });

    // Simulation Tick Update
    simulation.on("tick", () => {
      link
        .attr("x1", (d) => (typeof d.source === "object" ? (d.source as NetworkNode).x || 0 : 0))
        .attr("y1", (d) => (typeof d.source === "object" ? (d.source as NetworkNode).y || 0 : 0))
        .attr("x2", (d) => (typeof d.target === "object" ? (d.target as NetworkNode).x || 0 : 0))
        .attr("y2", (d) => (typeof d.target === "object" ? (d.target as NetworkNode).y || 0 : 0));

      node.attr("transform", (d) => `translate(${d.x || 0},${d.y || 0})`);
    });

    return () => {
      simulation.stop();
    };
  }, [targets, selectedPartnerId, activeFilter, viewMode, showLabels, isFullscreen, isHeatmapActive, simulationIteration, filterTriggerKey]);

  const handleResetZoom = () => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    const width = containerRef.current?.clientWidth || 900;
    const height = isFullscreen ? window.innerHeight - 120 : 540;
    const zoom = d3.zoom<SVGSVGElement, unknown>();
    svg.transition().duration(600).call(zoom.transform, d3.zoomIdentity.translate(width / 2, height / 2).scale(0.85).translate(-width / 2, -height / 2));
  };

  const handleRefreshPhysics = () => {
    setSimulationIteration((prev) => prev + 1);
  };

  return (
    <motion.div
      key={`graph-motion-${filterTriggerKey}-${simulationIteration}`}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      ref={containerRef}
      className={`p-6 bg-[#090909] border border-white/15 space-y-4 relative overflow-hidden shadow-2xl transition-all ${
        isFullscreen ? "fixed inset-4 z-50 overflow-y-auto bg-[#070707]" : ""
      }`}
    >
      {/* Top Header & Graph Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-[10px] font-mono uppercase tracking-[0.25em] text-[#c5a059]">
            <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>D3.JS SYSTEMIC RELATIONSHIP & OBJECTIVES NETWORK</span>
            {isHeatmapActive && (
              <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 border border-emerald-700 font-bold flex items-center space-x-1 animate-pulse">
                <Flame className="w-3 h-3 text-emerald-400" />
                <span>HEATMAP ACTIVE</span>
              </span>
            )}
          </div>
          <h3 className="font-serif text-lg sm:text-xl text-white font-light">
            Interactive Institutional & 7-Capitals Graph Topology
          </h3>
          <p className="text-xs text-white/50 font-sans">
            Mapping neural compute, concessional finance tranches, and field living labs between the active targets and Atlas Sanctum directives.
          </p>
        </div>

        {/* View Mode & Filter Controls */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
          {/* Topology Mode Switcher */}
          <div className="flex items-center bg-[#121212] p-1 border border-white/10">
            <button
              onClick={() => setViewMode("full")}
              className={`px-2.5 py-1 text-[10px] uppercase tracking-wider transition-all ${
                viewMode === "full" ? "bg-[#c5a059] text-black font-bold" : "text-white/60 hover:text-white"
              }`}
            >
              Full Mesh
            </button>
            <button
              onClick={() => setViewMode("objectives")}
              className={`px-2.5 py-1 text-[10px] uppercase tracking-wider transition-all ${
                viewMode === "objectives" ? "bg-[#c5a059] text-black font-bold" : "text-white/60 hover:text-white"
              }`}
            >
              Objectives Focus
            </button>
            <button
              onClick={() => setViewMode("capitals")}
              className={`px-2.5 py-1 text-[10px] uppercase tracking-wider transition-all ${
                viewMode === "capitals" ? "bg-[#c5a059] text-black font-bold" : "text-white/60 hover:text-white"
              }`}
            >
              7-Capitals Focus
            </button>
          </div>

          {/* Toggle Impact Heatmap Button */}
          <button
            id="btn-toggle-impact-heatmap"
            onClick={handleToggleHeatmapInternal}
            className={`px-3 py-1.5 border text-[10px] uppercase tracking-wider transition-all flex items-center space-x-1.5 ${
              isHeatmapActive
                ? "bg-gradient-to-r from-emerald-950 to-amber-950 border-emerald-500 text-emerald-300 font-bold shadow-lg shadow-emerald-950/50"
                : "bg-[#101010] hover:bg-[#181818] border-white/10 text-white/60 hover:text-white"
            }`}
          >
            <Flame className={`w-3.5 h-3.5 ${isHeatmapActive ? "text-emerald-400 animate-pulse" : "text-white/40"}`} />
            <span>Heatmap: {isHeatmapActive ? "ON" : "OFF"}</span>
          </button>

          {/* Label Toggle */}
          <button
            onClick={() => setShowLabels(!showLabels)}
            className={`px-3 py-1.5 border text-[10px] uppercase tracking-wider transition-all ${
              showLabels ? "bg-[#181818] border-[#c5a059]/60 text-[#c5a059] font-bold" : "bg-[#101010] border-white/10 text-white/40"
            }`}
          >
            Labels: {showLabels ? "ON" : "OFF"}
          </button>

          {/* Refresh Physics & Growth Animation */}
          <button
            onClick={handleRefreshPhysics}
            className="p-1.5 bg-[#121212] hover:bg-[#1f1f1f] border border-white/10 text-white/70 hover:text-white"
            title="Refresh Force Layout & Emergence Animation"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          {/* Reset Zoom */}
          <button
            onClick={handleResetZoom}
            className="p-1.5 bg-[#121212] hover:bg-[#1f1f1f] border border-white/10 text-white/70 hover:text-white"
            title="Reset Zoom & Pan"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 bg-[#121212] hover:bg-[#1f1f1f] border border-white/10 text-white/70 hover:text-white"
            title={isFullscreen ? "Exit Fullscreen" : "Expand Fullscreen"}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Graph Visual Canvas */}
      <div className="relative border border-white/10 bg-[#040404] overflow-hidden">
        <svg
          ref={svgRef}
          className="w-full select-none"
          style={{ height: isFullscreen ? "calc(100vh - 240px)" : "500px" }}
        />

        {/* Hovered Node Tooltip Card Overlay */}
        {hoveredNode && (
          <div className="absolute bottom-4 left-4 p-3.5 bg-[#0c0c0ce6] border border-[#c5a059]/60 backdrop-blur-md max-w-xs shadow-2xl text-xs space-y-1.5 pointer-events-none animate-fadeIn">
            <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-wider">
              <span className="text-[#c5a059] font-bold">{hoveredNode.type.toUpperCase()}</span>
              {hoveredNode.priority && (
                <span
                  className={`px-1.5 py-0.2 rounded text-[8px] font-bold ${
                    hoveredNode.priority === "High"
                      ? "bg-emerald-950 text-emerald-300 border border-emerald-700"
                      : hoveredNode.priority === "Medium"
                      ? "bg-amber-950 text-amber-300 border border-amber-700"
                      : "bg-sky-950 text-sky-300 border border-sky-700"
                  }`}
                >
                  {hoveredNode.priority} Priority
                </span>
              )}
            </div>
            <p className="font-serif text-sm text-white font-medium">{hoveredNode.label}</p>
            {hoveredNode.partnerData && (
              <p className="text-[11px] text-white/70 font-sans line-clamp-2">
                {hoveredNode.partnerData.strategicRole}
              </p>
            )}
            {hoveredNode.readiness && (
              <div className="pt-1 flex items-center justify-between text-[10px] font-mono text-white/60">
                <span>Alignment Readiness:</span>
                <span className="text-emerald-400 font-bold">{hoveredNode.readiness}%</span>
              </div>
            )}
            <div className="text-[9px] text-[#c5a059] font-mono italic">
              Click node to spotlight in carousel & report card
            </div>
          </div>
        )}

        {/* Floating Quick Legend */}
        <div className="absolute top-3 right-3 p-3 bg-[#080808]/90 border border-white/10 backdrop-blur-sm text-[10px] font-mono space-y-1.5 hidden md:block pointer-events-none">
          <div className="text-white/40 uppercase tracking-wider text-[9px] font-bold">
            {isHeatmapActive ? "Impact Heatmap Aura Intensity" : "Topology Legend"}
          </div>

          {isHeatmapActive ? (
            <>
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400 animate-pulse"></span>
                <span className="text-emerald-300 font-bold">High Priority (Radial Aura x2.5)</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                <span className="text-amber-300 font-bold">Medium Priority (Warm Halo x1.8)</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-sky-400"></span>
                <span className="text-sky-300 font-bold">Low Priority (Base Ring x1.35)</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#c5a059]"></span>
                <span className="text-white/80">Atlas Core</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#38bdf8]"></span>
                <span className="text-white/80">Frontier AI / Compute</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#34d399]"></span>
                <span className="text-white/80">Development Finance</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#fbbf24]"></span>
                <span className="text-white/80">Foundations / Grants</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ec4899]"></span>
                <span className="text-white/80">Payment / Ingress Rails</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Sub-Legend & Interaction Guide */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-[11px] font-mono text-white/60">
        <div className="p-2.5 bg-[#0c0c0c] border border-white/5 flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
          <span>Solid Line: Active Sovereign / Technical Ingress</span>
        </div>
        <div className="p-2.5 bg-[#0c0c0c] border border-white/5 flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-amber-400"></div>
          <span>Dashed Line: Decentralized Protocol & Field Trials</span>
        </div>
        <div className="p-2.5 bg-[#0c0c0c] border border-white/5 flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-[#c5a059]"></div>
          <span>Node Size: 7-Capitals Alignment Readiness Score</span>
        </div>
      </div>
    </motion.div>
  );
};
