import { useState } from "react";
import MultiFunctionChatHistory from "./components/ChatHistory";
import MultiFunctionChatInput from "./components/ChatInput";
import Header from "../header";
import { ChatMode, Message } from "../../types/chat";

const MultiFunctionChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentResponse, setCurrentResponse] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [mode, setMode] = useState<ChatMode>('general');

  const handleSendMessage = async (content: string) => {
    // Tạo message của user với mode
    const userMessage: Message = {
      content,
      role: "user",
    };

    setMessages(prev => [...prev, userMessage]);
    setIsGenerating(true);
    setCurrentResponse("");

    try {
      const response = await fetch("http://localhost:11434/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "codellama",
          messages: [
            { role: "system", content: messages },
            ...messages,
            userMessage
          ],
          stream: true,
          options: {
            top_p: 0.9,
          }
        }),
      });

      if (!response.body) {
        throw new Error("Response body is null");
      }

      const reader = response.body.getReader();
      let tempCurrentResponse = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = new TextDecoder().decode(value);
        const chunks = chunk.split("\n");

        for (const chunk of chunks) {
          if (chunk.trim() === "") continue;

          const eachChunk = JSON.parse(chunk);
          tempCurrentResponse += eachChunk.message.content;
          setCurrentResponse(tempCurrentResponse);

          if (eachChunk.done) {
            setIsGenerating(false);
            setMessages(prev => [
              ...prev,
              {
                content: tempCurrentResponse,
                role: "assistant",
                // mode: selectedMode
              },
            ]);
          }
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setIsGenerating(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <Header />
      
      {/* Mode Indicator */}
      <div className="bg-purple-100 px-4 py-2 text-center text-purple-700">
        Current Mode: {mode.charAt(0).toUpperCase() + mode.slice(1)}
      </div>

      <main className="flex-1 overflow-auto">
        <MultiFunctionChatHistory
          messages={messages}
          currentResponse={currentResponse}
          isGenerating={isGenerating}
        />
      </main>

      <MultiFunctionChatInput 
        onSendMessage={handleSendMessage}
        currentMode={mode}
        onModeChange={setMode}
      />
    </div>
  );
};

export default MultiFunctionChatPage; 