import React from 'react';
import { Video, Scale, TrendingUp, FileText, Phone, Globe } from 'lucide-react';

export default function NRIDesk({ onOpenConsultation }) {
  const handleScrollToCalc = (e) => {
    e.preventDefault();
    const calcEl = document.getElementById('calculator');
    if (calcEl) {
      calcEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="section nri-section" id="nri">
      <div className="container">
        
        <div className="nri-card-wrapper">
          <div className="nri-text-col">
            <div className="section-tag tag-cyan">Global Indian Investors</div>
            <h2 className="section-heading">Invest in High-Yield NCR Properties from Anywhere</h2>
            <p className="section-subtext">Dedicated desk for NRIs in USA, UAE, UK, and Singapore. 4K virtual property walkthroughs, legal FEMA compliance, and end-to-end tenant management.</p>

            <div className="nri-perks-grid">
              <div className="nri-perk-item">
                <Video size={18} className="text-cyan" />
                <div>
                  <strong>Virtual 4K Tours</strong>
                  <span>Guided video inspection at ₹499</span>
                </div>
              </div>

              <div className="nri-perk-item">
                <Scale size={18} className="text-cyan" />
                <div>
                  <strong>FEMA Compliance</strong>
                  <span>RBI regulations & NRE/NRO assistance</span>
                </div>
              </div>

              <div className="nri-perk-item">
                <TrendingUp size={18} className="text-cyan" />
                <div>
                  <strong>7–12% Yields</strong>
                  <span>Grade-A IT & commercial spaces</span>
                </div>
              </div>

              <div className="nri-perk-item">
                <FileText size={18} className="text-cyan" />
                <div>
                  <strong>Digital e-Sign</strong>
                  <span>Aadhaar legal digital contracts</span>
                </div>
              </div>
            </div>

            <div className="nri-cta-buttons">
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={onOpenConsultation}
              >
                <Phone size={15} /> <span>Talk to NRI Specialist</span>
              </button>
              <a 
                href="#calculator" 
                className="btn btn-secondary"
                onClick={handleScrollToCalc}
              >
                Calculate NRI Costs
              </a>
            </div>
          </div>

          <div className="nri-visual-col">
            <div className="nri-floating-stat">
              <Globe size={18} className="text-cyan" />
              <div>
                <strong>450+ NRIs Served</strong>
                <span>Across 18 Countries</span>
              </div>
            </div>
            <img 
              src="https://images.unsplash.com/photo-1569017388730-020b5f80a004?w=800&auto=format&fit=crop&q=80" 
              alt="NRI Real Estate Hub" 
              loading="lazy" 
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80';
              }}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
