import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

interface CareAssistantProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const CareAssistant: React.FC<CareAssistantProps> = ({ isOpen, setIsOpen }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: "Hello! I'm your Linen Care Assistant. Ask me anything about maintaining your linen pieces." }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInput("");
    setIsLoading(true);

    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) throw new Error("GEMINI_API_KEY is missing");
      
      const ai = new GoogleGenAI({ apiKey });
      const model = "gemini-3-flash-preview";
      const systemInstruction = `
        You are the "Linen Junction Care Assistant". You are an expert in high-quality linen fabrics.
        Provide concise, practical advice on washing, drying, ironing, and storing linen garments.
        Emphasize sustainability and fabric longevity.
        If the user asks something unrelated to linen or fabric care, politely redirect them.
      `;

      const response = await ai.models.generateContent({
        model,
        contents: userMessage,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      const assistantText = response.text || "I'm sorry, I couldn't process that request.";
      setMessages(prev => [...prev, { role: 'assistant', text: assistantText }]);
    } catch (error) {
      console.error("Gemini API Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', text: "I am having trouble connecting to my knowledge base. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[9999]">
      {isOpen ? (
        <div className="bg-white w-[calc(100vw-2rem)] sm:w-80 h-[500px] max-h-[80vh] shadow-2xl rounded-2xl flex flex-col border border-brand-silver/30 overflow-hidden animate-fadeIn">
          <div className="bg-brand-earth p-4 text-brand-white flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-brand-mint rounded-full animate-pulse"></div>
              <span className="font-serif font-bold text-brand-gold text-sm tracking-widest">CARE ASSISTANT</span>
            </div>
            <button onClick={() => setIsOpen(false)}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scroll bg-brand-silver/5">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-brand-earth text-brand-white rounded-tr-none' 
                    : 'bg-white text-brand-earth border border-brand-silver/20 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-2xl border border-brand-silver/20 rounded-tl-none space-x-1 flex">
                  <div className="w-1 h-1 bg-brand-gold rounded-full animate-bounce"></div>
                  <div className="w-1 h-1 bg-brand-gold rounded-full animate-bounce [animation-delay:-.3s]"></div>
                  <div className="w-1 h-1 bg-brand-gold rounded-full animate-bounce [animation-delay:-.5s]"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 bg-white border-t border-brand-silver/20 flex space-x-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="How to wash linen?"
              className="flex-1 text-xs border border-brand-silver rounded-full px-4 py-2 focus:outline-none focus:border-brand-gold transition"
            />
            <button 
              onClick={handleSend}
              className="bg-brand-earth text-brand-gold w-8 h-8 rounded-full flex items-center justify-center hover:scale-105 transition"
            >
              <i className="fa-solid fa-paper-plane text-xs"></i>
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-brand-earth text-brand-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform border-2 border-brand-white/20"
        >
          <i className="fa-solid fa-sparkles text-2xl text-brand-gold"></i>
        </button>
      )}
    </div>
  );
};

export default CareAssistant;
