interface ResearchResultsProps {
  results: {
    topic: string;
    summary: string;
    sources: string[];
    tools: string[];
    error?: string;
  };
}

export default function ResearchResults({ results }: ResearchResultsProps) {
  if (results.error) {
    return (
      <div className="p-8">
        <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-100">
          <p className="font-medium mb-1">Error</p>
          <p>{results.error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">
          {results.topic}
        </h2>
        <div className="prose max-w-none">
          <p className="text-gray-700 leading-relaxed">{results.summary}</p>
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2 text-blue-600"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 100-12 6 6 0 000 12z"
              clipRule="evenodd"
            />
            <path
              fillRule="evenodd"
              d="M10 4a1 1 0 100 2 1 1 0 000-2zm0 10a1 1 0 100 2 1 1 0 000-2zm-3-5a1 1 0 100 2 1 1 0 000-2zm6 0a1 1 0 100 2 1 1 0 000-2z"
              clipRule="evenodd"
            />
          </svg>
          Sources
        </h3>
        <ul className="list-disc pl-5 space-y-2">
          {results.sources.map((source, index) => (
            <li key={index} className="text-gray-700">
              {source}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2 text-blue-600"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5 2a1 1 0 011-1h8a1 1 0 011 1v3h3a1 1 0 011 1v12a1 1 0 01-1 1H2a1 1 0 01-1-1V6a1 1 0 011-1h3V2zm9 0H6v3h8V2zm-9 5H3v10h14V7h-2v1a1 1 0 01-1 1H6a1 1 0 01-1-1V7z"
              clipRule="evenodd"
            />
          </svg>
          Tools Used
        </h3>
        <div className="flex flex-wrap gap-2">
          {results.tools.map((tool, index) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
