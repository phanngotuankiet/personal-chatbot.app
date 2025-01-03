export type Message = {
  role: "assistant" | "user" | "system";
  content: string;
};

export interface ChatHistory {
  messages: Message[];
}

// chat mode
export type ChatMode = 'general' | 'code' | 'math';


