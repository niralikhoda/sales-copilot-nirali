import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Copy, Download, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface ResultsDisplayProps {
  results: string;
  isLoading: boolean;
}

export const ResultsDisplay = ({ results, isLoading }: ResultsDisplayProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(results);
      setCopied(true);
      toast({
        title: "Copied to clipboard",
        description: "Results have been copied to your clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Failed to copy results to clipboard.",
        variant: "destructive",
      });
    }
  };

  const handleDownload = () => {
    const blob = new Blob([results], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'prompt-results.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download started",
      description: "Results file is being downloaded.",
    });
  };

  return (
    <Card className="shadow-elegant transition-all duration-500 animate-in slide-in-from-bottom-4">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-primary" />
            Results
          </h3>
          
          {!isLoading && results && (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="transition-all duration-300 hover:shadow-glow"
              >
                {copied ? (
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4 mr-2" />
                )}
                {copied ? "Copied!" : "Copy"}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownload}
                className="transition-all duration-300 hover:shadow-glow"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          )}
        </div>

        <div className="relative">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center space-y-4">
                <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin mx-auto" />
                <p className="text-muted-foreground">Processing your prompt...</p>
                <div className="w-64 h-2 bg-muted rounded-full overflow-hidden mx-auto">
                  <div className="h-full bg-gradient-primary animate-pulse" style={{width: '60%'}} />
                </div>
              </div>
            </div>
          ) : (
            <ScrollArea className="h-64 w-full">
              <div className="p-4 bg-muted/30 rounded-lg border border-border/50">
                <pre className="text-sm text-foreground whitespace-pre-wrap font-mono leading-relaxed">
                  {results}
                </pre>
              </div>
            </ScrollArea>
          )}
        </div>

        {!isLoading && results && (
          <div className="mt-4 pt-4 border-t border-border/50">
            <p className="text-xs text-muted-foreground">
              Generated {new Date().toLocaleString()} • {results.length} characters
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};