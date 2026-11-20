import React from 'react';
import { Star } from 'lucide-react';

export default function Testimonials() {
  const reviews = [
    {
      avatarInitials: 'AS',
      name: 'Anurag Singhal',
      role: 'VP of Product • Cyber City Gurugram',
      text: 'PropCapital\'s AI Smart Match suggested M3M Golfestate within 30 seconds. Saved ₹5.2 Lakh in broker commission and closed the deal in 10 days with complete RERA verification!'
    },
    {
      avatarInitials: 'RK',
      name: 'Rohit Khurana',
      role: 'NRI Investor • Dubai, UAE',
      text: 'As an NRI living in Dubai, inspecting properties was a nightmare. PropCapital arranged a 4K live video tour and handled FEMA legal verification smoothly. Highly recommended!'
    },
    {
      avatarInitials: 'PS',
      name: 'Pooja Sharma',
      role: 'Software Architect • Noida Expressway',
      text: 'The EMI calculator and AI advisor answered all my doubts about Sector 150 Noida. Zero pushy sales calls, honest RERA records, and ₹0 brokerage. Super clean platform.'
    }
  ];

  return (
    <section className="section testimonials-section" id="reviews">
      <div className="container">
        
        <div className="section-title-wrap">
          <div className="section-tag tag-cyan">Verified Buyers & Investors</div>
          <h2 className="section-heading">Trusted by 1,400+ NCR Property Buyers & Investors</h2>
          <p className="section-subtext">Real experiences from residential buyers & commercial investors who closed at zero brokerage.</p>
        </div>

        <div className="testimonials-grid">
          {reviews.map((rev, i) => (
            <div key={i} className="testimonial-card">
              <div className="stars-row">
                {[...Array(5)].map((_, s) => (
                  <Star key={s} size={15} fill="#00f2fe" color="#00f2fe" className="star-icon" />
                ))}
              </div>
              <p className="review-text">
                "{rev.text}"
              </p>
              <div className="reviewer-info">
                <div className="reviewer-avatar">{rev.avatarInitials}</div>
                <div>
                  <strong>{rev.name}</strong>
                  <span>{rev.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
