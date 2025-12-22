
import React, { useState, useRef } from 'react';
import { Camera, Upload, Scan, Sparkles, ChevronLeft, Footprints, CheckCircle2, AlertCircle } from 'lucide-react';
import { BRANDS } from '../data';
import { UserReference } from '../types';
import { GoogleGenAI, Type } from "@google/genai";
import { Language } from '../App';

interface UploadScreenProps {
  onComplete: (data: UserReference) => void;
  onBack: () => void;
  onHome: () => void;
  language: Language;
  t: any;
}

const UploadScreen: React.FC<UploadScreenProps> = ({ onComplete, onBack, onHome, language, t }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [scannedData, setScannedData] = useState<UserReference | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processImageWithGemini = async (file: File, imageUrl: string) => {
    setIsAnalyzing(true);
    setError(null);

    try {
      const base64Data = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result as string;
          const base64 = result.split(',')[1];
          resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

      const schema = {
        type: Type.OBJECT,
        properties: {
          brand: { type: Type.STRING, description: "Brand name." },
          model: { type: Type.STRING, description: "Model name." },
          cm: { type: Type.NUMBER, description: "CM size." },
          eu: { type: Type.STRING, description: "EU size." }
        },
        required: ["brand", "cm"],
      };

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: {
          parts: [
            { inlineData: { mimeType: file.type, data: base64Data } },
            { text: `Analyze the shoe label. Extract Brand, Model, CM (or JP/JPN size), and EU size. Return JSON in ${language === 'tr' ? 'Turkish' : 'English'}.` }
          ]
        },
        config: {
          responseMimeType: "application/json",
          responseSchema: schema,
        }
      });

      const resultText = response.text;
      if (!resultText) throw new Error("No data");
      
      const parsedResult = JSON.parse(resultText);

      let matchedBrandId = 'nike';
      const detectedBrandLower = parsedResult.brand?.toLowerCase() || '';
      const foundBrand = BRANDS.find(b => 
        detectedBrandLower.includes(b.id) || 
        detectedBrandLower.includes(b.name.toLowerCase())
      );
      
      if (foundBrand) matchedBrandId = foundBrand.id;

      setScannedData({
        brand: matchedBrandId,
        detectedModel: parsedResult.model || (language === 'tr' ? 'Standart Model' : 'Standard Model'),
        cm: parsedResult.cm || 0,
        eu: parsedResult.eu || '',
        image: imageUrl
      });

    } catch (err) {
      console.error("OCR Error:", err);
      setError(language === 'tr' ? "Etiket otomatik okunamadı." : "Label couldn't be read automatically.");
      setScannedData({
        brand: 'nike',
        cm: 0,
        eu: '',
        image: imageUrl,
        detectedModel: language === 'tr' ? 'Manuel Giriş' : 'Manual Entry'
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      processImageWithGemini(file, url);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (scannedData) {
      onComplete(scannedData);
    }
  };

  return (
    <div className="flex flex-col h-full min-h-screen bg-[#f8fafc]">
      <header className="relative flex justify-center items-center px-6 py-6 bg-white border-b border-slate-100 sticky top-0 z-40">
        <button onClick={onBack} className="absolute left-6 text-slate-400 hover:text-blue-700 transition-all">
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={onHome}
          className="flex flex-col items-center gap-0.5 cursor-pointer hover:opacity-70 transition-opacity"
        >
          <div className="bg-blue-700 text-white p-1 rounded-lg">
            <Footprints size={14} className="fill-current" />
          </div>
          <span className="font-black text-sm tracking-tighter brand-font">FindYourSize</span>
        </button>
      </header>

      <div className="flex-1 p-4 md:p-6 max-w-xl mx-auto w-full flex flex-col pt-6 md:pt-10 overflow-x-hidden">
        {!scannedData && !isAnalyzing && (
          <div className="animate-in fade-in duration-700 flex flex-col flex-1">
            <div className="bg-white rounded-[3.5rem] p-8 md:p-10 shadow-2xl shadow-blue-900/5 border border-white mb-8 text-center relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-blue-700"></div>
              <div className="mb-8 inline-flex items-center justify-center w-24 h-24 bg-blue-50 rounded-[2.5rem] text-blue-700">
                <Scan size={44} strokeWidth={1} />
              </div>
              <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tighter leading-tight brand-font uppercase">
                {t.uploadTitle}
              </h2>
              <p className="text-slate-500 font-medium mb-10 leading-relaxed text-sm px-4">
                {t.uploadDesc}
              </p>
              <div className="flex flex-col gap-3 mb-10">
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full bg-blue-700 hover:bg-blue-800 text-white font-black py-5 rounded-[2rem] shadow-xl shadow-blue-700/20 transition-all flex items-center justify-center gap-3 active:scale-[0.98] brand-font uppercase text-sm tracking-widest"
                >
                  <Camera size={20} />
                  {t.scanBtn}
                </button>
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full bg-slate-50 hover:bg-slate-100 text-slate-500 font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-3 text-xs uppercase tracking-widest"
                >
                  <Upload size={18} />
                  {t.galleryBtn}
                </button>
              </div>
              <div className="bg-slate-950 rounded-[2rem] p-5 text-white flex items-center gap-4 shadow-xl border border-white/5 mx-auto w-full">
                <div className="bg-blue-700/20 p-2.5 rounded-xl border border-blue-500/20 shrink-0">
                  <Sparkles className="text-blue-500" size={20} />
                </div>
                <div className="text-left overflow-hidden">
                  <p className="text-[9px] font-black uppercase tracking-[0.4em] text-blue-500 mb-0.5">{t.proEngine}</p>
                  <p className="text-[10px] font-semibold leading-relaxed opacity-80 truncate">{t.proEngineDesc}</p>
                </div>
              </div>
              <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileUpload} />
            </div>
          </div>
        )}

        {isAnalyzing && (
          <div className="flex-1 flex flex-col items-center justify-center text-center animate-in fade-in duration-500">
            <div className="relative mb-12">
               <div className="w-32 h-32 border-[3px] border-slate-100 rounded-full flex items-center justify-center">
                 <div className="w-24 h-24 border-[3px] border-blue-700 border-t-transparent rounded-full animate-spin"></div>
               </div>
               <div className="absolute inset-0 flex items-center justify-center">
                  <Scan size={32} className="text-blue-700 animate-pulse" />
               </div>
            </div>
            <h3 className="text-3xl font-black text-slate-900 mb-3 tracking-tighter uppercase brand-font">{t.analyzing}</h3>
            <p className="text-slate-400 font-black tracking-[0.4em] text-[10px] uppercase">{t.processing}</p>
          </div>
        )}

        {scannedData && !isAnalyzing && (
          <form onSubmit={handleSubmit} className="flex-1 flex flex-col animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div className="bg-white rounded-[3rem] p-6 md:p-10 shadow-2xl shadow-blue-900/5 border border-slate-100 mb-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-blue-700 opacity-20"></div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <h3 className="text-xl font-black text-slate-900 tracking-tight brand-font uppercase">{t.confirmTitle}</h3>
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border shrink-0 ${error ? 'bg-amber-50 text-amber-700 border-amber-100' : 'bg-green-50 text-green-700 border-green-100'}`}>
                  {error ? <AlertCircle size={12} /> : <CheckCircle2 size={12} />}
                  {error ? t.correctionNeeded : t.successAnalysis}
                </div>
              </div>
              <div className="space-y-6">
                <div className="h-40 md:h-48 w-full bg-slate-50 rounded-[2.5rem] overflow-hidden border border-slate-100 relative group flex items-center justify-center">
                  <img src={scannedData.image} alt="Label" className="max-w-full max-h-full object-contain p-4" />
                  <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center backdrop-blur-sm">
                    <button type="button" onClick={() => { setScannedData(null); setError(null); }} className="bg-white text-slate-900 px-6 py-3 rounded-2xl font-black text-[9px] tracking-widest uppercase shadow-2xl transition-all">
                      {t.reupload}
                    </button>
                  </div>
                </div>
                <div className="space-y-5">
                   <div className="space-y-2">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">{t.brand}</label>
                      <div className="relative">
                        <select 
                          value={scannedData.brand}
                          onChange={(e) => setScannedData({...scannedData, brand: e.target.value})}
                          className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-900 focus:ring-4 focus:ring-blue-50 focus:border-blue-700/30 outline-none transition-all brand-font appearance-none text-xs"
                        >
                          {BRANDS.map(b => (
                            <option key={b.id} value={b.id}>{b.name.toUpperCase()}</option>
                          ))}
                        </select>
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-20">
                          <ChevronLeft className="rotate-[270deg]" size={14} />
                        </div>
                      </div>
                   </div>
                   <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      <div className="space-y-2 overflow-hidden">
                        <label className="block text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 ml-2 truncate">{t.cmValue}</label>
                        <div className="bg-blue-700 rounded-3xl p-1 shadow-lg shadow-blue-700/10 overflow-hidden">
                          <input 
                            type="number" 
                            step="0.1" 
                            value={scannedData.cm} 
                            onChange={(e) => setScannedData({...scannedData, cm: parseFloat(e.target.value)})} 
                            className="w-full bg-transparent font-black text-2xl md:text-3xl text-center py-5 text-white focus:outline-none brand-font border-none" 
                          />
                        </div>
                      </div>
                      <div className="space-y-2 overflow-hidden">
                        <label className="block text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 ml-2 truncate">{t.euSize}</label>
                        <div className="bg-slate-950 rounded-3xl p-1 shadow-lg shadow-slate-900/10 overflow-hidden">
                          <input 
                            type="text" 
                            value={scannedData.eu || ''} 
                            onChange={(e) => setScannedData({...scannedData, eu: e.target.value})} 
                            className="w-full bg-transparent font-black text-2xl md:text-3xl text-center py-5 text-white focus:outline-none brand-font border-none uppercase" 
                          />
                        </div>
                      </div>
                   </div>
                </div>
              </div>
            </div>
            <button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 text-white font-black py-5 rounded-[2rem] shadow-2xl shadow-blue-700/30 transition-all transform hover:scale-[1.01] active:scale-95 text-base brand-font uppercase tracking-tight mb-10">
              {t.nextStepBtn}
            </button>
          </form>
        )}
      </div>

      <footer className="bg-slate-950 py-10 px-6 border-t border-white/5 mt-auto">
        <div className="max-w-xl mx-auto flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 text-white opacity-60">
            <Footprints size={14} className="fill-current" />
            <span className="font-black text-xs tracking-tighter brand-font">FindYourSize</span>
          </div>
          <p className="text-[8px] font-black text-slate-600 tracking-[0.5em] uppercase">Engine V2.5.4 • Corporate Ecosystem</p>
        </div>
      </footer>
    </div>
  );
};

export default UploadScreen;
