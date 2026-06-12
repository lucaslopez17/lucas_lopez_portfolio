"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, Loader2, Send, X } from "lucide-react";

type Locale = "en" | "es";

type ChatMessage = {
  role: "user" | "bot";
  text: string;
};

const COPY: Record<Locale, { title: string; intro: string; placeholder: string; error: string }> = {
  en: {
    title: "Lucas Bot",
    intro:
      "Hey, I'm Lucas Bot. Ask me anything about Lucas's engineering background, field experience, software skills or projects.",
    placeholder: "Ask me about Lucas...",
    error: "Something went wrong talking to Lucas Bot. Please try again.",
  },
  es: {
    title: "Lucas Bot",
    intro:
      "Hola, soy Lucas Bot. Preguntame lo que quieras sobre la experiencia de Lucas en ingeniería, terreno, software o proyectos.",
    placeholder: "Preguntame sobre Lucas...",
    error: "Algo salió mal hablando con Lucas Bot. Intentá de nuevo.",
  },
};

export default function LucasBot({ locale }: { locale: Locale }) {
  const copy = COPY[locale];
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([{ role: "bot", text: copy.intro }]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Keep the intro message in sync if the user switches language before chatting.
  useEffect(() => {
    setMessages((current) => {
      if (current.length === 1 && current[0].role === "bot") {
        return [{ role: "bot", text: copy.intro }];
      }
      return current;
    });
  }, [copy.intro]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isLoading, isOpen]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || isLoading) return;

    setMessages((current) => [...current, { role: "user", text }]);
    setInput("");
    setIsLoading(true);
    setErrorText(null);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || copy.error);
      }

      setMessages((current) => [...current, { role: "bot", text: data.reply }]);
    } catch (error) {
      console.error("Lucas Bot chat error:", error);
      setErrorText(copy.error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  }

  return (
    <div className="lucas-bot">
      {isOpen ? (
        <div className="lucas-bot-panel" role="dialog" aria-label={copy.title}>
          <div className="lucas-bot-header">
            <span className="lucas-bot-header-title">
              <Bot size={18} aria-hidden="true" />
              {copy.title}
            </span>
            <button
              type="button"
              className="lucas-bot-close"
              aria-label="Close chat"
              onClick={() => setIsOpen(false)}
            >
              <X size={18} aria-hidden="true" />
            </button>
          </div>

          <div className="lucas-bot-messages" ref={scrollRef}>
            {messages.map((entry, index) => (
              <div
                key={index}
                className={`lucas-bot-message ${entry.role === "user" ? "is-user" : "is-bot"}`}
              >
                {entry.text}
              </div>
            ))}
            {isLoading ? (
              <div className="lucas-bot-message is-bot lucas-bot-loading">
                <Loader2 size={16} className="lucas-bot-spinner" aria-hidden="true" />
              </div>
            ) : null}
            {errorText ? <div className="lucas-bot-message is-error">{errorText}</div> : null}
          </div>

          <div className="lucas-bot-input-row">
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={copy.placeholder}
              aria-label={copy.placeholder}
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              aria-label="Send message"
            >
              <Send size={16} aria-hidden="true" />
            </button>
          </div>
        </div>
      ) : null}

      <button
        type="button"
        className="lucas-bot-toggle"
        onClick={() => setIsOpen((value) => !value)}
        aria-label={copy.title}
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={22} aria-hidden="true" /> : <Bot size={22} aria-hidden="true" />}
      </button>
    </div>
  );
}
