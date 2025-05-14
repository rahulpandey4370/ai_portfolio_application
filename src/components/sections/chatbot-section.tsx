import ChatInterface from '@/components/chat-interface';

export default function ChatbotSection() {
  return (
    <section id="chatbot" className="bg-secondary/50 dark:bg-secondary/20">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12 animate-fadeInUp">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-primary">Talk to My AI Clone</h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
            Powered by Gemini, this chatbot can answer questions about me based on my resume and LinkedIn profile.
          </p>
        </div>
        <div className="animate-fadeInUp" style={{animationDelay: "0.2s"}}>
          <ChatInterface />
        </div>
      </div>
    </section>
  );
}
