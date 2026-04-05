import React, { useState } from 'react';

const CustomerSupport: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-brand-white min-h-screen py-12 md:py-24 animate-fadeIn">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="text-center mb-20 space-y-4">
          <h4 className="text-[10px] md:text-xs font-bold text-brand-gold uppercase tracking-[0.5em]">Artisan Junction</h4>
          <h1 className="text-4xl md:text-7xl font-serif font-bold text-brand-earth tracking-tighter leading-none">
            CUSTOMER <span className="italic font-normal text-brand-earth/50">SUPPORT</span>
          </h1>
          <div className="w-24 h-1 bg-brand-gold mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-start">
          {/* Contact Info */}
          <div className="lg:col-span-5 space-y-12 text-center md:text-left">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-earth leading-tight">Artisan <span className="text-brand-gold">Concierge</span></h2>
              <p className="text-brand-earth/60 text-base md:text-lg leading-relaxed font-light italic">
                "Our artisan support team is dedicated to providing you with the highest level of service. Whether you have a question about our textiles, tailoring, or an existing order, we are here to assist you."
              </p>
            </div>

            <div className="space-y-8">
              {[
                { title: 'Email Registry', icon: 'fa-envelope', value: 'concierge@artisanjunction.com' },
                { title: 'Artisan Hotline', icon: 'fa-phone', value: '+91 1800 123 4567' },
                { title: 'Global Hub', icon: 'fa-location-dot', value: '123 Textile District, Artisan City, 560001' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-center md:justify-start gap-6 group">
                  <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-white transition-colors duration-500 shrink-0">
                    <i className={`fa-solid ${item.icon} text-xl`}></i>
                  </div>
                  <div>
                    <h5 className="text-[10px] font-black text-brand-earth uppercase tracking-widest mb-1">{item.title}</h5>
                    <p className="text-brand-earth/60 text-sm font-bold">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-8 flex justify-center md:justify-start gap-4">
              {['instagram', 'facebook', 'pinterest'].map(social => (
                <button key={social} className="w-12 h-12 rounded-full border border-brand-silver/30 flex items-center justify-center text-brand-earth hover:bg-brand-earth hover:text-brand-gold transition-all">
                  <i className={`fa-brands fa-${social} text-lg`}></i>
                </button>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-10 md:p-16 rounded-[48px] md:rounded-[64px] shadow-2xl border border-brand-silver/30 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 rounded-bl-[200px] pointer-events-none transition-all duration-1000 group-hover:scale-110"></div>
              
              <div className="relative z-10">
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-brand-earth/60 uppercase tracking-widest ml-1">Full Name</label>
                        <input 
                          required 
                          type="text" 
                          value={formData.name}
                          onChange={e => setFormData({...formData, name: e.target.value})}
                          className="w-full bg-white border border-brand-silver/30 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold transition-all shadow-sm placeholder:text-brand-earth/20" 
                          placeholder="Artisan Client" 
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
                      <label className="text-[11px] font-bold text-brand-earth/60 uppercase tracking-widest ml-1">Subject</label>
                      <input 
                        required 
                        type="text" 
                        value={formData.subject}
                        onChange={e => setFormData({...formData, subject: e.target.value})}
                        className="w-full bg-white border border-brand-silver/30 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold transition-all shadow-sm placeholder:text-brand-earth/20" 
                        placeholder="How can we assist you?" 
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-brand-earth/60 uppercase tracking-widest ml-1">Message</label>
                      <textarea 
                        required 
                        value={formData.message}
                        onChange={e => setFormData({...formData, message: e.target.value})}
                        className="w-full bg-white border border-brand-silver/30 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold transition-all shadow-sm placeholder:text-brand-earth/20 h-48 resize-none" 
                        placeholder="Provide more details..."
                      />
                    </div>

                    <div className="pt-6">
                      <button 
                        type="submit"
                        className="w-full bg-brand-earth text-brand-gold font-bold tracking-[0.3em] py-5 rounded-2xl shadow-xl hover:-translate-y-1 transition-all uppercase text-xs md:text-sm group"
                      >
                        SEND DISPATCH
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="text-center space-y-8 animate-scaleUp py-12">
                    <div className="w-24 h-24 bg-brand-mint/20 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
                      <i className="fa-solid fa-paper-plane text-brand-earth text-4xl"></i>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-earth">Dispatch Sent</h2>
                    <p className="text-brand-earth/60 text-base md:text-xl font-light italic leading-relaxed">
                      "Your message has been received by our artisan concierge. We will review your dispatch and respond within 24 hours."
                    </p>
                    <div className="pt-8">
                      <button 
                        onClick={() => setSubmitted(false)}
                        className="text-[10px] font-black text-brand-gold uppercase tracking-[0.4em] hover:text-brand-earth transition-colors"
                      >
                        Send Another Dispatch
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerSupport;
