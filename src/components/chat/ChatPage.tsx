import { useState } from "react";
import { Message } from "../../types/chat";
import ChatHistory from "./components/ChatHistory";
import ChatInput from "./components/ChatInput";
import Header from "../header";

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
          messages: [...messages, userMessage],
          stream: true,
          options: {        
            temperature: 0.5,
            top_p: 0.9,
            max_tokens: 10,
          }
        }),
      });

      if (!response.body) {
        throw new Error("Response body is null");
      }

      const reader = response.body.getReader();
      let tempCurrentResponse = "";

      while (true) {
        // value: Uint8Array (binary data, value là dữ liệu nguyên thuỷ), done: boolean
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = new TextDecoder().decode(value); // TextDecoder chuyển Uint8Array (binary data) thành string

        // có những json cách nhau bằng \n
        // nên cần tách ra
        const chunks = chunk.split("\n");

        for (const chunk of chunks) {
          if (chunk.trim() === "") continue;

          const eachChunk = JSON.parse(chunk); // cuối cùng chuyển string thành object
          tempCurrentResponse += eachChunk.message.content;
          setCurrentResponse(tempCurrentResponse);

          // console.log("chunk line by line received", eachChunk.message.content);

          // console.log("doneee", eachChunk.done);

          // setCurrentResponse((prev) => prev + eachChunk.message.content);

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
