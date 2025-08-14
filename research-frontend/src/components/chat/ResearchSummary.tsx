import { ResearchData } from "@/types";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Share2 } from "lucide-react";
import SourcesList from "./SourcesList";

interface ResearchSummaryProps {
  research: ResearchData;
  onShare: () => void;
}

export default function ResearchSummary({
  research,
  onShare,
}: ResearchSummaryProps) {
  const handleShare = () => {
    const shareText = `${research.topic}\n\n${
      research.summary
    }\n\nSources:\n${research.sources.join("\n")}`;
    navigator.clipboard.writeText(shareText);
    onShare();
  };

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-base flex items-center gap-2">
        <FileText className="h-4 w-4 text-primary" />
        {research.topic}
      </h3>

      <p className="whitespace-pre-wrap leading-relaxed">{research.summary}</p>

      <SourcesList sources={research.sources} />

      {research.tools?.length > 0 && (
        <div className="pt-2 border-t">
          <h4 className="text-xs font-semibold mb-1.5 text-muted-foreground">
            Tools Used:
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {research.tools.map((tool, index) => (
              <span
                key={index}
                className="inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold bg-secondary text-secondary-foreground"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-end pt-2 border-t">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1.5 shadow-sm"
          onClick={handleShare}
        >
          <Share2 className="h-3.5 w-3.5" />
          Share
        </Button>
      </div>
    </div>
  );
}
