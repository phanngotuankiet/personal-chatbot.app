import React from "react";
import { Message } from "../../../types/chat";
import MultiFunctionChatMessage from "./ChatMessage";

type MultiFunctionChatHistoryProps = {
  messages: Message[];
  currentResponse: string;
  isGenerating: boolean;
};

const MultiFunctionChatHistory = ({ messages, currentResponse, isGenerating }: MultiFunctionChatHistoryProps) => {
  return (
    <div className="p-4 bg-gradient-to-b from-purple-50 to-white">
      {/* Welcome Message */}
      {messages.length === 0 && (
        <div className="text-center text-gray-500 py-10">
          <h2 className="text-2xl font-bold text-purple-600 mb-2">
            MultiFunction Chat
          </h2>
          <p>Choose a mode and start chatting!</p>
        </div>
      )}

      {/* Messages */}
      <div className="space-y-6">
        {messages.map((message, index) => (
          <MultiFunctionChatMessage key={index} message={message} />
        ))}
        
        {/* Generating Message Indicator */}
        {isGenerating && (
          <div className="flex items-center space-x-2 text-purple-600">
            <div className="animate-bounce">●</div>
            <div className="animate-bounce delay-100">●</div>
            <div className="animate-bounce delay-200">●</div>
          </div>
        )}
        
        {/* Current Response */}
        {isGenerating && currentResponse && (
          <MultiFunctionChatMessage 
            message={{
              content: currentResponse,
              role: "assistant"
            }} 
          />
        )}
      </div>
    </div>
  );
};

export default MultiFunctionChatHistory; 