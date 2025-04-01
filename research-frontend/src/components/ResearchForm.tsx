import { useState } from "react";

interface ResearchFormProps {
  onSubmit: (query: string) => void;
  isLoading: boolean;
}

export default function ResearchForm({
  onSubmit,
  isLoading,
}: ResearchFormProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSubmit(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="query"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          What would you like to research?
        </label>
        <textarea
          id="query"
          rows={4}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          placeholder="Enter a topic or question for comprehensive research..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={isLoading}
        />
      </div>
      <button
        type="submit"
        disabled={isLoading || !query.trim()}
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-all shadow-md"
      >
        {isLoading ? "Researching..." : "Generate Research"}
      </button>
      <p className="text-xs text-center text-gray-500">
        Our AI will search the web and compile comprehensive research on your
        topic
      </p>
    </form>
  );
}
