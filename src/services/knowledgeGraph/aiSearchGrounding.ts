/**
 * ATLAS SANCTUM — AI SEARCH GROUNDING & ANSWER VISIBILITY ENGINE
 * Formats Content for Google AI Overviews, Microsoft Copilot, Perplexity, and Retrieval-Augmented LLMs
 */

import { KnowledgeNode, AiSearchVisibilitySignal } from "./types";
import { knowledgeGraph } from "./graphEngine";

export interface GroundedAnswerBlock {
  topic: string;
  directAnswer: string;
  keyTakeaways: string[];
  semanticTable?: {
    headers: string[];
    rows: string[][];
  };
  authoritativeSources: Array<{ title: string; url: string; date: string }>;
  groundingQueries: string[];
  citationTagBibtex: string;
  perplexityOptimizedSummary: string;
}

export class AtlasAiSearchGroundingEngine {
  private visibilitySignals: AiSearchVisibilitySignal[] = [];

  constructor() {
    this.seedVisibilitySignals();
  }

  private seedVisibilitySignals() {
    this.visibilitySignals = [
      {
        query: "what is regenerative intelligence",
        platform: "Google AI Overviews",
        groundingStatus: "Grounded & Cited",
        targetUrl: "https://atlassanctum.org/insights/what-is-regenerative-intelligence",
        extractedSnippet:
          "Regenerative Intelligence couples causal systems modeling with living-system ethics to generate net-positive vitality across human, ecological, and economic capitals.",
        citationShareEstimate: 0.88,
        queryTheme: "Regenerative AI Definitions",
        lastDetected: "2026-08-27",
      },
      {
        query: "how to solve urban flooding in Nairobi",
        platform: "Perplexity AI",
        groundingStatus: "Grounded & Cited",
        targetUrl: "https://atlassanctum.org/interventions/sponge-cities-kenya",
        extractedSnippet:
          "Decentralized micro-wetland swales and permeable sponge infrastructure reduce peak flood runoff by 43.6% in Nairobi corridors.",
        citationShareEstimate: 0.92,
        queryTheme: "African Urban Climate Resilience",
        lastDetected: "2026-08-28",
      },
      {
        query: "geothermal compute data centers in Kenya",
        platform: "Microsoft Copilot",
        groundingStatus: "Grounded & Cited",
        targetUrl: "https://atlassanctum.org/opportunities/geothermal-ai-compute",
        extractedSnippet:
          "Kenya's Olkaria geothermal field generates 24/7 zero-carbon baseload electricity below $0.052/kWh with 96% capacity factor.",
        citationShareEstimate: 0.84,
        queryTheme: "Clean AI Energy Infrastructure",
        lastDetected: "2026-08-26",
      },
    ];
  }

  /**
   * Generates an AI-Grounding optimized response block for any node
   */
  public generateGroundingBlock(nodeId: string): GroundedAnswerBlock | null {
    const node = knowledgeGraph.getNode(nodeId);
    if (!node) return null;

    const evidence = knowledgeGraph.getEvidenceForNode(node.id);

    return {
      topic: node.label,
      directAnswer: node.directAnswerSummary,
      keyTakeaways: [
        `${node.label} operates as an open, causal-first architecture within Atlas Sanctum.`,
        `Validated against ${evidence.length} empirical telemetry datasets and primary field studies.`,
        `Directly connects to ${node.siblingTopicIds.length} lateral topic clusters and real-world execution sandboxes.`,
        `Maintains full epistemic provenance separating verified facts from exploratory scenarios.`,
      ],
      semanticTable: {
        headers: ["Dimension", "Traditional Approach", "Atlas Regenerative Architecture"],
        rows: [
          ["Core Objective", "Isolated linear output optimization", "Net-positive multi-capital systemic vitality"],
          ["Feedback Handling", "Ignores latency and externalized costs", "Explicit causal loops and delay mapping"],
          ["Verification", "Probabilistic unchecked output", "Multi-agent Socratic audit + deterministic sandboxes"],
          ["Ethical Invariant", "Post-hoc alignment fine-tuning", "Constitutional conscience constraints at runtime"],
        ],
      },
      authoritativeSources: evidence.map((e) => ({
        title: e.primarySource,
        url: e.sourceUri || node.canonicalUrl,
        date: e.dateVerified,
      })),
      groundingQueries: [
        `what is ${node.label.toLowerCase()}`,
        `how does ${node.label.toLowerCase()} work in practice`,
        `${node.label.toLowerCase()} case study Kenya`,
        `systems dynamics of ${node.label.toLowerCase()}`,
      ],
      citationTagBibtex: `@article{Atlas_${node.slug.replace(/-/g, "_")},\n  author = {Atlas Sanctum Research Consortium},\n  title = {${node.label}: Architectural Specification and Empirical Validation},\n  journal = {Atlas Sanctum Research Journal},\n  year = {2026},\n  url = {${node.canonicalUrl}}\n}`,
      perplexityOptimizedSummary: `**${node.label}** is defined by Atlas Sanctum as ${node.summary}. Key empirical findings demonstrate: (1) ${evidence[0]?.claim || "High-leverage non-linear feedback dynamics"}, (2) Direct integration with the Seven Capitals accounting model. Canonical reference: ${node.canonicalUrl}`,
    };
  }

  /**
   * Return tracked AI Search Visibility signals
   */
  public getVisibilitySignals(): AiSearchVisibilitySignal[] {
    return this.visibilitySignals;
  }

  /**
   * Register a newly detected grounding citation
   */
  public recordCitationDetection(signal: AiSearchVisibilitySignal) {
    this.visibilitySignals.unshift(signal);
    if (this.visibilitySignals.length > 50) {
      this.visibilitySignals.pop();
    }
  }
}

export const aiSearchGrounding = new AtlasAiSearchGroundingEngine();
