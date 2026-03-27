import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, X, Send, Bot, User, Loader2, Minimize2 } from 'lucide-react';
import { useAskChatBot } from '@/hooks/useQueries';
import { Variant_bot_user } from '../backend';

interface Message {
  role: 'user' | 'bot';
  text: string;
  timestamp: number;
}

const WELCOME_MESSAGE: Message = {
  role: 'bot',
  text: "👋 Hi! I'm EduMap's AI assistant. I can help you with questions about college fees, eligibility, required documents, application deadlines, available courses, and rankings. What would you like to know?",
  timestamp: Date.now(),
};

const SUGGESTED_QUESTIONS = [
  'What are the typical college fees?',
  'What documents do I need?',
  'What are the eligibility criteria?',
  'When are application deadlines?',
];

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const askChatBot = useAskChatBot();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, messages]);

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || askChatBot.isPending) return;

    const userMsg: Message = { role: 'user', text: trimmed, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    try {
      const response = await askChatBot.mutateAsync(trimmed);
      const botMsg: Message = {
        role: response.role === Variant_bot_user.bot ? 'bot' : 'user',
        text: response.text,
        timestamp: Number(response.timestamp),
      };
      setMessages(prev => [...prev, botMsg]);
    } catch {
      const errorMsg: Message = {
        role: 'bot',
        text: "I'm having trouble connecting right now. Please try again in a moment.",
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, errorMsg]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleSuggestion = (q: string) => {
    sendMessage(q);
  };

  const formatTime = (ts: number) => {
    return new Date(ts).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div
          className="fixed bottom-20 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 max-h-[600px] flex flex-col bg-card border border-border rounded-2xl shadow-2xl overflow-hidden animate-slide-up"
          style={{ maxHeight: 'min(600px, calc(100vh - 100px))' }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 bg-primary text-primary-foreground flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <Bot size={18} />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-sm">EduMap Assistant</div>
              <div className="text-xs text-primary-foreground/70 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-300 inline-block" />
                Online
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Close chat"
            >
              <Minimize2 size={16} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {/* Avatar */}
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    msg.role === 'bot'
                      ? 'bg-primary/10 text-primary'
                      : 'bg-amber-100 text-amber-600'
                  }`}
                >
                  {msg.role === 'bot' ? <Bot size={14} /> : <User size={14} />}
                </div>
                {/* Bubble */}
                <div className={`max-w-[80%] ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                  <div
                    className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-primary text-primary-foreground rounded-tr-sm'
                        : 'bg-secondary text-foreground rounded-tl-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-muted-foreground px-1">
                    {formatTime(msg.timestamp)}
                  </span>
                </div>
              </div>
            ))}

            {/* Loading indicator */}
            {askChatBot.isPending && (
              <div className="flex gap-2.5">
                <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Bot size={14} className="text-primary" />
                </div>
                <div className="px-3.5 py-2.5 rounded-2xl rounded-tl-sm bg-secondary">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Questions (show only at start) */}
          {messages.length <= 1 && (
            <div className="px-4 pb-2 flex-shrink-0">
              <p className="text-xs text-muted-foreground mb-2">Suggested questions:</p>
              <div className="flex flex-wrap gap-1.5">
                {SUGGESTED_QUESTIONS.map(q => (
                  <button
                    key={q}
                    onClick={() => handleSuggestion(q)}
                    className="text-xs px-2.5 py-1.5 rounded-full border border-primary/30 text-primary hover:bg-primary/10 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 px-3 py-3 border-t border-border flex-shrink-0 bg-card"
          >
            <Input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask about fees, courses, deadlines..."
              className="flex-1 text-sm h-9 bg-secondary border-0 focus-visible:ring-1"
              disabled={askChatBot.isPending}
            />
            <Button
              type="submit"
              size="icon"
              className="h-9 w-9 bg-primary text-primary-foreground flex-shrink-0"
              disabled={!input.trim() || askChatBot.isPending}
            >
              {askChatBot.isPending ? (
                <Loader2 size={15} className="animate-spin" />
              ) : (
                <Send size={15} />
              )}
            </Button>
          </form>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="fixed bottom-4 right-4 sm:right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-teal flex items-center justify-center transition-all hover:scale-105 active:scale-95"
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <X size={22} />
        ) : (
          <MessageCircle size={22} />
        )}
        {/* Unread indicator */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 border-2 border-card" />
        )}
      </button>
    </>
  );
}
