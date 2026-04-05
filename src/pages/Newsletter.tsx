import React, { useState } from 'react';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
  };

  return (
    <div className="bg-brand-white min-h-screen py-12 md:py-24 flex items-center justify-center px-6 md:px-12 lg:px-16 animate-fadeIn">
      <div className="max-w-4xl w-full bg-white rounded-[48px] md:rounded-[64px] shadow-2xl border border-brand-silver/30 overflow-hidden relative group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 rounded-bl-[200px] pointer-events-none transition-all duration-1000 group-hover:scale-110"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-mint/5 rounded-tr-[200px] pointer-events-none transition-all duration-1000 group-hover:scale-110"></div>
        
        <div className="p-12 md:p-24 relative z-10 text-center space-y-12">
          {!subscribed ? (
            <>
              <div className="space-y-4">
                <h4 className="text-[10px] md:text-xs font-bold text-brand-gold uppercase tracking-[0.5em]">The Loom Dispatch</h4>
                <h1 className="text-4xl md:text-7xl font-serif font-bold text-brand-earth tracking-tighter leading-none">
                  JOIN THE <span className="italic font-normal text-brand-earth/50">INNER CIRCLE</span>
                </h1>
                <div className="w-16 h-1 bg-brand-gold mx-auto rounded-full"></div>
              </div>
              
              <p className="max-w-xl mx-auto text-brand-earth/60 text-base md:text-lg leading-relaxed font-light italic">
                "Receive exclusive access to our limited-edition textile releases, artisan insights, and bespoke tailoring previews."
              </p>

              <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
                <div className="relative group/input">
                  <input 
                    required 
                    type="email" 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full bg-white border border-brand-silver/30 rounded-2xl p-6 text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold transition-all text-center placeholder:text-brand-earth/20 font-serif shadow-sm" 
                    placeholder="your@email.com" 
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full bg-brand-earth text-brand-gold font-bold tracking-[0.3em] py-6 rounded-2xl shadow-2xl hover:-translate-y-1 transition-all uppercase text-xs md:text-sm group"
                >
                  AUTHORIZE SUBSCRIPTION
                </button>
              </form>

              <p className="text-[10px] text-brand-earth/30 uppercase tracking-widest">
                We value your privacy. No spam, only artisan dispatches.
              </p>
            </>
          ) : (
            <div className="space-y-8 animate-scaleUp">
              <div className="w-24 h-24 bg-brand-mint/20 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
                <i className="fa-solid fa-check text-brand-earth text-4xl"></i>
              </div>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-earth">Welcome to the Registry</h2>
              <p className="text-brand-earth/60 text-base md:text-xl font-light italic">
                "Your subscription has been authorized. Expect our first dispatch shortly."
              </p>
              <div className="pt-8">
                <button 
                  onClick={() => setSubscribed(false)}
                  className="text-[10px] font-black text-brand-gold uppercase tracking-[0.4em] hover:text-brand-earth transition-colors"
                >
                  Return to Dispatch
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
