import { useState } from "react";
import { PromptInput } from "@/components/PromptInput";
import { ResultsDisplay } from "@/components/ResultsDisplay";
import { Sparkles, Zap } from "lucide-react";

const Index = () => {
  const [prompt, setPrompt] = useState("");
  const [results, setResults] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate results - in real app this would call an API
    setResults(`Results for: "${prompt}"\n\nThis is where your processed results would appear. The prompt has been successfully processed and here are the generated outputs based on your input.`);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/80">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-primary">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Prompt Interface
              </h1>
              <p className="text-muted-foreground">Write your prompts and see instant results</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Powered by AI</span>
            </div>
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Transform Your Ideas Into Results
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Enter your prompt below and watch as it gets processed into meaningful results with our advanced interface.
            </p>
          </div>

          {/* Prompt Input */}
          <PromptInput 
            value={prompt}
            onChange={setPrompt}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />

          {/* Results Display */}
          {(results || isLoading) && (
            <ResultsDisplay 
              results={results}
              isLoading={isLoading}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;