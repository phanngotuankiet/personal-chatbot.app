import React from "react";
import { Message } from "../../../types/chat";
import ChatMessage from "./ChatMessage";

type ChatHistoryProps = {
  messages: Message[];
  currentResponse: string;
  isGenerating: boolean;
};

const ChatHistory = ({ messages, currentResponse, isGenerating }: ChatHistoryProps) => {
  return (
    <div className="p-4">
      {messages.map((message, index) => (
        <ChatMessage key={index} message={message} />
      ))}
      
      {/* khi không generate tin nhắn nữa thì nó sẽ ẩn, để lại messages */}
      {isGenerating && (
        <ChatMessage 
          message={{
            content: currentResponse,
            role: "assistant"
          }} 
        />
      )}
    </div>
  );
};

export default ChatHistory;
