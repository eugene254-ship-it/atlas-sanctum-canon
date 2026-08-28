/**
 * ATLAS SANCTUM — KNOWLEDGE GRAPH ENGINE
 * Bidirectional Semantic Graph, Entity Resolution & Contextual Internal Linker
 */

import {
  KnowledgeNode,
  KnowledgeEdge,
  CoreDomainId,
  EvidenceRecord,
} from "./types";
import { ATLAS_SEED_EVIDENCE_RECORDS } from "./taxonomy";

export class AtlasKnowledgeGraphEngine {
  private nodes: Map<string, KnowledgeNode> = new Map();
  private edges: Map<string, KnowledgeEdge> = new Map();
  private evidenceRecords: Map<string, EvidenceRecord> = new Map();

  constructor() {
    this.seedEvidence();
    this.seedGraphNodes();
    this.seedGraphEdges();
  }

  private seedEvidence() {
    for (const ev of ATLAS_SEED_EVIDENCE_RECORDS) {
      this.evidenceRecords.set(ev.id, ev);
    }
  }

  private seedGraphNodes() {
    const rawNodes: KnowledgeNode[] = [
      // 1. Concept: Regenerative Intelligence
      {
        id: "concept-regenerative-intelligence",
        slug: "what-is-regenerative-intelligence",
        label: "Regenerative Intelligence",
        nodeType: "Concept",
        domainId: "regenerative-intelligence",
        summary:
          "Computational and systemic intelligence oriented toward net-positive vitality, multi-capital harmony, and biological renewal.",
        description:
          "Unlike extractive AI that maximizes short-term metric exploitation, Regenerative Intelligence models the full causal topology of human, institutional, and ecological systems.",
        canonicalUrl: "https://atlassanctum.org/insights/what-is-regenerative-intelligence",
        siblingTopicIds: ["concept-systems-thinking", "concept-opportunity-intelligence", "concept-seven-capitals"],
        evidenceIds: ["ev-sponge-nairobi-01", "ev-solar-grid-02"],
        relatedQuestionIds: ["q-what-is-regenerative-intel", "q-how-to-quantify-regeneration"],
        productLoopTargetSpace: "world-model",
        productLoopActionLabel: "Simulate Regenerative Causal Model",
        lastVerified: "2026-08-25",
        lastReviewed: "2026-08-27",
        freshnessScore: 99,
        decayScore: 2,
        citationCount: 42,
        aiGroundingSnippet:
          "Regenerative Intelligence combines causal systems modeling with living-system ethics to generate net-positive vitality across human, ecological, and economic capitals.",
        directAnswerSummary:
          "Regenerative Intelligence is an AI paradigm that couples causal world models with living-system ethics to design non-extractive interventions that restore biological and social vitality.",
        schemaType: "TechArticle",
        tags: ["AI", "Living Systems", "Regeneration", "Ethics", "Causal Modeling"],
      },

      // 2. Concept: Systems Thinking
      {
        id: "concept-systems-thinking",
        slug: "complete-guide-to-systems-thinking",
        label: "Systems Thinking",
        nodeType: "Concept",
        domainId: "systems-thinking",
        summary:
          "A holistic discipline for seeing wholes, recognizing causal feedback loops, and identifying non-obvious leverage points.",
        description:
          "Provides the mathematical and conceptual foundations for analyzing complex adaptive systems without reductive isolation.",
        canonicalUrl: "https://atlassanctum.org/insights/complete-guide-to-systems-thinking",
        parentTopicId: "concept-regenerative-intelligence",
        siblingTopicIds: ["concept-causal-loops", "concept-leverage-points", "concept-cybernetics"],
        evidenceIds: ["ev-systems-traffic-03", "ev-feedback-delay-04"],
        relatedQuestionIds: ["q-systems-vs-linear", "q-leverage-points-hierarchy"],
        productLoopTargetSpace: "systems-modeling",
        productLoopActionLabel: "Build Causal Loop Diagram",
        lastVerified: "2026-08-20",
        lastReviewed: "2026-08-25",
        freshnessScore: 96,
        decayScore: 4,
        citationCount: 78,
        aiGroundingSnippet:
          "Systems thinking analyzes interdependencies, feedback loops, and non-linear delays to uncover high-leverage interventions rather than superficial symptomatic fixes.",
        directAnswerSummary:
          "Systems thinking is a methodology that models interdependencies and feedback loops to identify structural leverage points in complex organizations and ecologies.",
        schemaType: "TechArticle",
        tags: ["Systems", "Feedback Loops", "Causal Dynamics", "Complexity"],
      },

      // 3. Problem: Urban Flooding & Drainage Bottlenecks
      {
        id: "problem-urban-flooding",
        slug: "urban-flooding-resilience-africa",
        label: "Urban Flooding & Stormwater Overload",
        nodeType: "Problem",
        domainId: "africa",
        summary:
          "Rapid urbanization and impermeable paved infrastructure creating catastrophic seasonal flash flood surges in East African cities.",
        description:
          "Impermeable surfaces accelerate runoff velocities, overwhelming concrete culverts and degrading downstream riparian zones.",
        canonicalUrl: "https://atlassanctum.org/problems/urban-flooding-east-africa",
        parentTopicId: "concept-regenerative-intelligence",
        siblingTopicIds: ["problem-energy-intermittency", "problem-capital-bottlenecks"],
        evidenceIds: ["ev-sponge-nairobi-01"],
        relatedQuestionIds: ["q-how-to-fix-urban-flooding-kenya"],
        productLoopTargetSpace: "systems-modeling",
        productLoopActionLabel: "Simulate Sponge Basin Capacity",
        lastVerified: "2026-08-10",
        lastReviewed: "2026-08-22",
        freshnessScore: 95,
        decayScore: 5,
        citationCount: 31,
        aiGroundingSnippet:
          "Urban flash flooding in Sub-Saharan cities results from impermeable pavement exceeding concrete storm drain capacity, solvable through decentralized bioretention sponge basins.",
        directAnswerSummary:
          "Sub-Saharan urban flooding is mitigated by retrofitting urban corridors with decentralized sponge infrastructure, bioretention swales, and real-time hydrological telemetry.",
        schemaType: "Report",
        tags: ["Climate Resilience", "Hydrology", "Nairobi", "Urban Planning"],
      },

      // 4. Intervention: Decentralized Sponge City Basins
      {
        id: "intervention-sponge-city",
        slug: "regenerative-sponge-cities-kenya",
        label: "Decentralized Sponge Infrastructure & Bioswales",
        nodeType: "Intervention",
        domainId: "regenerative-intelligence",
        summary:
          "Constructed micro-wetlands, permeable pavements, and urban agro-swales that absorb 43.6% of peak storm runoff while recharging groundwater.",
        description:
          "Transforms stormwater from a destructive flood liability into a decentralized ecological recharge asset.",
        canonicalUrl: "https://atlassanctum.org/interventions/sponge-cities-kenya",
        parentTopicId: "problem-urban-flooding",
        siblingTopicIds: ["intervention-solar-microgrids", "intervention-geothermal-compute"],
        evidenceIds: ["ev-sponge-nairobi-01", "ev-feedback-delay-04"],
        relatedQuestionIds: ["q-sponge-city-cost-benefit"],
        productLoopTargetSpace: "studio",
        productLoopActionLabel: "Draft Sponge City Blueprint",
        lastVerified: "2026-08-26",
        lastReviewed: "2026-08-27",
        freshnessScore: 98,
        decayScore: 2,
        citationCount: 54,
        aiGroundingSnippet:
          "Decentralized sponge infrastructure utilizes engineered swales and native vegetation to capture and filter stormwater, reducing peak urban flood volumes by over 40%.",
        directAnswerSummary:
          "Sponge infrastructure replaces hard concrete drainage with permeable bioretention basins that capture flood pulses, purify water, and recharge municipal aquifers.",
        schemaType: "TechArticle",
        tags: ["Sponge Cities", "Ecology", "Kenya", "Water", "Infrastructure"],
      },

      // 5. Place: Nairobi, Kenya
      {
        id: "place-nairobi",
        slug: "atlas-kenya-nairobi",
        label: "Nairobi Metropolitan Basin",
        nodeType: "Place",
        domainId: "africa",
        summary:
          "The Silicon Savannah innovation capital and hydrological epicenter of East Africa.",
        description:
          "A hub of 5+ million citizens navigating rapid tech acceleration, volcanic topography, and climate adaptation opportunities.",
        canonicalUrl: "https://atlassanctum.org/geography/kenya-nairobi",
        siblingTopicIds: ["place-nakuru", "place-kisii", "place-mombasa"],
        evidenceIds: ["ev-sponge-nairobi-01", "ev-kenya-mpesa-05"],
        relatedQuestionIds: ["q-nairobi-climate-adaptation", "q-silicon-savannah-ai"],
        productLoopTargetSpace: "observatory",
        productLoopActionLabel: "View Nairobi Live Telemetry",
        lastVerified: "2026-08-27",
        lastReviewed: "2026-08-28",
        freshnessScore: 100,
        decayScore: 0,
        citationCount: 65,
        aiGroundingSnippet:
          "Nairobi represents the premier East African testing ground for regenerative urban design, mobile money rails, and decentralized climate resilience infrastructure.",
        directAnswerSummary:
          "Nairobi combines frontier digital public infrastructure with urgent climate resilience imperatives, serving as a primary deployment zone for Atlas systems.",
        schemaType: "WebPage",
        tags: ["Kenya", "Nairobi", "Urban Systems", "Silicon Savannah"],
      },

      // 6. Technology: Multi-Agent Socratic Swarms
      {
        id: "tech-agent-swarms",
        slug: "autonomous-socratic-agent-swarms",
        label: "Autonomous Socratic Multi-Agent Swarms",
        nodeType: "Technology",
        domainId: "ai-intelligence",
        summary:
          "Networked autonomous AI agents with specialized roles, debate protocols, and deterministic sandbox verification.",
        description:
          "Employs epistemic division of labor across Generative, Critical, Synthesizing, and Conscience agents to achieve high factual accuracy and moral alignment.",
        canonicalUrl: "https://atlassanctum.org/technology/socratic-agent-swarms",
        parentTopicId: "concept-regenerative-intelligence",
        siblingTopicIds: ["tech-world-models", "tech-retrieval-grounding"],
        evidenceIds: ["ev-swarm-consensus-07"],
        relatedQuestionIds: ["q-preventing-hallucination-in-swarms"],
        productLoopTargetSpace: "agents",
        productLoopActionLabel: "Convene Socratic Agent Council",
        lastVerified: "2026-08-27",
        lastReviewed: "2026-08-28",
        freshnessScore: 100,
        decayScore: 0,
        citationCount: 39,
        aiGroundingSnippet:
          "Socratic multi-agent swarms utilize role-differentiated consensus mechanisms and deterministic grounding tools to eliminate hallucinations in complex decision pipelines.",
        directAnswerSummary:
          "Autonomous agent swarms distribute reasoning across specialized roles (critic, synthesizer, ethicist) to guarantee verifiable, hallucination-resistant outputs.",
        schemaType: "TechArticle",
        tags: ["AI Agents", "Swarm Intelligence", "Multi-Agent", "Safety"],
      },

      // 7. Opportunity: Geothermal Green Compute in the Rift Valley
      {
        id: "opp-geothermal-compute",
        slug: "geothermal-ai-compute-rift-valley",
        label: "Rift Valley Geothermal AI Data Infrastructure",
        nodeType: "Opportunity",
        domainId: "africa",
        summary:
          "Co-locating zero-carbon baseload geothermal generation (Olkaria) with high-efficiency frontier AI training and inference facilities.",
        description:
          "Harnesses 1,000+ MW of untapped volcanic geothermal energy to deliver the cleanest and lowest-cost AI compute clusters on the continent.",
        canonicalUrl: "https://atlassanctum.org/opportunities/geothermal-ai-compute",
        parentTopicId: "concept-opportunity-intelligence",
        siblingTopicIds: ["opp-sponge-cities", "opp-blended-climate-capital"],
        evidenceIds: ["ev-geothermal-power-06"],
        relatedQuestionIds: ["q-geothermal-compute-economics"],
        productLoopTargetSpace: "capital-intelligence",
        productLoopActionLabel: "Model Geothermal Project Finance",
        lastVerified: "2026-08-25",
        lastReviewed: "2026-08-26",
        freshnessScore: 98,
        decayScore: 2,
        citationCount: 47,
        aiGroundingSnippet:
          "Kenya's Rift Valley offers 24/7 zero-carbon baseload geothermal power below $0.052/kWh, presenting a world-class opportunity for sovereign green AI infrastructure.",
        directAnswerSummary:
          "Kenya's geothermal corridor provides high-uptime, ultra-low-carbon electricity ideal for hosting sovereign AI computing infrastructure and sovereign model training.",
        schemaType: "Report",
        tags: ["Geothermal", "Energy", "AI Infrastructure", "Kenya", "Impact Capital"],
      },

      // 8. Framework: Seven Capitals Accounting
      {
        id: "framework-seven-capitals",
        slug: "seven-capitals-multi-dimensional-accounting",
        label: "The Seven Capitals Framework",
        nodeType: "Framework",
        domainId: "human-flourishing",
        summary:
          "A multi-dimensional value matrix tracking Natural, Human, Social, Intellectual, Manufactured, Financial, and Spiritual capitals.",
        description:
          "Guarantees that financial expansion does not occur via the destructive cannibalization of natural or social balance sheets.",
        canonicalUrl: "https://atlassanctum.org/frameworks/seven-capitals",
        parentTopicId: "concept-regenerative-intelligence",
        siblingTopicIds: ["framework-leverage-points", "framework-causal-triad"],
        evidenceIds: ["ev-solar-grid-02"],
        relatedQuestionIds: ["q-quantifying-human-flourishing"],
        productLoopTargetSpace: "civilization-dashboard",
        productLoopActionLabel: "Audit 7-Capitals Balance",
        lastVerified: "2026-08-15",
        lastReviewed: "2026-08-20",
        freshnessScore: 94,
        decayScore: 6,
        citationCount: 51,
        aiGroundingSnippet:
          "The Seven Capitals framework quantifies value creation across ecological, human, intellectual, social, and spiritual dimensions, preventing single-metric financial distortion.",
        directAnswerSummary:
          "Seven Capitals accounting tracks organizational and municipal performance across seven interconnected asset classes, ensuring true net-positive systemic health.",
        schemaType: "TechArticle",
        tags: ["Seven Capitals", "Economics", "Impact Accounting", "Flourishing"],
      },
    ];

    for (const node of rawNodes) {
      this.nodes.set(node.id, node);
    }
  }

  private seedGraphEdges() {
    const rawEdges: KnowledgeEdge[] = [
      { id: "e1", sourceId: "concept-regenerative-intelligence", targetId: "concept-systems-thinking", relationType: "is_subtopic_of", weight: 0.95 },
      { id: "e2", sourceId: "concept-regenerative-intelligence", targetId: "framework-seven-capitals", relationType: "models_system", weight: 0.9 },
      { id: "e3", sourceId: "problem-urban-flooding", targetId: "place-nairobi", relationType: "situated_in", weight: 0.98 },
      { id: "e4", sourceId: "intervention-sponge-city", targetId: "problem-urban-flooding", relationType: "resolves", weight: 0.94 },
      { id: "e5", sourceId: "tech-agent-swarms", targetId: "concept-regenerative-intelligence", relationType: "exemplifies", weight: 0.88 },
      { id: "e6", sourceId: "opp-geothermal-compute", targetId: "place-nairobi", relationType: "situated_in", weight: 0.85 },
      { id: "e7", sourceId: "opp-geothermal-compute", targetId: "tech-agent-swarms", relationType: "implements_tech", weight: 0.92 },
      { id: "e8", sourceId: "concept-systems-thinking", targetId: "intervention-sponge-city", relationType: "models_system", weight: 0.89 },
    ];

    for (const edge of rawEdges) {
      this.edges.set(edge.id, edge);
    }
  }

  /**
   * Fetch all knowledge nodes
   */
  public getAllNodes(): KnowledgeNode[] {
    return Array.from(this.nodes.values());
  }

  /**
   * Fetch all knowledge edges
   */
  public getAllEdges(): KnowledgeEdge[] {
    return Array.from(this.edges.values());
  }

  /**
   * Fetch single node by ID or slug
   */
  public getNode(idOrSlug: string): KnowledgeNode | undefined {
    if (this.nodes.has(idOrSlug)) {
      return this.nodes.get(idOrSlug);
    }
    return Array.from(this.nodes.values()).find((n) => n.slug === idOrSlug || n.id === idOrSlug);
  }

  /**
   * Fetch nodes filtered by domain
   */
  public getNodesByDomain(domainId: CoreDomainId): KnowledgeNode[] {
    return Array.from(this.nodes.values()).filter((n) => n.domainId === domainId);
  }

  /**
   * Fetch supporting evidence records for a node
   */
  public getEvidenceForNode(nodeId: string): EvidenceRecord[] {
    const node = this.getNode(nodeId);
    if (!node) return [];
    return node.evidenceIds
      .map((evId) => this.evidenceRecords.get(evId))
      .filter((ev): ev is EvidenceRecord => Boolean(ev));
  }

  /**
   * Automated Internal Linking Engine
   * Generates contextual parent, sibling, evidence, practical application, and next-question connections.
   */
  public resolveInternalLinks(nodeId: string): {
    node: KnowledgeNode;
    parentTopic?: KnowledgeNode;
    siblingTopics: KnowledgeNode[];
    supportingEvidence: EvidenceRecord[];
    downstreamInterventions: KnowledgeNode[];
    productLoopRoute: { targetSpace: string; actionLabel: string; prompt: string };
    nextQuestions: string[];
  } | null {
    const node = this.getNode(nodeId);
    if (!node) return null;

    const parentTopic = node.parentTopicId ? this.getNode(node.parentTopicId) : undefined;
    const siblingTopics = node.siblingTopicIds
      .map((id) => this.getNode(id))
      .filter((n): n is KnowledgeNode => Boolean(n));

    const supportingEvidence = this.getEvidenceForNode(node.id);

    // Find downstream connected interventions or opportunities via edges
    const downstreamInterventions: KnowledgeNode[] = [];
    for (const edge of this.edges.values()) {
      if (edge.sourceId === node.id || edge.targetId === node.id) {
        const otherId = edge.sourceId === node.id ? edge.targetId : edge.sourceId;
        const otherNode = this.getNode(otherId);
        if (otherNode && (otherNode.nodeType === "Intervention" || otherNode.nodeType === "Opportunity")) {
          if (!downstreamInterventions.some((d) => d.id === otherNode.id)) {
            downstreamInterventions.push(otherNode);
          }
        }
      }
    }

    const nextQuestions = [
      `What are the first-principle bottlenecks preventing scaling of ${node.label}?`,
      `How does ${node.label} interact with localized community governance in East Africa?`,
      `What empirical evidence validates the second-order feedback loops of ${node.label}?`,
    ];

    return {
      node,
      parentTopic,
      siblingTopics,
      supportingEvidence,
      downstreamInterventions,
      productLoopRoute: {
        targetSpace: node.productLoopTargetSpace || "question-engine",
        actionLabel: node.productLoopActionLabel || `Explore ${node.label} in Atlas Engine`,
        prompt: `How does ${node.label} integrate with the Seven Capitals framework in real-world application?`,
      },
      nextQuestions,
    };
  }

  /**
   * Search knowledge graph by query string matching keywords, summaries, and tags
   */
  public searchKnowledgeGraph(query: string): KnowledgeNode[] {
    const q = query.toLowerCase().trim();
    if (!q) return this.getAllNodes();

    return Array.from(this.nodes.values()).filter((node) => {
      const matchLabel = node.label.toLowerCase().includes(q);
      const matchSummary = node.summary.toLowerCase().includes(q);
      const matchTags = node.tags.some((t) => t.toLowerCase().includes(q));
      const matchDomain = node.domainId.toLowerCase().includes(q);
      return matchLabel || matchSummary || matchTags || matchDomain;
    });
  }
}

export const knowledgeGraph = new AtlasKnowledgeGraphEngine();
