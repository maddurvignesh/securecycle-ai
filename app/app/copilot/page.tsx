"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Send,
  ShieldCheck,
  Sparkles,
  User,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/app-shell/PageHeader";
import { Button } from "@/components/app-ui/button";
import { Input } from "@/components/app-ui/input";
import { Badge } from "@/components/app-ui/badge";
import { useApp } from "@/components/providers/AppProvider";
import { COPILOT_SUGGESTIONS } from "@/lib/mock/copilot";
import { cn } from "@/lib/utils";

type Message = { id: string; role: "user" | "assistant"; text: string; meta?: string };

function answerFor(q: string): { text: string; meta: string } {
  const norm = q.toLowerCase();
  const hit = COPILOT_SUGGESTIONS.find((s) => s.question.toLowerCase() === norm);
  if (hit) return { text: hit.answer, meta: "Based on your live workspace data" };
  const best = COPILOT_SUGGESTIONS.find((s) =>
    s.question.toLowerCase().split(" ").filter((w) => w.length > 3).some((w) => norm.includes(w))
  );
  if (best) return { text: best.answer, meta: "Suggested from similar questions" };
  return {
    text: "I can help you reason about devices, risk, compliance and recycling. Try asking: “Which devices need wiping?”, “Show critical assets”, or “Generate compliance report”.",
    meta: "General guidance",
  };
}

export default function CopilotPage() {
  const { assets, unreadCount } = useApp();
  const [input, setInput] = React.useState("");
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: "m0",
      role: "assistant",
      text: "Hi, I'm your SecureCycle Copilot. Ask me anything about your fleet, risk posture, compliance or recycling operations.",
      meta: "Ready · connected to live workspace",
    },
  ]);
  const [typing, setTyping] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const send = (raw?: string) => {
    const text = (raw ?? input).trim();
    if (!text || typing) return;
    setMessages((m) => [...m, { id: `u-${Date.now()}`, role: "user", text }]);
    setInput("");
    setTyping(true);
    const { text: answer, meta } = answerFor(text);
    setTimeout(() => {
      setMessages((m) => [...m, { id: `a-${Date.now()}`, role: "assistant", text: answer, meta }]);
      setTyping(false);
    }, 1100);
  };

  const quickFacts = [
    { label: "Devices pending wipe", value: assets.filter((a) => a.status === "Pending Wipe").length },
    { label: "High-risk assets", value: assets.filter((a) => a.riskLevel === "High" || a.riskLevel === "Critical").length },
    { label: "Unread alerts", value: unreadCount },
    { label: "Compliance", value: "96.8%" },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="AI assistant"
        title="AI Copilot"
        desc="Your natural-language interface to the entire SecureCycle platform."
        actions={
          <Button variant="outline" onClick={() => { setMessages([messages[0]]); toast.info("Conversation reset"); }}>
            <X className="h-4 w-4 text-mist" /> New chat
          </Button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        {/* chat */}
        <div className="flex h-[560px] flex-col overflow-hidden rounded-3xl border border-ink/6 bg-white shadow-card">
          {/* header */}
          <div className="flex items-center gap-3 border-b border-ink/6 p-4">
            <span className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-600 to-primary-400 text-white shadow-glow">
              <Bot className="h-5 w-5" />
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-success-500 ring-2 ring-white" />
            </span>
            <div>
              <p className="text-sm font-semibold text-ink">SecureCycle Copilot</p>
              <p className="text-[11px] text-success-600">Online · Enterprise model · GPT-class reasoning</p>
            </div>
          </div>

          {/* messages */}
          <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-5">
            <AnimatePresence initial={false}>
              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={cn("flex items-start gap-2.5", m.role === "user" ? "flex-row-reverse" : "")}
                >
                  <span className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ring-1",
                    m.role === "assistant" ? "bg-primary-50 text-primary-600 ring-primary-100" : "bg-slate-900 text-white"
                  )}>
                    {m.role === "assistant" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                  </span>
                  <div className={cn("max-w-[82%]", m.role === "user" && "text-right")}>
                    <div className={cn(
                      "rounded-2xl px-4 py-3 text-left text-[13px] leading-relaxed shadow-sm",
                      m.role === "assistant" ? "rounded-tl-md border border-ink/6 bg-cloud/70 text-ink" : "rounded-tr-md bg-gradient-to-r from-primary-600 to-primary-500 text-white"
                    )}>
                      {m.text}
                    </div>
                    {m.meta ? <p className="mt-1 flex items-center gap-1 pl-1 text-[10px] text-mist"><Sparkles className="h-3 w-3" /> {m.meta}</p> : null}
                  </div>
                </motion.div>
              ))}
              {typing && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary-50 text-primary-600 ring-1 ring-primary-100">
                    <Bot className="h-4 w-4" />
                  </span>
                  <div className="flex items-center gap-1 rounded-2xl rounded-tl-md border border-ink/6 bg-cloud/70 px-4 py-3">
                    {[0, 1, 2].map((i) => (
                      <span key={i} className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary-400" style={{ animationDelay: `${i * 0.15}s` }} />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* input */}
          <div className="border-t border-ink/6 p-4">
            <div className="flex items-center gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Ask anything about your estate…"
                className="h-11"
              />
              <Button className="h-11 w-11 px-0" onClick={() => send()} disabled={!input.trim() || typing} aria-label="Send">
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="mt-2 text-center text-[10px] text-mist">Copilot may suggest actions — review before executing. Responses use live workspace data.</p>
          </div>
        </div>

        {/* suggestions + facts */}
        <div className="space-y-5">
          <div>
            <h3 className="mb-3 text-sm font-semibold text-ink">Try asking</h3>
            <div className="space-y-2">
              {COPILOT_SUGGESTIONS.slice(0, 5).map((s, i) => (
                <motion.button
                  key={s.id}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  onClick={() => send(s.question)}
                  className="group flex w-full items-center gap-3 rounded-2xl border border-ink/6 bg-white p-3.5 text-left transition-all hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-card"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                    <Sparkles className="h-4 w-4" />
                  </span>
                  <span className="flex-1 text-[13px] font-medium text-ink group-hover:text-primary-700">{s.question}</span>
                  <ArrowRight className="h-4 w-4 text-mist transition-transform group-hover:translate-x-0.5 group-hover:text-primary-500" />
                </motion.button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {quickFacts.map((f, i) => (
              <motion.div key={f.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 * i }} className="rounded-2xl border border-ink/6 bg-white p-3.5 shadow-card">
                <p className="text-[11px] font-medium text-mist">{f.label}</p>
                <p className="mt-0.5 text-lg font-semibold text-ink">{f.value}</p>
              </motion.div>
            ))}
          </div>

          <div className="rounded-2xl border border-violet-100 bg-gradient-to-br from-violet-50/60 to-primary-50/40 p-4">
            <div className="flex items-center gap-2 text-[13px] font-semibold text-violet-700">
              <ShieldCheck className="h-4 w-4" /> Enterprise safety
            </div>
            <p className="mt-1.5 text-[12px] leading-relaxed text-mist">
              Copilot only surfaces sanitized, aggregated insights. Destructive actions always require a human confirmation in the console.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}