import { useState } from "react";
import { Message } from "../../types/chat";

import ChatHistory from "./components/ChatHistory";
import ChatInput from "./components/ChatInput";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    
    return (
      <header className="bg-secondary text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Chatbot cá nhân</h1>
        <button 
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90"
          onClick={() => navigate('/statistics')}
        >
          Xem thống kê
        </button>
      </header>
    );
  };

const ChatPage = () => {
    const [messages, setMessages] = useState<Message[]>([]);
  
    const handleSendMessage = (content: string) => {
      // Thêm message của user trước
      const userMessage: Message = {
        id: Date.now().toString(),
        content: content,
        role: 'user',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, userMessage]);
  
      // Gọi API Ollama
      fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          model: 'codellama', 
          prompt: content,
          stream: false // Thêm option này để nhận full response
        })
      })
      .then(response => response.json())
      .then(data => {
        // Log để debug
        console.log('Ollama response:', data);
        
        // Thêm message của bot
        const botMessage: Message = {
          id: Date.now().toString(),
          content: data.response, // Ollama trả về response trong field này
          role: 'assistant',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
      })
      .catch(error => {
        console.error('Error:', error);
        // Thêm message lỗi nếu cần
      });
    };
  
    return (
      <div className="h-screen flex flex-col">
        <Header />
        <main className="flex-1 overflow-auto">
          <ChatHistory messages={messages} />
        </main>
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    );
  };

export default ChatPage;