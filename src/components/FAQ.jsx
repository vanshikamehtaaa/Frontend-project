import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'How does PropCapital offer 100% Zero Brokerage for buyers?',
      a: 'We partner directly with certified tier-1 developers across NCR (DLF, M3M, Godrej, Tata, Puri, Sobha). Developers compensate our platform directly, allowing us to offer complete advisory, legal title vetting, and escorted site visits to home buyers with ₹0 broker commission.'
    },
    {
      q: 'How are properties verified against official RERA records?',
      a: 'Every project listed on PropCapital undergoes automated and manual verification with HARERA (Haryana RERA) and UPRERA (Uttar Pradesh RERA). We inspect escrow account compliance, construction completion milestones, sanctioned architectural layout maps, and government encumbrance certificates before listing.'
    },
    {
      q: 'Can NRIs and OCIs legally purchase luxury residential & commercial properties in NCR?',
      a: 'Yes. Under Reserve Bank of India (RBI) FEMA guidelines, Non-Resident Indians (NRIs) and Overseas Citizens of India (OCIs) can freely acquire residential and commercial properties in India without prior RBI approval. We provide dedicated virtual 4K video walkthroughs, Power of Attorney (PoA) assistance, and NRE/NRO banking compliance.'
    },
    {
      q: 'How does the 4K Virtual Guided Site Visit work?',
      a: 'Once you schedule a virtual tour, our on-ground property advisor visits the actual property or sample flat equipped with a 4K 60fps gimbal stabilization camera. You connect over a private live stream to inspect carpet area dimensions, natural sunlight angles, balcony views, and neighborhood infrastructure in real-time.'
    },
    {
      q: 'How accurate is the Real-Time EMI & Loan Planner?',
      a: 'Our EMI planner uses the standard reducing balance compound interest formula matching top Indian lenders (SBI, HDFC, ICICI). It calculates exact monthly principal and interest splits based on prevailing prime home loan benchmark rates starting from 8.35% p.a., with zero hidden processing charges.'
    },
    {
      q: 'What is IRA Real Estate AI Advisor and how is my data protected?',
      a: 'IRA is our proprietary neural property evaluation engine. It analyzes historical registry transaction records, circle rates, and infrastructure master plans to deliver unbiased price forecasts. We maintain strict enterprise encryption (AES-256) and never sell your contact details or search history to third-party telemarketers.'
    }
  ];

  const toggleFaq = (index) => {
    setOpenIndex(prev => (prev === index ? -1 : index));
  };

  return (
    <section className="section faq-section" id="faq">
      <div className="container">
        
        <div className="faq-header">
          <div className="section-tag tag-cyan">
            <HelpCircle size={13} /> <span>CLARITY & CONFIDENCE</span>
          </div>
          <h2 className="section-heading">Frequently Asked Questions</h2>
          <p className="section-subtext">Everything you need to know about RERA verified transactions, zero brokerage, virtual tours, and legal title clearance.</p>
        </div>

        <div className="faq-accordion-container" id="faqAccordion">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className={`faq-card ${isOpen ? 'open' : ''}`}>
                <button 
                  type="button"
                  className="faq-question-btn"
                  onClick={() => toggleFaq(i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                >
                  <span>{faq.q}</span>
                  <ChevronDown size={18} className="faq-chevron" />
                </button>
                <div 
                  id={`faq-answer-${i}`} 
                  className="faq-answer-wrapper"
                  style={{ maxHeight: isOpen ? '400px' : '0px' }}
                >
                  <div className="faq-answer-content">
                    {faq.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
