import React, { useState, useRef, useEffect } from 'react';
import { 
  MapPin, 
  LayoutGrid, 
  IndianRupee, 
  Bed, 
  Sparkles, 
  Home, 
  Key, 
  Building,
  ChevronDown,
  X,
  Check
} from 'lucide-react';

const LOCATION_GROUPS = [
  {
    group: 'All Delhi NCR',
    cityKey: 'all',
    items: [
      {
        val: '',
        title: 'All Locations (Delhi NCR)',
        sub: '36 Verified Properties across Gurugram, Noida, Delhi & Faridabad',
        badge: 'All NCR'
      }
    ]
  },
  {
    group: 'Gurugram Corridors',
    cityKey: 'gurugram',
    items: [
      {
        val: 'Golf Course Road, Gurugram',
        title: 'Golf Course Road',
        sub: 'DLF Phase 5 • The Camellias & Magnolias • Ultra Luxury',
        badge: 'Gurugram'
      },
      {
        val: 'DLF Phase 5, Gurugram',
        title: 'DLF Phase 5',
        sub: 'Near Cyber Hub • The Crest • Executive Living',
        badge: 'Gurugram'
      },
      {
        val: 'Golf Course Ext. Road, Gurugram',
        title: 'Golf Course Ext. Road',
        sub: 'Sector 65 & 63 • M3M Golfestate & Trump Tower',
        badge: 'Gurugram'
      },
      {
        val: 'Dwarka Expressway, Gurugram',
        title: 'Dwarka Expressway',
        sub: 'Sector 108 & 113 • Sobha City & High Growth Corridor',
        badge: 'Gurugram'
      },
      {
        val: 'Sohna Road, Gurugram',
        title: 'Sohna Road & Elevated Corridor',
        sub: 'Sector 48 & 36 • Central Park Resorts & Green Living',
        badge: 'Gurugram'
      },
      {
        val: 'Cyber City, Gurugram',
        title: 'Cyber City & MG Road',
        sub: 'Grade-A Commercial Offices, Co-Working & Retail',
        badge: 'Commercial'
      }
    ]
  },
  {
    group: 'Noida Corridors',
    cityKey: 'noida',
    items: [
      {
        val: 'Sector 150, Noida',
        title: 'Sector 150, Noida',
        sub: 'Sports City • Tata Eureka Park & 80% Green Living',
        badge: 'Noida'
      },
      {
        val: 'Sector 129, Noida Expressway',
        title: 'Sector 129 & 128 (Expressway)',
        sub: 'Jaypee Greens Wish Town • Golf Course & Metro',
        badge: 'Noida'
      },
      {
        val: 'Sector 43, Noida',
        title: 'Sector 43, Central Noida',
        sub: 'Godrej Woods • Forest-Themed Luxury Living',
        badge: 'Noida'
      },
      {
        val: 'Sector 137, Noida',
        title: 'Sector 137 & 144 (Expressway)',
        sub: 'Active Metro Corridor • High Rental Yields',
        badge: 'Noida'
      },
      {
        val: 'Greater Noida West',
        title: 'Greater Noida West',
        sub: 'Sector 16C • Modern Gated Townships & Value Assets',
        badge: 'Gr. Noida'
      }
    ]
  },
  {
    group: 'Delhi Landmark Corridors',
    cityKey: 'delhi',
    items: [
      {
        val: 'South Delhi',
        title: 'South Delhi (Okhla & Chattarpur)',
        sub: 'Godrej South Estate • Prime Luxury Living',
        badge: 'Delhi'
      },
      {
        val: 'Moti Nagar, New Delhi',
        title: 'West Delhi (Moti Nagar)',
        sub: 'Shivaji Marg • DLF One Midtown Luxury High-Rise',
        badge: 'Delhi'
      },
      {
        val: 'Central Delhi',
        title: 'Central Delhi (Karol Bagh)',
        sub: 'New Rohtak Road • The Amaryllis Luxury Towers',
        badge: 'Delhi'
      },
      {
        val: 'Dwarka, New Delhi',
        title: 'Dwarka (Sector 14 & Diplomatic Enclave)',
        sub: 'Near IGI Airport & Yashobhoomi Convention Centre',
        badge: 'Delhi'
      }
    ]
  },
  {
    group: 'Faridabad Corridors',
    cityKey: 'faridabad',
    items: [
      {
        val: 'Sector 86, Faridabad',
        title: 'Sector 86, Greater Faridabad',
        sub: 'BPTP Park Elite • Established Gated Community',
        badge: 'Faridabad'
      },
      {
        val: 'Sector 43, Surajkund Road, Faridabad',
        title: 'Sector 43 (Surajkund Road)',
        sub: 'Godrej Retreat • Aravalli Foothills & Delhi Border',
        badge: 'Faridabad'
      },
      {
        val: 'Sector 80, Faridabad',
        title: 'Sector 80 & 82 (Neharpar)',
        sub: 'Puri Pranayam & RPS Auria • Premium High-Rise Living',
        badge: 'Faridabad'
      }
    ]
  }
];

export default function Hero({ 
  onSearch, 
  filters, 
  setFilters, 
  showToast 
}) {
  const [activeTab, setActiveTab] = useState('buy');
  const [activeCityTab, setActiveCityTab] = useState('all');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const autocompleteRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (autocompleteRef.current && !autocompleteRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLocationInputChange = (val) => {
    const updated = { ...filters, location: val };
    setFilters(updated);
    onSearch(updated);
    if (!isDropdownOpen) {
      setIsDropdownOpen(true);
    }
  };

  const handleSelectLocation = (val) => {
    const updated = { ...filters, location: val };
    setFilters(updated);
    setIsDropdownOpen(false);
    onSearch(updated);
  };

  const handleClearLocation = (e) => {
    e.stopPropagation();
    const updated = { ...filters, location: '' };
    setFilters(updated);
    onSearch(updated);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    let updatedType = filters.type;
    if (tab === 'commercial') {
      updatedType = 'commercial';
    } else if (tab === 'buy' || tab === 'rent') {
      updatedType = 'all';
    } else if (tab === 'ai') {
      const el = document.getElementById('ai-engine');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    const newFilters = { ...filters, type: updatedType };
    setFilters(newFilters);
    onSearch(newFilters);
  };

  const handleTrendingClick = (tag) => {
    const newFilters = { ...filters, location: tag };
    setFilters(newFilters);
    onSearch(newFilters);
    const propSection = document.getElementById('properties');
    if (propSection) {
      propSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleMainSearch = (e) => {
    e.preventDefault();
    setIsDropdownOpen(false);
    onSearch(filters);
    const propSection = document.getElementById('properties');
    if (propSection) {
      propSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filteredGroups = LOCATION_GROUPS.map(grp => {
    if (activeCityTab !== 'all' && grp.cityKey !== 'all' && grp.cityKey !== activeCityTab) {
      return null;
    }
    
    const query = (filters.location || '').toLowerCase().trim();
    if (!query) {
      return grp;
    }
    
    const matchingItems = grp.items.filter(item => 
      item.val.toLowerCase().includes(query) ||
      item.title.toLowerCase().includes(query) ||
      item.sub.toLowerCase().includes(query) ||
      item.badge.toLowerCase().includes(query)
    );

    if (matchingItems.length === 0) return null;
    return { ...grp, items: matchingItems };
  }).filter(Boolean);

  return (
    <section className="hero-section" id="hero">
      <div className="ambient-mesh mesh-1"></div>
      <div className="ambient-mesh mesh-2"></div>

      <div className="container hero-container">
        <div className="tech-badge">
          <span className="tech-badge-dot"></span>
          <span>AI Precision • Direct Builder Pricing • Residential & Commercial</span>
        </div>

        <h1 className="hero-title">
          <span className="title-line">NCR's Smartest Property Platform.</span>
          <span className="title-line gradient-text">Zero Brokerage. 100% RERA Verified.</span>
        </h1>

        <p className="hero-subtitle">
          Explore 12,000+ verified residential, commercial & investment assets across Gurugram, Noida & Faridabad with complete legal peace of mind.
        </p>

        <div className="search-omnibar-box">
          <div className="search-tabs-row" id="searchTabs" role="tablist">
            <button 
              type="button"
              className={`search-tab ${activeTab === 'buy' ? 'active' : ''}`}
              onClick={() => handleTabChange('buy')}
              role="tab"
              aria-selected={activeTab === 'buy'}
            >
              <Home size={15} /> <span>Buy</span>
            </button>
            <button 
              type="button"
              className={`search-tab ${activeTab === 'rent' ? 'active' : ''}`}
              onClick={() => handleTabChange('rent')}
              role="tab"
              aria-selected={activeTab === 'rent'}
            >
              <Key size={15} /> <span>Rent</span>
            </button>
            <button 
              type="button"
              className={`search-tab ${activeTab === 'commercial' ? 'active' : ''}`}
              onClick={() => handleTabChange('commercial')}
              role="tab"
              aria-selected={activeTab === 'commercial'}
            >
              <Building size={15} /> <span>Commercial</span>
            </button>
            <button 
              type="button"
              className={`search-tab tab-ai-glow ${activeTab === 'ai' ? 'active' : ''}`}
              onClick={() => handleTabChange('ai')}
              role="tab"
              aria-selected={activeTab === 'ai'}
            >
              <Sparkles size={15} /> <span>AI Smart Match</span>
            </button>
          </div>

          <form className="search-fields-grid" onSubmit={handleMainSearch}>
            <div className="field-item location-field" ref={autocompleteRef}>
              <label htmlFor="searchInputLoc" onClick={() => setIsDropdownOpen(true)}>
                <MapPin size={12} /> <span>Location</span>
              </label>
              <div className="location-input-container">
                <input 
                  type="text" 
                  id="searchInputLoc" 
                  placeholder="Select corridor or search..."
                  value={filters.location}
                  onChange={(e) => handleLocationInputChange(e.target.value)}
                  onFocus={() => setIsDropdownOpen(true)}
                  onClick={() => setIsDropdownOpen(true)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      setIsDropdownOpen(false);
                      handleMainSearch(e);
                    } else if (e.key === 'Escape') {
                      setIsDropdownOpen(false);
                    }
                  }}
                  autoComplete="off"
                />
                <div className="location-actions">
                  {filters.location ? (
                    <button 
                      type="button" 
                      className="loc-clear-btn"
                      onClick={handleClearLocation}
                      title="Clear location"
                      aria-label="Clear location"
                    >
                      <X size={12} />
                    </button>
                  ) : null}
                  <button 
                    type="button" 
                    className={`loc-dropdown-arrow-btn ${isDropdownOpen ? 'open' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setIsDropdownOpen(prev => !prev);
                    }}
                    title="Toggle location dropdown"
                    aria-label="Toggle location dropdown"
                  >
                    <ChevronDown size={14} />
                  </button>
                </div>
              </div>

              {isDropdownOpen && (
                <div className="autocomplete-dropdown open loc-dropdown-menu" id="locSuggestions" role="listbox">
                  <div className="loc-dropdown-chips">
                    {[
                      { key: 'all', label: 'All NCR' },
                      { key: 'gurugram', label: 'Gurugram' },
                      { key: 'noida', label: 'Noida' },
                      { key: 'delhi', label: 'Delhi' },
                      { key: 'faridabad', label: 'Faridabad' }
                    ].map(tab => (
                      <button
                        key={tab.key}
                        type="button"
                        className={`loc-chip-btn ${activeCityTab === tab.key ? 'active' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveCityTab(tab.key);
                        }}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  <div className="loc-dropdown-list">
                    {filteredGroups.length > 0 ? (
                      filteredGroups.map((grp, gIdx) => (
                        <div key={gIdx} className="loc-group">
                          <div className="loc-group-header">{grp.group}</div>
                          {grp.items.map((item, iIdx) => {
                            const isSelected = 
                              (item.val === '' && !filters.location) ||
                              (item.val && filters.location && filters.location.toLowerCase().includes(item.title.toLowerCase()));

                            return (
                              <button 
                                key={iIdx} 
                                type="button"
                                className={`suggest-item ${isSelected ? 'selected' : ''}`}
                                data-val={item.val}
                                onClick={() => handleSelectLocation(item.val)}
                              >
                                <div className="suggest-item-left">
                                  <div className="suggest-item-icon">
                                    <MapPin size={13} />
                                  </div>
                                  <div className="suggest-item-info">
                                    <span className="suggest-item-title">{item.title}</span>
                                    <span className="suggest-item-sub">{item.sub}</span>
                                  </div>
                                </div>
                                <div className="suggest-item-right" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                  <span className="suggest-item-badge">{item.badge}</span>
                                  {isSelected && <Check size={14} className="suggest-item-check" />}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      ))
                    ) : (
                      <div style={{ padding: '16px 14px', textAlign: 'center' }}>
                        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                          No standard corridor matches "{filters.location}"
                        </p>
                        <button
                          type="button"
                          className="quick-pill"
                          style={{ cursor: 'pointer', background: 'rgba(0, 242, 254, 0.15)', color: 'var(--accent-cyan)' }}
                          onClick={() => handleSelectLocation(filters.location)}
                        >
                          Search all 36 properties for "{filters.location}"
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="field-item">
              <label htmlFor="searchPropType">
                <LayoutGrid size={12} /> <span>Property Type</span>
              </label>
              <select 
                id="searchPropType"
                value={filters.type || 'all'}
                onChange={(e) => {
                  const val = e.target.value;
                  const newF = { ...filters, type: val };
                  setFilters(newF);
                  onSearch(newF);
                }}
              >
                <option value="all">All Property Types</option>
                <option value="residential">Luxury Apartment</option>
                <option value="commercial">Commercial Office & Retail</option>
                <option value="penthouse">Penthouse & Sky Villa</option>
              </select>
            </div>

            <div className="field-item">
              <label htmlFor="searchBudget">
                <IndianRupee size={12} /> <span>Budget</span>
              </label>
              <select 
                id="searchBudget"
                value={filters.budget || 'any'}
                onChange={(e) => {
                  const val = e.target.value;
                  const newF = { ...filters, budget: val };
                  setFilters(newF);
                  onSearch(newF);
                }}
              >
                <option value="any">Any Budget</option>
                <option value="under-1cr">Under ₹1.0 Cr</option>
                <option value="1cr-2.5cr">₹1.0 Cr – ₹2.5 Cr</option>
                <option value="2.5cr-5cr">₹2.5 Cr – ₹5.0 Cr</option>
                <option value="5cr-plus">₹5.0 Cr+ (Ultra Luxury)</option>
              </select>
            </div>

            <div className="field-item">
              <label htmlFor="searchBhk">
                <Bed size={12} /> <span>Bedrooms</span>
              </label>
              <select 
                id="searchBhk"
                value={filters.bhk || 'any'}
                onChange={(e) => {
                  const val = e.target.value;
                  const newF = { ...filters, bhk: val };
                  setFilters(newF);
                  onSearch(newF);
                }}
              >
                <option value="any">Any BHK</option>
                <option value="1bhk">1 BHK / Studio</option>
                <option value="2bhk">2 BHK</option>
                <option value="3bhk">3 BHK</option>
                <option value="4bhk">4 BHK / Penthouse</option>
              </select>
            </div>

            <div className="field-item field-submit">
              <button 
                type="submit" 
                className="btn btn-primary btn-search-go"
                id="btnExecuteSearch"
                aria-label="Search Properties"
              >
                <Sparkles size={16} />
                <span>Search</span>
              </button>
            </div>
          </form>

          <div className="quick-tags-row">
            <span className="quick-label">Trending:</span>
            {['Golf Course Road', 'DLF Phase 5', 'Noida Sector 150', 'Dwarka Expressway', 'Ready to Move'].map((tag, i) => (
              <button 
                key={i} 
                type="button" 
                className="quick-pill"
                onClick={() => handleTrendingClick(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
