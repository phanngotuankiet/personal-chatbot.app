import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Statistics from './components/statistics'

import './index.css'

import ChatPage from './components/chat/ChatPage'
import MultiFunctionChatPage from './components/multifunction-chat/ChatPage';

// App component với routing
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ChatPage />} />
        <Route path="/multifunction-chat" element={<MultiFunctionChatPage />} />
        <Route path="/statistics" element={<Statistics />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;