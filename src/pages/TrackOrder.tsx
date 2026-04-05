import React, { useState } from 'react';

interface TrackOrderProps {
  onConfirm: (orderId: string, name: string) => void;
}

const TrackOrder: React.FC<TrackOrderProps> = ({ onConfirm }) => {
  const [orderId, setOrderId] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId && name) {
      onConfirm(orderId, name);
    }
  };

  return (
    <div className="bg-brand-white min-h-screen py-12 md:py-24 animate-fadeIn">
      <div className="max-w-xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16 space-y-4">
          <h4 className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-[0.5em]">Logistics Registry</h4>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-earth tracking-tighter">
            TRACK <span className="italic font-normal text-brand-earth/50">ORDER</span>
          </h1>
          <div className="w-16 h-1 bg-gray-400 mx-auto rounded-full"></div>
        </div>

        <div className="bg-white p-10 md:p-12 rounded-[48px] shadow-2xl border border-brand-silver/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-bl-[100px] pointer-events-none"></div>
          
          <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-brand-earth/60 uppercase tracking-widest ml-1">Order Number</label>
              <input 
                required 
                type="text" 
                value={orderId}
                onChange={e => setOrderId(e.target.value)}
                className="w-full bg-white border border-brand-silver/30 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold transition-all shadow-sm placeholder:text-brand-earth/20 font-mono" 
                placeholder="e.g. ORD-12345" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-brand-earth/60 uppercase tracking-widest ml-1">Registered Name</label>
              <input 
                required 
                type="text" 
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full bg-white border border-brand-silver/30 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold transition-all shadow-sm placeholder:text-brand-earth/20" 
                placeholder="The name used for the order" 
              />
            </div>

            <div className="pt-6">
              <button 
                type="submit"
                className="w-full bg-brand-earth text-white font-bold tracking-[0.3em] py-5 rounded-2xl shadow-xl hover:-translate-y-1 transition-all uppercase text-[11px]"
              >
                CONFIRM
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
