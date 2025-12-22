
import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, User, Bot, Crown, ArrowRight, MessageSquare, ShieldCheck, Footprints } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { Language } from '../App';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface PremiumSupportProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  t: any;
}

const PremiumSupport: React.FC<PremiumSupportProps> = ({ isOpen, onClose, language, t }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (text: string = input) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: text };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: [...messages, userMessage].map(m => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }]
        })),
        config: {
          systemInstruction: `Sen FindYourSize Pro'nun özel "Premium Stil ve Ayak Sağlığı Danışmanı"sın. 
          Kullanıcıya ismiyle hitap etme (ismini bilmiyorsun), samimi ama profesyonel bir dil kullan. 
          Uzmanlık alanların: 
          1. Ayak yapısına (taraklı, düz taban vb.) göre model önerisi.
          2. Ayakkabı materyalleri (nubuk, deri, file) ve bunların esneme payları.
          3. Spor ayakkabı bakımı ve temizliği.
          4. Sneaker kültürü ve stil kombinleri.
          Yanıtlarını kısa, öz ve listeler halinde ver. Dil: ${language === 'tr' ? 'Türkçe' : 'English'}.`,
          temperature: 0.8,
        }
      });

      const aiText = response.text || (language === 'tr' ? "Üzgünüm, şu an bağlantı kuramıyorum." : "Sorry, I can't connect right now.");
      setMessages(prev => [...prev, { role: 'assistant', content: aiText }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'assistant', content: "Bir hata oluştu. Lütfen tekrar deneyin." }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-2xl animate-in fade-in duration-500" onClick={onClose}></div>
      
      <div className="relative bg-white w-full max-w-2xl h-[85vh] rounded-[3rem] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300 border border-slate-100">
        {/* Header */}
        <div className="bg-slate-950 p-6 md:p-8 text-white flex items-center justify-between border-b border-white/5">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-14 h-14 bg-blue-700 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-700/20">
                <Crown size={28} className="text-white fill-current" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-950"></div>
            </div>
            <div>
              <h2 className="text-lg font-black brand-font uppercase tracking-tight leading-none mb-1">Premium Support</h2>
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest">Live Expert AI</span>
                <span className="w-1 h-1 bg-white/20 rounded-full"></span>
                <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">24/7 Available</span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-white/10 rounded-full transition-colors">
            <X size={24} className="text-white/40" />
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-6">
              <div className="w-20 h-20 bg-blue-50 text-blue-700 rounded-full flex items-center justify-center animate-bounce">
                <MessageSquare size={32} />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 brand-font uppercase mb-2">Merhaba Pro Üye!</h3>
                <p className="text-sm text-slate-500 max-w-xs mx-auto leading-relaxed">
                  Size özel stil danışmanınız hazır. Ayak yapınız, favori modeliniz veya bakım ipuçları hakkında her şeyi sorabilirsiniz.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-2 w-full max-w-sm">
                {[
                  "Taraklı ayaklar için en rahat model hangisi?",
                  "Süet ayakkabı temizliği nasıl yapılır?",
                  "Air Force 1 kalıbı dar mı geniş mi?",
                  "Bu sezonun en trend 3 sneaker modeli?"
                ].map((q, idx) => (
                  <button 
                    key={idx}
                    onClick={() => handleSendMessage(q)}
                    className="text-[10px] font-black uppercase tracking-widest text-blue-700 bg-blue-50 hover:bg-blue-100 p-4 rounded-2xl transition-all text-left border border-blue-100"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m, idx) => (
            <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}>
              <div className={`max-w-[85%] p-5 rounded-[2rem] flex gap-4 ${m.role === 'user' ? 'bg-blue-700 text-white rounded-tr-none' : 'bg-white shadow-xl shadow-slate-900/5 text-slate-800 rounded-tl-none border border-slate-100'}`}>
                {m.role === 'assistant' && <div className="shrink-0 w-8 h-8 bg-slate-950 rounded-xl flex items-center justify-center text-blue-500 mt-1"><Sparkles size={14} /></div>}
                <div className="text-sm leading-relaxed whitespace-pre-wrap font-medium">
                  {m.content}
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start animate-in fade-in">
              <div className="bg-white p-5 rounded-[2rem] rounded-tl-none border border-slate-100 flex gap-2 items-center">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce"></div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-6 bg-white border-t border-slate-100">
          <div className="relative flex items-center">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Mesajınızı buraya yazın..."
              className="w-full pl-6 pr-16 py-5 bg-slate-50 rounded-[2rem] text-sm font-bold focus:ring-4 focus:ring-blue-50 focus:outline-none transition-all placeholder:text-slate-300"
            />
            <button 
              onClick={() => handleSendMessage()}
              disabled={isLoading || !input.trim()}
              className="absolute right-3 p-3 bg-blue-700 text-white rounded-2xl shadow-lg shadow-blue-700/20 active:scale-95 transition-all disabled:opacity-30 disabled:grayscale"
            >
              <Send size={20} />
            </button>
          </div>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="flex items-center gap-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest">
              <ShieldCheck size={12} className="text-blue-500" /> Secure Encryption
            </div>
            <div className="w-1 h-1 bg-slate-200 rounded-full"></div>
            <div className="flex items-center gap-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest">
              <Footprints size={12} className="text-blue-500" /> Personal Assistant
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumSupport;
