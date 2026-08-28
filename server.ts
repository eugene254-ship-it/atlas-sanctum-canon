import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

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
