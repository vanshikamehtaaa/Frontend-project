import React from 'react';
import { Building2, Mail, Phone, ShieldCheck } from 'lucide-react';

export default function Footer({ onFilterCity, onOpenPrivacy }) {
  const handleScrollTo = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCityClick = (e, cityKey) => {
    e.preventDefault();
    if (onFilterCity) {
      onFilterCity(cityKey);
    }
    const propSection = document.getElementById('properties');
    if (propSection) {
      propSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer-obsidian">
      <div className="container">
        
        <div className="footer-grid">
          <div className="footer-col brand-col">
            <a href="#" className="brand-logo footer-logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              <div className="logo-badge"><span>PC</span></div>
              <span className="logo-text">PropCapital<span className="logo-accent">.ai</span></span>
            </a>
            <p className="footer-tagline">
              NCR's dedicated AI-powered real estate ecosystem. RERA-verified luxury apartments, villas, and commercial spaces across Gurugram, Noida, and Faridabad.
            </p>
            <div className="social-row">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-pill" aria-label="Follow PropCapital on X (Twitter)">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-pill" aria-label="Subscribe to PropCapital on YouTube">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-pill" aria-label="Follow PropCapital on Facebook">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-pill" aria-label="Follow PropCapital on Instagram">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-pill" aria-label="Connect with PropCapital on LinkedIn">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4 className="col-heading">Properties</h4>
            <ul className="col-links">
              <li><a href="#properties" onClick={(e) => handleCityClick(e, 'delhi')}>DLF One Midtown & South Delhi</a></li>
              <li><a href="#properties" onClick={(e) => handleCityClick(e, 'gurugram')}>Golf Course Road, Gurugram</a></li>
              <li><a href="#properties" onClick={(e) => handleCityClick(e, 'gurugram')}>DLF Phase 5 Sky Residences</a></li>
              <li><a href="#properties" onClick={(e) => handleCityClick(e, 'gurugram')}>Dwarka Expressway Corridors</a></li>
              <li><a href="#properties" onClick={(e) => handleCityClick(e, 'noida')}>Sector 150 Expressway, Noida</a></li>
              <li><a href="#properties" onClick={(e) => handleCityClick(e, 'faridabad')}>Sector 86, Greater Faridabad</a></li>
              <li><a href="#properties" onClick={(e) => handleCityClick(e, 'commercial')}>Commercial Offices & SCO Plots</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="col-heading">Tools</h4>
            <ul className="col-links">
              <li><a href="#ai-engine" onClick={(e) => handleScrollTo(e, 'ai-engine')}>AI Smart Matchmaker</a></li>
              <li><a href="#calculator" onClick={(e) => handleScrollTo(e, 'calculator')}>Home Loan EMI Planner</a></li>
              <li><a href="#calculator" onClick={(e) => handleScrollTo(e, 'calculator')}>Stamp Duty Calculator</a></li>
              <li><a href="#nri" onClick={(e) => handleScrollTo(e, 'nri')}>4K Virtual Property Walkthrough</a></li>
              <li><a href="#properties" onClick={(e) => handleScrollTo(e, 'properties')}>RERA Registry Title Verifier</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="col-heading">Company</h4>
            <ul className="col-links">
              <li><a href="#how-it-works" onClick={(e) => handleScrollTo(e, 'how-it-works')}>How It Works</a></li>
              <li><a href="#markets" onClick={(e) => handleScrollTo(e, 'markets')}>Prime NCR Hotspots</a></li>
              <li><a href="#reviews" onClick={(e) => handleScrollTo(e, 'reviews')}>Client Testimonials</a></li>
              <li><a href="#faq" onClick={(e) => handleScrollTo(e, 'faq')}>Frequently Asked Questions</a></li>
              <li><a href="#seller-strip" onClick={(e) => handleScrollTo(e, 'seller-strip')}>List Property with 4K Photos</a></li>
              <li><a href="#how-it-works" onClick={(e) => handleScrollTo(e, 'how-it-works')}>About PropCapital.ai</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="col-heading">NRI & Office</h4>
            <ul className="col-links">
              <li><a href="#nri" onClick={(e) => handleScrollTo(e, 'nri')}>NRI FEMA Compliance Desk</a></li>
              <li><a href="#nri" onClick={(e) => handleScrollTo(e, 'nri')}>Dollar / Dirham Investment Guide</a></li>
              <li><a href="#nri" onClick={(e) => handleScrollTo(e, 'nri')}>Virtual Power of Attorney FAQ</a></li>
            </ul>
            <p className="office-line" style={{ marginTop: '14px' }}>
              <Building2 size={15} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle', color: 'var(--cyan)' }} /> 
              12th Floor, DLF Cyber City, Gurugram
            </p>
            <p className="office-line">
              <Mail size={15} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle', color: 'var(--cyan)' }} /> 
              hello@propcapital.ai
            </p>
            <p className="office-line">
              <Phone size={15} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle', color: 'var(--cyan)' }} /> 
              +91 [Insert Official Phone Number]
            </p>
            <div className="rera-pill-box">
              <ShieldCheck size={16} style={{ color: 'var(--cyan)', flexShrink: 0 }} />
              <span>RERA: HARERA-GGM-[Pending Official RERA Registration]</span>
            </div>
          </div>

        </div>

        <hr className="footer-line" />

        <div className="footer-legal-row">
          <p>© 2026 PropCapital Realty Technologies Pvt. Ltd. All rights reserved.</p>
          <div className="legal-links">
            <a href="#privacy" onClick={(e) => { e.preventDefault(); onOpenPrivacy && onOpenPrivacy('privacy'); }}>Privacy Policy</a>
            <a href="#terms" onClick={(e) => { e.preventDefault(); onOpenPrivacy && onOpenPrivacy('terms'); }}>Terms of Use</a>
            <a href="#rera" onClick={(e) => { e.preventDefault(); onOpenPrivacy && onOpenPrivacy('rera'); }}>RERA Disclaimers</a>
            <a href="#sitemap" onClick={(e) => { e.preventDefault(); onOpenPrivacy && onOpenPrivacy('sitemap'); }}>Sitemap</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
