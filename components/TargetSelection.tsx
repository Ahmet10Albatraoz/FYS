
import React, { useState } from 'react';
import { BRANDS } from '../data';
import { Gender } from '../types';
import { ChevronRight, Search, User, UserPlus, Baby, Footprints, ChevronLeft } from 'lucide-react';
import { Language } from '../App';

interface TargetSelectionProps {
  onComplete: (brandId: string, gender: Gender, model: string) => void;
  onBack: () => void;
  onHome: () => void;
  language: Language;
  t: any;
}

const TargetSelection: React.FC<TargetSelectionProps> = ({ onComplete, onBack, onHome, t }) => {
  const [step, setStep] = useState<'brand' | 'gender' | 'model'>('brand');
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [selectedGender, setSelectedGender] = useState<Gender>('men');
  const [searchTerm, setSearchTerm] = useState('');
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleBrandSelect = (id: string) => {
    setSelectedBrand(id);
    setStep('gender');
  };

  const handleGenderSelect = (gender: Gender) => {
    setSelectedGender(gender);
    setStep('model');
  };

  const currentBrand = BRANDS.find(b => b.id === selectedBrand);
  const models = currentBrand ? currentBrand.models[selectedGender] : [];
  const filteredModels = models.filter(m => m.toLowerCase().includes(searchTerm.toLowerCase()));

  const getStepTitle = () => {
    if (step === 'brand') return t.targetTitleBrand;
    if (step === 'gender') return t.targetTitleGender;
    return t.targetTitleModel;
  };

  return (
    <div className="flex flex-col h-full min-h-screen bg-white font-sans">
      <header className="relative flex justify-center items-center px-6 py-6 bg-white border-b border-slate-100 sticky top-0 z-40">
        <button onClick={() => step === 'brand' ? onBack() : setStep(step === 'gender' ? 'brand' : 'gender')} className="absolute left-6 text-slate-400 hover:text-blue-700 transition-all">
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={onHome}
          className="flex flex-col items-center gap-0.5 cursor-pointer hover:opacity-70 transition-opacity"
        >
          <div className="bg-blue-700 text-white p-1 rounded-lg"><Footprints size={14} className="fill-current" /></div>
          <span className="font-black text-sm tracking-tighter brand-font">FindYourSize</span>
        </button>
      </header>

      <div className="flex-1 p-6 max-w-3xl mx-auto w-full flex flex-col">
        <div className="flex flex-col items-center mb-10 pt-6">
           <h2 className="text-3xl font-black text-slate-900 brand-font uppercase tracking-tight">{getStepTitle()}</h2>
           <div className="w-12 h-1 bg-blue-700 rounded-full mt-3 opacity-20"></div>
        </div>

        {step === 'brand' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 pb-20 animate-in fade-in duration-700">
            {BRANDS.map(brand => (
              <button 
                key={brand.id} 
                onClick={() => handleBrandSelect(brand.id)} 
                className="group relative bg-white border border-slate-100 rounded-[2.5rem] p-8 flex flex-col items-center justify-center gap-6 transition-all duration-500 hover:border-blue-700 hover:shadow-[0_20px_50px_rgba(29,78,216,0.1)] hover:-translate-y-1.5 active:scale-[0.97]"
              >
                <div className="h-20 w-full flex items-center justify-center">
                  {(brand.logo && !imageErrors[brand.id]) ? (
                    <img 
                      src={brand.logo} 
                      alt={brand.name} 
                      className="max-h-16 max-w-full object-contain grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 transform group-hover:scale-110" 
                      onError={() => setImageErrors(p => ({...p, [brand.id]: true}))} 
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-[1.8rem] bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col items-center justify-center text-slate-400 border border-slate-200 group-hover:from-blue-50 group-hover:to-blue-100 group-hover:border-blue-200 transition-all duration-500">
                      <span className="font-black text-lg tracking-tighter brand-font group-hover:text-blue-700">{brand.name.charAt(0)}</span>
                      <span className="text-[6px] font-black uppercase tracking-widest mt-1 opacity-50">{brand.name}</span>
                    </div>
                  )}
                </div>
                <div className="text-center">
                  <span className="font-black text-slate-400 text-[10px] uppercase tracking-[0.2em] group-hover:text-blue-700 transition-colors brand-font">{brand.name}</span>
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-2 group-hover:translate-x-0">
                  <div className="w-7 h-7 rounded-full bg-blue-700 flex items-center justify-center shadow-lg shadow-blue-700/20">
                    <ChevronRight size={14} className="text-white" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {step === 'gender' && currentBrand && (
           <div className="animate-in fade-in slide-in-from-right-4 duration-500 flex flex-col items-center flex-1 pt-4 pb-20">
             <div className="w-full max-w-sm">
                <div className="bg-slate-50 p-12 rounded-[3.5rem] mb-10 flex flex-col items-center justify-center border border-slate-100 gap-6 shadow-sm">
                  {currentBrand.logo && !imageErrors[currentBrand.id] ? (
                    <img src={currentBrand.logo} alt={currentBrand.name} className="h-16 object-contain drop-shadow-sm" onError={() => setImageErrors(p => ({...p, [currentBrand.id]: true}))} />
                  ) : (
                    <div className="w-20 h-20 rounded-[1.8rem] bg-white flex flex-col items-center justify-center text-blue-700 border border-slate-200 shadow-sm">
                      <span className="font-black text-2xl tracking-tighter brand-font">{currentBrand.name.charAt(0)}</span>
                    </div>
                  )}
                  <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em] brand-font">{currentBrand.name}</span>
                </div>
                <div className="grid grid-cols-1 gap-4">
                    {[
                      { id: 'men', label: t.men, sub: t.menSub, icon: User },
                      { id: 'women', label: t.women, sub: t.womenSub, icon: UserPlus },
                      { id: 'kids', label: t.kids, sub: t.kidsSub, icon: Baby }
                    ].map((cat) => (
                      <button key={cat.id} onClick={() => handleGenderSelect(cat.id as Gender)} className="w-full bg-white p-7 rounded-[2.5rem] border border-slate-100 hover:border-blue-700 hover:shadow-2xl hover:shadow-blue-700/5 flex items-center gap-6 transition-all group">
                        <div className="p-4 rounded-2xl bg-slate-50 text-slate-400 group-hover:text-blue-700 group-hover:bg-blue-50 transition-all duration-500"><cat.icon size={24} /></div>
                        <div className="text-left flex-1">
                          <h3 className="font-black text-slate-900 text-base tracking-tight brand-font">{cat.label}</h3>
                          <p className="text-slate-400 text-[9px] font-black uppercase tracking-[0.3em]">{cat.sub}</p>
                        </div>
                        <ChevronRight className="text-slate-200 group-hover:text-blue-700 transform group-hover:translate-x-1.5 transition-all duration-500" size={22} />
                      </button>
                    ))}
                </div>
             </div>
          </div>
        )}

        {step === 'model' && (
          <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-500 pt-4 pb-20">
            <div className="mb-10 relative">
              <Search className="absolute left-7 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
              <input type="text" placeholder={t.searchPlaceholder} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-16 pr-8 py-6 rounded-[2.5rem] border border-slate-100 focus:outline-none focus:ring-4 focus:ring-blue-50 bg-slate-50 text-slate-900 font-black transition-all text-sm tracking-widest uppercase brand-font shadow-inner" />
            </div>
            <div className="space-y-3 pb-10 flex-1">
              <div className="grid grid-cols-1 gap-3">
                {filteredModels.map((model, idx) => (
                  <button key={idx} onClick={() => onComplete(selectedBrand, selectedGender, model)} className="w-full bg-white p-6 rounded-3xl border border-transparent hover:bg-slate-50 hover:border-slate-100 transition-all flex items-center justify-between group">
                    <span className="font-black text-slate-800 text-sm tracking-widest uppercase brand-font group-hover:text-blue-700 transition-colors">{model}</span>
                    <div className="w-8 h-8 rounded-full bg-transparent group-hover:bg-blue-50 flex items-center justify-center transition-all duration-500">
                      <ChevronRight className="text-slate-200 group-hover:text-blue-700 transition-all" size={20} />
                    </div>
                  </button>
                ))}
              </div>
              {filteredModels.length === 0 && (
                <div className="text-center py-32 bg-slate-50 rounded-[4rem] border border-dashed border-slate-200">
                  <h4 className="font-black text-slate-300 text-[11px] uppercase tracking-[0.6em] brand-font">{t.noModelFound}</h4>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <footer className="bg-slate-950 py-12 px-6 border-t border-white/5 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-white opacity-40">
            <Footprints size={16} className="fill-current" />
            <span className="font-black text-sm tracking-tighter brand-font uppercase">FindYourSize</span>
          </div>
          <p className="text-[9px] font-black text-slate-600 tracking-[0.5em] uppercase">Powered by FYZ Engine V2.5.4</p>
        </div>
      </footer>
    </div>
  );
};

export default TargetSelection;
