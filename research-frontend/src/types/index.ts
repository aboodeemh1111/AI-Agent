export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  isLoading?: boolean;
  research?: ResearchData;
};

export type ResearchData = {
  topic: string;
  summary: string;
  sources: string[];
  tools: string[];
};

export type ToastType = "success" | "error" | "info";

export type ToastState = {
  visible: boolean;
  message: string;
  type: ToastType;
};
