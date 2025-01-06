export type Message = {
  role: "assistant" | "user" | "system";
  content: string;
};

export interface ChatHistory {
  messages: Message[];
}

// chat mode
export type ChatMode = 'general' | 'smolagents' | 'web-summary';

export interface SummarizeRequest {
    url: string;
    chain_type?: string;
    model?: string;
}

export interface Document {
  id: string | null;
  metadata: {
    description: string;
    language: string;
    source: string;
    title: string;
  };
  page_content: string;
  type: string;
}

export interface SummarizeResponse {
  success: boolean;
  // load_summarize_chain data type
  summary: {
    input_documents: Document[];
    output_text: string;
  };
  metadata: {
    url: string;
    model: string;
    chain_type: string;
  };
}

export interface SmolAgentRequest {
    task: string
}

export interface SmolAgentResponse {
    success: boolean;
    result: string
}