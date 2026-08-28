import React, { useState } from "react";
import {
  Terminal,
  Play,
  Copy,
  Check,
  Code,
  Sparkles,
  Layers,
  Activity,
  ArrowRight
} from "lucide-react";
import { NavigationSpace } from "../../types";

interface ApiExplorerViewProps {
  onNavigate: (space: NavigationSpace) => void;
  africaMode: boolean;
}

export const ApiExplorerView: React.FC<ApiExplorerViewProps> = ({
  onNavigate,
  africaMode,
}) => {
  const [selectedEndpoint, setSelectedEndpoint] = useState<string>("queryPlace");
  const [apiResponse, setApiResponse] = useState<string | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [copied, setCopied] = useState(false);

  const endpoints = [
    {
      id: "queryPlace",
      method: "POST",
      path: "/api/atlas/v1/place/telemetry",
      title: "Query Place Telemetry & Infiltration",
      sampleBody: JSON.stringify(
        {
          placeId: "ke-nairobi-basin",
          sensors: ["satellite-radar", "ground-pumice-swales", "hydrology-flow"],
          timeWindow: "last-7-days"
        },
        null,
        2
      )
    },
    {
      id: "generateQuestions",
      method: "POST",
      path: "/api/atlas/v1/socratic/deepen",
      title: "Socratic Question & Assumption Unmasker",
      sampleBody: JSON.stringify(
        {
          inquiry: "Decentralized geothermal absorption cold storage for Rift Valley produce",
          depthLevel: 5,
          canonPillar: "Pillar #6: Innovation"
        },
        null,
        2
      )
    },
    {
      id: "simulateDynamics",
      method: "POST",
      path: "/api/atlas/v1/systems/simulate",
      title: "Simulate Causal Loops & Meadows Leverage",
      sampleBody: JSON.stringify(
        {
          loopId: "R1-Runoff-Trap",
          leveragePointRank: 4,
          intervention: "Volcanic Pumice Bioswales 1.8km"
        },
        null,
        2
      )
    },
    {
      id: "possibilitySpace",
      method: "GET",
      path: "/api/atlas/v1/possibility/dossiers?horizon=transformational",
      title: "Discover 5-Horizon Possibility Space",
      sampleBody: "{}"
    }
  ];

  const currentEndpointObj = endpoints.find((e) => e.id === selectedEndpoint) || endpoints[0];

  const handleExecuteApi = () => {
    setIsExecuting(true);
    setApiResponse(null);

    setTimeout(() => {
      if (selectedEndpoint === "queryPlace") {
        setApiResponse(
          JSON.stringify(
            {
              status: "success",
              place: "Nairobi Basin / Kilimani-Kibera Corridor",
              activeTelemetry: {
                stormSurgeVelocity: "4.8 m/s",
                floodLagTimeMinutes: 24,
                soilPermeabilityAmended: "140 mm/hr",
                residentsProtectedByBioswales: 42000,
                multiCapitalHealthScore: 84
              },
              confidence: 0.96,
              provenanceHash: "0x8f2a99c71b3e41b2"
            },
            null,
            2
          )
        );
      } else if (selectedEndpoint === "generateQuestions") {
        setApiResponse(
          JSON.stringify(
            {
              status: "success",
              primaryQuestion: "How does low-enthalpy geothermal waste heat eliminate smallholder post-harvest losses without electric grid dependency?",
              unmaskedAssumptions: [
                "Assumption: Cold storage requires high-voltage electricity.",
                "Assumption: Centralized cold storage is more efficient than farm-gate absorption."
              ],
              smallestFalsificationExperiment: "Deploy a 5kW test ammonia absorption skid using 85°C geothermal brine over 14 days."
            },
            null,
            2
          )
        );
      } else {
        setApiResponse(
          JSON.stringify(
            {
              status: "success",
              simulationResult: "Meadows Leverage Point #4 successfully reversed Loop R1 into virtuous self-organization.",
              steadyStateMonths: 6,
              multiCapitalScoreLift: "+34%"
            },
            null,
            2
          )
        );
      }
      setIsExecuting(false);
    }, 600);
  };

  const handleCopyCode = () => {
    setCopied(true);
    navigator.clipboard.writeText(`// Atlas Sanctum TypeScript SDK Client Example
import { AtlasSanctumClient } from "@atlas-sanctum/sdk";

const atlas = new AtlasSanctumClient({
  endpoint: "https://atlas.sanctum.ai",
  intelligenceTier: "sovereign"
});

// Query live Place Telemetry
const placeData = await atlas.places.getTelemetry({
  placeId: "ke-nairobi-basin",
  metrics: ["storm-surge", "sponge-capacity", "seven-capitals"]
});

console.log("Atlas Infiltration Index:", placeData.spongeCapacity);`);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 animate-fadeIn text-[#f2f2f2] pb-20">
      {/* Header */}
      <div className="p-8 bg-[#0c0c0c] border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2.5 text-[10px] font-mono tracking-[0.3em] uppercase text-sky-400">
            <Terminal className="w-3.5 h-3.5" />
            <span>DEVELOPER SDK & PROGRAMMATIC INTERFACE</span>
          </div>
          <h2 className="font-serif font-light text-3xl sm:text-4xl text-white tracking-wide">
            Atlas SDK & API Console
          </h2>
          <p className="text-xs sm:text-sm text-white/50 font-serif italic max-w-2xl leading-relaxed">
            Integrate Atlas Sanctum intelligence directly into field IoT networks, mobile escrow dApps, environmental sensors, and autonomous AI agents.
          </p>
        </div>

        <button
          onClick={handleCopyCode}
          className="px-4 py-2 bg-[#080808] hover:bg-[#141414] border border-white/10 text-[10px] uppercase tracking-[0.2em] font-mono text-white/80 flex items-center space-x-2 transition-all shrink-0"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#c5a059]" />}
          <span>{copied ? "Copied SDK!" : "Copy SDK Code"}</span>
        </button>
      </div>

      {/* 2-Column API Sandbox */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Endpoints & Request Builder (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-8 bg-[#0c0c0c] border border-white/10 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="font-serif font-light text-xl text-white flex items-center space-x-2">
                <Code className="w-4 h-4 text-[#c5a059]" />
                <span>REST API Sandbox</span>
              </h3>
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">v1.2 Public Beta</span>
            </div>

            {/* Endpoint Selector */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.25em]">Select API Operation</span>
              <div className="space-y-1.5">
                {endpoints.map((ep) => (
                  <button
                    key={ep.id}
                    onClick={() => {
                      setSelectedEndpoint(ep.id);
                      setApiResponse(null);
                    }}
                    className={`w-full p-3.5 border text-left text-xs font-mono transition-all flex items-center justify-between ${
                      selectedEndpoint === ep.id
                        ? "bg-[#141414] border-[#c5a059] text-white shadow-md"
                        : "bg-[#080808] hover:bg-[#111111] border-white/5 text-white/50"
                    }`}
                  >
                    <div className="flex items-center space-x-2.5 truncate">
                      <span className="px-2 py-0.5 text-[9px] font-bold bg-[#080808] text-[#c5a059] border border-[#c5a059]/40">
                        {ep.method}
                      </span>
                      <span className="truncate">{ep.title}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Path and Request Payload */}
            <div className="space-y-3">
              <div className="p-3 bg-[#080808] border border-white/10 text-xs font-mono text-white/80">
                <span className="text-[#c5a059] font-bold">{currentEndpointObj.method}</span> {currentEndpointObj.path}
              </div>

              {currentEndpointObj.method === "POST" && (
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider">Request JSON Body:</span>
                  <pre className="p-4 bg-[#080808] border border-white/10 text-xs font-mono text-white/80 overflow-x-auto">
                    {currentEndpointObj.sampleBody}
                  </pre>
                </div>
              )}
            </div>

            {/* Execute Button */}
            <button
              id="btn-execute-api"
              onClick={handleExecuteApi}
              disabled={isExecuting}
              className="w-full py-3 bg-[#c5a059] hover:bg-[#b08d48] text-[#080808] text-[10px] uppercase tracking-[0.25em] font-bold flex items-center justify-center space-x-2 transition-all disabled:opacity-50"
            >
              {isExecuting ? (
                <>
                  <Activity className="w-3.5 h-3.5 animate-spin" />
                  <span>EXECUTING CALL...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Execute Endpoint Request</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Live Response & TypeScript Snippet (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-8 bg-[#0c0c0c] border border-white/10 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="font-serif font-light text-xl text-white flex items-center space-x-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span>Response Payload</span>
              </h3>
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider">Status 200 OK</span>
            </div>

            {apiResponse ? (
              <pre className="p-5 bg-[#080808] border border-emerald-800/50 text-xs font-mono text-emerald-300 overflow-x-auto max-h-[380px] leading-relaxed">
                {apiResponse}
              </pre>
            ) : (
              <div className="p-12 bg-[#080808] border border-white/5 text-center text-xs font-mono text-white/30 space-y-3">
                <Terminal className="w-8 h-8 mx-auto text-white/20" />
                <p>Click "Execute Endpoint Request" to test live telemetry response</p>
              </div>
            )}

            {/* TypeScript SDK Example */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.25em]">TypeScript SDK Quickstart</span>
              <pre className="p-4 bg-[#080808] border border-white/10 text-[11px] font-mono text-white/70 overflow-x-auto leading-relaxed">
{`import { AtlasClient } from "@atlas-sanctum/sdk";

const client = new AtlasClient({
  apiKey: process.env.ATLAS_SANCTUM_KEY
});

// Run Socratic Question Deepener
const response = await client.socratic.inquire({
  topic: "Geothermal agricultural chilling",
  pillar: 6 // Innovation
});`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
