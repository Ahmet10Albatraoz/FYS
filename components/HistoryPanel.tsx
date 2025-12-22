
import React from 'react';
import { X, Clock, RotateCcw, Trash2, Footprints, ChevronRight } from 'lucide-react';
import { HistoryItem } from '../types';
import { BRANDS } from '../data';
import { Language } from '../App';

interface HistoryPanelProps {
  isOpen: boolean;
  onClose: () => void;
  history: HistoryItem[];
  onRestore: (item: HistoryItem) => void;
  onDelete: (id: string) => void;
  language: Language;
  t: any;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({ isOpen, onClose, history, onRestore, onDelete, language, t }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-end">
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose}></div>
      
      <div className="relative bg-white w-full max-w-md h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-500 overflow-hidden">
        <div className="p-8 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <div className="p-3 bg-blue-700 text-white rounded-2xl shadow-xl shadow-blue-700/20">
               <Clock size={20} />
             </div>
             <div>
               <h3 className="text-sm font-black text-slate-950 brand-font uppercase tracking-tight">{t.historyTitle}</h3>
               <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{history.length} RECORDS FOUND</p>
             </div>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-slate-200 rounded-full transition-colors">
            <X size={24} className="text-slate-400" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {history.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-12 opacity-30">
              <RotateCcw size={48} className="mb-4 text-slate-300" />
              <p className="text-xs font-black uppercase tracking-widest text-slate-400">{t.historyEmpty}</p>
            </div>
          ) : (
            [...history].reverse().map((item) => {
              const brand = BRANDS.find(b => b.id === item.brandId);
              return (
                <div key={item.id} className="group relative bg-white border border-slate-100 rounded-[2.5rem] p-6 hover:border-blue-700 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-500">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center p-2">
                         <img src={brand?.logo} alt={brand?.name} className="max-h-full max-w-full object-contain grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all" />
                       </div>
                       <div>
                         <h4 className="text-xs font-black text-slate-950 brand-font uppercase tracking-tight mb-1">{item.model}</h4>
                         <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{new Date(item.timestamp).toLocaleDateString()} • {item.gender}</p>
                       </div>
                    </div>
                    <div className="text-right">
                       <span className="text-2xl font-black text-blue-700 brand-font">{item.calculatedSize}</span>
                       <span className="text-[8px] font-black text-slate-300 uppercase block tracking-widest">EU</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button 
                      onClick={() => onRestore(item)}
                      className="flex-1 bg-blue-700 text-white text-[9px] font-black uppercase tracking-widest py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-800 transition-all"
                    >
                      <RotateCcw size={14} />
                      {t.restoreBtn}
                    </button>
                    <button 
                      onClick={() => onDelete(item.id)}
                      className="p-3 bg-slate-50 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                      title={t.deleteHistory}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="p-8 bg-slate-50 border-t border-slate-100 text-center">
           <div className="flex items-center justify-center gap-2 opacity-30 mb-2">
             <Footprints size={14} />
             <span className="text-[10px] font-black brand-font uppercase tracking-tighter">FindYourSize</span>
           </div>
           <p className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.2em]">Restoring data will overwrite current analysis.</p>
        </div>
      </div>
    </div>
  );
};

export default HistoryPanel;
