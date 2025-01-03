import { Message } from '../../../types/chat'
import { useEffect, useState } from 'react'

interface MultiFunctionChatMessageProps {
  message: Message;
}

const MultiFunctionChatMessage = ({ message }: MultiFunctionChatMessageProps) => {
  const isUser = message.role === 'user';
  const [formattedContent, setFormattedContent] = useState<string[]>([])

  useEffect(() => {
    const parts = message.content.split('```')
    setFormattedContent(parts)
  }, [message.content])

  return (
    <div 
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 
                  animate-fade-in`}
    >
      {/* Avatar */}
      <div className={`w-8 h-8 rounded-full flex items-center justify-center
                      ${isUser ? 'order-last ml-2' : 'order-first mr-2'}
                      ${isUser ? 'bg-purple-600' : 'bg-gray-600'}`}>
        <span className="text-white text-sm">
          {isUser ? 'U' : 'AI'}
        </span>
      </div>

      {/* Message Content */}
      <div className={`max-w-[70%] rounded-lg p-4 ${
        isUser 
          ? 'bg-purple-600 text-white' 
          : 'bg-gray-100 text-gray-800 border-2 border-purple-100'
      }`}>
        <div className="flex flex-col">
          {formattedContent.map((part, index) => {
            const isCodeBlock = index % 2 === 1;
            
            if (isCodeBlock) {
              const [language, ...codeLines] = part.split('\n');
              const code = codeLines.join('\n');
              
              return (
                <pre key={index} 
                     className="bg-gray-800 text-purple-200 p-3 rounded-md my-2 
                               overflow-x-auto">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-purple-400">
                      {language || 'code'}
                    </span>
                    <button 
                      onClick={() => navigator.clipboard.writeText(code)}
                      className="text-xs text-purple-400 hover:text-white
                               transition-colors"
                    >
                      Copy
                    </button>
                  </div>
                  <code>{code}</code>
                </pre>
              );
            } else {
              return (
                <div key={index} className="break-words whitespace-pre-wrap">
                  {part}
                </div>
              );
            }
          })}
          
          <div className={`text-xs mt-1 ${
            isUser ? 'text-purple-200' : 'text-gray-500'
          }`}>
            {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiFunctionChatMessage; 