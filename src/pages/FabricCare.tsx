import React from 'react';

interface FabricCareProps {
  onOpenChat: () => void;
  onExploreArchive: () => void;
}

const FabricCare: React.FC<FabricCareProps> = ({ onOpenChat, onExploreArchive }) => {
  return (
    <div className="bg-brand-white min-h-screen py-12 md:py-24 animate-fadeIn">
      <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="text-center mb-20 space-y-4">
          <h4 className="text-[10px] md:text-xs font-bold text-brand-gold uppercase tracking-[0.5em]">Artisan Junction</h4>
          <h1 className="text-4xl md:text-7xl font-serif font-bold text-brand-earth tracking-tighter leading-none">
            FABRIC <span className="italic font-normal text-brand-earth/50">CARE</span>
          </h1>
          <div className="w-24 h-1 bg-brand-gold mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center mb-32">
          <div className="space-y-8 text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-earth leading-tight">The Art of <span className="text-brand-gold">Preservation</span></h2>
            <p className="text-brand-earth/70 leading-relaxed text-base md:text-lg italic font-light">
              "Linen is a resilient, natural fiber that becomes more beautiful with time. Proper care ensures your pieces last for generations, developing a unique character and softness."
            </p>
            <p className="text-brand-earth/60 leading-relaxed text-sm md:text-base">
              Our fabric care guide is designed to help you maintain the integrity and texture of your linen pieces, from washing and drying to ironing and storage.
            </p>
            <div className="pt-6">
              <button 
                onClick={onOpenChat}
                className="bg-brand-earth text-brand-gold px-10 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:brightness-110 transition shadow-xl"
              >
                Consult Care Assistant
              </button>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-brand-gold/10 rounded-full pointer-events-none transition-all duration-700 group-hover:scale-110"></div>
            <div className="aspect-[3/4] rounded-[48px] overflow-hidden shadow-2xl border border-brand-silver/30 relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1000" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                alt="Linen fabric care" 
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 mb-32">
          {[
            { title: 'Washing', icon: 'fa-droplet', desc: 'Hand wash or machine wash on a gentle cycle with lukewarm water and a mild detergent. Avoid bleach and harsh chemicals.' },
            { title: 'Drying', icon: 'fa-wind', desc: 'Air dry your linen pieces whenever possible. Avoid direct sunlight and high heat, which can make the fibers brittle.' },
            { title: 'Ironing', icon: 'fa-temperature-low', desc: 'Iron while the fabric is still slightly damp. Use a medium-to-high heat setting and iron on the reverse side.' }
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-10 rounded-[40px] shadow-xl border border-brand-silver/30 text-center group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="w-16 h-16 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:bg-brand-gold group-hover:text-white transition-colors duration-500">
                <i className={`fa-solid ${item.icon} text-2xl text-brand-gold group-hover:text-white transition-colors duration-500`}></i>
              </div>
              <h3 className="text-xl font-serif font-bold text-brand-earth mb-4">{item.title}</h3>
              <p className="text-brand-earth/60 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-brand-earth p-12 md:p-24 rounded-[64px] text-center text-brand-white shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 rounded-bl-[200px] pointer-events-none transition-all duration-1000 group-hover:scale-110"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-mint/5 rounded-tr-[200px] pointer-events-none transition-all duration-1000 group-hover:scale-110"></div>
          
          <div className="relative z-10 space-y-8">
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-brand-gold leading-tight">Preserve Your <span className="italic font-normal text-brand-white/50">Investment</span></h2>
            <p className="max-w-2xl mx-auto text-brand-white/70 text-base md:text-xl font-light italic">
              "With the right care, your linen pieces will become more comfortable and beautiful over time, becoming a cherished part of your wardrobe."
            </p>
            <div className="pt-8">
              <button 
                onClick={onExploreArchive}
                className="bg-brand-gold text-brand-earth px-12 py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] hover:bg-brand-white transition-all shadow-2xl"
              >
                Explore Care Archive
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FabricCare;
