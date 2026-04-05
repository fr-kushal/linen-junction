import React, { useState } from 'react';

const ReturnRequest: React.FC = () => {
  const [formData, setFormData] = useState({
    orderId: '',
    email: '',
    reason: '',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-brand-white min-h-screen py-12 md:py-24 flex items-center justify-center px-6 md:px-12 lg:px-16 animate-fadeIn">
      <div className="max-w-3xl w-full bg-white rounded-[48px] md:rounded-[64px] shadow-2xl border border-brand-silver/30 overflow-hidden relative group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 rounded-bl-[200px] pointer-events-none transition-all duration-1000 group-hover:scale-110"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-mint/5 rounded-tr-[200px] pointer-events-none transition-all duration-1000 group-hover:scale-110"></div>
        
        <div className="p-10 md:p-20 relative z-10">
          {!submitted ? (
            <>
              <div className="text-center mb-12 space-y-4">
                <h4 className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.5em]">Artisan Junction</h4>
                <h1 className="text-3xl md:text-5xl font-serif font-bold text-brand-earth tracking-tight">Return Request</h1>
                <div className="w-12 h-1 bg-brand-gold mx-auto rounded-full"></div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-brand-earth/60 uppercase tracking-widest ml-1">Order ID</label>
                    <input 
                      required 
                      type="text" 
                      value={formData.orderId}
                      onChange={e => setFormData({...formData, orderId: e.target.value})}
                      className="w-full bg-white border border-brand-silver/30 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold transition-all shadow-sm placeholder:text-brand-earth/20 font-mono" 
                      placeholder="LJ-FB-000" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-brand-earth/60 uppercase tracking-widest ml-1">Email Address</label>
                    <input 
                      required 
                      type="email" 
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-white border border-brand-silver/30 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold transition-all shadow-sm placeholder:text-brand-earth/20" 
                      placeholder="your@email.com" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-brand-earth/60 uppercase tracking-widest ml-1">Reason for Return</label>
                  <select 
                    required 
                    value={formData.reason}
                    onChange={e => setFormData({...formData, reason: e.target.value})}
                    className="w-full bg-white border border-brand-silver/30 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold transition-all shadow-sm placeholder:text-brand-earth/20"
                  >
                    <option value="">Select a reason</option>
                    <option value="size">Incorrect Size</option>
                    <option value="color">Color Mismatch</option>
                    <option value="quality">Quality Issue</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-brand-earth/60 uppercase tracking-widest ml-1">Additional Notes</label>
                  <textarea 
                    value={formData.notes}
                    onChange={e => setFormData({...formData, notes: e.target.value})}
                    className="w-full bg-white border border-brand-silver/30 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold transition-all shadow-sm placeholder:text-brand-earth/20 h-32 resize-none" 
                    placeholder="Provide more details..."
                  />
                </div>

                <div className="pt-6">
                  <button 
                    type="submit"
                    className="w-full bg-brand-earth text-brand-gold font-bold tracking-[0.3em] py-5 rounded-2xl shadow-xl hover:-translate-y-1 transition-all uppercase text-xs md:text-sm group"
                  >
                    SUBMIT RETURN REQUEST
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="text-center space-y-8 animate-scaleUp">
              <div className="w-24 h-24 bg-brand-mint/20 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
                <i className="fa-solid fa-check text-brand-earth text-4xl"></i>
              </div>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-earth">Request Received</h2>
              <p className="text-brand-earth/60 text-base md:text-xl font-light italic leading-relaxed">
                "Your return request has been logged in our registry. Our artisan support team will review it and contact you within 24-48 hours."
              </p>
              <div className="pt-8">
                <button 
                  onClick={() => setSubmitted(false)}
                  className="text-[10px] font-black text-brand-gold uppercase tracking-[0.4em] hover:text-brand-earth transition-colors"
                >
                  Return to Registry
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReturnRequest;
