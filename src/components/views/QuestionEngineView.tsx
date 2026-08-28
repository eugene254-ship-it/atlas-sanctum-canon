import React, { useState, useEffect, useRef } from "react";
import {
  HelpCircle,
  Sparkles,
  Search,
  ArrowRight,
  Filter,
  CheckCircle2,
  AlertCircle,
  Layers,
  Compass,
  Cpu,
  BookOpen,
  Plus,
  RefreshCw,
  Globe,
  Mic,
  MicOff,
  Copy,
  Check,
  ShieldCheck,
  ExternalLink
} from "lucide-react";
import { AtlasQuestion, QuestionCategory, NavigationSpace } from "../../types";
import { INITIAL_QUESTIONS } from "../../data/seedData";
import { CANON_PILLARS } from "../../data/canon";
import { dispatchGroundingInquiry, quickCopyToClipboard, GroundedInquiryOutput } from "../../services/api";

interface QuestionEngineViewProps {
  onNavigate: (space: NavigationSpace) => void;
  initialSelectedQuestionId?: string;
}

export const QuestionEngineView: React.FC<QuestionEngineViewProps> = ({
  onNavigate,
  initialSelectedQuestionId,
}) => {
  const [questions, setQuestions] = useState<AtlasQuestion[]>(INITIAL_QUESTIONS);
  const [selectedQuestion, setSelectedQuestion] = useState<AtlasQuestion>(
    INITIAL_QUESTIONS.find((q) => q.id === initialSelectedQuestionId) || INITIAL_QUESTIONS[0]
  );
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Socratic Deepener State & Grounding
  const [deepenerInput, setDeepenerInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [groundedResult, setGroundedResult] = useState<GroundedInquiryOutput | null>(null);
  const [useSearchGrounding, setUseSearchGrounding] = useState(true);
  const [copiedMatrix, setCopiedMatrix] = useState(false);

  // Web Speech API State
  const [isListening, setIsListening] = useState(false);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);

  // Initialize Speech Recognition if supported
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join("");
        setDeepenerInput(transcript);
      };

      recognition.onerror = (event: any) => {
        console.warn("Speech recognition error:", event.error);
        setIsListening(false);
        if (event.error !== "no-speech") {
          setSpeechError(`Speech dictation: ${event.error}`);
          setTimeout(() => setSpeechError(null), 4000);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const toggleSpeechRecognition = () => {
    if (!recognitionRef.current) {
      alert("Web Speech API is not supported in this browser. Please use keyboard input or Chrome/Edge.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setSpeechError(null);
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.error("Failed to start speech recognition:", err);
      }
    }
  };

  const categories: { id: string; label: string; count: number }[] = [
    { id: "all", label: "All Questions", count: questions.length },
    { id: "reality", label: "Reality Questions", count: questions.filter((q) => q.category === "reality").length },
    { id: "systems", label: "Systems Questions", count: questions.filter((q) => q.category === "systems").length },
    { id: "human", label: "Human Context", count: questions.filter((q) => q.category === "human").length },
    { id: "innovation", label: "Innovation & 10x", count: questions.filter((q) => q.category === "innovation").length },
    { id: "intelligence", label: "Intelligence Abundance", count: questions.filter((q) => q.category === "intelligence").length },
    { id: "civilization", label: "Civilization & Governance", count: questions.filter((q) => q.category === "civilization").length },
  ];

  const filteredQuestions = questions.filter((q) => {
    const matchesCategory = activeCategory === "all" || q.category === activeCategory;
    const matchesSearch =
      q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleGenerateSocraticDeepening = async () => {
    if (!deepenerInput.trim() && !selectedQuestion) return;

    const targetText = deepenerInput.trim() || selectedQuestion.title;
    setIsGenerating(true);
    setGroundedResult(null);

    const prompt = `You are the Atlas Socratic Question Engine with Real-Time Knowledge Retrieval.
Analyze this inquiry deeply and ground with real-world data:
"${targetText}"

Please generate:
1. Three deeper, higher-order REALITY questions (uncovering what is empirically true in the real world).
2. Two non-obvious SYSTEMS questions (feedback loops, delay structures, Meadows leverage points).
3. The core HIDDEN ASSUMPTION embedded in current mainstream thinking about this problem that must be falsified with real data.
4. The FIRST-PRINCIPLES Possibility and empirical next step that emerges once this assumption is eliminated.`;

    const result = await dispatchGroundingInquiry(
      prompt,
      "You are the Socratic Question Engine of Atlas Sanctum. Ground answers in verified real-world systems dynamics.",
      "gemini-3.7-flash",
      useSearchGrounding
    );

    setGroundedResult(result);
    setIsGenerating(false);
  };

  const handleQuickCopyOutput = () => {
    if (!groundedResult?.text) return;
    quickCopyToClipboard(groundedResult.text, "Socratic Deconstruction Matrix");
    setCopiedMatrix(true);
    setTimeout(() => setCopiedMatrix(false), 2000);
  };

  const getCanonPillar = (pillarId: number) => {
    return CANON_PILLARS.find((p) => p.id === pillarId) || CANON_PILLARS[0];
  };

  return (
    <div className="space-y-8 animate-fadeIn text-[#f2f2f2] pb-20">
      {/* Header Banner */}
      <div className="p-8 bg-[#0c0c0c] border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2.5 text-[10px] font-mono tracking-[0.3em] uppercase text-[#c5a059]">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>PRIMARY REGENERATIVE INTELLIGENCE OBJECT</span>
          </div>
          <h2 className="font-serif font-light text-3xl sm:text-4xl text-white tracking-wide">
            The Socratic Question Engine
          </h2>
          <p className="text-xs sm:text-sm text-white/50 font-serif italic max-w-2xl leading-relaxed">
            Inquiries are first-class intelligence artifacts grounded in live empirical data, designed to unmask hidden assumptions and reveal civilizational leverage points.
          </p>
        </div>

        <button
          id="btn-new-inquiry"
          onClick={() => {
            const userQ = prompt("Enter a new foundational inquiry to introduce into the Atlas Knowledge Graph:");
            if (userQ && userQ.trim()) {
              const newQ: AtlasQuestion = {
                id: `q-${Date.now()}`,
                category: "systems",
                title: userQ.trim(),
                description: "Newly registered live Socratic inquiry awaiting multi-agent deconstruction.",
                subQuestions: [
                  "What physical or institutional constraint produces the current outcome?",
                  "What feedback loop prevents self-healing in this domain?"
                ],
                assumptions: ["Legacy centralized solution is required (Needs Falsification)"],
                unknowns: ["Empirical ground telemetry distribution"],
                evidenceRequired: ["Field sensor logs and community diaries"],
                targetLeveragePoint: "Leverage Point #4: Power of self-organization",
                associatedPlace: "Regional Node",
                depthLevel: 4,
                status: "open",
                tags: ["Custom Inquiry", "Socratic"],
                canonPillarRef: 4
              };
              setQuestions([newQ, ...questions]);
              setSelectedQuestion(newQ);
            }
          }}
          className="px-5 py-2.5 bg-[#c5a059] hover:bg-[#b08d48] text-[#080808] text-[10px] uppercase tracking-[0.25em] font-bold flex items-center space-x-2 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>New Inquiry</span>
        </button>
      </div>

      {/* Socratic Deepener Bar with Knowledge Retrieval & Dictation */}
      <div className="p-6 bg-[#0c0c0c] border border-white/10 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 text-[10px] uppercase tracking-[0.25em] font-mono text-white/40">
          <span className="flex items-center space-x-2 text-[#c5a059] font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>LIVE SOCRATIC DEEPENER & ASSUMPTION UNMASKER</span>
          </span>

          {/* Knowledge Retrieval Grounding Toggle */}
          <div className="flex items-center space-x-3">
            <label className="flex items-center space-x-2 cursor-pointer text-white/70 hover:text-white transition-colors">
              <input
                id="checkbox-search-grounding"
                type="checkbox"
                checked={useSearchGrounding}
                onChange={(e) => setUseSearchGrounding(e.target.checked)}
                className="w-3.5 h-3.5 accent-[#c5a059] rounded-xs cursor-pointer"
              />
              <span className="flex items-center space-x-1.5 text-[#c5a059] font-semibold">
                <Globe className="w-3 h-3 text-sky-400" />
                <span>Google Search Grounding (Live Data)</span>
              </span>
            </label>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#c5a059] absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={deepenerInput}
              onChange={(e) => setDeepenerInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleGenerateSocraticDeepening()}
              placeholder={isListening ? "Listening... Speak your inquiry now..." : "Enter domain or speak inquiry (e.g. 'Decentralized sanitation in informal settlements')"}
              className={`w-full pl-10 pr-12 py-3 bg-[#080808] border ${isListening ? "border-amber-400 animate-pulse ring-1 ring-amber-400" : "border-white/15"} text-xs sm:text-sm text-white placeholder-white/30 outline-none focus:border-[#c5a059] transition-all font-sans tracking-wide`}
            />

            {/* Web Speech Dictation Trigger */}
            <button
              id="btn-speech-dictate"
              type="button"
              onClick={toggleSpeechRecognition}
              title={isListening ? "Stop Speech Dictation" : "Dictate Inquiry using Web Speech API"}
              className={`absolute right-3 top-2.5 p-1.5 rounded-xs transition-all ${
                isListening
                  ? "bg-amber-400 text-[#080808] animate-ping"
                  : "text-white/40 hover:text-[#c5a059] hover:bg-white/5"
              }`}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>
          </div>

          <button
            id="btn-deepen-question"
            onClick={handleGenerateSocraticDeepening}
            disabled={isGenerating}
            className="px-6 py-3 border border-[#c5a059] text-[#c5a059] hover:bg-[#c5a059] hover:text-[#080808] text-[10px] uppercase tracking-[0.25em] font-bold flex items-center justify-center space-x-2 transition-all disabled:opacity-50 shrink-0"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>RETRIEVING & UNMASKING</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Deepen Inquiry</span>
              </>
            )}
          </button>
        </div>

        {speechError && (
          <div className="text-[11px] font-mono text-amber-400 flex items-center space-x-1.5">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{speechError}</span>
          </div>
        )}

        {/* Live Grounded Socratic Generation Output with Source Verification Badge & Quick Copy */}
        {groundedResult && (
          <div className="mt-4 p-6 bg-[#080808] border border-[#c5a059]/40 text-xs sm:text-sm text-white/90 font-sans leading-relaxed whitespace-pre-line space-y-4 animate-fadeIn">
            {/* Header: Title + Source Verification Badge + Quick Copy */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-[#c5a059] font-bold flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>SOCRATIC DECONSTRUCTION MATRIX</span>
                </span>

                {/* Source Verification Badge */}
                {groundedResult.sourceVerified && (
                  <span className="px-2.5 py-1 bg-[#0a1610] text-emerald-300 border border-emerald-700/60 font-mono text-[9px] uppercase tracking-wider flex items-center space-x-1 shadow-sm">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>SOURCE VERIFICATION: GOOGLE SEARCH GROUNDED</span>
                  </span>
                )}
              </div>

              <div className="flex items-center space-x-2">
                {/* Quick Copy Button */}
                <button
                  id="btn-quick-copy-matrix"
                  onClick={handleQuickCopyOutput}
                  className="px-3 py-1 bg-[#141414] hover:bg-[#1f1f1f] text-white/80 hover:text-white border border-white/10 hover:border-[#c5a059] text-[10px] font-mono uppercase tracking-wider flex items-center space-x-1.5 transition-all"
                  title="Quick copy Socratic output to clipboard"
                >
                  {copiedMatrix ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-[#c5a059]" />}
                  <span>{copiedMatrix ? "COPIED" : "QUICK COPY"}</span>
                </button>

                <button
                  onClick={() => setGroundedResult(null)}
                  className="text-white/40 hover:text-white text-xs font-mono px-2 py-1"
                >
                  Dismiss
                </button>
              </div>
            </div>

            {/* Content text */}
            <div className="font-sans text-white/90 leading-relaxed space-y-2">
              {groundedResult.text}
            </div>

            {/* Knowledge Retrieval Grounding Citations & Queries */}
            {groundedResult.sourceVerified && (groundedResult.searchQueries.length > 0 || groundedResult.sources.length > 0) && (
              <div className="pt-3 mt-3 border-t border-white/10 space-y-2.5 bg-[#050505] p-4">
                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-white/40">
                  <span className="flex items-center space-x-1.5 text-sky-400 font-bold">
                    <Globe className="w-3.5 h-3.5" />
                    <span>Empirical Verification Grounding Sources</span>
                  </span>
                  <span>Model: {groundedResult.modelUsed}</span>
                </div>

                {groundedResult.searchQueries.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    <span className="text-[9px] font-mono text-white/40 uppercase">Search Queries:</span>
                    {groundedResult.searchQueries.map((q, idx) => (
                      <span key={idx} className="text-[9px] font-mono px-2 py-0.5 bg-[#101010] text-sky-300 border border-sky-900/40">
                        "{q}"
                      </span>
                    ))}
                  </div>
                )}

                {groundedResult.sources.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {groundedResult.sources.map((src, idx) => (
                      <a
                        key={idx}
                        href={src.uri}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="text-[10px] font-mono px-2.5 py-1 bg-[#101010] hover:bg-[#181818] text-white/80 hover:text-white border border-white/10 flex items-center space-x-1.5 transition-colors"
                      >
                        <ExternalLink className="w-3 h-3 text-sky-400 shrink-0" />
                        <span className="truncate max-w-[260px]">{src.title}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Filter + Question List (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 pb-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-mono transition-all ${
                  activeCategory === cat.id
                    ? "bg-[#c5a059] text-[#080808] font-bold"
                    : "bg-[#0c0c0c] text-white/40 hover:text-white border border-white/10"
                }`}
              >
                {cat.label} ({cat.count})
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#c5a059] absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter inquiries or tags..."
              className="w-full pl-9 pr-3 py-2 bg-[#0c0c0c] border border-white/10 text-xs text-white placeholder-white/30 outline-none focus:border-[#c5a059]"
            />
          </div>

          {/* Questions Scrollable List */}
          <div className="space-y-3 max-h-[620px] overflow-y-auto pr-1">
            {filteredQuestions.map((q) => {
              const isSelected = selectedQuestion.id === q.id;
              const pillar = getCanonPillar(q.canonPillarRef);

              return (
                <div
                  key={q.id}
                  onClick={() => setSelectedQuestion(q)}
                  className={`p-5 border transition-all cursor-pointer space-y-3 ${
                    isSelected
                      ? "bg-[#111111] border-[#c5a059] shadow-md"
                      : "bg-[#0c0c0c] hover:bg-[#111111] border-white/10 text-white/70"
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider">
                    <span className="px-2 py-0.5 bg-[#161616] text-[#c5a059] border border-[#c5a059]/30">
                      {q.category}
                    </span>
                    <span className="text-white/40">
                      Depth: {q.depthLevel}/5 • {pillar.name}
                    </span>
                  </div>

                  <h4 className="font-serif font-normal text-base text-white leading-snug">
                    {q.title}
                  </h4>

                  <p className="text-xs text-white/50 line-clamp-2 font-sans">
                    {q.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {(q.tags || []).slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[9px] font-mono tracking-wider uppercase px-2 py-0.5 bg-[#161616] text-white/40 border border-white/5"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Selected Question Deep-Dive (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-8 bg-[#0c0c0c] border border-white/10 space-y-6">
            {/* Question Header */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono uppercase tracking-[0.2em]">
                <span className="px-3 py-1 bg-[#161616] text-[#c5a059] border border-[#c5a059]/40 font-semibold">
                  {(selectedQuestion?.category || "SOCRATIC").toUpperCase()} INQUIRY
                </span>
                <span className="text-white/40">
                  Status: <strong className="text-emerald-400">{selectedQuestion?.status || "active"}</strong> • Depth: {selectedQuestion?.depthLevel || 1}/5
                </span>
              </div>

              <h3 className="font-serif font-light text-2xl sm:text-3xl text-white leading-snug tracking-wide">
                {selectedQuestion?.title}
              </h3>

              <p className="text-xs sm:text-sm text-white/60 font-sans leading-relaxed">
                {selectedQuestion?.description}
              </p>
            </div>

            {/* Sub-Questions Matrix */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-mono text-[#c5a059] uppercase tracking-[0.3em] flex items-center space-x-2">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Constituent Socratic Sub-Questions</span>
              </h4>
              <div className="space-y-2">
                {(selectedQuestion?.subQuestions || []).map((sq, i) => (
                  <div key={i} className="p-4 bg-[#080808] border border-white/10 text-xs text-white/80 flex items-start space-x-3">
                    <span className="font-mono text-[#c5a059] font-bold shrink-0">{i + 1}.</span>
                    <span className="leading-relaxed font-sans">{sq}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Assumptions & Unknowns Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Hidden Assumptions to Challenge */}
              <div className="p-5 bg-[#080808] border border-white/10 space-y-2.5">
                <div className="flex items-center space-x-2 text-[10px] uppercase tracking-[0.25em] font-mono text-rose-400">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Assumptions to Unmask</span>
                </div>
                <ul className="text-xs space-y-2 text-white/60 font-sans">
                  {(selectedQuestion?.assumptions || []).map((assump, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <span className="text-rose-500 font-bold shrink-0">✕</span>
                      <span>{assump}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Critical Unknowns */}
              <div className="p-5 bg-[#080808] border border-white/10 space-y-2.5">
                <div className="flex items-center space-x-2 text-[10px] uppercase tracking-[0.25em] font-mono text-sky-400">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Unknowns Requiring Research</span>
                </div>
                <ul className="text-xs space-y-2 text-white/60 font-sans">
                  {(selectedQuestion?.unknowns || []).map((unk, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <span className="text-sky-400 font-bold shrink-0">?</span>
                      <span>{unk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Evidence Required & Leverage Point */}
            <div className="p-5 bg-[#080808] border border-white/10 space-y-3">
              <div>
                <h5 className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em]">Target Meadows Leverage Point</h5>
                <p className="text-xs font-serif font-medium text-[#c5a059] mt-1">
                  {selectedQuestion?.targetLeveragePoint || "Leverage Point #4: Self-Organization"}
                </p>
              </div>

              <div>
                <h5 className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em]">Empirical Evidence Required for Proof</h5>
                <div className="flex flex-wrap gap-2 mt-2">
                  {(selectedQuestion?.evidenceRequired || []).map((ev, i) => (
                    <span key={i} className="text-[11px] px-3 py-1 bg-[#121212] border border-white/10 text-white/70 font-sans">
                      {ev}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Canon Anchor */}
            <div className="p-4 bg-[#080808] border border-white/10 text-xs flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-4 h-4 text-[#c5a059]" />
                <span className="text-white/70 font-serif">
                  Anchored in Canon Pillar #{getCanonPillar(selectedQuestion.canonPillarRef).sequenceOrder}: <strong className="text-white">{getCanonPillar(selectedQuestion.canonPillarRef).name}</strong>
                </span>
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-white/30">
                {selectedQuestion.associatedPlace}
              </span>
            </div>

            {/* Action Bridges: Possibility Space & Studio */}
            <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => onNavigate("systems-modeling")}
                className="px-4 py-2 border border-white/15 text-white/70 hover:text-white text-[10px] uppercase tracking-[0.25em] font-mono flex items-center space-x-1.5 transition-colors"
              >
                <Layers className="w-3.5 h-3.5 text-sky-400" />
                <span>System Model</span>
              </button>

              <button
                onClick={() => onNavigate("possibility-space")}
                className="px-4 py-2 border border-white/15 text-white/70 hover:text-white text-[10px] uppercase tracking-[0.25em] font-mono flex items-center space-x-1.5 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>Possibility Space</span>
              </button>

              <button
                onClick={() => onNavigate("studio")}
                className="px-5 py-2 bg-[#c5a059] hover:bg-[#b08d48] text-[#080808] text-[10px] uppercase tracking-[0.25em] font-bold flex items-center space-x-2 transition-all"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Build Studio Experiment</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
