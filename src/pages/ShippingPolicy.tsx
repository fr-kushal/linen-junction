import React from 'react';

interface ShippingPolicyProps {
  onTrackOrder: () => void;
}

const ShippingPolicy: React.FC<ShippingPolicyProps> = ({ onTrackOrder }) => {
  return (
    <div className="bg-brand-white min-h-screen py-12 md:py-24 animate-fadeIn text-center md:text-left">
      <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="text-center mb-20 space-y-4">
          <h4 className="text-[10px] md:text-xs font-bold text-gray-600 uppercase tracking-[0.5em]">Artisan Junction</h4>
          <h1 className="text-4xl md:text-7xl font-serif font-bold text-brand-earth tracking-tighter leading-none">
            SHIPPING <span className="italic font-normal text-brand-earth/50">POLICY</span>
          </h1>
          <div className="w-24 h-1 bg-gray-600 mx-auto rounded-full"></div>
        </div>

        <div className="bg-white p-10 md:p-16 rounded-[48px] md:rounded-[64px] shadow-2xl border border-brand-silver/30 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gray-100 rounded-bl-[200px] pointer-events-none transition-all duration-1000 group-hover:scale-110"></div>
          
          <div className="relative z-10 space-y-12">
            <div className="space-y-6">
              <h2 className="text-2xl md:text-4xl font-serif font-bold text-brand-earth leading-tight">Global <span className="text-gray-600">Logistics</span></h2>
              <p className="text-brand-earth/60 text-sm md:text-base leading-relaxed font-light italic">
                "We take pride in our global shipping network, ensuring your textile pieces are delivered with care and precision, no matter where you are."
              </p>
            </div>

            <div className="space-y-8">
              {[
                { title: 'Processing Time', desc: 'Orders are typically processed within 2-3 business days. Bespoke tailoring orders may take an additional 7-10 business days for artisan crafting.' },
                { title: 'Shipping Rates', desc: 'We offer complimentary standard shipping on all orders over ₹5,000. For orders below this amount, a flat rate of ₹250 applies.' },
                { title: 'Delivery Times', desc: 'Standard delivery typically takes 5-7 business days for domestic orders and 10-14 business days for international orders.' },
                { title: 'Tracking', desc: 'Once your order has been dispatched, you will receive a tracking number via email to monitor your textile journey.' }
              ].map((item, idx) => (
                <div key={idx} className="space-y-3 group">
                  <h4 className="text-[11px] font-black text-brand-earth uppercase tracking-widest flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-serif font-bold text-[10px] group-hover:bg-gray-600 group-hover:text-white transition-colors duration-500">
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
                <div className="w-12 h-12 rounded-full bg-brand-mint/10 flex items-center justify-center text-brand-earth shrink-0">
                  <i className="fa-solid fa-truck-fast text-xl"></i>
                </div>
                <div>
                  <h5 className="text-[10px] font-black text-brand-earth uppercase tracking-widest mb-1">Complimentary Shipping</h5>
                  <p className="text-[10px] text-brand-earth/60 leading-relaxed">
                    On all orders over ₹5,000.
                  </p>
                </div>
              </div>
              <button 
                onClick={onTrackOrder}
                className="bg-brand-earth text-gray-300 px-10 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:brightness-110 transition shadow-xl"
              >
                Track Your Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;
