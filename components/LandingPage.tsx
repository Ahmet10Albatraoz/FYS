import React, { useState } from 'react';
import { Footprints, Info, X, Zap, Globe2, ShieldCheck, Sparkles, ArrowRight, Leaf, Cpu, Database, BookOpen, Crown, CheckCircle2, Star, Users } from 'lucide-react';
import { Language } from '../App';
import { UserProfile } from '../types';
import { translations } from '../translations';
import BrandGuides from './BrandGuides';

interface LandingPageProps {
  onStart: () => void;
  onHome: () => void;
  onOpenProfiles: () => void;
  activeProfile: UserProfile;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: any;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart, onHome, onOpenProfiles, activeProfile, language, setLanguage, t }) => {
  const [showInfo, setShowInfo] = useState(false);
  const [showGuides, setShowGuides] = useState(false);
  const currentLang = translations[language];
  const CONTACT_EMAIL = "mail@findyoursize.com.tr";

  const handleMembershipClick = () => {
    const subject = encodeURIComponent(t.membershipSubject);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}`;
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-slate-900 relative overflow-hidden">
      
      {/* HEADER */}
      <header className="relative flex justify-center items-center px-6 py-5 z-20">
        <div className="absolute left-6 flex items-center gap-3">
          <button 
            onClick={() => setShowInfo(true)}
            className="px-4 py-2 bg-blue-50/30 hover:bg-blue-50/80 backdrop-blur-md border border-slate-100 rounded-full transition-all flex items-center gap-2 group z-30"
          >
            <div className="w-1.5 h-1.5 bg-blue-700 rounded-full animate-pulse"></div>
            <span className="hidden md:block text-[9px] font-black tracking-[0.25em] uppercase text-slate-400 group-hover:text-blue-700">{t.techTitle}</span>
          </button>
          
          <button 
            onClick={() => setShowGuides(true)}
            className="px-4 py-2 bg-slate-50 hover:bg-slate-100 backdrop-blur-md border border-slate-100 rounded-full transition-all flex items-center gap-2 group z-30"
          >
            <BookOpen size={16} className="text-slate-400 group-hover:text-blue-700" />
            <span className="hidden md:block text-[9px] font-black tracking-[0.25em] uppercase text-slate-400 group-hover:text-blue-700">{t.sizeGuideBtn}</span>
          </button>
        </div>

        <button 
          onClick={onHome}
          className="flex flex-col items-center gap-0.5 group cursor-pointer"
        >
          <div className="bg-blue-700 text-white p-1.5 rounded-xl shadow-lg transform group-hover:rotate-12 transition-transform">
            <Footprints size={20} className="fill-current" />
          </div>
          <span className="font-black text-xl tracking-tighter text-slate-900 brand-font">FindYourSize</span>
        </button>
        
        <div className="absolute right-6 flex items-center gap-4">
          <button 
            onClick={onOpenProfiles}
            className="flex items-center gap-3 bg-slate-50 border border-slate-100 pl-1.5 pr-4 py-1.5 rounded-xl hover:bg-white hover:shadow-xl hover:scale-105 transition-all group"
          >
            <div className="w-7 h-7 bg-blue-700 text-white rounded-lg flex items-center justify-center text-[9px] font-black">
              {activeProfile.name.charAt(0)}
            </div>
            <div className="text-left hidden md:block">
              <span className="text-[9px] font-black text-slate-900 uppercase tracking-widest group-hover:text-blue-700 leading-none">{activeProfile.name}</span>
            </div>
          </button>

          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-full text-[9px] font-black tracking-widest uppercase">
            <button onClick={() => setLanguage('tr')} className={language === 'tr' ? 'text-blue-700' : 'text-slate-300'}>TR</button>
            <span className="w-[1px] h-2.5 bg-slate-200"></span>
            <button onClick={() => setLanguage('en')} className={language === 'en' ? 'text-blue-700' : 'text-slate-300'}>EN</button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <main className="flex flex-col items-center justify-center text-center px-6 relative z-10 py-4 md:py-6 mt-2 md:mt-4">
        <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full mb-6 border border-blue-100">
          <Zap size={14} className="text-blue-700 fill-current" />
          <span className="text-[10px] font-black text-blue-700 tracking-[0.2em] uppercase">{t.aiPrecision}</span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-6 tracking-tighter leading-[0.85] brand-font max-w-4xl">
          {t.heroTitle} <br/> <span className="text-blue-700">{t.heroTitleSub}</span>
        </h1>
        
        <p className="text-slate-500 text-sm md:text-lg lg:text-xl mb-10 md:mb-12 font-medium max-w-xl mx-auto leading-tight">
          {t.heroDesc}
        </p>
        
        {/* ACTION CONTAINER */}
        <div className="flex flex-col items-center gap-12 lg:gap-16 w-full mb-12">
          <button 
            onClick={onStart}
            className="bg-blue-700 hover:bg-blue-800 text-white font-black py-5 px-20 md:py-6 md:px-24 rounded-[2rem] shadow-[0_20px_50px_-10px_rgba(29,78,216,0.35)] transition-all transform hover:scale-[1.05] active:scale-[0.98] text-lg md:text-2xl brand-font uppercase tracking-tight flex items-center gap-4 z-20"
          >
            {activeProfile.reference ? t.directToTarget : t.startBtn}
            <ArrowRight size={28} />
          </button>

          {/* PREMIUM MEMBERSHIP CARD */}
          <div className="w-full max-w-6xl animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300 px-4">
            <div className="relative group overflow-visible">
              <div className="relative bg-[#020617] rounded-[2.5rem] md:rounded-[4rem] overflow-hidden border border-white/10 shadow-none">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[80px] -mr-32 -mt-32 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[250px] h-[250px] bg-indigo-600/10 rounded-full blur-[60px] -ml-24 -mb-24 pointer-events-none"></div>
                
                <div className="px-6 py-10 md:px-14 md:py-12 flex flex-col lg:flex-row items-center gap-8 md:gap-14 relative z-10">
                  <div className="flex-[1.4] flex flex-col items-start text-left">
                    <div className="flex items-center gap-5 md:gap-6 mb-5 w-full">
                       <Crown size={48} className="text-blue-500 fill-current w-12 h-12 md:w-16 md:h-16 shrink-0 transform -rotate-12" />
                       <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter leading-[0.8] brand-font uppercase">
                          {t.membershipCardTitle}
                       </h2>
                    </div>
                    <p className="text-white/60 text-sm md:text-lg font-medium leading-relaxed max-w-xl mb-8">
                       {t.membershipCardDesc}
                    </p>
                    <button 
                      onClick={handleMembershipClick}
                      className="hidden lg:flex px-12 py-5 bg-white text-slate-950 rounded-full font-black text-[10px] tracking-[0.3em] uppercase transition-all hover:bg-blue-50 hover:scale-105 active:scale-95 items-center justify-center gap-5 group/btn"
                    >
                      {t.membershipCta}
                      <Sparkles size={16} className="text-blue-700 group-hover/btn:rotate-12 transition-transform" />
                    </button>
                  </div>

                  <div className="w-full lg:flex-1 bg-white/[0.03] backdrop-blur-3xl rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-10 border border-white/5 flex flex-col justify-between self-stretch">
                    <div className="space-y-8">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                          <p className="text-blue-500 text-[10px] md:text-xs font-black tracking-[0.3em] uppercase">{t.membershipStatus}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-y-5">
                        {[
                          { text: t.membershipBenefit1, icon: Zap },
                          { text: t.membershipBenefit2, icon: Sparkles },
                          { text: t.membershipBenefit3, icon: Users },
                          { text: t.membershipBenefit4, icon: Star }
                        ].map((benefit, i) => (
                          <div key={i} className="flex items-center gap-4 group/item">
                            <div className="w-8 h-8 rounded-lg bg-blue-600/10 flex items-center justify-center text-blue-500 border border-blue-500/10 group-hover/item:bg-blue-600 group-hover/item:text-white transition-all duration-500">
                              <benefit.icon size={14} />
                            </div>
                            <span className="text-white/80 text-[10px] font-black tracking-widest uppercase leading-tight">{benefit.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="mt-8 pt-8 border-t border-white/10 flex items-center justify-between">
                       <div>
                         <p className="text-white/20 text-[7px] font-black uppercase tracking-[0.4em] mb-1">{t.membershipValidityLabel}</p>
                         <p className="text-blue-400 text-[9px] font-black uppercase tracking-[0.2em] brand-font">{t.membershipValidityValue}</p>
                       </div>
                    </div>
                    <button 
                      onClick={handleMembershipClick}
                      className="lg:hidden mt-8 w-full py-5 bg-white text-slate-950 rounded-[1.5rem] font-black text-[10px] tracking-[0.2em] uppercase transition-all flex items-center justify-center gap-4"
                    >
                      {t.membershipCta}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FULL INTEGRATED ABOUT SECTION (Anasayfa Altı) */}
        <section className="w-full max-w-6xl mx-auto px-6 py-20 md:py-32 border-t border-slate-100 mt-12 bg-[#fdfdfc] rounded-[4rem] relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-start gap-16 md:gap-24 relative z-10">
            <div className="flex-1 text-left space-y-12">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Sparkles size={24} className="text-blue-700 fill-current" />
                  <h2 className="text-[12px] font-black text-blue-700 tracking-[0.5em] uppercase leading-relaxed">
                    {t.infoSlogan}
                  </h2>
                </div>
                <h3 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-950 brand-font tracking-tighter uppercase leading-[0.9]">
                  {t.infoMainTitle}
                </h3>
              </div>
              <div className="space-y-12">
                <p className="text-base md:text-lg lg:text-xl text-slate-600 leading-relaxed font-medium max-w-xl">
                  {t.infoDescriptionP1}
                </p>
                <p className="text-xl md:text-2xl font-black text-slate-900 leading-tight italic max-w-xl">
                  {t.infoDescriptionP2}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-12 border-t border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_12px_rgba(34,197,94,0.6)]"></div>
                  <span className="text-[10px] font-black text-slate-400 tracking-[0.3em] uppercase">{t.infoFooterStatus}</span>
                </div>
                <span className="text-[10px] font-black text-slate-300 tracking-[0.1em] uppercase">FINDYOURSIZE ENGINE V2.5.4</span>
              </div>
            </div>
            <div className="flex-1 w-full flex flex-col gap-12">
              <div className="space-y-16">
                <div className="flex items-start gap-8 group">
                  <Zap size={32} className="shrink-0 text-blue-700 pt-1" />
                  <div className="flex-1 text-left">
                    <h4 className="text-xl font-black text-slate-950 mb-3 brand-font uppercase tracking-tight">{t.infoMetric1Title}</h4>
                    <p className="text-base text-slate-500 leading-relaxed font-medium max-w-sm">{t.infoMetric1Desc}</p>
                  </div>
                </div>
                <div className="flex items-start gap-8 group">
                  <Globe2 size={32} className="shrink-0 text-blue-700 pt-1" />
                  <div className="flex-1 text-left">
                    <h4 className="text-xl font-black text-slate-950 mb-3 brand-font uppercase tracking-tight">{t.infoMetric2Title}</h4>
                    <p className="text-base text-slate-500 leading-relaxed font-medium max-w-sm">{t.infoMetric2Desc}</p>
                  </div>
                </div>

                {/* Kurumsal Bilgi Kutucukları: Güvenli Veri & Düşük Karbon */}
                <div className="space-y-6">
                  {/* GÜVENLİ VERİ BOX */}
                  <div className="bg-[#0b3eb9] p-6 md:p-8 rounded-[2.5rem] text-white flex items-start gap-6 shadow-xl shadow-blue-900/20 transform hover:-translate-y-1 transition-all duration-500">
                    <div className="shrink-0 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                      <ShieldCheck size={24} className="text-white" />
                    </div>
                    <div className="text-left">
                      <h4 className="text-base font-black mb-1.5 brand-font uppercase tracking-tight">{t.infoMetric3Title}</h4>
                      <p className="text-[11px] text-white/80 leading-relaxed font-medium">{t.infoMetric3Desc}</p>
                    </div>
                  </div>

                  {/* DÜŞÜK KARBON BOX */}
                  <div className="bg-[#059669] p-6 md:p-8 rounded-[2.5rem] text-white flex items-start gap-6 shadow-xl shadow-emerald-900/20 transform hover:-translate-y-1 transition-all duration-500">
                    <div className="shrink-0 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                      <Leaf size={24} className="text-white" />
                    </div>
                    <div className="text-left">
                      <h4 className="text-base font-black mb-1.5 brand-font uppercase tracking-tight">{t.aboutCarbonTitle}</h4>
                      <p className="text-[11px] text-white/80 leading-relaxed font-medium">{t.aboutCarbonDesc}</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>
      </main>

      <BrandGuides isOpen={showGuides} onClose={() => setShowGuides(false)} language={language} t={t} />

      {/* MODAL (Sol Üstteki Buton Tıklandığında) */}
      {showInfo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-2xl animate-in fade-in duration-500" onClick={() => setShowInfo(false)}></div>
          <div className="relative bg-[#fdfdfc] w-full max-w-6xl max-h-[95vh] rounded-[3rem] md:rounded-[4rem] shadow-2xl overflow-y-auto animate-in zoom-in-95 duration-300 border border-white/10 p-8 md:p-20">
            <button 
              onClick={() => setShowInfo(false)} 
              className="absolute top-8 right-8 z-20 p-4 bg-slate-100 hover:bg-slate-200 rounded-full transition-all text-slate-950"
            >
              <X size={24} />
            </button>
            
            <div className="flex flex-col lg:flex-row items-start gap-16 md:gap-24">
              {/* Left Column */}
              <div className="flex-1 text-left space-y-12">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <Sparkles size={24} className="text-blue-700 fill-current" />
                    <h2 className="text-[12px] font-black text-blue-700 tracking-[0.5em] uppercase leading-relaxed">
                      {t.infoSlogan}
                    </h2>
                  </div>
                  <h3 className="text-4xl md:text-6xl font-black text-slate-950 brand-font tracking-tighter uppercase leading-[0.9]">
                    {t.infoMainTitle}
                  </h3>
                </div>

                <div className="space-y-12">
                  <p className="text-base md:text-lg text-slate-600 leading-relaxed font-medium max-w-xl">
                    {t.infoDescriptionP1}
                  </p>
                  <p className="text-xl md:text-2xl font-black text-slate-900 leading-tight italic max-w-xl">
                    {t.infoDescriptionP2}
                  </p>
                </div>

                {/* Status Footer */}
                <div className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-12 border-t border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_12px_rgba(34,197,94,0.6)]"></div>
                    <span className="text-[10px] font-black text-slate-400 tracking-[0.3em] uppercase">{t.infoFooterStatus}</span>
                  </div>
                  <span className="text-[10px] font-black text-slate-300 tracking-[0.1em] uppercase">FINDYOURSIZE ENGINE V2.5.4</span>
                </div>
              </div>

              {/* Right Column */}
              <div className="flex-1 w-full flex flex-col gap-12">
                <div className="space-y-16">
                  <div className="flex items-start gap-8 group">
                    <Zap size={32} className="shrink-0 text-blue-700 pt-1" />
                    <div className="flex-1 text-left">
                      <h4 className="text-xl font-black text-slate-950 mb-3 brand-font uppercase tracking-tight">{t.infoMetric1Title}</h4>
                      <p className="text-base text-slate-500 leading-relaxed font-medium max-w-sm">{t.infoMetric1Desc}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-8 group">
                    <Globe2 size={32} className="shrink-0 text-blue-700 pt-1" />
                    <div className="flex-1 text-left">
                      <h4 className="text-xl font-black text-slate-950 mb-3 brand-font uppercase tracking-tight">{t.infoMetric2Title}</h4>
                      <p className="text-base text-slate-500 leading-relaxed font-medium max-w-sm">{t.infoMetric2Desc}</p>
                    </div>
                  </div>
                  
                  {/* Modal İçinde de Güncellenmiş Kutucuk Yapısı */}
                  <div className="space-y-6">
                    {/* GÜVENLİ VERİ BOX */}
                    <div className="bg-[#0b3eb9] p-6 md:p-8 rounded-[3rem] text-white flex items-start gap-8 shadow-2xl shadow-blue-900/20 transform hover:-translate-y-1 transition-all duration-500">
                      <div className="shrink-0 w-16 h-16 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                        <ShieldCheck size={32} className="text-white" />
                      </div>
                      <div className="text-left">
                        <h4 className="text-xl font-black mb-2 brand-font uppercase tracking-tight">{t.infoMetric3Title}</h4>
                        <p className="text-sm text-white/80 leading-relaxed font-medium">{t.infoMetric3Desc}</p>
                      </div>
                    </div>

                    {/* DÜŞÜK KARBON BOX */}
                    <div className="bg-[#059669] p-6 md:p-8 rounded-[3rem] text-white flex items-start gap-8 shadow-2xl shadow-emerald-900/20 transform hover:-translate-y-1 transition-all duration-500">
                      <div className="shrink-0 w-16 h-16 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                        <Leaf size={32} className="text-white" />
                      </div>
                      <div className="text-left">
                        <h4 className="text-xl font-black mb-2 brand-font uppercase tracking-tight">{t.aboutCarbonTitle}</h4>
                        <p className="text-sm text-white/80 leading-relaxed font-medium">{t.aboutCarbonDesc}</p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;