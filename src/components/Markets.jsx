import React from 'react';
import { ArrowRight, Building2 } from 'lucide-react';

export default function Markets({ markets, onFilterCity }) {
  const defaultMarkets = [
    {
      "id": "mkt-delhi",
      "city": "delhi",
      "name": "Delhi",
      "state": "National Capital",
      "priceRange": "₹14,000 – ₹32,000/sqft",
      "subCorridors": "South Delhi, Moti Nagar & Central Delhi",
      "listingsCount": "3,100+ Listings",
      "image": "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=900&auto=format&fit=crop&q=80"
    },
    {
      id: 'mkt-gurugram',
      city: 'gurugram',
      name: 'Gurugram',
      state: 'Haryana',
      priceRange: '₹9,000 – ₹26,000/sqft',
      subCorridors: 'DLF Phase 5, Golf Course Ext. Rd & Dwarka Expressway',
      listingsCount: '5,400+ Listings',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=900&auto=format&fit=crop&q=80'
    },
    {
      id: 'mkt-noida',
      city: 'noida',
      name: 'Noida & Gr. Noida',
      state: 'Uttar Pradesh',
      priceRange: '₹6,500 – ₹15,000/sqft',
      subCorridors: 'Sector 150, Noida Expressway & Greater Noida West',
      listingsCount: '4,200+ Listings',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&auto=format&fit=crop&q=80'
    },
    {
      id: 'mkt-faridabad',
      city: 'faridabad',
      name: 'Faridabad',
      state: 'Haryana',
      priceRange: '₹4,500 – ₹8,800/sqft',
      subCorridors: 'NIT Faridabad, Sector 86 & Neharpar Corridor',
      listingsCount: '2,400+ Listings',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&auto=format&fit=crop&q=80'
    }
  ];

  const marketList = markets && markets.length > 0 ? markets : defaultMarkets;

  const handleExplore = (e, cityKey) => {
    e.preventDefault();
    onFilterCity(cityKey);
    const propSection = document.getElementById('properties');
    if (propSection) {
      propSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="section markets-section" id="markets">
      <div className="container">
        
        <div className="section-title-wrap">
          <div className="section-tag">Prime NCR Corridors</div>
          <h2 className="section-heading">High-Growth Real Estate Markets</h2>
          <p className="section-subtext">Verified high-yield residential and commercial hubs across the National Capital Region.</p>
        </div>

        <div className="markets-grid">
          {marketList.map(mkt => (
            <div key={mkt.id} className="market-card">
              <div className="market-img-wrap">
                <img 
                  src={mkt.image} 
                  alt={mkt.name} 
                  loading="lazy" 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=900&auto=format&fit=crop&q=80';
                  }}
                />
                <div className="market-badge">{mkt.state}</div>
              </div>

              <div className="market-info">
                <div className="market-header">
                  <h3>{mkt.name}</h3>
                  <span className="market-rate">{mkt.priceRange}</span>
                </div>
                <p className="market-sub">{mkt.subCorridors}</p>
                <div className="market-footer">
                  <span className="count-tag">
                    <Building2 size={13} /> {mkt.listingsCount}
                  </span>
                  <a 
                    href="#properties" 
                    className="market-link"
                    onClick={(e) => handleExplore(e, mkt.city)}
                  >
                    <span>Explore</span>
                    <ArrowRight size={13} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
