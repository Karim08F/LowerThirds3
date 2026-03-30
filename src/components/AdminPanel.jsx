import React from 'react';
import { Settings, Eye, EyeOff, Plus, Trash2, Calendar, GripVertical, Square, Image } from 'lucide-react';
import { useSyncState } from '../hooks/useSyncState';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function AdminPanel() {
  const [data, setData] = useSyncState({
    isVisible: true,
    bgType: 'transparent',
    bgImage: '/worship_scene_bg.png',
    customLogo: '',
    events: [
      { id: '1', day: 'TUESDAY', title: 'Branch Stewardship Prayers', time: '5:30 PM', isVisible: true },
      { id: '2', day: 'WEDNESDAY', title: 'Midweek Service', time: '6:00 PM', isVisible: true },
      { id: '3', day: 'FRIDAY', title: 'Youth Kesha', time: '9:00 PM', isVisible: true },
      { id: '4', day: 'SUNDAY', title: 'Main Worship Service', time: '9:00 AM', isVisible: true }
    ]
  });

  const updateEvent = (index, field, value) => {
    const newEvents = [...data.events];
    newEvents[index][field] = value;
    setData(prev => ({ ...prev, events: newEvents }));
  };

  const addEvent = () => {
    setData(prev => ({
      ...prev,
      events: [...prev.events, { id: Date.now().toString(), day: 'NEW DAY', title: 'New Event', time: '12:00 PM', isVisible: true }]
    }));
  };

  const removeEvent = (index) => {
    setData(prev => ({
      ...prev,
      events: prev.events.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="min-h-screen bg-[#111] text-white p-8 flex items-start justify-center overflow-y-auto">
      <div className="glass-panel rounded-3xl p-8 w-[500px] flex flex-col gap-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-6">
          <div className="flex items-center gap-4">
            <div className="bg-dekut-gold p-2.5 rounded-xl">
              <Settings size={22} className="text-dekut-green" />
            </div>
            <div>
              <h2 className="font-bold text-xl tracking-tight">Program Setup</h2>
              <p className="text-xs text-white/40 uppercase tracking-widest font-semibold mt-0.5">Stacked Cards Engine</p>
            </div>
          </div>
        </div>

        {/* Global Controls */}
        <div className="grid grid-cols-2 gap-4 border-b border-white/10 pb-6">
          <button 
            onClick={() => setData(prev => ({ ...prev, isVisible: !prev.isVisible }))}
            className={cn(
              "flex items-center justify-center gap-3 rounded-2xl py-4 font-bold transition-all shadow-lg",
              data.isVisible ? "bg-dekut-gold text-dekut-green scale-105" : "bg-white/10 text-white"
            )}
          >
            {data.isVisible ? <Eye size={22} /> : <EyeOff size={22} />}
            {data.isVisible ? "GRAPHIC ON" : "GRAPHIC OFF"}
          </button>

          <div className="flex flex-col gap-2">
            <div className="flex gap-1 bg-black/40 p-1.5 rounded-xl border border-white/5 h-full">
              {[
                { id: 'transparent', icon: <Square size={16} /> },
                { id: 'chroma', color: '#00b140' },
                { id: 'black', color: '#000000' }
              ].map((bt) => (
                <button
                  key={bt.id}
                  onClick={() => setData(prev => ({ ...prev, bgType: bt.id }))}
                  className={cn(
                    "flex-1 flex items-center justify-center rounded-lg transition-all",
                    data.bgType === bt.id ? "bg-white text-black" : "text-white/40 hover:text-white/60"
                  )}
                >
                  {bt.color ? <div className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: bt.color }} /> : bt.icon}
                </button>
              ))}
            </div>
            <p className="text-[10px] text-center font-bold uppercase opacity-30 mt-1">Output: {data.bgType}</p>
          </div>

          {/* Logo Upload */}
          <div className="col-span-2 flex items-center gap-4 bg-black/40 border border-white/5 rounded-2xl p-4">
            <div className="bg-dekut-gold/20 p-3 rounded-xl text-dekut-gold">
              <Image size={24} />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold">Custom Church Logo</h3>
              <p className="text-xs text-white/50">Replace the default rotating globe</p>
            </div>
            <label className="bg-white/10 hover:bg-white/20 transition-colors px-4 py-2 rounded-lg text-sm font-bold cursor-pointer border border-white/10 text-center">
              {data.customLogo ? 'Change Logo' : 'Upload Image'}
              <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                const file = e.target.files[0];
                if(file) {
                  const reader = new FileReader();
                  reader.onload = (e) => setData(prev => ({...prev, customLogo: e.target.result}));
                  reader.readAsDataURL(file);
                }
              }} />
            </label>
            {data.customLogo && (
              <button 
                onClick={() => setData(prev => ({ ...prev, customLogo: '' }))} 
                className="text-xs text-red-400 hover:text-red-300 px-2 underline"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Event List Editor */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase opacity-50 ml-1 flex items-center gap-2">
              <Calendar size={14} className="text-dekut-gold" /> Weekly Schedule
            </label>
            <button 
              onClick={addEvent}
              className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors font-bold"
            >
              <Plus size={14} /> Add Day
            </button>
          </div>

          <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {data.events.map((evt, idx) => (
              <div key={evt.id} className="bg-black/40 border border-white/10 rounded-xl p-4 flex gap-3 relative group transition-all hover:border-white/20">
                <div className="flex flex-col gap-3 flex-grow">
                  <div className="flex gap-3">
                    <button 
                      onClick={() => updateEvent(idx, 'isVisible', evt.isVisible === false ? true : false)}
                      className={cn(
                        "p-1.5 rounded-lg transition-colors border",
                        evt.isVisible !== false 
                          ? "bg-dekut-gold/20 text-dekut-gold border-dekut-gold/50 hover:bg-dekut-gold/30" 
                          : "bg-white/5 text-white/30 border-white/10 hover:bg-white/10"
                      )}
                      title={evt.isVisible !== false ? "Hide this card" : "Show this card"}
                    >
                      {evt.isVisible !== false ? <Eye size={16} /> : <EyeOff size={16} />}
                    </button>
                    <input 
                      value={evt.day} onChange={(e) => updateEvent(idx, 'day', e.target.value.toUpperCase())}
                      className="bg-transparent border-b border-white/20 focus:border-dekut-gold outline-none text-sm font-bold uppercase w-1/2 pb-1 transition-colors"
                      placeholder="e.g. TUESDAY"
                    />
                    <input 
                      value={evt.time} onChange={(e) => updateEvent(idx, 'time', e.target.value.toUpperCase())}
                      className="bg-transparent border-b border-white/20 focus:border-dekut-gold outline-none text-sm font-semibold w-1/2 pb-1 transition-colors"
                      placeholder="e.g. 5:30 PM"
                    />
                    <button 
                      onClick={() => removeEvent(idx)}
                      className="ml-auto text-white/30 hover:text-red-400 p-1 transition-colors"
                      title="Delete card"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <input 
                    value={evt.title} onChange={(e) => updateEvent(idx, 'title', e.target.value)}
                    className="bg-transparent border-b border-white/20 focus:border-dekut-gold outline-none text-sm w-full pb-1 transition-colors opacity-80"
                    placeholder="Event Subtitle (e.g. Midweek Service)"
                  />
                </div>
              </div>
            ))}
            {data.events.length === 0 && (
              <p className="text-center text-white/30 text-sm py-8 bg-black/20 rounded-xl border border-dashed border-white/10">No events added. Click 'Add Day' to start building your schedule.</p>
            )}
          </div>
        </div>

        <div className="text-center mt-2">
            <p className="text-[10px] text-white/20 uppercase tracking-[4px]">Engine Online • Stack Mode</p>
        </div>
      </div>
    </div>
  );
}
