import React from 'react';

const ReturnsPolicy: React.FC = () => {
  return (
    <div className="bg-brand-white min-h-screen py-12 md:py-24 animate-fadeIn text-center md:text-left">
      <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="text-center mb-20 space-y-4">
          <h4 className="text-[10px] md:text-xs font-bold text-brand-gold uppercase tracking-[0.5em]">Artisan Junction</h4>
          <h1 className="text-4xl md:text-7xl font-serif font-bold text-brand-earth tracking-tighter leading-none">
            RETURNS <span className="italic font-normal text-brand-earth/50">POLICY</span>
          </h1>
          <div className="w-24 h-1 bg-brand-gold mx-auto rounded-full"></div>
        </div>

        <div className="bg-white p-10 md:p-16 rounded-[48px] md:rounded-[64px] shadow-2xl border border-brand-silver/30 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 rounded-bl-[200px] pointer-events-none transition-all duration-1000 group-hover:scale-110"></div>
          
          <div className="relative z-10 space-y-12">
            <div className="space-y-6">
              <h2 className="text-2xl md:text-4xl font-serif font-bold text-brand-earth leading-tight">Artisan <span className="text-brand-gold">Guarantee</span></h2>
              <p className="text-brand-earth/60 text-sm md:text-base leading-relaxed font-light italic">
                "We want you to be completely satisfied with your textile pieces. If for any reason you are not, our returns policy is designed to be as seamless as possible."
              </p>
            </div>

            <div className="space-y-8">
              {[
                { title: 'Return Period', desc: 'You have 14 days from the date of delivery to initiate a return for a full refund or exchange.' },
                { title: 'Condition', desc: 'Items must be returned in their original condition, unworn, unwashed, and with all tags attached.' },
                { title: 'Bespoke Items', desc: 'Please note that bespoke tailoring orders are final sale and cannot be returned or exchanged, unless there is a manufacturing defect.' },
                { title: 'Refund Process', desc: 'Once your return has been received and inspected, we will process your refund within 5-7 business days.' }
              ].map((item, idx) => (
                <div key={idx} className="space-y-3 group">
                  <h4 className="text-[11px] font-black text-brand-earth uppercase tracking-widest flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold font-serif font-bold text-[10px] group-hover:bg-brand-gold group-hover:text-white transition-colors duration-500">
                      {idx + 1}
                    </div>
                    {item.title}
                  </h4>
                  <p className="text-brand-earth/60 text-sm leading-relaxed pl-9">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="pt-12 border-t border-brand-silver/20 flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold shrink-0">
                  <i className="fa-solid fa-rotate-left text-xl"></i>
                </div>
                <div>
                  <h5 className="text-[10px] font-black text-brand-earth uppercase tracking-widest mb-1">Seamless Returns</h5>
                  <p className="text-[10px] text-brand-earth/60 leading-relaxed">
                    Within 14 days of delivery.
                  </p>
                </div>
              </div>
              <button className="bg-brand-earth text-brand-gold px-10 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:brightness-110 transition shadow-xl">
                Initiate Return
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnsPolicy;
