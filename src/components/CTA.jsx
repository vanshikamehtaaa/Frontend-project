import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export default function CTA({ onOpenSellerModal }) {
  return (
    <section className="section seller-section" id="seller-strip">
      <div className="container">
        
        <div className="seller-strip-box">
          <div className="seller-text">
            <div className="section-tag tag-cyan">For Property Owners</div>
            <h2 className="seller-heading">
              List Your Property on PropCapital.<br />
              <span className="gradient-text">Zero Listing Fee. Maximum Reach.</span>
            </h2>
            <p className="seller-para">
              Our professional team arrives within 24 hours for a complimentary 4K HD photo & video shoot. We syndicate your residential or commercial property across 20+ portals and match verified buyers through AI.
            </p>
            <ul className="seller-bullets">
              <li><CheckCircle2 size={16} /> Free 4K HD Professional Shoot & Floorplan</li>
              <li><CheckCircle2 size={16} /> Syndicated to 50,000+ active pre-approved buyers</li>
              <li><CheckCircle2 size={16} /> 2-Hour Advisor Callback Guarantee</li>
            </ul>
            <div className="seller-actions">
              <button 
                type="button" 
                className="btn btn-primary" 
                onClick={() => onOpenSellerModal && onOpenSellerModal('List Property Free')}
              >
                List for Free <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
