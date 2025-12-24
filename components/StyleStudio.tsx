
import React, { useState } from 'react';
import { X, Sparkles, Shirt, Layers, Watch, Lightbulb, Image as ImageIcon, Wand2, ArrowRight, Loader2 } from 'lucide-react';
import { GoogleGenAI, Type } from "@google/genai";
import { Language } from '../App';

interface StyleStudioProps {
  isOpen: boolean;
  onClose: () => void;
  brand: string;
  model: string;
  language: Language;
  t: any;
}

interface StyleResult {
  top: string;
  bottom: string;
  acc: string;
  tip: string;
}

const StyleStudio: React.FC<StyleStudioProps> = ({ isOpen, onClose, brand, model, language, t }) => {
  const [occasion, setOccasion] = useState('casual');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isVisualizing, setIsVisualizing] = useState(false);
  const [styleResult, setStyleResult] = useState<StyleResult | null>(null);
  const [lookImage, setLookImage] = useState<string | null>(null);

  if (!isOpen) return null;

  const occasions = [
    { id: 'casual', label: t.styleCasual, icon: Shirt },
    { id: 'sport', label: t.styleSport, icon: Wand2 },
    { id: 'office', label: t.styleOffice, icon: Layers },
    { id: 'night', label: t.styleNight, icon: Watch }
  ];

  const rawApiKey = import.meta.env.VITE_API_KEY || "";
  const API_KEY = rawApiKey.replace(/['"]/g, '').trim();
  if (!API_KEY) {
    throw new Error("API Key configuration error (Netlify).");
  }

  const handleGenerateStyle = async () => {
    setIsGenerating(true);
    setStyleResult(null);
    setLookImage(null);

    try {
      const ai = new GoogleGenAI({ apiKey: API_KEY });
      const schema = {
        type: Type.OBJECT,
        properties: {
          top: { type: Type.STRING },
          bottom: { type: Type.STRING },
          acc: { type: Type.STRING },
          tip: { type: Type.STRING }
        },
        required: ["top", "bottom", "acc", "tip"]
      };

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-image-preview',
        contents: `Create a specific outfit combination for ${brand} ${model} sneakers for a ${occasion} occasion. Give specific clothing items for Top, Bottom, and one Accessory. Also provide a short styling tip. Language: ${language === 'tr' ? 'Turkish' : 'English'}.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: schema
        }
      });

      const data = JSON.parse(response.text);
      setStyleResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleVisualize = async () => {
    if (!styleResult) return;
    setIsVisualizing(true);

    try {
      const ai = new GoogleGenAI({ apiKey: API_KEY });
      const prompt = `A professional editorial fashion photograph of a person wearing ${brand} ${model} sneakers, styled with a ${occasion} outfit including ${styleResult.top}, ${styleResult.bottom}, and ${styleResult.acc}. Soft studio lighting, minimalist background, highly detailed textures, 8k resolution fashion photography.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [{ text: prompt }] },
        config: {
          imageConfig: { aspectRatio: "3:4" }
        }
      });

      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          setLookImage(`data:image/png;base64,${part.inlineData.data}`);
          break;
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsVisualizing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-500" onClick={onClose}></div>
      
      <div className="relative bg-[#f8f9fa] w-full max-w-4xl max-h-[90vh] rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col border border-white/20">
        <div className="flex justify-between items-center p-8 border-b border-slate-200 sticky top-0 bg-[#f8f9fa] z-10">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-blue-700 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-700/20">
               <Sparkles size={24} />
             </div>
             <div>
               <h2 className="text-xl font-black text-slate-950 brand-font uppercase tracking-tight">{t.styleStudioTitle}</h2>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{brand} {model}</p>
             </div>
          </div>
          <button onClick={onClose} className="p-3 bg-white hover:bg-slate-100 rounded-full text-slate-400 transition-all">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8">
          {!styleResult && !isGenerating ? (
            <div className="flex flex-col items-center text-center py-10">
               <h3 className="text-sm font-black text-slate-500 uppercase tracking-[0.4em] mb-10">{t.styleOccasion}</h3>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-2xl mb-12">
                  {occasions.map((item) => (
                    <button 
                      key={item.id}
                      onClick={() => setOccasion(item.id)}
                      className={`p-6 rounded-[2rem] border transition-all flex flex-col items-center gap-4 ${occasion === item.id ? 'bg-blue-700 text-white border-blue-700 shadow-xl shadow-blue-700/20' : 'bg-white text-slate-400 border-slate-100 hover:border-blue-200 hover:bg-blue-50/30'}`}
                    >
                      <item.icon size={28} />
                      <span className="text-[10px] font-black uppercase tracking-widest leading-tight">{item.label}</span>
                    </button>
                  ))}
               </div>
               <button 
                onClick={handleGenerateStyle}
                className="bg-slate-950 text-white px-12 py-5 rounded-[2rem] font-black brand-font uppercase tracking-widest text-sm hover:scale-105 transition-all shadow-xl shadow-slate-950/20 flex items-center gap-3"
               >
                 {t.generateStyle}
                 <ArrowRight size={20} />
               </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
               {/* Styling Details */}
               <div className="space-y-8">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-1 h-1 bg-blue-700 rounded-full"></div>
                    <h3 className="text-[11px] font-black text-blue-700 uppercase tracking-[0.4em]">{t.styleResultTitle}</h3>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                     {[
                       { icon: Shirt, title: t.topWear, content: styleResult?.top },
                       { icon: Layers, title: t.bottomWear, content: styleResult?.bottom },
                       { icon: Watch, title: t.accessories, content: styleResult?.acc }
                     ].map((box, i) => (
                       <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 flex items-start gap-5 shadow-sm">
                          <div className="p-3 bg-slate-50 text-slate-400 rounded-xl"><box.icon size={20} /></div>
                          <div>
                            <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest block mb-1">{box.title}</span>
                            <p className="text-sm font-bold text-slate-900 leading-snug">{isGenerating ? '...' : box.content}</p>
                          </div>
                       </div>
                     ))}
                  </div>

                  <div className="bg-blue-50/50 p-8 rounded-[2.5rem] border border-blue-100 relative overflow-hidden">
                    <Lightbulb size={64} className="absolute -right-6 -bottom-6 text-blue-100/50" />
                    <div className="relative z-10">
                      <h4 className="text-[10px] font-black text-blue-700 uppercase tracking-widest mb-3">{t.styleTip}</h4>
                      <p className="text-sm font-bold text-slate-700 italic leading-relaxed">{styleResult?.tip}</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button onClick={() => setStyleResult(null)} className="flex-1 py-4 text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-slate-900 transition-colors">Yeniden Seç</button>
                    {!lookImage && !isVisualizing && styleResult && (
                      <button 
                        onClick={handleVisualize}
                        className="flex-1 bg-blue-700 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-blue-700/20 flex items-center justify-center gap-2"
                      >
                        <ImageIcon size={16} />
                        {t.generateImage}
                      </button>
                    )}
                  </div>
               </div>

               {/* Visualization Preview */}
               <div className="relative min-h-[400px]">
                  {isVisualizing ? (
                    <div className="absolute inset-0 bg-slate-200 animate-pulse rounded-[3rem] flex flex-col items-center justify-center text-center p-10 gap-6">
                      <Loader2 size={48} className="text-blue-700 animate-spin" />
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">{language === 'tr' ? 'STİLİNİZ GÖRSELLEŞTİRİLİYOR...' : 'VISUALIZING YOUR STYLE...'}</p>
                    </div>
                  ) : lookImage ? (
                    <div className="sticky top-0 animate-in zoom-in-95 duration-700">
                      <img src={lookImage} alt="Style look" className="w-full rounded-[3rem] shadow-2xl border-4 border-white" />
                      <div className="absolute top-6 left-6 bg-slate-950 text-white px-4 py-2 rounded-full text-[8px] font-black uppercase tracking-widest backdrop-blur-md bg-opacity-70">
                        AI GENERATED LOOK
                      </div>
                    </div>
                  ) : (
                    <div className="h-full bg-slate-100 rounded-[3rem] border-4 border-dashed border-slate-200 flex flex-col items-center justify-center text-center p-12 text-slate-300">
                      <ImageIcon size={64} strokeWidth={1} className="mb-6" />
                      <p className="text-xs font-bold leading-relaxed">{t.styleStudioDesc}</p>
                    </div>
                  )}
               </div>
            </div>
          )}
        </div>

        {isGenerating && (
          <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-50 flex flex-col items-center justify-center text-center p-12 animate-in fade-in">
             <div className="w-20 h-20 relative mb-8">
                <div className="absolute inset-0 border-4 border-blue-100 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-blue-700 border-t-transparent rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles size={24} className="text-blue-700 animate-pulse" />
                </div>
             </div>
             <h3 className="text-2xl font-black text-slate-950 brand-font uppercase tracking-tight mb-2">{t.stylingAI}</h3>
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">GEMINI ENGINE PROCESSING</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StyleStudio;
