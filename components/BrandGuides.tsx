
import React, { useState } from 'react';
import { X, User, UserPlus, Baby, Footprints, Info, Search } from 'lucide-react';
import { BRANDS } from '../data';
import { Gender } from '../types';
import { Language } from '../App';

interface BrandGuidesProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  t: any;
}

const BrandGuides: React.FC<BrandGuidesProps> = ({ isOpen, onClose, language, t }) => {
  const [selectedBrandId, setSelectedBrandId] = useState('nike');
  const [selectedGender, setSelectedGender] = useState<Gender>('men');
  const [searchSize, setSearchSize] = useState('');

  if (!isOpen) return null;

  const brand = BRANDS.find(b => b.id === selectedBrandId) || BRANDS[0];
  const chart = brand.sizeCharts[selectedGender];
  
  const filteredChart = chart.filter(row => 
    row.eu.toLowerCase().includes(searchSize.toLowerCase()) || 
    row.cm.toString().includes(searchSize)
  );

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-0 md:p-6">
      <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-500" onClick={onClose}></div>
      
      <div className="relative bg-white w-full max-w-5xl h-full md:h-[90vh] md:rounded-[3.5rem] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="bg-slate-950 text-white p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5">
          <div className="flex items-center gap-4">
            <div className="bg-blue-700 p-3 rounded-2xl shadow-lg shadow-blue-700/20">
              <Footprints size={24} />
            </div>
            <div>
              <h2 className="text-xl font-black brand-font uppercase tracking-tight">{t.officialSizeCharts}</h2>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">{brand.name} • TAM RESMİ LİSTE</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            {BRANDS.map(b => (
              <button 
                key={b.id}
                onClick={() => { setSelectedBrandId(b.id); setSearchSize(''); }}
                className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${selectedBrandId === b.id ? 'bg-blue-700 text-white' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}
              >
                {b.name}
              </button>
            ))}
          </div>

          <button onClick={onClose} className="absolute top-6 right-6 md:static p-3 hover:bg-white/10 rounded-full transition-colors">
            <X size={24} className="text-slate-500" />
          </button>
        </div>

        {/* Navigation & Filter */}
        <div className="bg-slate-50 border-b border-slate-100 px-8 py-6 flex flex-col lg:flex-row justify-between items-center gap-6">
          <div className="flex bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200">
             {[
               { id: 'men', icon: User, label: t.men },
               { id: 'women', icon: UserPlus, label: t.women },
               { id: 'kids', icon: Baby, label: t.kids }
             ].map(cat => (
               <button 
                 key={cat.id}
                 onClick={() => { setSelectedGender(cat.id as Gender); setSearchSize(''); }}
                 className={`flex items-center gap-3 px-6 py-3 rounded-xl transition-all ${selectedGender === cat.id ? 'bg-slate-950 text-white shadow-lg' : 'text-slate-400 hover:text-slate-900'}`}
               >
                 <cat.icon size={14} className="shrink-0" />
                 <span className="text-[10px] font-black uppercase tracking-widest">{cat.label}</span>
               </button>
             ))}
          </div>

          <div className="relative w-full lg:w-64">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text"
              placeholder="NUMARA ARA (EU)..."
              value={searchSize}
              onChange={(e) => setSearchSize(e.target.value)}
              className="w-full pl-12 pr-6 py-3 bg-white border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest focus:ring-4 focus:ring-blue-50 outline-none transition-all"
            />
          </div>
          
          <div className="hidden lg:flex items-center gap-3 bg-blue-50 px-4 py-2 rounded-full border border-blue-100">
            <Info size={14} className="text-blue-700" />
            <span className="text-[9px] font-black text-blue-700 uppercase tracking-widest">{chart.length} VERİ NOKTASI</span>
          </div>
        </div>

        {/* Table Content */}
        <div className="flex-1 overflow-y-auto bg-white p-4 md:p-8">
          <div className="w-full border border-slate-100 rounded-[2rem] overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-950 text-white">
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest brand-font border-r border-white/5">{t.euShort}</th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest brand-font border-r border-white/5">{t.usShort}</th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest brand-font border-r border-white/5">{t.ukShort}</th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest brand-font">{t.cmShort}</th>
                </tr>
              </thead>
              <tbody>
                {filteredChart.length > 0 ? filteredChart.map((row, i) => (
                  <tr key={i} className={`border-b border-slate-50 transition-colors hover:bg-blue-50/30 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                    <td className="px-6 py-4 font-black text-slate-900 text-sm md:text-base border-r border-slate-100">{row.eu}</td>
                    <td className="px-6 py-4 font-bold text-slate-500 text-sm border-r border-slate-100">{row.us}</td>
                    <td className="px-6 py-4 font-bold text-slate-500 text-sm border-r border-slate-100">{row.uk}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                         <span className="font-black text-blue-700 text-sm">{row.cm}</span>
                         <span className="text-[8px] font-black text-slate-300 uppercase">CM</span>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-20 text-center text-slate-300 font-black text-[10px] uppercase tracking-[0.5em]">Sonuç Bulunamadı</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="p-8 bg-slate-50 border-t border-slate-100 flex items-center justify-center gap-6">
           <img src={brand.logo} alt={brand.name} className="h-8 object-contain grayscale opacity-20" />
           <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.5em] leading-none">Global Sizing Standards • Official Partnership Data</p>
        </div>
      </div>
    </div>
  );
};

export default BrandGuides;
