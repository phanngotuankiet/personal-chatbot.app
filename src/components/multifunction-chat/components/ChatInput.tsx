import React, { useState } from 'react';
import { ChatMode } from '../../../types/chat';

interface MultiFunctionChatInputProps {
  onSendMessage: (message: string) => void;
  currentMode: ChatMode;
  onModeChange: (mode: ChatMode) => void;
}

const MultiFunctionChatInput: React.FC<MultiFunctionChatInputProps> = ({ onSendMessage, currentMode, onModeChange }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (input.trim()) {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t bg-slate-50">
      <div className="flex flex-col space-y-3">
        {/* Mode Selector */}
        <div className="flex space-x-2 justify-center">
          <button
            type="button"
            onClick={() => onModeChange('general')}
            className={`px-3 py-1 rounded ${
              currentMode === 'general' 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-200'
            }`}
          >
            General
          </button>
          <button
            type="button"
            onClick={() => onModeChange('smolagents')}
            className={`px-3 py-1 rounded ${
              currentMode === 'smolagents' 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-200'
            }`}
          >
            Smolagents
          </button>
          <button
            type="button"
            onClick={() => onModeChange('web-summary')}
            className={`px-3 py-1 rounded ${
              currentMode === 'web-summary' 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-200'
            }`}
          >
            Web Summary
          </button>
        </div>

        {/* Input Area */}
        <div className="flex space-x-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-3 border-2 border-purple-200 rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder={
              currentMode === 'smolagents' 
                ? "Ask about smolagents task..." 
                : currentMode === 'web-summary' 
                ? "Ask about web summary..."
                : "Ask anything..."
            }
          />
          <button
            type="submit"
            className="px-6 py-2 bg-purple-600 text-white rounded-lg 
                     hover:bg-purple-700 transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </form>
  );
};

export default MultiFunctionChatInput; 