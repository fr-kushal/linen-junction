import React from 'react';
import { motion } from 'motion/react';

const Archive: React.FC = () => {
  const timelineData = [
    {
      year: '2024',
      title: 'The First Thread',
      subtitle: 'ARTISAN MASTERY',
      side: 'left',
      content: (
        <div className="bg-white p-6 md:p-8 rounded-[32px] shadow-xl border border-brand-silver/30 space-y-6">
          <p className="text-brand-earth/80 italic font-medium leading-relaxed text-base">
            "We launched with 5 master weavers in our Bangalore studio, dedicated to the ancient craft of pure flax weaving."
          </p>
          <div className="space-y-4">
            <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-brand-earth/60">
              <span>CAPACITY</span>
              <span>HANDCRAFTED</span>
            </div>
            <div className="flex gap-1 h-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className={`flex-1 rounded-full ${i <= 3 ? 'bg-brand-earth/40' : 'bg-brand-silver/20'}`}></div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      year: '2025',
      title: 'Green Bloom',
      subtitle: 'ECOLOGICAL COMMITMENT',
      side: 'right',
      content: (
        <div className="bg-white p-6 md:p-8 rounded-[32px] shadow-xl border border-brand-silver/30 flex items-center gap-6">
          <div className="w-16 h-16 rounded-full border-4 border-brand-earth flex items-center justify-center flex-shrink-0">
            <i className="fa-solid fa-leaf text-2xl text-brand-earth"></i>
          </div>
          <div className="space-y-1">
            <h4 className="text-xl font-serif font-bold text-brand-earth">100% Eco-Sync</h4>
            <p className="text-sm text-brand-earth/70 font-medium leading-relaxed">
              We eliminated all plastic from our fulfillment cycle, reaching a full ecological loop.
            </p>
          </div>
        </div>
      )
    },
    {
      year: '2026',
      title: 'Digital Bloom',
      subtitle: 'GLOBAL COMMUNITY',
      side: 'left',
      content: (
        <div className="bg-white p-6 md:p-8 rounded-[32px] shadow-xl border border-brand-silver/30 space-y-6">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-4xl font-serif font-bold text-brand-earth">50,000+</p>
              <p className="text-xs font-bold text-brand-earth/60 uppercase tracking-widest">ENTHUSIASTS</p>
            </div>
            <div className="text-brand-mint font-bold text-sm">+400% Growth</div>
          </div>
          <div className="h-12 w-full relative overflow-hidden rounded-lg bg-brand-gold/10">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 20" preserveAspectRatio="none">
              <path 
                d="M0,18 Q25,15 50,10 T100,2" 
                fill="none" 
                stroke="var(--color-brand-earth)" 
                strokeWidth="3"
                className="opacity-40"
              />
            </svg>
          </div>
          <p className="text-xs text-brand-earth/70 font-medium italic text-center">
            "Bridging traditional flax weaving with modern AI textile care."
          </p>
        </div>
      )
    }
  ];

  return (
    <div className="bg-brand-cream min-h-screen py-20 px-6 md:px-12 lg:px-16 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24 space-y-6"
        >
          <div className="inline-block px-6 py-2 rounded-full border border-brand-silver/80 text-xs font-bold text-brand-earth/70 uppercase tracking-[0.3em]">
            THE HERITAGE THREAD
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-brand-earth tracking-tight">
            Our <span className="italic font-normal text-brand-earth/60">Loomed</span> Legacy.
          </h1>
          <p className="max-w-lg mx-auto text-brand-earth/70 text-base md:text-lg font-medium">
            Discover the data behind our journey from Indian flax to organic luxury.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Central Thread (Line) */}
          <div className="absolute left-1/2 top-0 bottom-0 w-2 bg-brand-silver/90 -translate-x-1/2 hidden md:block"></div>
          
          {/* Mobile Thread */}
          <div className="absolute left-4 top-0 bottom-0 w-2 bg-brand-silver/90 md:hidden"></div>

          <div className="space-y-24 md:space-y-32">
            {timelineData.map((item, idx) => (
              <div key={idx} className={`relative flex flex-col md:flex-row items-center ${item.side === 'right' ? 'md:flex-row-reverse' : ''}`}>
                {/* Year Marker */}
                <div className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-brand-earth border-4 border-brand-cream z-10 hidden md:block"></div>
                
                {/* Mobile Year Marker */}
                <div className="absolute left-4 -translate-x-1/2 w-3 h-3 rounded-full bg-brand-earth border-4 border-brand-cream z-10 md:hidden"></div>

                {/* Content Area */}
                <div className={`w-full md:w-[45%] ${item.side === 'left' ? 'md:pr-12' : 'md:pl-12'} pl-12 md:pl-0`}>
                  <motion.div
                    initial={{ opacity: 0, x: item.side === 'left' ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-4"
                  >
                    <div className={`text-center ${item.side === 'left' ? 'md:text-right' : 'md:text-left'} text-left`}>
                      <h3 className="text-4xl md:text-5xl font-serif font-bold text-brand-earth">{item.year}</h3>
                      <p className="text-xl md:text-2xl font-serif font-bold text-brand-earth/90">{item.title}</p>
                      <p className="text-xs md:text-sm font-bold text-brand-earth/60 uppercase tracking-[0.3em]">{item.subtitle}</p>
                    </div>
                    {item.content}
                  </motion.div>
                </div>
                
                {/* Spacer for the other side on desktop */}
                <div className="hidden md:block md:w-[45%]"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-32 text-center space-y-10"
        >
          <div className="w-10 h-10 rounded-full bg-brand-earth text-brand-gold flex items-center justify-center mx-auto animate-bounce shadow-xl">
            <i className="fa-solid fa-arrow-down"></i>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-earth">The Future is Organic.</h2>
            <p className="text-brand-earth/50 text-sm md:text-base max-w-md mx-auto">
              Join the thread that builds a more sustainable, breathable world.
            </p>
          </div>

          <motion.button 
            whileHover={{ 
              scale: 1.05, 
              backgroundColor: "#D4AF37", // brand-gold
              color: "#2D2A26", // brand-earth
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
            className="bg-brand-earth text-brand-gold px-12 py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] transition-colors duration-300 shadow-2xl"
          >
            JOIN THE MOVEMENT
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Archive;
