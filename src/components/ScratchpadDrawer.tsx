import React, { useState, useEffect, useRef } from "react";
import {
  FileText,
  Copy,
  Download,
  Trash2,
  Sparkles,
  ArrowRight,
  Check,
  X,
  Maximize2,
  Minimize2,
  BookOpen,
  Mic,
  MicOff,
  AlertCircle
} from "lucide-react";
import { NavigationSpace } from "../types";
import { quickCopyToClipboard } from "../services/api";

interface ScratchpadDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSendToInquiry?: (text: string) => void;
  onTransferInquiry?: (text: string) => void;
}

const STORAGE_KEY = "atlas_ephemeral_scratchpad_v1";

export const ScratchpadDrawer: React.FC<ScratchpadDrawerProps> = ({
  isOpen,
  onClose,
  onSendToInquiry,
  onTransferInquiry,
}) => {
  const [content, setContent] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEY) || `# Ephemeral Ideation Scratchpad
- Nairobi Basin hydrology: pump station leverage vs. natural Pumice Bioswale attenuation.
- Capital routing: 100% community equity return through regenerative green bonds.
- Core Socratic question: Given rainfall surges of 45mm/hr, how to protect 42,000 households without fossil dependency?`;
  });
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [lastSavedTime, setLastSavedTime] = useState<string>("");
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "unsaved">("saved");
  const [secondsUntilNextSave, setSecondsUntilNextSave] = useState<number>(5);
  
  // Speech Recognition State
  const [isListening, setIsListening] = useState(false);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);

  const contentRef = useRef(content);
  contentRef.current = content;

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onresult = (event: any) => {
        const lastResultIndex = event.results.length - 1;
        const transcript = event.results[lastResultIndex][0].transcript;
        if (transcript && transcript.trim()) {
          setContent((prev) => {
            const separator = prev.endsWith("\n") || prev.length === 0 ? "" : "\n";
            const updated = `${prev}${separator}- [Dictation]: ${transcript.trim()}`;
            contentRef.current = updated;
            setSaveStatus("unsaved");
            return updated;
          });
        }
      };

      recognition.onerror = (event: any) => {
        console.warn("Scratchpad Speech recognition error:", event.error);
        if (event.error !== "no-speech") {
          setSpeechError(`Dictation: ${event.error}`);
          setTimeout(() => setSpeechError(null), 4000);
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const toggleSpeechRecognition = () => {
    if (!recognitionRef.current) {
      alert("Web Speech API is not supported in this browser. Please use keyboard or Chrome/Edge.");
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
        console.error("Failed to start dictation:", err);
      }
    }
  };

  // Initial time on mount
  useEffect(() => {
    const now = new Date();
    setLastSavedTime(
      `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`
    );
  }, []);

  // Track changes to mark unsaved
  const handleContentChange = (newVal: string) => {
    setContent(newVal);
    setSaveStatus("unsaved");
  };

  // Dedicated 5-second auto-save interval ensuring persistence during session transitions
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsUntilNextSave((prev) => {
        if (prev <= 1) {
          // Perform auto-save
          try {
            setSaveStatus("saving");
            localStorage.setItem(STORAGE_KEY, contentRef.current);
            const now = new Date();
            setLastSavedTime(
              `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`
            );
            setTimeout(() => setSaveStatus("saved"), 300);
          } catch (e) {
            console.error("Auto-save failed", e);
          }
          return 5;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Also save immediately on unmount or drawer close
  useEffect(() => {
    return () => {
      try {
        localStorage.setItem(STORAGE_KEY, contentRef.current);
      } catch (e) {}
    };
  }, []);

  if (!isOpen) return null;

  const handleCopy = () => {
    quickCopyToClipboard(content, "Scratchpad ideations");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `atlas-inquiry-scratchpad-${new Date().toISOString().slice(0, 10)}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    if (window.confirm("Clear all scratchpad notes?")) {
      setContent("");
    }
  };

  const handleTransferToQuestion = () => {
    if (content.trim()) {
      if (onTransferInquiry) {
        onTransferInquiry(content);
      } else if (onSendToInquiry) {
        onSendToInquiry(content);
      }
      onClose();
    }
  };

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const charCount = content.length;

  return (
    <div
      className={`fixed z-50 transition-all duration-300 ${
        isExpanded
          ? "inset-6 bg-[#0c0c0c]/98 border border-[#c5a059] shadow-2xl flex flex-col backdrop-blur-xl"
          : "bottom-14 right-4 sm:right-8 w-full max-w-lg h-[520px] bg-[#0c0c0c]/95 border border-[#c5a059]/60 shadow-2xl flex flex-col backdrop-blur-xl"
      }`}
    >
      {/* Scratchpad Header */}
      <div className="px-4 py-3 bg-[#080808] border-b border-white/10 flex items-center justify-between select-none">
        <div className="flex items-center space-x-2.5">
          <FileText className="w-4 h-4 text-[#c5a059]" />
          <span className="font-serif text-sm font-light text-white tracking-wider">
            Ephemeral Ideation Scratchpad
          </span>
          <span className="text-[9px] font-mono px-1.5 py-0.5 bg-[#c5a059]/10 text-[#c5a059] border border-[#c5a059]/30">
            AUTO-SYNCED
          </span>
          {isListening && (
            <span className="text-[9px] font-mono px-1.5 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse flex items-center space-x-1">
              <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-ping"></span>
              <span>DICTATING</span>
            </span>
          )}
        </div>

        <div className="flex items-center space-x-1.5">
          {/* Dictation Button */}
          <button
            id="btn-scratchpad-dictate"
            onClick={toggleSpeechRecognition}
            title={isListening ? "Stop Voice Dictation" : "Dictate Note (Web Speech API)"}
            className={`p-1 transition-colors ${
              isListening ? "text-amber-400 bg-amber-950/60" : "text-white/40 hover:text-[#c5a059] hover:bg-white/10"
            }`}
          >
            {isListening ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            title={isExpanded ? "Collapse" : "Expand"}
            className="p-1 text-white/40 hover:text-white hover:bg-white/10 transition-colors"
          >
            {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
          <button
            id="btn-close-scratchpad"
            onClick={onClose}
            title="Close"
            className="p-1 text-white/40 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {speechError && (
        <div className="px-4 py-1.5 bg-amber-950/60 border-b border-amber-800/40 text-[11px] font-mono text-amber-300 flex items-center space-x-2">
          <AlertCircle className="w-3 h-3 text-amber-400" />
          <span>{speechError}</span>
        </div>
      )}

      {/* Editor Content Area */}
      <div className="flex-1 p-3 bg-[#080808]/60 flex flex-col">
        <textarea
          value={content}
          onChange={(e) => handleContentChange(e.target.value)}
          placeholder="Capture spontaneous assumptions, leverage hypotheses, mathematical constraints, or speak into microphone..."
          className="w-full flex-1 bg-transparent border border-white/5 focus:border-[#c5a059]/50 p-3 text-xs sm:text-sm font-mono text-white/90 placeholder-white/20 outline-none resize-none leading-relaxed selection:bg-[#c5a059]/30"
          autoFocus
        />
      </div>

      {/* Action Toolbar */}
      <div className="p-3 bg-[#0a0a0a] border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono">
        <div className="flex items-center space-x-3 text-white/40">
          <span>{wordCount} words</span>
          <span>·</span>
          <span>{charCount} chars</span>
          <span>·</span>
          <span className="flex items-center space-x-1.5">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                saveStatus === "saving"
                  ? "bg-amber-400 animate-ping"
                  : saveStatus === "unsaved"
                  ? "bg-sky-400"
                  : "bg-emerald-400"
              }`}
            ></span>
            <span className="text-white/60">
              {saveStatus === "saving"
                ? "Auto-saving..."
                : saveStatus === "unsaved"
                ? `Auto-save in ${secondsUntilNextSave}s`
                : `Saved ${lastSavedTime}`}
            </span>
          </span>
        </div>

        <div className="flex items-center space-x-1.5">
          <button
            id="btn-scratchpad-dictate-bar"
            onClick={toggleSpeechRecognition}
            title="Dictate with Web Speech API"
            className={`px-2 py-1 border transition-all flex items-center space-x-1 ${
              isListening
                ? "bg-amber-400 text-[#080808] border-amber-400 font-bold"
                : "bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border-white/10"
            }`}
          >
            {isListening ? <MicOff className="w-3 h-3 text-[#080808]" /> : <Mic className="w-3 h-3 text-[#c5a059]" />}
            <span>{isListening ? "RECORDING" : "DICTATE"}</span>
          </button>

          <button
            onClick={handleCopy}
            title="Copy all to clipboard"
            className="px-2 py-1 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 transition-all flex items-center space-x-1"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? "COPIED" : "COPY"}</span>
          </button>

          <button
            onClick={handleDownload}
            title="Export as Markdown file"
            className="px-2 py-1 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 transition-all flex items-center space-x-1"
          >
            <Download className="w-3 h-3" />
            <span>EXPORT .MD</span>
          </button>

          <button
            onClick={handleClear}
            title="Clear text"
            className="p-1 bg-white/5 hover:bg-red-950/40 text-white/40 hover:text-red-400 border border-white/10 transition-all"
          >
            <Trash2 className="w-3 h-3" />
          </button>

          <button
            id="btn-scratchpad-send-to-inquiry"
            onClick={handleTransferToQuestion}
            className="px-3 py-1 bg-[#c5a059] hover:bg-[#b08d48] text-[#080808] font-bold tracking-wider transition-all flex items-center space-x-1"
            title="Transfer scratchpad into Question Engine"
          >
            <Sparkles className="w-3 h-3" />
            <span>INQUIRE NOW</span>
          </button>
        </div>
      </div>
    </div>
  );
};
