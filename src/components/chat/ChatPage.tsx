import { useEffect, useState } from "react";
import { Message } from "../../types/chat";
import ChatHistory from "./components/ChatHistory";
import ChatInput from "./components/ChatInput";
import Header from "../header";

// Định nghĩa type cho response
type LLMResponse = {
  model: string;
  created_at: string;
  message: {
    content: string;
    role: string;
  };
  done: boolean;
  done_reason: string;
};

const ChatPage = () => {
  // tin nhắn lưu thành mảng để gửi cho /api/chat
  const [messages, setMessages] = useState<Message[]>([]);

  // response hiện tại
  const [currentResponse, setCurrentResponse] = useState<string>("");

  // khi done = true thì setIsGenerating = false, khi nhận response thì true
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSendMessage = async (content: string) => {
    // Tạo message của user
    const userMessage: Message = {
      content: content,
      role: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsGenerating(true); // khi nhận response thì true
    setCurrentResponse(""); // Reset current response

    try {
      const response = await fetch("http://localhost:11434/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "codellama",
          messages: [...messages, userMessage], // lấy tin nhắn hiện tại nhét vào đoạn tin nhắn cũ
          stream: true, // Tao muốn từng từ được gửi đến UI
        }),
      });

      const reader = await response.body?.getReader();


      let tempCurrentResponse = "";
      while (true) {
        const { value, done } = await reader?.read();

        if (done) break;
        const chunk = new TextDecoder().decode(value);

        // có những json cách nhau bằng \n
        // nên cần tách ra
        const chunks = chunk.split("\n");

        for (const chunk of chunks) {
          if (chunk.trim() === "") continue;

          const eachChunk = JSON.parse(chunk);

          // lưu tạm value của currentResponse tại biến này
          tempCurrentResponse += eachChunk.message.content;

          setCurrentResponse(tempCurrentResponse);

          console.log("chunk line by line received", eachChunk.message.content);

          console.log("doneee", eachChunk.done);

          setCurrentResponse((prev) => prev + eachChunk.message.content);

          if (eachChunk.done) {
            setIsGenerating(false);

            setMessages((prev) => [
              ...prev,
              {
                content: tempCurrentResponse,
                role: "assistant",
              },
            ]);
          }
        }
      }
    } catch (error) {
      console.error("Error details:", error);
      setIsGenerating(false);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <main className="flex-1 overflow-auto">
        <ChatHistory
          messages={messages}
          currentResponse={currentResponse}
          isGenerating={isGenerating}
        />
      </main>

      {/* nơi nhập tin nhắn */}
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatPage;
