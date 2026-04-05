import React from 'react';

const SizeGuide: React.FC = () => {
  return (
    <div className="bg-brand-white min-h-screen py-12 md:py-24 animate-fadeIn">
      <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="text-center mb-20 space-y-4">
          <h4 className="text-[10px] md:text-xs font-bold text-gray-600 uppercase tracking-[0.5em]">Artisan Junction</h4>
          <h1 className="text-4xl md:text-7xl font-serif font-bold text-brand-earth tracking-tighter leading-none">
            SIZE <span className="italic font-normal text-brand-earth/50">GUIDE</span>
          </h1>
          <div className="w-24 h-1 bg-gray-600 mx-auto rounded-full"></div>
        </div>

        <div className="bg-white p-10 md:p-20 rounded-[48px] md:rounded-[64px] shadow-2xl border border-brand-silver/30 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gray-100 rounded-bl-[200px] pointer-events-none transition-all duration-1000 group-hover:scale-110"></div>
          
          <div className="relative z-10 space-y-16">
            <div className="text-center max-w-2xl mx-auto space-y-6">
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-earth leading-tight">The Perfect <span className="text-gray-600">Fit</span></h2>
              <p className="text-brand-earth/60 text-base md:text-lg leading-relaxed font-light italic">
                "Linen is a living fabric. It breathes, moves, and softens with you. Our size guide is designed to help you find the ideal silhouette for your unique form."
              </p>
            </div>

            <div className="overflow-x-auto bg-brand-silver/5 rounded-[32px] p-8 md:p-12 border border-brand-silver/20">
              <table className="w-full text-left text-sm border-separate border-spacing-y-4">
                <thead className="text-brand-earth/50 uppercase text-[10px] tracking-[0.3em] font-bold">
                  <tr>
                    <th className="py-4 pl-4">Size Registry</th>
                    <th>Chest (in)</th>
                    <th>Waist (in)</th>
                    <th>Hips (in)</th>
                    <th className="text-right pr-4">Sleeve (in)</th>
                  </tr>
                </thead>
                <tbody className="space-y-4">
                  {[
                    { size: 'XS', chest: '32-34', waist: '26-28', hips: '34-36', sleeve: '31-32' },
                    { size: 'S', chest: '35-37', waist: '29-31', hips: '37-39', sleeve: '32-33' },
                    { size: 'M', chest: '38-40', waist: '32-34', hips: '40-42', sleeve: '33-34' },
                    { size: 'L', chest: '41-43', waist: '35-37', hips: '43-45', sleeve: '34-35' },
                    { size: 'XL', chest: '44-46', waist: '38-40', hips: '46-48', sleeve: '35-36' }
                  ].map((row, idx) => (
                    <tr key={idx} className="group hover:bg-white transition-all duration-500">
                      <td className="py-6 pl-8 rounded-l-2xl border-y border-l border-brand-silver/30">
                        <span className="font-serif font-bold text-brand-earth text-xl">{row.size}</span>
                      </td>
                      <td className="border-y border-brand-silver/30 font-bold text-brand-earth/70">{row.chest}</td>
                      <td className="border-y border-brand-silver/30 font-bold text-brand-earth/70">{row.waist}</td>
                      <td className="border-y border-brand-silver/30 font-bold text-brand-earth/70">{row.hips}</td>
                      <td className="text-right pr-8 rounded-r-2xl border-y border-r border-brand-silver/30 font-bold text-brand-earth/70">{row.sleeve}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center pt-12 border-t border-brand-silver/20">
              <div className="space-y-8">
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-brand-earth">How to <span className="text-gray-600">Measure</span></h3>
                <div className="space-y-6">
                  {[
                    { label: 'Chest', desc: 'Measure around the fullest part of your chest, keeping the tape horizontal.' },
                    { label: 'Waist', desc: 'Measure around the narrowest part of your waistline, usually near the navel.' },
                    { label: 'Hips', desc: 'Measure around the fullest part of your hips, about 8 inches below your waist.' },
                    { label: 'Sleeve', desc: 'Measure from the center back of your neck, across the shoulder, and down to the wrist.' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-6 group">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-serif font-bold shrink-0 group-hover:bg-gray-600 group-hover:text-white transition-colors duration-500">
                        {idx + 1}
                      </div>
                      <div>
                        <h5 className="text-[11px] font-black text-brand-earth uppercase tracking-widest mb-1">{item.label}</h5>
                        <p className="text-brand-earth/60 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-brand-silver/10 p-10 rounded-[40px] border border-brand-silver/30 text-center space-y-6">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <i className="fa-solid fa-scissors text-gray-600 text-2xl"></i>
                </div>
                <h4 className="text-xl font-serif font-bold text-brand-earth">Bespoke Tailoring</h4>
                <p className="text-brand-earth/60 text-sm leading-relaxed italic">
                  "If our standard registry sizes do not align with your form, our artisan tailoring unit is available to create a piece specifically for your unique measurements."
                </p>
                <div className="pt-4">
                  <button className="text-[10px] font-black text-gray-600 uppercase tracking-[0.4em] hover:text-brand-earth transition-colors">
                    Learn About Tailoring
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SizeGuide;
