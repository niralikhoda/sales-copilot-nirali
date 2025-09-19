import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Send, Wand2 } from "lucide-react";

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const PromptInput = ({ value, onChange, onSubmit, isLoading }: PromptInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <Card className={`p-6 transition-all duration-300 ${isFocused ? 'shadow-glow ring-2 ring-primary/20' : 'shadow-elegant'}`}>
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-3">
          <Wand2 className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Enter Your Prompt</h3>
        </div>
        
        <div className="relative">
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={handleKeyDown}
            placeholder="Type your prompt here... Use Cmd/Ctrl + Enter to submit"
            className="min-h-[120px] resize-none text-base bg-input/50 border-border/50 focus:border-primary/50 transition-colors duration-300"
            disabled={isLoading}
          />
          
          {/* Character count */}
          <div className="absolute bottom-3 right-3 text-xs text-muted-foreground">
            {value.length} characters
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Press <kbd className="px-2 py-1 text-xs bg-muted rounded border">Cmd</kbd> + <kbd className="px-2 py-1 text-xs bg-muted rounded border">Enter</kbd> to submit
          </div>
          
          <Button 
            onClick={onSubmit}
            disabled={!value.trim() || isLoading}
            className="bg-gradient-primary hover:shadow-glow transition-all duration-300 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2" />
                Processing...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Generate Results
              </>
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
};