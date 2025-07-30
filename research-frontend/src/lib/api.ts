import { ResearchData } from "@/types";

const API_URL = "http://localhost:5001/api"; // Must be 5001 to match backend

export async function fetchResearch(query: string): Promise<ResearchData> {
  const response = await fetch(`${API_URL}/research`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to get research results");
  }

  return response.json();
}
