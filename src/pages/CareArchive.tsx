import React from 'react';
import { motion } from 'motion/react';

const CareArchive: React.FC = () => {
  return (
    <div className="bg-brand-cream min-h-screen py-12 md:py-24 animate-fadeIn">
      <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="text-center mb-16 space-y-4">
          <h4 className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-[0.5em]">Artisan Registry</h4>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-brand-earth tracking-tighter">
            CARE <span className="italic font-normal text-brand-earth/50">ARCHIVE</span>
          </h1>
          <div className="w-20 h-1 bg-gray-400 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { 
              title: "The Wash", 
              icon: "fa-faucet-drip", 
              content: "Use cool water and mild soap. Linen loves space—don't overcrowd the machine." 
            },
            { 
              title: "The Dry", 
              icon: "fa-sun", 
              content: "Air dry in shade. Avoid high heat; it makes fibers brittle. Lay flat if possible." 
            },
            { 
              title: "The Press", 
              icon: "fa-wind", 
              content: "Iron while damp on high heat. The wrinkles are part of the charm, but a steam press works wonders." 
            },
            { 
              title: "The Storage", 
              icon: "fa-box-archive", 
              content: "Store in a cool, dry place. Avoid plastic bags; linen needs to breathe to stay fresh." 
            }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-8 rounded-[32px] shadow-lg border border-brand-silver/30 space-y-4 hover:shadow-xl transition-shadow"
            >
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                <i className={`fa-solid ${item.icon} text-xl`}></i>
              </div>
              <h3 className="text-xl font-serif font-bold text-brand-earth">{item.title}</h3>
              <p className="text-brand-earth/60 text-sm leading-relaxed font-light italic">
                "{item.content}"
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-brand-earth/40 text-[10px] uppercase tracking-widest font-bold">
            Linen becomes softer and more beautiful with every wash.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CareArchive;
