import React from 'react';
import { Search, Cpu, Video, ShieldCheck } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      num: 'STEP 01',
      icon: Search,
      title: 'Discover & Filter',
      desc: 'Browse 12,000+ verified residential & commercial properties across Delhi, Gurugram, Noida & Faridabad with accurate pricing.'
    },
    {
      num: 'STEP 02',
      icon: Cpu,
      title: 'AI Smart Evaluation',
      desc: 'Our proprietary AI analyzes 140+ micro-signals including layout efficiency, sunlight, delivery record, and official RERA registry.'
    },
    {
      num: 'STEP 03',
      icon: Video,
      title: '4K Tour & Site Visit',
      desc: 'Book an escorted private site visit or enjoy a live guided 4K virtual walkthrough with a dedicated property advisor.'
    },
    {
      num: 'STEP 04',
      icon: ShieldCheck,
      title: 'Zero Brokerage Closing',
      desc: 'Close directly at builder pricing with 100% legal title vetting, digital contracts, and ₹0 broker commission.'
    }
  ];

  return (
    <section className="section how-section" id="how-it-works">
      <div className="container">
        
        <div className="section-title-wrap">
          <div className="section-tag tag-cyan">Simple & Transparent</div>
          <h2 className="section-heading">How PropCapital Works in 4 Steps</h2>
          <p className="section-subtext">Experience a seamless real estate journey from AI discovery to zero-brokerage closing.</p>
        </div>

        <div className="how-grid">
          {steps.map((st, i) => {
            const Icon = st.icon;
            return (
              <div key={i} className="how-step-card">
                <span className="step-num-badge">{st.num}</span>
                <div className="step-icon-wrap">
                  <Icon size={20} className="text-cyan" />
                </div>
                <h3 className="step-title">{st.title}</h3>
                <p className="step-desc">{st.desc}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
