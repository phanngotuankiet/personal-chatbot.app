import { Message } from '../../../types/chat'
import { useEffect, useState } from 'react'

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.role === 'user';
  const [formattedContent, setFormattedContent] = useState<string[]>([])

  useEffect(() => {
    // Tách nội dung thành các phần: text thường và code blocks
    const parts = message.content.split('```')
    setFormattedContent(parts)
  }, [message.content])

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[70%] rounded-lg p-4 ${
        isUser 
          ? 'bg-blue-500 text-white ml-4' 
          : 'bg-gray-200 text-gray-800 mr-4'
      }`}>
        <div className="flex flex-col">
          {formattedContent.map((part, index) => {
            // Kiểm tra xem phần này có phải là code block không
            const isCodeBlock = index % 2 === 1;
            
            if (isCodeBlock) {
              // Xử lý code block
              const [language, ...codeLines] = part.split('\n');
              const code = codeLines.join('\n');
              
              return (
                <pre key={index} className="bg-gray-800 text-gray-100 p-3 rounded-md my-2 overflow-x-auto">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-gray-400">{language || 'code'}</span>
                    <button 
                      onClick={() => navigator.clipboard.writeText(code)}
                      className="text-xs text-gray-400 hover:text-white"
                    >
                      Copy
                    </button>
                  </div>
                  <code>{code}</code>
                </pre>
              );
            } else {
              // Xử lý text thường
              return (
                <div key={index} className="break-words whitespace-pre-wrap">
                  {part}
                </div>
              );
            }
          })}
          
          <div className={`text-xs mt-1 ${
            isUser ? 'text-blue-100' : 'text-gray-500'
          }`}>
            {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;