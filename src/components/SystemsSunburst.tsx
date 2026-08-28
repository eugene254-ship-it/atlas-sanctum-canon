import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import {
  Layers,
  Sparkles,
  ExternalLink,
  ChevronRight,
  RotateCcw,
  Info,
  Compass,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { quickCopyToClipboard } from "../services/api";

export interface SystemsSunburstData {
  name: string;
  category?: string;
  value?: number;
  description?: string;
  leveragePoint?: string;
  loopType?: "reinforcing" | "balancing" | "hybrid";
  impactWeight?: number;
  targetIntervention?: string;
  color?: string;
  children?: SystemsSunburstData[];
}

const SYSTEMS_INTELLIGENCE_DATA: SystemsSunburstData = {
  name: "Civilizational Operating System",
  category: "root",
  description: "Whole-systems bio-economic operating intelligence mapping 5 foundational domains, 15 critical subsystems, and 30 leverage points.",
  impactWeight: 100,
  children: [
    {
      name: "Hydrological & Biosphere Sponge",
      category: "hydrology",
      description: "Restoring living catchment retention, natural infiltration, and soil sponge biology to reverse severe flood/drought oscillation.",
      impactWeight: 96,
      leveragePoint: "Meadows #3: Structure of material stocks & flows",
      color: "#0ea5e9", // Sky Blue
      children: [
        {
          name: "Urban Bioswales & Sponges",
          category: "hydrology",
          description: "Volcanic pumice and vetiver grass infiltration conduits that buffer peak cloudburst runoff.",
          impactWeight: 92,
          leveragePoint: "Meadows #4: Power to self-organize",
          loopType: "balancing",
          targetIntervention: "12km contiguous pumice swale network across high-risk informal settlement valleys.",
          children: [
            {
              name: "Pumice Matrix Filtering",
              value: 35,
              impactWeight: 88,
              leveragePoint: "Meadows #6: Information flows",
              description: "Natural volcanic gravel aggregate with 45% pore volume for micro-sediment trap.",
            },
            {
              name: "Deep-Root Vetiver Sinks",
              value: 40,
              impactWeight: 94,
              leveragePoint: "Meadows #3: Material stocks",
              description: "Ten-meter tensile root networks anchoring riverbanks against 4m/s hydraulic shear.",
            },
            {
              name: "Overland Retention Basins",
              value: 30,
              impactWeight: 89,
              leveragePoint: "Meadows #8: Buffer sizes",
              description: "Tiered dry retention basins holding 80,000m³ during cloudburst events.",
            }
          ]
        },
        {
          name: "Aquifer Recharge Corridors",
          category: "hydrology",
          description: "Reconnecting deep geological basalt aquifers through gravity recharge injection wells.",
          impactWeight: 89,
          leveragePoint: "Meadows #8: Strengths of negative feedback loops",
          loopType: "balancing",
          targetIntervention: "Inject 1.8M liters of filtered seasonal runoff directly to volcanic rift aquifers.",
          children: [
            {
              name: "Passive Sediment Silt Traps",
              value: 30,
              impactWeight: 85,
              leveragePoint: "Meadows #10: Structure of material flows",
              description: "Coarse stone and bamboo baffling reducing suspended particulate by 78%.",
            },
            {
              name: "Deep Basalt Bore Wells",
              value: 35,
              impactWeight: 91,
              leveragePoint: "Meadows #3: Stock maintenance",
              description: "Gravity-assisted recharge preserving groundwater hydrostatic table.",
            }
          ]
        },
        {
          name: "Riparian Agroforestry Buffer",
          category: "hydrology",
          description: "Canopy cooling and biological evapotranspiration zones along river corridors.",
          impactWeight: 86,
          leveragePoint: "Meadows #2: Mindset out of which the system arises",
          loopType: "reinforcing",
          targetIntervention: "Multi-strata indigenous acacia and bamboo riparian canopy rewilding.",
          children: [
            {
              name: "Giant Bamboo Riparian Belts",
              value: 32,
              impactWeight: 87,
              leveragePoint: "Meadows #4: Self-organizing capacity",
              description: "Dense clumping rhizomes halting slope collapse in heavy downpours.",
            },
            {
              name: "Nitrogen-Fixing Canopies",
              value: 28,
              impactWeight: 82,
              leveragePoint: "Meadows #9: Delay structures",
              description: "Faidherbia albida providing reverse phenology shade in dry seasons.",
            }
          ]
        }
      ]
    },
    {
      name: "Decentralized Clean Energy Matrix",
      category: "energy",
      description: "Replacing brittle centralized grids with peer-to-peer DC microgrids, thermal absorption chillers, and kinetic storage.",
      impactWeight: 94,
      leveragePoint: "Meadows #5: Rules of the system",
      color: "#f59e0b", // Amber / Gold
      children: [
        {
          name: "Agrivoltaic DC Microgrids",
          category: "energy",
          description: "Elevated bifacial solar arrays over high-value horticulture generating power and microclimate shade.",
          impactWeight: 91,
          leveragePoint: "Meadows #6: Structure of information flows",
          loopType: "reinforcing",
          targetIntervention: "Deploy 500kW distributed agrivoltaics paired with direct DC water pumping.",
          children: [
            {
              name: "Bifacial Solar Canopies",
              value: 38,
              impactWeight: 92,
              leveragePoint: "Meadows #10: Material stocks",
              description: "Dual-sided glass modules harvesting ground albedo and cooling crops below.",
            },
            {
              name: "Peer-to-Peer DC Mesh",
              value: 34,
              impactWeight: 89,
              leveragePoint: "Meadows #6: Information flows",
              description: "Low-voltage DC distribution eliminating inverter losses for local chamas.",
            }
          ]
        },
        {
          name: "Thermal Absorption Chilling",
          category: "energy",
          description: "Converting waste biomass pyrolysis heat into sub-zero agricultural cold chain refrigeration.",
          impactWeight: 88,
          leveragePoint: "Meadows #4: Self-organization",
          loopType: "balancing",
          targetIntervention: "Zero-electricity evaporative cooling hubs at cooperative harvest collection nodes.",
          children: [
            {
              name: "Ammonia-Water Absorption",
              value: 32,
              impactWeight: 86,
              leveragePoint: "Meadows #3: Material stocks",
              description: "Thermo-chemical cooling driven entirely by agricultural biochar retort exhaust.",
            },
            {
              name: "Phase-Change Cold Storage",
              value: 30,
              impactWeight: 87,
              leveragePoint: "Meadows #8: Buffer sizes",
              description: "Eutectic salt solution batteries providing 72 hours of uninterrupted cold storage.",
            }
          ]
        }
      ]
    },
    {
      name: "Regenerative Capital & Escrows",
      category: "capital",
      description: "Automated multi-capital accounting ensuring zero value extraction, sovereign biometric escrows, and 100% community equity retention.",
      impactWeight: 98,
      leveragePoint: "Meadows #1: Power to transcend paradigms",
      color: "#10b981", // Emerald
      children: [
        {
          name: "7-Capitals Smart Escrow",
          category: "capital",
          description: "Programmable funds disbursed only upon cryptographic sensor verification of ecological and social metrics.",
          impactWeight: 96,
          leveragePoint: "Meadows #5: Rules of the system",
          loopType: "reinforcing",
          targetIntervention: "Milestone-verified algorithmic disbursement for watershed rehabilitation contracts.",
          children: [
            {
              name: "Telemetry-Triggered Payouts",
              value: 40,
              impactWeight: 95,
              leveragePoint: "Meadows #6: Information flows",
              description: "IoT soil moisture and water purity sensor gates executing immediate micro-transfers.",
            },
            {
              name: "Community Equity Trust",
              value: 36,
              impactWeight: 97,
              leveragePoint: "Meadows #2: Paradigm shift",
              description: "Non-dilutable asset ownership vested permanently in local resident stewardship unions.",
            }
          ]
        },
        {
          name: "Parametric Biome Risk Pools",
          category: "capital",
          description: "Hyper-local disaster insurance triggered instantly by satellite synthetic aperture radar rainfall anomalies.",
          impactWeight: 90,
          leveragePoint: "Meadows #7: Gain of driving positive feedback loops",
          loopType: "balancing",
          targetIntervention: "Zero-claims automated payout within 4 hours of a 100-year storm event.",
          children: [
            {
              name: "Satellite Radar Trigger",
              value: 30,
              impactWeight: 89,
              leveragePoint: "Meadows #6: Information flows",
              description: "Sentinel-1 radar surface water flood masks triggering smart contract indemnity.",
            },
            {
              name: "Mutualized Liquidity Reserves",
              value: 28,
              impactWeight: 91,
              leveragePoint: "Meadows #8: Buffer sizes",
              description: "Chama-held sovereign liquidity cushions insulated from foreign exchange volatility.",
            }
          ]
        }
      ]
    },
    {
      name: "Autonomous Guild Governance",
      category: "governance",
      description: "Polycentric, high-trust community operational guilds empowered by Socratic consensus and AI-assisted moral verification.",
      impactWeight: 93,
      leveragePoint: "Meadows #2: Mindset out of which the system arises",
      color: "#8b5cf6", // Purple
      children: [
        {
          name: "Youth Maintenance Swarms",
          category: "governance",
          description: "Trained local youth collectives conducting continuous predictive maintenance on bioswales and microgrids.",
          impactWeight: 94,
          leveragePoint: "Meadows #4: Power of self-organization",
          loopType: "reinforcing",
          targetIntervention: "Living wage dignified green engineering jobs replacing erratic ad-hoc emergency relief.",
          children: [
            {
              name: "Predictive Telemetry Patrols",
              value: 36,
              impactWeight: 90,
              leveragePoint: "Meadows #6: Information flows",
              description: "Mobile sensor wand audits clearing sediment traps 48 hours before storm warnings.",
            },
            {
              name: "Decentralized Tool Libraries",
              value: 30,
              impactWeight: 86,
              leveragePoint: "Meadows #3: Material stocks",
              description: "Community-owned fabrication equipment, solar welders, and bio-masonry moulds.",
            }
          ]
        },
        {
          name: "Socratic Assembly & Moral Gate",
          category: "governance",
          description: "Bi-weekly multi-generational council reviewing institutional trade-offs and verifying 7-Generations ethics.",
          impactWeight: 91,
          leveragePoint: "Meadows #1: Goals of the system",
          loopType: "balancing",
          targetIntervention: "Veto authority over extractive commercial ventures or inequitable zoning shifts.",
          children: [
            {
              name: "Elders & Youth Consensus",
              value: 32,
              impactWeight: 92,
              leveragePoint: "Meadows #2: Paradigm shift",
              description: "Structured Socratic council balancing traditional ecological memory with cybernetic data.",
            },
            {
              name: "Algorithmic Dignity Auditing",
              value: 28,
              impactWeight: 88,
              leveragePoint: "Meadows #5: Rules of the system",
              description: "Automated scan ensuring zero displacement or debt traps for vulnerable households.",
            }
          ]
        }
      ]
    },
    {
      name: "Circular Bio-Materials Economy",
      category: "materials",
      description: "Closing urban biological and mineral nutrient loops to eliminate waste while synthesizing regenerative building inputs.",
      impactWeight: 91,
      leveragePoint: "Meadows #4: Self-organization",
      color: "#ec4899", // Rose / Magenta
      children: [
        {
          name: "Black Soldier Fly Bioconversion",
          category: "materials",
          description: "Hyper-efficient larvae processing organic market waste into 45% protein poultry feed and organic frass fertilizer.",
          impactWeight: 92,
          leveragePoint: "Meadows #3: Material stocks",
          loopType: "reinforcing",
          targetIntervention: "Divert 40 tons/day of market compost into decentralized bio-conversion reactors.",
          children: [
            {
              name: "High-Protein Larval Harvest",
              value: 34,
              impactWeight: 91,
              leveragePoint: "Meadows #10: Material flows",
              description: "Sustainable local fish & poultry meal replacing imported unsustainable soy.",
            },
            {
              name: "Microbial Bio-Frass Soil Input",
              value: 30,
              impactWeight: 93,
              leveragePoint: "Meadows #3: Stocks",
              description: "Enzyme-rich organic bio-fertilizer restoring depleted peri-urban volcanic soils.",
            }
          ]
        },
        {
          name: "Bio-Composite Construction",
          category: "materials",
          description: "Engineered bamboo, mycelium insulation, and compressed volcanic earth blocks replacing carbon-intensive concrete.",
          impactWeight: 89,
          leveragePoint: "Meadows #4: Self-organizing capacity",
          loopType: "reinforcing",
          targetIntervention: "Erect 100% locally sourced, earthquake-resilient modular community centers.",
          children: [
            {
              name: "Compressed Volcanic Earth Blocks",
              value: 32,
              impactWeight: 88,
              leveragePoint: "Meadows #10: Material flows",
              description: "Zero-fired hydraulic interlock bricks with 85% lower carbon footprint than clay bricks.",
            },
            {
              name: "Structural Bamboo Trusses",
              value: 30,
              impactWeight: 90,
              leveragePoint: "Meadows #3: Material stocks",
              description: "Borax-treated Dendrocalamus asper outperforming mild steel in tensile strength per weight.",
            }
          ]
        }
      ]
    }
  ]
};

interface SystemsSunburstProps {
  onNavigateStudio?: () => void;
}

export const SystemsSunburst: React.FC<SystemsSunburstProps> = ({ onNavigateStudio }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [selectedNode, setSelectedNode] = useState<d3.HierarchyRectangularNode<SystemsSunburstData> | null>(null);
  const [hoveredNode, setHoveredNode] = useState<d3.HierarchyRectangularNode<SystemsSunburstData> | null>(null);
  const [zoomRoot, setZoomRoot] = useState<d3.HierarchyRectangularNode<SystemsSunburstData> | null>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({ width: 500, height: 500 });
  const [copied, setCopied] = useState(false);

  // ResizeObserver for clean responsive canvas
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = Math.max(320, Math.min(entry.contentRect.width, 680));
        const height = width;
        setDimensions({ width, height });
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = dimensions.width;
    const height = dimensions.height;
    const radius = width / 6;

    // Clear previous SVG contents
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    svg
      .attr("viewBox", `-${width / 2} -${height / 2} ${width} ${height}`)
      .style("font", "10px monospace")
      .style("cursor", "pointer");

    // D3 Hierarchy & Partition layout
    const root = d3
      .hierarchy(SYSTEMS_INTELLIGENCE_DATA)
      .sum((d) => d.value || 10)
      .sort((a, b) => (b.value || 0) - (a.value || 0)) as d3.HierarchyRectangularNode<SystemsSunburstData>;

    const partition = d3.partition<SystemsSunburstData>().size([2 * Math.PI, root.height + 1]);
    partition(root);

    // Initial root setup
    if (!zoomRoot) {
      setZoomRoot(root);
      setSelectedNode(root);
    }

    // Color mapper
    const categoryColors: Record<string, string> = {
      root: "#c5a059",
      hydrology: "#0ea5e9",
      energy: "#f59e0b",
      capital: "#10b981",
      governance: "#8b5cf6",
      materials: "#ec4899",
    };

    const getNodeColor = (d: d3.HierarchyRectangularNode<SystemsSunburstData>): string => {
      if (d.depth === 0) return "#141414";
      if (d.data.color) return d.data.color;
      let curr: d3.HierarchyRectangularNode<SystemsSunburstData> | null = d;
      while (curr && curr.depth > 1) {
        curr = curr.parent;
      }
      const baseCategory = curr?.data.category || "hydrology";
      const baseColor = categoryColors[baseCategory] || "#c5a059";

      // Depth gradient luminance
      const colorScale = d3.interpolateRgb(baseColor, "#080808");
      return colorScale(Math.min(0.65, (d.depth - 1) * 0.22));
    };

    // Arc generator
    const currentRoot = zoomRoot || root;
    (root as any).each((d: any) => (d.current = d));

    const arc = d3
      .arc<d3.HierarchyRectangularNode<SystemsSunburstData>>()
      .startAngle((d: any) => d.x0)
      .endAngle((d: any) => d.x1)
      .padAngle((d: any) => Math.min((d.x1 - d.x0) / 2, 0.005))
      .padRadius(radius * 1.5)
      .innerRadius((d: any) => d.y0 * radius)
      .outerRadius((d: any) => Math.max(d.y0 * radius, d.y1 * radius - 1));

    // Sunburst Path Elements
    const path = svg
      .append("g")
      .selectAll("path")
      .data(root.descendants().slice(1))
      .join("path")
      .attr("fill", (d) => getNodeColor(d))
      .attr("fill-opacity", (d: any) => (arcVisible(d.current) ? (d.children ? 0.85 : 0.65) : 0))
      .attr("pointer-events", (d: any) => (arcVisible(d.current) ? "auto" : "none"))
      .attr("d", (d: any) => arc(d.current))
      .attr("stroke", "#080808")
      .attr("stroke-width", "1.5px")
      .on("mouseover", (_event, d) => {
        setHoveredNode(d);
        d3.select(_event.currentTarget).attr("fill-opacity", 1).attr("stroke", "#ffffff").attr("stroke-width", "2px");
      })
      .on("mouseout", (_event, d) => {
        setHoveredNode(null);
        d3.select(_event.currentTarget)
          .attr("fill-opacity", d.children ? 0.85 : 0.65)
          .attr("stroke", "#080808")
          .attr("stroke-width", "1.5px");
      })
      .on("click", (_event, p) => {
        setSelectedNode(p);
        clicked(p);
      });

    // Center Circle for Zoom Out
    const parent = svg
      .append("circle")
      .datum(root)
      .attr("r", radius)
      .attr("fill", "#0c0c0c")
      .attr("stroke", "#c5a059")
      .attr("stroke-width", "1.5px")
      .attr("pointer-events", "all")
      .on("click", (_event, p) => {
        setSelectedNode(p);
        clicked(p);
      });

    // Center Icon / Text
    const centerGroup = svg.append("g").attr("text-anchor", "middle").attr("pointer-events", "none");

    centerGroup
      .append("text")
      .attr("y", -6)
      .attr("fill", "#c5a059")
      .attr("font-size", "9px")
      .attr("font-weight", "bold")
      .attr("letter-spacing", "0.15em")
      .text("SYSTEMS");

    centerGroup
      .append("text")
      .attr("y", 10)
      .attr("fill", "#ffffff")
      .attr("font-size", "10px")
      .attr("letter-spacing", "0.1em")
      .text("INTELLIGENCE");

    function clicked(p: d3.HierarchyRectangularNode<SystemsSunburstData>) {
      parent.datum(p.parent || root);
      setZoomRoot(p);

      root.each(
        (d: any) =>
          (d.target = {
            x0: Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
            x1: Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
            y0: Math.max(0, d.y0 - p.depth),
            y1: Math.max(0, d.y1 - p.depth),
          })
      );

      const t = svg.transition().duration(750);

      path
        .transition(t as any)
        .tween("data", (d: any) => {
          const i = d3.interpolate(d.current, d.target);
          return (time: number) => (d.current = i(time));
        })
        .filter(function (this: any, d: any) {
          const currentOpacity = +((this as SVGElement).getAttribute("fill-opacity") || 0);
          return Boolean(currentOpacity || arcVisible(d.target));
        })
        .attr("fill-opacity", (d: any) => (arcVisible(d.target) ? (d.children ? 0.85 : 0.65) : 0))
        .attr("pointer-events", (d: any) => (arcVisible(d.target) ? "auto" : "none"))
        .attrTween("d", (d: any) => () => arc(d.current) as string);
    }

    function arcVisible(d: any) {
      return d.y1 <= 3 && d.y0 >= 1 && d.x1 > d.x0;
    }
  }, [dimensions]);

  const activeNode = hoveredNode || selectedNode;
  const nodeData = activeNode?.data || SYSTEMS_INTELLIGENCE_DATA;

  // Compute breadcrumb path
  const getBreadcrumbs = (node: d3.HierarchyRectangularNode<SystemsSunburstData> | null) => {
    if (!node) return ["Civilizational Operating System"];
    const path: string[] = [];
    let curr: d3.HierarchyRectangularNode<SystemsSunburstData> | null = node;
    while (curr) {
      path.unshift(curr.data.name);
      curr = curr.parent;
    }
    return path;
  };

  const breadcrumbs = getBreadcrumbs(activeNode);

  const handleCopyNodeSpec = () => {
    const spec = `### ATLAS SYSTEMS INTELLIGENCE SPECIFICATION
Node: ${nodeData.name}
Domain Category: ${nodeData.category || "General Systemic"}
Impact Potential: ${nodeData.impactWeight || 85}/100
Meadows Leverage Point: ${nodeData.leveragePoint || "Meadows #4: Self-Organization"}
Feedback Loop Type: ${nodeData.loopType || "Balancing Loop"}
Description: ${nodeData.description || "N/A"}
Target Leverage Intervention: ${nodeData.targetIntervention || "Deploy bio-engineered cybernetic intervention."}`;

    quickCopyToClipboard(spec, `System node "${nodeData.name}"`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb Navigation */}
      <div className="p-4 bg-[#0c0c0c] border border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex flex-wrap items-center gap-1.5 text-white/50">
          <span className="text-[#c5a059] uppercase tracking-wider text-[10px] font-bold">Path:</span>
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              <span className={`px-2 py-0.5 border ${idx === breadcrumbs.length - 1 ? "bg-[#181818] text-[#c5a059] border-[#c5a059]/40 font-semibold" : "bg-[#080808] text-white/70 border-white/5"}`}>
                {crumb}
              </span>
              {idx < breadcrumbs.length - 1 && <ChevronRight className="w-3 h-3 text-white/30" />}
            </React.Fragment>
          ))}
        </div>

        <div className="flex items-center space-x-2 text-[10px] text-white/40">
          <span>Click any arc to zoom in · Click center to zoom out</span>
        </div>
      </div>

      {/* Main Visualizer + Inspector Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive D3 Sunburst Stage (7 cols) */}
        <div className="lg:col-span-7 p-6 bg-[#0c0c0c] border border-white/10 flex flex-col items-center justify-center relative overflow-hidden min-h-[520px]">
          <div className="w-full flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.25em] text-white/40 mb-4 pb-2 border-b border-white/5">
            <span className="text-[#c5a059] flex items-center space-x-1.5 font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>D3 HIERARCHICAL SUNBURST ENGINE</span>
            </span>
            <span>Interactive Multi-Tier Dynamics</span>
          </div>

          <div ref={containerRef} className="w-full flex items-center justify-center p-2">
            <svg ref={svgRef} className="w-full max-w-[560px] h-auto drop-shadow-2xl"></svg>
          </div>

          <div className="w-full mt-4 pt-3 border-t border-white/5 flex flex-wrap items-center justify-center gap-4 text-[10px] font-mono">
            <span className="flex items-center space-x-1.5 text-sky-400">
              <span className="w-2 h-2 bg-sky-500 rounded-full"></span>
              <span>Hydrology & Biosphere</span>
            </span>
            <span className="flex items-center space-x-1.5 text-amber-400">
              <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
              <span>Clean Energy Matrix</span>
            </span>
            <span className="flex items-center space-x-1.5 text-emerald-400">
              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
              <span>Regenerative Capital</span>
            </span>
            <span className="flex items-center space-x-1.5 text-purple-400">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              <span>Guild Governance</span>
            </span>
            <span className="flex items-center space-x-1.5 text-rose-400">
              <span className="w-2 h-2 bg-rose-500 rounded-full"></span>
              <span>Circular Materials</span>
            </span>
          </div>
        </div>

        {/* Right Column: Node Inspector & Meadows Leverage Deconstruction (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 bg-[#0c0c0c] border border-white/10 space-y-5">
            {/* Header & Quick Action */}
            <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-[10px] font-mono uppercase tracking-[0.2em] text-[#c5a059]">
                  <Layers className="w-3.5 h-3.5" />
                  <span>SYSTEM NODE DECONSTRUCTION</span>
                </div>
                <h3 className="font-serif font-light text-2xl text-white">
                  {nodeData.name}
                </h3>
              </div>

              <button
                id="btn-quick-copy-sunburst-node"
                onClick={handleCopyNodeSpec}
                className="px-2.5 py-1.5 bg-[#121212] hover:bg-[#1c1c1c] border border-white/10 hover:border-[#c5a059] text-[10px] font-mono text-white/80 hover:text-white flex items-center space-x-1.5 transition-all shrink-0"
                title="Quick Copy node specs to clipboard"
              >
                {copied ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : <Sparkles className="w-3 h-3 text-[#c5a059]" />}
                <span>{copied ? "COPIED" : "QUICK COPY"}</span>
              </button>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-white/70 font-sans leading-relaxed">
              {nodeData.description}
            </p>

            {/* Impact Metric & Loop Type */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 bg-[#080808] border border-white/5 space-y-1">
                <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest">
                  Systemic Impact Weight
                </span>
                <div className="text-2xl font-serif font-light text-emerald-400">
                  {nodeData.impactWeight || 88}<span className="text-xs text-white/30">/100</span>
                </div>
                <span className="text-[9px] text-white/40 font-mono">
                  {Number(nodeData.impactWeight || 88) > 90 ? "High Leverage Core" : "Coupled Sub-Domain"}
                </span>
              </div>

              <div className="p-4 bg-[#080808] border border-white/5 space-y-1">
                <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest">
                  Feedback Polarity
                </span>
                <div className="text-sm font-mono font-bold text-white pt-1">
                  {nodeData.loopType === "reinforcing" ? (
                    <span className="text-emerald-400">Reinforcing (R)</span>
                  ) : nodeData.loopType === "balancing" ? (
                    <span className="text-sky-400">Balancing (B)</span>
                  ) : (
                    <span className="text-[#c5a059]">Harmonized Mesh</span>
                  )}
                </div>
                <span className="text-[9px] text-white/40 font-mono">
                  Adaptive Dynamics
                </span>
              </div>
            </div>

            {/* Meadows Leverage Point Anchor */}
            <div className="p-4 bg-[#080808] border border-white/5 space-y-2">
              <div className="flex items-center space-x-2 text-[10px] font-mono uppercase tracking-[0.2em] text-[#c5a059]">
                <Info className="w-3.5 h-3.5" />
                <span>Donella Meadows Leverage Anchor</span>
              </div>
              <p className="text-xs font-serif text-white/90 font-medium">
                {nodeData.leveragePoint || "Meadows #4: The power to add, change, evolve, or self-organize system structure"}
              </p>
            </div>

            {/* Target Intervention Blueprint */}
            {nodeData.targetIntervention && (
              <div className="p-4 bg-[#0a1610] border border-emerald-800/40 space-y-1.5">
                <div className="flex items-center space-x-2 text-[10px] font-mono uppercase tracking-[0.2em] text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Validated Field Intervention</span>
                </div>
                <p className="text-xs text-white/80 font-sans leading-relaxed">
                  {nodeData.targetIntervention}
                </p>
              </div>
            )}

            {/* Bridge Action to Studio */}
            <div className="pt-2 border-t border-white/10">
              <button
                id="btn-sunburst-to-studio"
                onClick={onNavigateStudio}
                className="w-full py-3 bg-[#c5a059] hover:bg-[#b08d48] text-[#080808] text-[10px] uppercase tracking-[0.25em] font-bold flex items-center justify-center space-x-2 transition-all shadow-lg"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Translate Node into Studio Intervention</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
