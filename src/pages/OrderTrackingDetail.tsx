import React from 'react';
import { motion } from 'motion/react';

interface OrderTrackingDetailProps {
  orderId: string;
  name: string;
}

const OrderTrackingDetail: React.FC<OrderTrackingDetailProps> = ({ orderId, name }) => {
  const steps = [
    { status: 'Order Received', date: 'Mar 14, 2026', completed: true },
    { status: 'Artisan Inspection', date: 'Mar 15, 2026', completed: true },
    { status: 'In Transit', date: 'Mar 16, 2026', completed: true, active: true },
    { status: 'Out for Delivery', date: 'Expected Mar 18', completed: false },
    { status: 'Delivered', date: 'Expected Mar 18', completed: false }
  ];

  return (
    <div className="bg-brand-cream min-h-screen py-12 md:py-24 animate-fadeIn">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <div className="bg-white p-10 md:p-16 rounded-[64px] shadow-2xl border border-brand-silver/30 space-y-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-b border-brand-silver/20 pb-10">
            <div className="text-center md:text-left">
              <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Tracking Registry</h4>
              <h2 className="text-3xl font-serif font-bold text-brand-earth">{orderId}</h2>
            </div>
            <div className="text-center md:text-right">
              <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Customer</h4>
              <p className="text-lg font-serif italic text-brand-earth/70">{name}</p>
            </div>
          </div>

          <div className="space-y-12 relative">
            {/* Vertical Line */}
            <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-brand-silver/30"></div>

            {steps.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex gap-8 relative z-10"
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-4 border-white shadow-md ${step.completed ? 'bg-brand-mint text-white' : 'bg-brand-silver/20 text-brand-earth/20'}`}>
                  {step.completed ? (
                    <i className="fa-solid fa-check text-[10px]"></i>
                  ) : (
                    <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
                  )}
                </div>
                <div className="flex-1 pb-4">
                  <div className="flex justify-between items-start">
                    <h5 className={`text-base font-serif font-bold ${step.active ? 'text-brand-earth' : 'text-brand-earth/60'}`}>
                      {step.status}
                      {step.active && <span className="ml-3 text-[8px] bg-brand-mint/20 text-brand-mint px-2 py-0.5 rounded-full uppercase tracking-widest">Live</span>}
                    </h5>
                    <span className="text-[10px] font-bold text-brand-earth/30 uppercase tracking-widest">{step.date}</span>
                  </div>
                  {step.active && (
                    <p className="text-xs text-brand-earth/50 mt-2 italic">
                      "Your textile selection is currently being handled by our premium logistics partner."
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="pt-10 border-t border-brand-silver/20 text-center">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">
              Estimated Arrival: March 18, 2026
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTrackingDetail;
