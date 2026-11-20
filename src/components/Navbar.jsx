import React, { useState, useEffect, useRef } from 'react';
import { 
  MapPin, 
  ChevronDown, 
  Sparkles, 
  Menu, 
  X, 
  User 
} from 'lucide-react';

export default function Navbar({ 
  selectedCity, 
  onSelectCity, 
  onOpenAuth, 
  onFilterCity 
}) {
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cityDropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (cityDropdownRef.current && !cityDropdownRef.current.contains(event.target)) {
        setIsCityDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCityChange = (cityKey, cityName) => {
    onSelectCity(cityName);
    setIsCityDropdownOpen(false);
    if (onFilterCity) {
      onFilterCity(cityKey);
    }
  };

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="navbar-header" id="navbar">
      <div className="container navbar-container">
        <a 
          href="#" 
          className="brand-logo" 
          aria-label="PropCapital.ai"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        >
          <div className="logo-badge">
            <span>PC</span>
          </div>
          <span className="logo-text">PropCapital<span className="logo-accent">.ai</span></span>
        </a>

        <nav className="nav-links" id="navLinks" aria-label="Main Navigation">
          <a href="#properties" className="nav-link" onClick={(e) => handleNavClick(e, 'properties')}>Properties</a>
          <a href="#how-it-works" className="nav-link" onClick={(e) => handleNavClick(e, 'how-it-works')}>How It Works</a>
          <a href="#ai-engine" className="nav-link nav-link-ai" onClick={(e) => handleNavClick(e, 'ai-engine')}>
            <Sparkles size={14} className="ai-sparkle-icon" /> AI Smart Match
          </a>
          <a href="#markets" className="nav-link" onClick={(e) => handleNavClick(e, 'markets')}>Markets</a>
          <a href="#nri" className="nav-link" onClick={(e) => handleNavClick(e, 'nri')}>NRI Desk</a>
          <a href="#calculator" className="nav-link" onClick={(e) => handleNavClick(e, 'calculator')}>EMI Planner</a>
          <a href="#reviews" className="nav-link" onClick={(e) => handleNavClick(e, 'reviews')}>Reviews</a>
          <a href="#faq" className="nav-link" onClick={(e) => handleNavClick(e, 'faq')}>FAQs</a>
        </nav>

        <div className="nav-actions">
          <div 
            className="city-selector" 
            id="cityDropdownBtn" 
            ref={cityDropdownRef}
            onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
            role="button"
            tabIndex={0}
            aria-expanded={isCityDropdownOpen}
            aria-label="Select City"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setIsCityDropdownOpen(!isCityDropdownOpen);
              }
            }}
          >
            <MapPin size={14} className="city-icon" />
            <span id="selectedCityName">{selectedCity}</span>
            <ChevronDown size={14} className={`dropdown-arrow ${isCityDropdownOpen ? 'rotate' : ''}`} />

            {isCityDropdownOpen && (
              <div className="city-dropdown-menu show" role="menu">
                <button 
                  type="button"
                  className={`city-item ${selectedCity === 'All NCR' ? 'active' : ''}`}
                  onClick={(e) => { e.stopPropagation(); handleCityChange('all', 'All NCR'); }}
                >
                  <strong>All NCR</strong>
                  <span>Delhi, Gurugram, Noida & Faridabad</span>
                </button>
                <button 
                  type="button"
                  className={`city-item ${selectedCity === 'Delhi' ? 'active' : ''}`}
                  onClick={(e) => { e.stopPropagation(); handleCityChange('delhi', 'Delhi'); }}
                >
                  <strong>Delhi</strong>
                  <span>South Delhi, Moti Nagar & Okhla</span>
                </button>
                <button 
                  type="button"
                  className={`city-item ${selectedCity === 'Gurugram' ? 'active' : ''}`}
                  onClick={(e) => { e.stopPropagation(); handleCityChange('gurugram', 'Gurugram'); }}
                >
                  <strong>Gurugram</strong>
                  <span>Golf Course Rd, DLF, Sohna</span>
                </button>
                <button 
                  type="button"
                  className={`city-item ${selectedCity === 'Noida' ? 'active' : ''}`}
                  onClick={(e) => { e.stopPropagation(); handleCityChange('noida', 'Noida'); }}
                >
                  <strong>Noida</strong>
                  <span>Sector 150, Expressway</span>
                </button>
                <button 
                  type="button"
                  className={`city-item ${selectedCity === 'Faridabad' ? 'active' : ''}`}
                  onClick={(e) => { e.stopPropagation(); handleCityChange('faridabad', 'Faridabad'); }}
                >
                  <strong>Faridabad</strong>
                  <span>NIT, Sector 86, Neharpar</span>
                </button>
              </div>
            )}
          </div>

          <button 
            type="button"
            className="btn btn-login" 
            id="openLoginBtn"
            onClick={onOpenAuth}
            aria-label="Sign In"
          >
            <User size={15} />
            <span>Sign In</span>
          </button>

          <a 
            href="#seller-strip" 
            className="btn btn-primary btn-nav-cta"
            onClick={(e) => handleNavClick(e, 'seller-strip')}
          >
            List Property <span className="badge-zero">₹0 FEE</span>
          </a>

          <button 
            type="button"
            className="mobile-toggle-btn" 
            id="mobileMenuToggle" 
            aria-label="Menu"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

      </div>

      <div className={`mobile-nav-drawer ${isMobileMenuOpen ? 'open' : ''}`} id="mobileDrawer">
        <div className="mobile-drawer-content">
          <a href="#properties" className="mobile-nav-link" onClick={(e) => handleNavClick(e, 'properties')}>
            Explore Properties
          </a>
          <a href="#how-it-works" className="mobile-nav-link" onClick={(e) => handleNavClick(e, 'how-it-works')}>
            How It Works
          </a>
          <a href="#ai-engine" className="mobile-nav-link text-cyan" onClick={(e) => handleNavClick(e, 'ai-engine')}>
            ✨ AI Smart Match
          </a>
          <a href="#markets" className="mobile-nav-link" onClick={(e) => handleNavClick(e, 'markets')}>
            Top NCR Markets
          </a>
          <a href="#nri" className="mobile-nav-link" onClick={(e) => handleNavClick(e, 'nri')}>
            NRI Investment Desk
          </a>
          <a href="#calculator" className="mobile-nav-link" onClick={(e) => handleNavClick(e, 'calculator')}>
            EMI Calculator
          </a>
          <a href="#reviews" className="mobile-nav-link" onClick={(e) => handleNavClick(e, 'reviews')}>
            Client Reviews
          </a>
          <a href="#faq" className="mobile-nav-link" onClick={(e) => handleNavClick(e, 'faq')}>
            FAQs & Trust
          </a>
          
          <hr className="drawer-divider" />
          
          <button 
            type="button" 
            className="btn btn-secondary w-full"
            onClick={() => { setIsMobileMenuOpen(false); onOpenAuth(); }}
          >
            <User size={15} /> Sign In to Account
          </button>
          
          <a 
            href="#seller-strip" 
            className="btn btn-primary w-full text-center"
            onClick={(e) => handleNavClick(e, 'seller-strip')}
          >
            List Your Property Free
          </a>
        </div>
      </div>
    </header>
  );
}
