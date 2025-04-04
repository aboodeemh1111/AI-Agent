import { extractUrl } from "@/lib/utils";
import { Link } from "lucide-react";

interface SourcesListProps {
  sources: string[];
}

export default function SourcesList({ sources }: SourcesListProps) {
  if (!sources.length) return null;

  return (
    <div className="pt-2 border-t">
      <h4 className="text-xs font-semibold mb-1.5 text-muted-foreground">
        Sources:
      </h4>
      <ul className="text-xs space-y-1 list-disc list-inside">
        {sources.map((source, index) => {
          const url = extractUrl(source);
          const displaySource =
            source.replace(url ?? "", "").trim() || url || source;

          if (!url) {
            return (
              <li key={index} className="break-words text-muted-foreground">
                {source}
              </li>
            );
          }

          return (
            <li key={index} className="break-words">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-primary underline-offset-4 hover:underline hover:text-primary/90 transition-colors"
                title={`Open source link: ${url}`}
              >
                <Link className="h-3 w-3 flex-shrink-0" />
                <span className="truncate">{displaySource}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
