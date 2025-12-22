
import React, { useState } from 'react';
import { X, User, Plus, Trash2, CheckCircle2, UserPlus, Baby, Users, Clock, RotateCcw } from 'lucide-react';
import { UserProfile, Gender } from '../types';
import { Language } from '../App';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenHistory: () => void;
  profiles: UserProfile[];
  activeProfileId: string;
  onSwitch: (id: string) => void;
  onAdd: (name: string, gender: Gender) => void;
  onDelete: (id: string) => void;
  language: Language;
  t: any;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, onOpenHistory, profiles, activeProfileId, onSwitch, onAdd, onDelete, language, t }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [newGender, setNewGender] = useState<Gender>('men');

  if (!isOpen) return null;

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newName.trim()) {
      onAdd(newName.trim(), newGender);
      setNewName('');
      setIsAdding(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-xl animate-in fade-in duration-300" onClick={onClose}></div>
      
      <div className="relative bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col border border-slate-100">
        <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-700/20">
               <Users size={18} />
             </div>
             <h3 className="text-sm font-black text-slate-950 brand-font uppercase tracking-tight">{t.profileHub}</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
            <X size={20} className="text-slate-400" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 max-h-[60vh]">
          {isAdding ? (
            <form onSubmit={handleAdd} className="space-y-6 animate-in slide-in-from-bottom-4">
               <div className="space-y-2">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{t.profileName}</label>
                 <input 
                   autoFocus
                   required
                   type="text" 
                   value={newName}
                   onChange={(e) => setNewName(e.target.value)}
                   placeholder="e.g. Leo" 
                   className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-50 outline-none font-bold text-slate-900" 
                 />
               </div>
               <div className="space-y-2">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{t.selectCategory}</label>
                 <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'men', icon: User, label: t.men },
                      { id: 'women', icon: UserPlus, label: t.women },
                      { id: 'kids', icon: Baby, label: t.kids }
                    ].map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setNewGender(cat.id as Gender)}
                        className={`py-4 rounded-2xl border flex flex-col items-center gap-2 transition-all ${newGender === cat.id ? 'bg-blue-700 text-white border-blue-700 shadow-lg' : 'bg-slate-50 text-slate-400 border-slate-100 hover:bg-white'}`}
                      >
                        <cat.icon size={18} />
                        <span className="text-[8px] font-black uppercase tracking-widest">{cat.label}</span>
                      </button>
                    ))}
                 </div>
               </div>
               <div className="flex gap-3 pt-4">
                  <button type="button" onClick={() => setIsAdding(false)} className="flex-1 py-4 text-slate-400 font-black text-[10px] uppercase tracking-widest">{language === 'tr' ? 'İPTAL' : 'CANCEL'}</button>
                  <button type="submit" className="flex-[2] bg-blue-700 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-blue-700/20">{t.saveProfile}</button>
               </div>
            </form>
          ) : (
            <div className="space-y-4">
              {/* Profile List */}
              <div className="space-y-3">
                {profiles.map((profile) => (
                  <div key={profile.id} className="group relative">
                    <button 
                      onClick={() => { onSwitch(profile.id); onClose(); }}
                      className={`w-full p-5 rounded-[2rem] border transition-all flex items-center justify-between ${activeProfileId === profile.id ? 'bg-blue-50 border-blue-200 ring-2 ring-blue-100' : 'bg-white border-slate-100 hover:border-blue-200'}`}
                    >
                      <div className="flex items-center gap-4 text-left">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${activeProfileId === profile.id ? 'bg-blue-700 text-white' : 'bg-slate-50 text-slate-400'}`}>
                          {profile.gender === 'kids' ? <Baby size={20} /> : <User size={20} />}
                        </div>
                        <div>
                          <h4 className={`text-sm font-black brand-font uppercase leading-none mb-1.5 ${activeProfileId === profile.id ? 'text-blue-700' : 'text-slate-900'}`}>{profile.name}</h4>
                          <div className="flex items-center gap-2">
                            <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{profile.gender}</span>
                            {profile.reference && (
                              <span className="text-[8px] font-black text-blue-500 uppercase tracking-widest">• {profile.reference.cm} CM</span>
                            )}
                          </div>
                        </div>
                      </div>
                      {activeProfileId === profile.id && (
                        <CheckCircle2 size={18} className="text-blue-700" />
                      )}
                    </button>
                    {profiles.length > 1 && (
                      <button 
                        onClick={() => onDelete(profile.id)}
                        className="absolute -right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg border border-slate-100 opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-500 transition-all hover:scale-110"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                ))}
                
                <button 
                  onClick={() => setIsAdding(true)}
                  className="w-full p-5 rounded-[2rem] border border-dashed border-slate-200 text-slate-400 flex items-center justify-center gap-3 hover:bg-slate-50 transition-all"
                >
                  <Plus size={18} />
                  <span className="text-[10px] font-black uppercase tracking-widest">{t.addProfile}</span>
                </button>
              </div>

              {/* INTEGRATED RESTORE / HISTORY BUTTON */}
              <div className="pt-4 border-t border-slate-100">
                <button 
                  onClick={onOpenHistory}
                  className="w-full bg-slate-950 text-white p-6 rounded-[2rem] flex items-center justify-between group hover:bg-blue-700 transition-all shadow-xl shadow-slate-950/10 active:scale-95"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 bg-white/10 rounded-xl group-hover:bg-white/20 transition-colors">
                      <Clock size={18} className="text-blue-400 group-hover:text-white" />
                    </div>
                    <div className="text-left">
                      <p className="text-[10px] font-black uppercase tracking-widest leading-none mb-1">{t.historyTitle}</p>
                      <p className="text-[8px] font-bold text-white/40 group-hover:text-white/60 uppercase tracking-widest">Restore Previous Data</p>
                    </div>
                  </div>
                  <RotateCcw size={16} className="text-white/20 group-hover:text-white group-hover:rotate-[-180deg] transition-all duration-700" />
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 bg-slate-50 text-center">
           <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Security: All profiles are stored in your local enclave.</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
