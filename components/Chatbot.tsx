import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { ChatMessage, LoadingState } from '../types';
import { sendMessageToGemini } from '../services/geminiService';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: '¡Hola! Soy Faci, tu asistente virtual. ¿En qué puedo ayudarte hoy sobre nuestros servicios de sistemas y automatización?' }
  ]);
  const [inputText, setInputText] = useState('');
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage = inputText;
    setInputText('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setLoadingState(LoadingState.LOADING);

    const responseText = await sendMessageToGemini(userMessage);

    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setLoadingState(LoadingState.SUCCESS);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Chat Window */}
      {isOpen && (
        <div className="bg-gray-900 rounded-2xl shadow-2xl border border-gray-700 w-80 sm:w-96 h-[500px] flex flex-col mb-4 transition-all animate-fade-in-up overflow-hidden">
          {/* Header */}
          <div className="bg-brand-600 p-4 flex justify-between items-center">
            <div className="flex items-center text-white">
              <div className="bg-white/10 p-1.5 rounded-full mr-3 backdrop-blur-sm">
                 <Bot className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm">Asistente Facilito</h3>
                <span className="text-xs text-brand-100 flex items-center">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5"></span>
                  En línea (IA)
                </span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/70 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-full"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-950/50 space-y-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-brand-600 text-white rounded-br-none' 
                      : 'bg-gray-800 text-gray-200 border border-gray-700 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            
            {loadingState === LoadingState.LOADING && (
              <div className="flex justify-start">
                <div className="bg-gray-800 border border-gray-700 rounded-2xl rounded-bl-none px-4 py-4 shadow-sm">
                  <div className="flex space-x-1.5">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSendMessage} className="p-3 bg-gray-900 border-t border-gray-800">
            <div className="flex items-center bg-gray-800 rounded-full px-4 py-2 border border-gray-700 focus-within:ring-2 focus-within:ring-brand-500/50 focus-within:border-brand-500 transition-all">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Escribe tu consulta..."
                className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-white placeholder-gray-500 outline-none"
                disabled={loadingState === LoadingState.LOADING}
              />
              <button 
                type="submit"
                disabled={!inputText.trim() || loadingState === LoadingState.LOADING}
                className="ml-2 text-brand-500 hover:text-brand-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
            <p className="text-[10px] text-gray-600 text-center mt-2">
              Facilito.ar AI
            </p>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${
          isOpen ? 'bg-gray-700 hover:bg-gray-600' : 'bg-brand-600 hover:bg-brand-500'
        } text-white p-4 rounded-full shadow-lg shadow-brand-900/40 transition-all transform hover:scale-105 flex items-center justify-center`}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </div>
  );
};

export default Chatbot;