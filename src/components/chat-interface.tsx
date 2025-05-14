
"use client";

import { useState, useRef, useEffect, useTransition } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, User, MessageSquare, Loader2, Sparkles } from 'lucide-react'; // Added Sparkles
import { aiChatbot, type AIChatbotInput, type ChatMessage as BackendChatMessage } from '@/ai/flows/ai-chatbot';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  avatar?: string;
}

const MAX_HISTORY_LENGTH = 5;

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [_isPending, startTransition] = useTransition(); 
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollViewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
      if (scrollViewport) {
        scrollViewport.scrollTop = scrollViewport.scrollHeight;
      }
    }
  }, [messages]);
  
  useEffect(() => {
    setMessages([
      { id: 'initial-bot-msg', text: "Hello! I'm Rahul's AI assistant. Feel free to ask me anything about his experience, skills, or projects.", sender: 'bot' }
    ]);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
    };
    
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    const historyForBackend: BackendChatMessage[] = updatedMessages
      .slice(-MAX_HISTORY_LENGTH -1, -1) 
      .map(msg => ({ sender: msg.sender, text: msg.text }));

    startTransition(async () => {
      try {
        const chatbotInput: AIChatbotInput = { 
          query: userMessage.text, 
          chatHistory: historyForBackend.length > 0 ? historyForBackend : undefined,
        };
        const response = await aiChatbot(chatbotInput);
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: response.response,
          sender: 'bot',
        };
        setMessages((prev) => [...prev, botMessage]);
      } catch (error) {
        console.error("Chatbot error:", error);
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: "Sorry, I encountered an error. Please try again.",
          sender: 'bot',
        };
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    });
  };

  return (
    <div className="flex flex-col h-[650px] max-h-[70vh] md:max-h-[65vh] w-full max-w-2xl mx-auto bg-card shadow-xl rounded-lg border-2 border-primary/50 dark:border-accent/60 shadow-accent/20 dark:shadow-accent/30 transition-all duration-300 hover:shadow-accent/30 dark:hover:shadow-accent/40">
      <div className="p-4 border-b flex items-center gap-3 bg-gradient-to-r from-primary/10 via-card to-accent/10 dark:from-primary/20 dark:via-card dark:to-accent/20">
        <Sparkles className="h-6 w-6 text-accent animate-pulse" />
        <MessageSquare className="h-6 w-6 text-primary" />
        <h3 className="text-lg font-semibold text-primary">Chat with AI Rahul</h3>
      </div>
      <ScrollArea className="flex-grow p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "flex items-end gap-2 animate-fadeIn",
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              {msg.sender === 'bot' && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/bot.png" alt="Bot Avatar" data-ai-hint="AI assistant" />
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  "max-w-[70%] rounded-lg px-4 py-2 text-sm shadow",
                  msg.sender === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground'
                )}
              >
                {msg.text}
              </div>
              {msg.sender === 'user' && (
                <Avatar className="h-8 w-8">
                   <AvatarFallback><User className="h-5 w-5" /></AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-end gap-2 justify-start animate-fadeIn">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://placehold.co/40x40.png" alt="Bot Avatar" data-ai-hint="AI assistant" />
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
              <div className="max-w-[70%] rounded-lg px-4 py-2 text-sm shadow bg-secondary text-secondary-foreground">
                <Loader2 className="h-4 w-4 animate-spin inline-block" />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <form onSubmit={handleSubmit} className="border-t p-4 flex items-center gap-2">
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about my experience, skills..."
          className="flex-grow"
          aria-label="Chat input"
          disabled={isLoading}
        />
        <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
          {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
          <span className="sr-only">Send message</span>
        </Button>
      </form>
    </div>
  );
}

    