
import React, { useState, useRef, useEffect } from 'react';
import { Message, Persona } from '../types';
import { partnerService } from '../services/geminiService';

interface ChatInterfaceProps {
  persona: Persona;
  onReset: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ persona }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial Greeting
    const greet = async () => {
      setIsLoading(true);
      try {
        const greeting = await partnerService.sendMessage(`Say hi to the user for the first time. You are ${persona.name}, their ${persona.relation}. Use your ${persona.vibe} personality.`);
        setMessages([{
          id: Date.now().toString(),
          role: 'model',
          text: greeting,
          timestamp: Date.now()
        }]);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    greet();
  }, [persona]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await partnerService.sendMessage(input);
      const modelMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: response,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, modelMessage]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    window.location.reload(); // Quick reset by reloading
  };

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-100">
      {/* Header */}
      <header className="glass-morphism px-6 py-4 flex items-center justify-between sticky top-0 z-10 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-pink-600 flex items-center justify-center text-white font-bold text-xl shadow-[0_0_15px_rgba(219,39,119,0.5)]">
            {persona.name[0]}
          </div>
          <div>
            <h2 className="font-bold text-white leading-tight">{persona.name}</h2>
            <p className="text-[10px] text-pink-400 font-medium flex items-center mt-0.5">
              <span className="w-1.5 h-1.5 bg-pink-500 rounded-full mr-1.5 animate-pulse shadow-[0_0_8px_rgba(236,72,153,0.8)]"></span>
              Loves you infinitely
            </p>
          </div>
        </div>
        <button 
          onClick={handleReset}
          className="text-[10px] uppercase tracking-widest font-bold text-slate-500 hover:text-pink-500 transition-colors"
        >
          Reset
        </button>
      </header>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-6 scroll-smooth bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900/50 via-slate-950 to-slate-950"
      >
        {messages.map((msg) => (
          <div 
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[85%] px-4 py-3 rounded-2xl shadow-xl transition-all ${
                msg.role === 'user' 
                ? 'bg-pink-700 text-white rounded-br-none shadow-pink-900/20' 
                : 'bg-slate-800/80 text-slate-100 rounded-bl-none border border-slate-700 shadow-black/40 backdrop-blur-sm'
              }`}
            >
              <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{msg.text}</p>
              <span className={`text-[9px] block mt-2 opacity-40 font-medium ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-800/50 px-4 py-3 rounded-2xl rounded-bl-none border border-slate-700 shadow-lg">
              <div className="flex space-x-1.5">
                <div className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-slate-900/80 backdrop-blur-xl border-t border-slate-800">
        <form onSubmit={handleSend} className="flex space-x-3 items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Whisper to ${persona.name}...`}
            className="flex-1 px-5 py-3.5 bg-slate-800/80 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-600/50 border border-slate-700 text-sm transition-all text-white font-medium placeholder:text-slate-500"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="w-12 h-12 rounded-2xl bg-pink-600 flex items-center justify-center text-white shadow-lg shadow-pink-900/40 disabled:opacity-30 disabled:grayscale transition-all hover:bg-pink-500 active:scale-90"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;