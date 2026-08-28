/**
 * ATLAS SANCTUM — SEARCH COMPOUNDING & KNOWLEDGE GRAPH SUBSYSTEM
 * Type Definitions & System Interfaces
 */

export type CoreDomainId =
  | "regenerative-intelligence"
  | "systems-thinking"
  | "ai-intelligence"
  | "innovation"
  | "africa"
  | "opportunity-intelligence"
  | "human-flourishing"
  | "capital";

export type SearchIntentType =
  | "KNOW"
  | "UNDERSTAND"
  | "COMPARE"
  | "RESEARCH"
  | "SOLVE"
  | "BUILD"
  | "DECIDE"
  | "DISCOVER"
  | "INVEST"
  | "IMPLEMENT"
  | "NAVIGATE";

export type KnowledgeNodeType =
  | "Concept"
  | "Question"
  | "Person"
  | "Organization"
  | "Place"
  | "Problem"
  | "Evidence"
  | "Research"
  | "Technology"
  | "Framework"
  | "CaseStudy"
  | "Opportunity"
  | "Intervention"
  | "Outcome"
  | "Dataset";

export type EvidenceClaimType =
  | "Fact"
  | "Source-backed claim"
  | "Interpretation"
  | "Inference"
  | "Hypothesis"
  | "Scenario"
  | "Forecast"
  | "Opinion";

export interface EvidenceRecord {
  id: string;
  claim: string;
  claimType: EvidenceClaimType;
  primarySource: string;
  sourceUri?: string;
  methodology: string;
  dateVerified: string;
  confidenceScore: number; // 0.0 to 1.0
  counterEvidence?: string;
  associatedPlaces?: string[];
  canonicalPillar?: string;
}

export interface KnowledgeNode {
  id: string;
  slug: string;
  label: string;
  nodeType: KnowledgeNodeType;
  domainId: CoreDomainId;
  summary: string;
  description: string;
  canonicalUrl: string;
  parentTopicId?: string;
  siblingTopicIds: string[];
  evidenceIds: string[];
  relatedQuestionIds: string[];
  productLoopTargetSpace?: string; // NavigationSpace or action
  productLoopActionLabel?: string;
  lastVerified: string;
  lastReviewed: string;
  freshnessScore: number; // 0-100
  decayScore: number; // 0-100 (high = decaying)
  citationCount: number;
  aiGroundingSnippet: string;
  directAnswerSummary: string;
  schemaType: "Article" | "TechArticle" | "Report" | "Dataset" | "Organization" | "WebPage" | "FAQPage";
  tags: string[];
}

export interface KnowledgeEdge {
  id: string;
  sourceId: string;
  targetId: string;
  relationType:
    | "exemplifies"
    | "resolves"
    | "is_subtopic_of"
    | "causes"
    | "evidences"
    | "requires_capital"
    | "models_system"
    | "implements_tech"
    | "situated_in"
    | "accelerates"
    | "questions";
  weight: number;
  contextNote?: string;
}

export interface PillarDefinition {
  id: string;
  title: string;
  slug: string;
  domainId: CoreDomainId;
  canonicalUrl: string;
  summary: string;
  history: string;
  principles: string[];
  coreFrameworkName: string;
  coreFrameworkDescription: string;
  examples: string[];
  evidenceIds: string[];
  applications: string[];
  caseStudyRefs: string[];
  faqItems: { question: string; answer: string }[];
  clusters: string[];
  furtherResearchQuestions: string[];
  productCta: {
    label: string;
    targetSpace: string;
    description: string;
  };
}

export interface ContentMultiplierAsset {
  insightId: string;
  title: string;
  flagshipArticle: { title: string; slug: string; readingTimeMin: number };
  supportingArticles: Array<{ title: string; slug: string; cluster: string }>;
  visualFramework: { name: string; diagramType: string; description: string };
  originalChart: { title: string; metric: string; dataPoints: number };
  caseStudy: { headline: string; geography: string; outcome: string };
  glossaryEntry: { term: string; definition: string };
  faqSet: Array<{ q: string; a: string }>;
  dataset?: { name: string; recordsCount: number; format: string };
  downloadableResource: { format: string; title: string };
  socialSeries: { channel: "LinkedIn" | "X" | "ResearchGate"; threadCount: number };
  newsletterBrief: { issueSubject: string; hook: string };
  executiveSummary: string;
  partnerAsset: { targetPartnerType: string; pitchHook: string };
  futureResearchQuestion: string;
}

export interface IndexBenchmarkDataset {
  id: string;
  name: string;
  slug: string;
  domain: CoreDomainId;
  version: string;
  lastUpdated: string;
  coverage: string;
  methodologyOverview: string;
  primaryMetrics: Array<{
    code: string;
    name: string;
    unit: string;
    baseline: number;
    target2030: number;
    currentMedian: number;
  }>;
  geographicalNodes: Array<{
    place: string;
    score: number;
    rank: number;
    resilienceTier: "Frontier" | "Accelerating" | "Stabilizing" | "Vulnerable";
  }>;
  citationBibtex: string;
  doiOrHandle: string;
}

export interface AiSearchVisibilitySignal {
  query: string;
  platform: "Google AI Overviews" | "Microsoft Copilot" | "Perplexity AI" | "Claude Research";
  groundingStatus: "Grounded & Cited" | "Synthesized" | "Candidate";
  targetUrl: string;
  extractedSnippet: string;
  citationShareEstimate: number; // e.g. 0.85
  queryTheme: string;
  lastDetected: string;
}

export interface ContentDecayRecord {
  nodeId: string;
  title: string;
  slug: string;
  daysSinceLastReview: number;
  decayRisk: "HEALTHY" | "WATCHLIST" | "STALE" | "CRITICAL_DECAY";
  recommendedAction: "UPDATE" | "MERGE" | "EXPAND" | "REDIRECT" | "RETIRE";
  decayFactors: string[];
}

export type SeoAgentRole =
  | "Query Intelligence Agent"
  | "Topic Graph Agent"
  | "Research Agent"
  | "Content Architect Agent"
  | "Editorial Agent"
  | "Evidence Agent"
  | "Internal Linking Agent"
  | "Technical SEO Agent"
  | "Distribution Agent"
  | "Citation Agent"
  | "AI Visibility Agent"
  | "Decay Agent"
  | "Opportunity Agent";

export interface SeoAgentStatus {
  role: SeoAgentRole;
  mission: string;
  status: "ACTIVE" | "IDLE" | "EXECUTING_PIPELINE";
  lastEpoch: string;
  activeTask: string;
  insightsGenerated: number;
  guardrailCompliant: boolean;
}

export interface SearchOpportunityScore {
  id: string;
  opportunityTitle: string;
  domainId: CoreDomainId;
  searchIntent: SearchIntentType;
  queryDemandVolume: "High" | "Exponential" | "Emerging";
  potentialImpact: number; // 1-10
  confidenceScore: number; // 1-10
  implementationEffort: number; // 1-10
  priorityScore: number; // (Impact * Confidence) / Effort
  targetKeywordCluster: string[];
  productLoopTarget: string;
  rationale: string;
}

export interface SeoCommandCenterState {
  totalKnowledgeNodes: number;
  totalGraphEdges: number;
  totalPillars: number;
  totalClusters: number;
  totalEvidenceClaims: number;
  totalDatasets: number;
  overallTopicalAuthorityScore: number; // 0-100
  aiCitationShare: number; // %
  indexedUrlsCount: number;
  antiSpamComplianceRate: number; // 100%
  topOpportunities: SearchOpportunityScore[];
  decayAlerts: ContentDecayRecord[];
  activeAgents: SeoAgentStatus[];
  lastSitemapGeneration: string;
}
