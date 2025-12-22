
import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import UploadScreen from './components/UploadScreen';
import TargetSelection from './components/TargetSelection';
import ResultScreen from './components/ResultScreen';
import ProfileModal from './components/ProfileModal';
import HistoryPanel from './components/HistoryPanel';
import StyleStudio from './components/StyleStudio';
import PremiumSupport from './components/PremiumSupport';
import BrandGuides from './components/BrandGuides';
import { UserReference, Gender, UserProfile, HistoryItem } from './types';
import { translations } from './translations';

type AppStep = 'landing' | 'upload' | 'target' | 'result';
export type Language = 'tr' | 'en';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>('landing');
  const [language, setLanguage] = useState<Language>('tr');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isStyleStudioOpen, setIsStyleStudioOpen] = useState(false);
  const [isPremiumSupportOpen, setIsPremiumSupportOpen] = useState(false);
  const [isBrandGuidesOpen, setIsBrandGuidesOpen] = useState(false);
  
  const [profiles, setProfiles] = useState<UserProfile[]>(() => {
    const saved = localStorage.getItem('fyz_profiles');
    if (saved) return JSON.parse(saved);
    return [{ id: '1', name: 'Ben', gender: 'men' }];
  });
  const [activeProfileId, setActiveProfileId] = useState<string>(() => {
    return localStorage.getItem('fyz_active_profile_id') || '1';
  });

  const [history, setHistory] = useState<HistoryItem[]>(() => {
    const saved = localStorage.getItem('fyz_history');
    if (saved) return JSON.parse(saved);
    return [];
  });

  const activeProfile = profiles.find(p => p.id === activeProfileId) || profiles[0];

  const [targetBrandId, setTargetBrandId] = useState<string>('');
  const [targetGender, setTargetGender] = useState<Gender>('men');
  const [targetModel, setTargetModel] = useState<string>('');

  const t = translations[language];

  useEffect(() => {
    localStorage.setItem('fyz_profiles', JSON.stringify(profiles));
  }, [profiles]);

  useEffect(() => {
    localStorage.setItem('fyz_active_profile_id', activeProfileId);
  }, [activeProfileId]);

  useEffect(() => {
    localStorage.setItem('fyz_history', JSON.stringify(history));
  }, [history]);

  const handleStart = () => {
    if (activeProfile.reference) {
      setStep('target');
      setTargetGender(activeProfile.gender);
    } else {
      setStep('upload');
    }
  };

  const handleUploadComplete = (data: UserReference) => {
    const updatedProfiles = profiles.map(p => 
      p.id === activeProfileId ? { ...p, reference: data, gender: targetGender } : p
    );
    setProfiles(updatedProfiles);
    setStep('target');
  };

  const handleTargetComplete = (brandId: string, gender: Gender, model: string) => {
    setTargetBrandId(brandId);
    setTargetGender(gender);
    setTargetModel(model);
    setStep('result');
  };

  const handleReset = () => {
    setStep('landing');
    setTargetBrandId('');
    setTargetModel('');
  };

  const saveToHistory = (item: HistoryItem) => {
    setHistory(prev => {
      const filtered = prev.filter(h => h.id !== item.id);
      return [...filtered, item].slice(-20);
    });
  };

  const restoreHistory = (item: HistoryItem) => {
    setTargetBrandId(item.brandId);
    setTargetModel(item.model);
    setTargetGender(item.gender);
    const updatedProfiles = profiles.map(p => 
      p.id === activeProfileId ? { ...p, reference: item.reference, gender: item.gender } : p
    );
    setProfiles(updatedProfiles);
    setStep('result');
    setIsHistoryOpen(false);
  };

  const deleteHistoryItem = (id: string) => {
    setHistory(prev => prev.filter(h => h.id !== id));
  };

  const addProfile = (name: string, gender: Gender) => {
    const newProfile: UserProfile = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      gender
    };
    setProfiles([...profiles, newProfile]);
    setActiveProfileId(newProfile.id);
  };

  const deleteProfile = (id: string) => {
    if (profiles.length <= 1) return;
    const newProfiles = profiles.filter(p => p.id !== id);
    setProfiles(newProfiles);
    if (activeProfileId === id) setActiveProfileId(newProfiles[0].id);
  };

  return (
    <div className="font-sans antialiased text-slate-900 min-h-screen bg-[#f8fafc]">
      {/* GLOBAL PROFILE ACCESS (Landing harici adımlarda görünür) */}
      {step !== 'landing' && (
        <div className="fixed top-6 right-6 z-[60]">
          <button 
            onClick={() => setIsProfileModalOpen(true)}
            className="bg-white border border-slate-100 p-2 rounded-2xl shadow-xl hover:scale-110 active:scale-95 transition-all group flex items-center gap-3 pr-5"
          >
            <div className="w-10 h-10 bg-blue-700 text-white rounded-xl flex items-center justify-center font-black text-xs uppercase">
              {activeProfile.name.charAt(0)}
            </div>
            <div className="text-left hidden md:block">
               <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{t.currentProfile}</p>
               <p className="text-[10px] font-black text-slate-950 uppercase brand-font leading-none">{activeProfile.name}</p>
            </div>
          </button>
        </div>
      )}

      {step === 'landing' && (
        <LandingPage 
          onStart={handleStart} 
          onHome={handleReset}
          onOpenProfiles={() => setIsProfileModalOpen(true)}
          activeProfile={activeProfile}
          language={language} 
          setLanguage={setLanguage} 
          t={t}
        />
      )}
      
      {step === 'upload' && (
        <UploadScreen 
          onComplete={handleUploadComplete} 
          onBack={() => setStep('landing')} 
          onHome={handleReset}
          language={language}
          t={t}
        />
      )}

      {step === 'target' && (
        <TargetSelection 
          onComplete={handleTargetComplete}
          onBack={() => setStep('upload')}
          onHome={handleReset}
          language={language}
          t={t}
        />
      )}

      {step === 'result' && activeProfile.reference && (
        <ResultScreen 
          reference={activeProfile.reference}
          targetBrandId={targetBrandId}
          targetGender={targetGender}
          targetModel={targetModel}
          onReset={handleReset}
          onHome={handleReset}
          onSaveHistory={saveToHistory}
          onOpenStyleStudio={() => setIsStyleStudioOpen(true)}
          onOpenPremiumSupport={() => setIsPremiumSupportOpen(true)}
          language={language}
          t={t}
        />
      )}

      <ProfileModal 
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        onOpenHistory={() => { setIsProfileModalOpen(false); setIsHistoryOpen(true); }}
        profiles={profiles}
        activeProfileId={activeProfileId}
        onSwitch={setActiveProfileId}
        onAdd={addProfile}
        onDelete={deleteProfile}
        language={language}
        t={t}
      />

      <HistoryPanel 
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onRestore={restoreHistory}
        onDelete={deleteHistoryItem}
        language={language}
        t={t}
      />

      <StyleStudio 
        isOpen={isStyleStudioOpen}
        onClose={() => setIsStyleStudioOpen(false)}
        brand={targetBrandId}
        model={targetModel}
        language={language}
        t={t}
      />

      <PremiumSupport 
        isOpen={isPremiumSupportOpen}
        onClose={() => setIsPremiumSupportOpen(false)}
        language={language}
        t={t}
      />

      <BrandGuides 
        isOpen={isBrandGuidesOpen}
        onClose={() => setIsBrandGuidesOpen(false)}
        language={language}
        t={t}
      />
    </div>
  );
};

export default App;
