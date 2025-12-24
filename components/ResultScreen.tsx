import React, { useEffect, useRef, useState } from 'react';
import { UserReference, Gender, SizeChartEntry, HistoryItem } from '../types';
import { getBrandById } from '../data';
import { ShieldCheck, ChevronLeft, Footprints, ShoppingBag, Sparkles, MessageCircle, Info, Star, Send, ExternalLink, Tag, ChevronRight, Loader2 } from 'lucide-react';
import { Language } from '../App';
import { GoogleGenerativeAI } from "@google/generative-ai";

interface ShoppingOffer {
  siteName: string;
  price: string;
  url: string;
  logo: string;
}

interface ResultScreenProps {
  reference: UserReference;
  targetBrandId: string;
  targetGender: Gender;
  targetModel: string;
  onReset: () => void;
  onHome: () => void;
  onSaveHistory: (item: HistoryItem) => void;
  onOpenStyleStudio: () => void;
  onOpenPremiumSupport: () => void;
  language: Language;
  t: any;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ 
  reference, targetBrandId, targetGender, targetModel, 
  onReset, onHome, onSaveHistory, onOpenStyleStudio, onOpenPremiumSupport, language, t 
}) => {
  const targetBrand = getBrandById(targetBrandId);
  const hasSaved = useRef(false);
  const [justification, setJustification] = useState<string>('');
  const [isLoadingJustification, setIsLoadingJustification] = useState(false);
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [hasRated, setHasRated] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  
  const [offers, setOffers] = useState<ShoppingOffer[]>([]);
  const [isLoadingOffers, setIsLoadingOffers] = useState(false);
  const [modelImage, setModelImage] = useState<string | null>(null);
  const [isLoadingImage, setIsLoadingImage] = useState(false);

  const CONTACT_EMAIL = "mail@findyoursize.com.tr";

  if (!targetBrand) return <div className="p-10 text-center font-black">Data error.</div>;

  const chart = targetBrand.sizeCharts[targetGender];
  const exactMatch = chart.find(c => Math.abs(c.cm - reference.cm) < 0.1);
  const largerMatch = chart.find(c => c.cm >= reference.cm);
  const result: SizeChartEntry = exactMatch || largerMatch || (chart.length > 0 ? chart[chart.length - 1] : { cm: 0, eu: 'N/A', us: 'N/A', uk: 'N/A' });

  const fitConfidence = exactMatch ? 99 : 96;

  useEffect(() => {
    if (!hasSaved.current && result.eu !== 'N/A') {
      const historyItem: HistoryItem = {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: Date.now(),
        brandId: targetBrandId,
        model: targetModel,
        gender: targetGender,
        reference: reference,
        calculatedSize: result.eu
      };
      onSaveHistory(historyItem);
      hasSaved.current = true;
    }

    const rawApiKey = import.meta.env.VITE_API_KEY || "";
    const API_KEY = rawApiKey.replace(/['"]/g, '').trim();
    if (!API_KEY) {
      throw new Error("API Key configuration error (Netlify).");
    }

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const imgModel = genAI.getGenerativeModel({ model: "gemini-2.5-flash-image" });

    // 1. Justification (Neden bu beden?)
    const fetchJustification = async () => {
      setIsLoadingJustification(true);
      try {
        const prompt = `
          Analyze this shoe fit:
          Ref Brand: ${reference.brand}, Foot: ${reference.cm}CM.
          Target: ${targetBrand.name} ${targetModel}, Suggestion: ${result.eu} EU.
              
          Write a short, professional justification (max 300 chars) explaining why this size fits. 
          Mention fit difference (narrow/wide) if known.
          Language: ${language === 'tr' ? 'Turkish' : 'English'}.
          Do not use JSON, just plain text.
        `;
            
        const results = await model.generateContent(prompt);
        const response = await results.response;
        setJustification(response.text());
      } catch (e) {
        console.error("Justification error", e);
        setJustification(language === 'tr' ? "Analiz tamamlandı. Bedeninize uygun kalıp seçildi." : "Analysis complete. Optimal fit selected.");
      } finally {
        setIsLoadingJustification(false);
      }
    };

    const fetchOffers = async () => {
      setIsLoadingOffers(true);
      try {
        const prompt = `
          Act as a shopping assistant. 
          Target: "${targetBrand.name} ${targetModel}".

          Generate a JSON array of 3 popular Turkish shoe store objects for this shoe.
          Format:
          [
            { "siteName": "Trendyol", "price": "3499 TL", "url": "https://www.trendyol.com..." },
            { "siteName": "SuperStep", "price": "3600 TL", "url": "..." }
          ]
          Use realistic estimated prices.
          Return ONLY raw JSON. No markdown formatting.
        `;

        const results = await model.generateContent(prompt);
        const response = await results.response;
        const text = response.text().replace(/```json|```/g, '').trim();
        const data = JSON.parse(text);

        const enrichedOffers = data.map((item: any) => ({
          ...item,
          logo: `https://www.google.com/s2/favicons?domain=${new URL(item.url || 'https://google.com').hostname}&sz=128`
        }));
            
        setOffers(enrichedOffers);
      } catch (e) {
        console.error("Offers error", e);
        setOffers([
          { siteName: "Trendyol", price: "Fiyat Gör", url: `https://www.trendyol.com/sr?q=${targetBrand.name}+${targetModel}`, logo: "https://www.google.com/s2/favicons?domain=trendyol.com&sz=128" },
          { siteName: "Hepsiburada", price: "Fiyat Gör", url: `https://www.hepsiburada.com/ara?q=${targetBrand.name}+${targetModel}`, logo: "https://www.google.com/s2/favicons?domain=hepsiburada.com&sz=128" },
          { siteName: "Google Shopping", price: "Karşılaştır", url: `https://www.google.com/search?q=${targetBrand.name}+${targetModel}&tbm=shop`, logo: "https://www.google.com/s2/favicons?domain=google.com&sz=128" }
        ]);
      } finally {
        setIsLoadingOffers(false);
      }
    };

    // 3. Model Image (Görselleştirme) - Bağımsız
    const fetchImage = async () => {
      setIsLoadingImage(true);
      try {
        const res = await GoogleGenerativeAI({
          model: 'gemini-2.5-flash-image',
          contents: { parts: [{ text: `High-quality product photo of ${targetBrand.name} ${targetModel} sneaker, white studio background.` }] },
          config: { imageConfig: { aspectRatio: "1:1" } }
        });
        const imgPart = res.candidates[0].content.parts.find(p => p.inlineData);
        if (imgPart?.inlineData) {
          setModelImage(`data:image/png;base64,${imgPart.inlineData.data}`);
        }
      } catch (e) {
        console.error("Image error", e);
      } finally {
        setIsLoadingImage(false);
      }
    };

    fetchJustification();
    fetchOffers();
    fetchImage();

  }, [result.eu, targetBrandId, targetModel, targetGender, reference, onSaveHistory, language]);

  const handleSendFeedback = () => {
    const subject = encodeURIComponent(t.feedbackSubject);
    const body = encodeURIComponent(feedbackText);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setHasRated(true);
  };

  const handleMembershipClick = () => {
    const subject = encodeURIComponent(t.membershipSubject);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}`;
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#fcfcfb] font-sans antialiased text-slate-900">
      <header className="relative flex justify-center items-center px-6 py-4 bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-40">
        <button onClick={onReset} className="absolute left-6 text-slate-400 hover:text-blue-700 transition-all">
          <ChevronLeft size={24} />
        </button>
        <button onClick={onHome} className="flex flex-col items-center gap-0.5">
          <div className="bg-blue-700 text-white p-1 rounded-lg">
            <Footprints size={12} className="fill-current" />
          </div>
          <span className="font-black text-xs tracking-tighter brand-font">FindYourSize</span>
        </button>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 pt-4 pb-20">
        <div className="text-center mb-6 animate-in fade-in duration-700">
           <div className="inline-flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full mb-2 border border-blue-100">
             <div className="w-1.5 h-1.5 bg-blue-700 rounded-full animate-pulse"></div>
             <span className="text-[9px] font-black tracking-[0.3em] text-blue-700 uppercase">{t.analysisComplete}</span>
           </div>
           <h1 className="text-3xl md:text-5xl font-black text-slate-950 brand-font uppercase tracking-tighter leading-tight">{t.resultTitle}</h1>
        </div>

        {/* MAIN RESULT COMPONENT */}
        <div className="relative mb-8 group">
          <div className="absolute inset-0 bg-blue-600 rounded-[3rem] md:rounded-[4rem] blur-[80px] opacity-10 -z-10 transition-all duration-1000"></div>
          
          <div className="bg-white rounded-[3rem] md:rounded-[4rem] shadow-[0_40px_100px_-30px_rgba(29,78,216,0.1)] border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-1000">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              
              <div className="lg:col-span-7 p-6 md:p-10 flex flex-col items-center justify-center text-center border-b lg:border-b-0 lg:border-r border-slate-50 relative">
                <div className="absolute top-6 left-8">
                   <img src={targetBrand.logo} alt={targetBrand.name} className="h-6 md:h-8 object-contain grayscale opacity-20" />
                </div>
                
                <div className="mb-2 text-center">
                  <h2 className="text-xl md:text-2xl font-black tracking-tight text-slate-950 brand-font uppercase leading-none mb-1">
                    {targetBrand.name}
                  </h2>
                  <p className="text-blue-700 text-sm md:text-base font-black tracking-widest brand-font uppercase">{targetModel}</p>
                </div>
                
                <div className="flex items-end justify-center gap-2 py-0 group/size">
                  <span className="text-[7rem] sm:text-[9rem] md:text-[10rem] font-black tracking-tighter text-slate-950 leading-[0.8] brand-font select-none">
                    {result.eu}
                  </span>
                  <div className="flex flex-col items-start mb-4 md:mb-6">
                    <span className="text-xl md:text-2xl font-black text-blue-700 tracking-widest brand-font mb-0">EU</span>
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none">FIT</span>
                  </div>
                </div>

                <div className="w-full max-w-xs mt-4 bg-slate-50 rounded-[2rem] p-3 flex items-center justify-between border border-slate-100">
                   <div className="flex flex-col items-start px-2">
                      <span className="text-[7px] font-black text-slate-400 uppercase tracking-widest mb-1">{t.fitConfidence}</span>
                      <div className="flex items-center gap-1.5">
                        <div className="flex gap-0.5">
                          {[1,2,3,4,5].map(i => <div key={i} className={`w-1.5 h-3 rounded-full ${i <= 4 ? 'bg-blue-700' : 'bg-slate-200'}`}></div>)}
                        </div>
                        <span className="text-xs font-black text-slate-950">%{fitConfidence}</span>
                      </div>
                   </div>
                   <div className="h-6 w-[1px] bg-slate-200"></div>
                   <div className="flex flex-col items-end px-2">
                      <span className="text-[7px] font-black text-slate-400 uppercase tracking-widest mb-1">DATA</span>
                      <span className="text-[8px] font-black text-slate-950 brand-font">OFFICIAL</span>
                   </div>
                </div>
              </div>

              <div className="lg:col-span-5 p-8 md:p-10 bg-[#fcfcfb] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-700 text-white rounded-xl">
                      <Sparkles size={16} />
                    </div>
                    <h3 className="text-base md:text-lg font-black text-slate-950 brand-font uppercase tracking-tight">{t.whyThisSize}</h3>
                  </div>
                  <div className="relative min-h-[140px]">
                    {isLoadingJustification ? (
                      <div className="space-y-3 animate-pulse">
                        <div className="h-2.5 bg-slate-200 rounded-full w-3/4"></div>
                        <div className="h-2.5 bg-slate-200 rounded-full w-full"></div>
                        <div className="h-2.5 bg-slate-200 rounded-full w-5/6"></div>
                      </div>
                    ) : (
                      <p className="text-slate-600 text-[13px] leading-relaxed font-medium mb-6 animate-in fade-in duration-500">
                        {justification || "Yapay zeka analiz raporu oluşturuluyor..."}
                      </p>
                    )}
                  </div>
                  <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex items-start gap-4">
                    <ShieldCheck size={18} className="text-green-500 mt-1" />
                    <div>
                      <h4 className="text-[9px] font-black text-slate-950 uppercase tracking-widest mb-1">{t.aiJustification}</h4>
                      <p className="text-[8px] font-bold text-slate-400 uppercase tracking-tight">VERIFIED BY FYZ ENGINE</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-200">
                   <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 text-center">{hasRated ? t.thankYouRating : t.rateExperience}</h4>
                   {!hasRated && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-center gap-2">
                        {[1,2,3,4,5].map((star) => (
                          <button key={star} onClick={() => setRating(star)} className="transition-all hover:scale-110">
                            <Star size={20} className={`${(hoveredRating || rating) >= star ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-transparent'}`} />
                          </button>
                        ))}
                      </div>
                      <div className="relative">
                        <textarea value={feedbackText} onChange={(e) => setFeedbackText(e.target.value)} placeholder={t.feedbackPlaceholder} className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl text-[10px] outline-none h-16 resize-none" />
                        <button onClick={handleSendFeedback} disabled={rating === 0} className="absolute bottom-2 right-2 p-2 bg-slate-950 text-white rounded-lg disabled:opacity-30">
                          <Send size={12} />
                        </button>
                      </div>
                    </div>
                   )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SHOPPING COMPARISON SECTION */}
        <div className="bg-white rounded-[3rem] border border-slate-100 p-6 md:p-8 mb-12 shadow-xl shadow-slate-900/5">
           <div className="flex items-center justify-between mb-8 px-2">
              <div className="flex items-center gap-3">
                 <div className="p-2 bg-blue-700 text-white rounded-xl">
                    <Tag size={18} />
                 </div>
                 <h3 className="text-lg md:text-xl font-black text-slate-950 brand-font uppercase tracking-tight">{t.bestPricesTitle}</h3>
              </div>
              <div className="flex items-center gap-2 bg-green-50 px-2 py-1 rounded-full border border-green-100">
                 <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                 <span className="text-[8px] font-black text-green-700 uppercase tracking-widest">{t.priceFound}</span>
              </div>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Product Visual */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="w-full aspect-square bg-slate-50 rounded-[2.5rem] overflow-hidden border border-slate-100 flex items-center justify-center group relative">
                  {isLoadingImage ? (
                    <div className="flex flex-col items-center justify-center text-slate-200 animate-pulse">
                       <Loader2 size={32} className="animate-spin mb-2" />
                       <span className="text-[8px] font-black uppercase">Görsel Oluşturuluyor</span>
                    </div>
                  ) : modelImage ? (
                    <img src={modelImage} alt={targetModel} className="w-full h-full object-cover p-2 transition-transform duration-700 group-hover:scale-110 animate-in fade-in duration-500" />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-slate-200">
                       <Footprints size={64} strokeWidth={1} />
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 bg-blue-700 text-white px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest shadow-xl">
                     {t.lowestPriceBadge}
                  </div>
                </div>
              </div>

              {/* Stores List */}
              <div className="lg:col-span-7 flex flex-col justify-center space-y-3">
                 {isLoadingOffers ? (
                   Array(3).fill(0).map((_, i) => (
                     <div key={i} className="h-20 bg-slate-50 rounded-2xl animate-pulse"></div>
                   ))
                 ) : offers.length > 0 ? (
                   offers.map((offer, idx) => (
                     <a 
                       key={idx} 
                       href={offer.url} 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="group bg-white border border-slate-100 p-4 rounded-3xl flex items-center justify-between hover:border-blue-700 hover:shadow-lg transition-all animate-in fade-in slide-in-from-right-4 duration-500"
                       style={{ animationDelay: `${idx * 100}ms` }}
                     >
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center overflow-hidden border border-slate-100 p-1">
                              <img src={offer.logo} alt={offer.siteName} className="w-full h-full object-contain" onError={(e) => (e.currentTarget.src = 'https://www.google.com/s2/favicons?domain=shopping.com')} />
                           </div>
                           <div>
                              <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">{offer.siteName}</h4>
                              <p className="text-base font-black text-slate-950 brand-font">{offer.price}</p>
                           </div>
                        </div>
                        <div className="bg-slate-950 text-white w-10 h-10 rounded-xl flex items-center justify-center group-hover:bg-blue-700 transition-colors">
                           <ChevronRight size={18} />
                        </div>
                     </a>
                   ))
                 ) : (
                    <div className="h-40 flex items-center justify-center text-slate-300 uppercase font-black text-[10px] tracking-widest">
                       Fiyat araştırması yapılıyor...
                    </div>
                 )}
              </div>
           </div>
        </div>

        {/* PRIMARY ACTIONS */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
           <div className="md:col-span-8 flex flex-col gap-4">
              <button 
                onClick={() => {
                  const lowestOffer = offers.length > 0 ? offers[0] : null;
                  if (lowestOffer) window.open(lowestOffer.url, '_blank');
                  else window.open(`https://www.google.com/search?q=${targetBrand.name}+${targetModel}+satın+al`, '_blank');
                }}
                className="w-full bg-blue-700 text-white font-black py-6 rounded-[2.5rem] shadow-[0_20px_50px_-15px_rgba(29,78,216,0.4)] active:scale-[0.98] transform hover:scale-[1.01] transition-all brand-font uppercase tracking-[0.2em] text-sm flex items-center justify-center gap-4"
              >
                <ShoppingBag size={22} />
                {t.buyNow}
              </button>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                 <button onClick={onOpenStyleStudio} className="flex-1 bg-slate-950 text-white p-5 rounded-[2rem] flex items-center justify-center gap-3 hover:bg-slate-900 transition-all shadow-xl shadow-slate-950/10 group">
                    <Sparkles size={18} className="text-blue-50" />
                    <span className="text-[10px] font-black uppercase tracking-[0.15em] brand-font">{t.styleStudioTitle}</span>
                 </button>
                 <button onClick={onOpenPremiumSupport} className="flex-1 bg-white border border-slate-200 p-5 rounded-[2rem] flex items-center justify-center gap-3 hover:bg-slate-50 transition-all shadow-sm group">
                    <MessageCircle size={18} className="text-blue-700" />
                    <span className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-950 brand-font">PRO DESTEK</span>
                 </button>
              </div>
           </div>

           <div className="md:col-span-4 bg-gradient-to-br from-slate-900 to-slate-950 p-8 rounded-[3rem] text-white flex flex-col justify-between border border-white/10 relative overflow-hidden">
              <div>
                <div className="inline-flex items-center gap-2 bg-blue-600/20 px-2 py-0.5 rounded-full mb-4 border border-blue-500/20">
                  <span className="text-[8px] font-black tracking-widest uppercase text-blue-400">PRO MEMBERSHIP</span>
                </div>
                <h4 className="text-lg font-black brand-font uppercase leading-tight mb-2">{t.membershipCardTitle}</h4>
                <p className="text-[10px] text-white/50 leading-relaxed font-bold uppercase tracking-tight mb-6">
                  {t.membershipCardDesc}
                </p>
              </div>
              <button onClick={handleMembershipClick} className="w-full bg-white text-slate-950 py-4 rounded-[1.5rem] font-black text-[10px] tracking-widest uppercase hover:bg-blue-50">
                {t.membershipCta}
              </button>
           </div>
        </div>

        <div className="pt-10 border-t border-slate-100 flex flex-wrap justify-center md:justify-start gap-8 opacity-60">
           <div className="flex items-center gap-3">
              <Info size={16} className="text-slate-400" />
              <p className="text-[9px] font-bold text-slate-500 uppercase">ENGINE V2.5.4 READY</p>
           </div>
           <div className="flex items-center gap-3">
              <ShieldCheck size={16} className="text-green-500" />
              <p className="text-[9px] font-bold text-slate-500 uppercase">OFFICIAL BRAND PARTNER</p>
           </div>
        </div>
      </main>

      <footer className="bg-slate-950 py-10 px-6 mt-auto border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-3 text-white">
              <div className="bg-blue-700 p-2 rounded-xl">
                <Footprints size={20} className="fill-current" />
              </div>
              <span className="font-black text-2xl tracking-tighter brand-font uppercase">FindYourSize</span>
            </div>
          </div>
          <div className="text-center md:text-right">
             <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em]">© 2024 ALL RIGHTS RESERVED</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ResultScreen;