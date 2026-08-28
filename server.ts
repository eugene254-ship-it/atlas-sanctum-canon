import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import {
  knowledgeGraph,
  intentRouter,
  contentMultiplier,
  schemaGenerator,
  aiSearchGrounding,
  decayDetector,
  seoAgentSwarm,
  seoCommandEngine,
  ATLAS_CORE_DOMAINS,
  ATLAS_CANONICAL_PILLARS,
  ATLAS_ORIGINAL_DATASETS,
} from "./src/services/knowledgeGraph";

dotenv.config();

let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({
      status: "online",
      name: "Atlas Sanctum - Regenerative Intelligence OS",
      timestamp: new Date().toISOString(),
      aiAvailable: Boolean(process.env.GEMINI_API_KEY),
    });
  });

  // AI Prompt Dispatch endpoint with optional Knowledge Retrieval Grounding
  app.post("/api/gemini/generate", async (req, res) => {
    try {
      const { prompt, systemInstruction, model, useSearchGrounding } = req.body;
      const client = getGeminiClient();

      if (!client) {
        return res.status(200).json({
          fallback: true,
          message: "Live server Gemini API key not configured. Using Atlas Native Intelligence Synthesis Engine.",
          content: null,
        });
      }

      const selectedModel = model || "gemini-3.7-flash";
      const config: any = {
        temperature: 0.7,
      };

      if (systemInstruction) {
        config.systemInstruction = systemInstruction;
      }

      if (useSearchGrounding) {
        config.tools = [{ googleSearch: {} }];
      }

      const response = await client.models.generateContent({
        model: selectedModel,
        contents: prompt,
        config,
      });

      const candidate = response.candidates?.[0];
      const groundingMetadata = candidate?.groundingMetadata;

      res.json({
        success: true,
        text: response.text,
        model: selectedModel,
        isGrounded: Boolean(useSearchGrounding),
        groundingMetadata: groundingMetadata || null,
      });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      res.status(500).json({
        error: error.message || "Failed to generate content with Gemini API",
        fallback: true,
      });
    }
  });

  // Daily Atlas Brief generator endpoint
  app.get("/api/brief", (req, res) => {
    const today = new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    res.json({
      date: today,
      version: "Atlas Sanctum 2.4-Genesis",
      realityHeadline: "Sub-Saharan East Africa Rainfall Anomaly & Decentralized Energy Transition Convergence",
      signalsCount: 14,
      criticalBottlenecks: 3,
      emergingOpportunities: 6,
      activeMissions: 5,
    });
  });

  // ==========================================
  // ATLAS SEARCH COMPOUNDING & KNOWLEDGE APIS
  // ==========================================

  // SEO Command Center Overview & Health Metrics
  app.get("/api/seo/overview", (req, res) => {
    const state = seoCommandEngine.getCommandCenterState();
    res.json({
      success: true,
      timestamp: new Date().toISOString(),
      state,
      domains: ATLAS_CORE_DOMAINS,
      canonicalPillarsCount: ATLAS_CANONICAL_PILLARS.length,
      datasetsCount: ATLAS_ORIGINAL_DATASETS.length,
    });
  });

  // Full Knowledge Graph nodes & edges
  app.get("/api/seo/knowledge-graph", (req, res) => {
    const { domain, query } = req.query;
    let nodes = knowledgeGraph.getAllNodes();
    if (domain && typeof domain === "string") {
      nodes = knowledgeGraph.getNodesByDomain(domain as any);
    }
    if (query && typeof query === "string") {
      nodes = knowledgeGraph.searchKnowledgeGraph(query);
    }
    res.json({
      success: true,
      nodes,
      edges: knowledgeGraph.getAllEdges(),
    });
  });

  // Entity Details, Schema JSON-LD & Internal Link Relations
  app.get("/api/seo/entity/:id", (req, res) => {
    const { id } = req.params;
    const node = knowledgeGraph.getNode(id);
    if (!node) {
      return res.status(404).json({ success: false, error: `Knowledge entity '${id}' not found.` });
    }
    const resolvedLinks = knowledgeGraph.resolveInternalLinks(node.id);
    const jsonLd = schemaGenerator.generateArticleSchema(node);
    const grounding = aiSearchGrounding.generateGroundingBlock(node.id);

    res.json({
      success: true,
      node,
      resolvedLinks,
      jsonLd,
      aiGrounding: grounding,
    });
  });

  // Intent Classifier & Search-to-Product Loop Resolver
  app.post("/api/seo/query-intent", (req, res) => {
    const { query } = req.body;
    if (!query || typeof query !== "string") {
      return res.status(400).json({ success: false, error: "Query parameter string is required." });
    }
    const resolution = intentRouter.resolveQuery(query);
    res.json({
      success: true,
      resolution,
    });
  });

  // Dynamic XML Sitemap
  app.get("/api/seo/sitemap.xml", (req, res) => {
    const xml = seoCommandEngine.generateXmlSitemap();
    res.header("Content-Type", "application/xml");
    res.send(xml);
  });

  // Standard Robots.txt
  app.get("/api/seo/robots.txt", (req, res) => {
    const robots = seoCommandEngine.generateRobotsTxt();
    res.header("Content-Type", "text/plain");
    res.send(robots);
  });

  // Content Multiplier Generator (14-surface distribution graph)
  app.get("/api/seo/multiplier/:id", (req, res) => {
    const { id } = req.params;
    const pkg = contentMultiplier.generateMultiplierPackage(id);
    if (!pkg) {
      return res.status(404).json({ success: false, error: `Entity '${id}' not found for distribution multiplier.` });
    }
    res.json({
      success: true,
      distributionPackage: pkg,
    });
  });

  // Content Freshness & Decay Audit
  app.get("/api/seo/decay-audit", (req, res) => {
    const records = decayDetector.runDecayAudit();
    res.json({
      success: true,
      totalAudited: records.length,
      decayAlerts: records.filter((r) => r.decayRisk !== "HEALTHY"),
      allRecords: records,
    });
  });

  // Step an autonomous SEO Agent
  app.post("/api/seo/agents/step", (req, res) => {
    const { role, taskDescription } = req.body;
    if (!role) {
      return res.status(400).json({ success: false, error: "Agent role is required." });
    }
    const agent = seoAgentSwarm.stepAgent(role, taskDescription);
    if (!agent) {
      return res.status(404).json({ success: false, error: `Agent '${role}' not found.` });
    }
    res.json({
      success: true,
      agent,
    });
  });

  // Benchmark Datasets
  app.get("/api/seo/datasets", (req, res) => {
    res.json({
      success: true,
      datasets: ATLAS_ORIGINAL_DATASETS,
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Atlas Sanctum] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
