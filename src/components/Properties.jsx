import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  ShieldCheck, 
  Bed, 
  Bath, 
  Maximize2, 
  MapPin, 
  Check, 
  RotateCcw,
  ChevronDown,
  Sparkles,
  Building
} from 'lucide-react';

export default function Properties({ 
  properties, 
  totalCount,
  filters,
  activeCityFilter, 
  onSelectCityFilter, 
  onResetFilters,
  onSelectProperty,
  onScheduleTour,
  showToast 
}) {
  const [favorites, setFavorites] = useState(new Set());
  const [visibleCount, setVisibleCount] = useState(12);

  useEffect(() => {
    setVisibleCount(12);
  }, [filters, activeCityFilter]);

  const toggleFavorite = (e, propId, propName) => {
    e.stopPropagation();
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(propId)) {
        next.delete(propId);
        showToast(`Removed "${propName}" from saved properties.`, 'info');
      } else {
        next.add(propId);
        showToast(`Saved "${propName}" to your favorites!`, 'success');
      }
      return next;
    });
  };

  const visibleProperties = properties.slice(0, visibleCount);
  const hasMore = visibleCount < properties.length;

  const activeChips = [];
  if (filters?.location) activeChips.push(`Location: "${filters.location}"`);
  if (filters?.type && filters.type !== 'all' && filters.type !== 'any') activeChips.push(`Type: ${filters.type}`);
  if (filters?.budget && filters.budget !== 'any' && filters.budget !== 'all') activeChips.push(`Budget: ${filters.budget}`);
  if (filters?.bhk && filters.bhk !== 'any' && filters.bhk !== 'all') activeChips.push(`BHK: ${filters.bhk.toUpperCase()}`);
  if (activeCityFilter && activeCityFilter !== 'all') activeChips.push(`City: ${activeCityFilter.charAt(0).toUpperCase() + activeCityFilter.slice(1)}`);

  return (
    <section className="section properties-section" id="properties">
      <div className="container">
        <div className="prop-header-row">
          <div>
            <div className="section-tag">Curated Listings</div>
            <h2 className="section-heading">Verified Properties in NCR</h2>
            <p className="section-subtext">Direct from RERA records with 100% legal verification and ₹0 buyer brokerage.</p>
          </div>

          <div className="filter-pills-bar" id="propertyFilters" role="tablist">
            {[
              { id: 'all', label: 'All Properties' },
              { id: 'delhi', label: 'Delhi' },
              { id: 'gurugram', label: 'Gurugram' },
              { id: 'noida', label: 'Noida' },
              { id: 'faridabad', label: 'Faridabad' },
              { id: 'commercial', label: 'Commercial' }
            ].map(pill => (
              <button 
                key={pill.id} 
                type="button" 
                className={`pill-btn ${activeCityFilter === pill.id ? 'active' : ''}`}
                onClick={() => onSelectCityFilter(pill.id)}
                role="tab"
                aria-selected={activeCityFilter === pill.id}
              >
                {pill.label}
              </button>
            ))}
          </div>
        </div>

        <div className="results-status-bar">
          <div className="results-count-text">
            <span>Showing <strong>{properties.length}</strong> of <strong>{totalCount || properties.length}</strong> verified properties</span>
            {activeChips.length > 0 && <span className="results-filtered-badge">• Filtered</span>}
          </div>

          {activeChips.length > 0 && (
            <div className="active-filters-chips">
              {activeChips.map((chip, idx) => (
                <span key={idx} className="active-chip">
                  {chip}
                </span>
              ))}
              <button 
                type="button" 
                className="clear-all-link"
                onClick={onResetFilters}
              >
                Reset All
              </button>
            </div>
          )}
        </div>

        {properties.length > 0 ? (
          <>
            <div className="properties-grid" id="propertiesGrid">
              {visibleProperties.map(prop => {
                const isFav = favorites.has(prop.id);
                return (
                  <article 
                    key={prop.id} 
                    className="prop-card"
                    data-city={prop.city}
                  >
                    <div className="prop-media">
                      <img 
                        src={prop.image} 
                        alt={prop.name} 
                        loading="lazy" 
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = prop.fallbackImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80';
                        }}
                      />
                      
                      <div className="badge-rera">
                        <ShieldCheck size={12} /> {prop.reraNo ? 'RERA Approved' : (prop.reraApproved ? 'RERA Approved' : 'Verified')}
                      </div>

                      <div className={`badge-status ${prop.status && prop.status.toLowerCase().includes('ultra') ? 'luxury-status' : ''}`}>
                        {prop.status}
                      </div>

                      <button 
                        type="button"
                        className={`heart-btn ${isFav ? 'active' : ''}`}
                        onClick={(e) => toggleFavorite(e, prop.id, prop.name)}
                        aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
                      >
                        <Heart size={16} fill={isFav ? '#00f2fe' : 'none'} color={isFav ? '#00f2fe' : 'white'} />
                      </button>
                    </div>

                    <div className="prop-body">
                      <div className="prop-price-flex">
                        <div className="price-val">
                          {prop.price} <span className="price-unit">{prop.pricePerSqft}</span>
                        </div>
                        <div className="ai-match-tag">
                          {prop.aiMatch || prop.aiMatchScore || '98% AI Match'}
                        </div>
                      </div>

                      {prop.developer && (
                        <div className="prop-developer-line">
                          <Building size={11} className="dev-icon" />
                          <span>{prop.developer}</span>
                        </div>
                      )}

                      <h3 className="prop-name">{prop.name}</h3>
                      <p className="prop-addr">
                        <MapPin size={13} /> {prop.address || prop.location}
                      </p>

                      <div className="prop-metrics-row">
                        <span><Bed size={13} /> {prop.bhk}</span>
                        <span><Bath size={13} /> {prop.baths}</span>
                        <span><Maximize2 size={13} /> {prop.area || prop.carpetArea}</span>
                      </div>

                      <div className="prop-card-action">
                        <span className="zero-badge">
                          <Check size={12} /> ₹0 Brokerage
                        </span>
                        <div className="card-btn-group">
                          <button 
                            type="button" 
                            className="btn btn-outline-cyan btn-sm"
                            onClick={() => onSelectProperty(prop)}
                          >
                            Quick View
                          </button>
                          <button 
                            type="button" 
                            className="btn btn-primary btn-sm"
                            onClick={() => onScheduleTour(prop)}
                          >
                            Book Visit
                          </button>
                        </div>
                      </div>

                    </div>
                  </article>
                );
              })}
            </div>

            {hasMore && (
              <div className="load-more-container">
                <button 
                  type="button" 
                  className="btn btn-outline-cyan btn-load-more"
                  onClick={() => setVisibleCount(prev => prev + 12)}
                >
                  <span>Load More Properties (Showing {visibleCount} of {properties.length})</span>
                  <ChevronDown size={16} />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="no-results-banner">
            <div className="no-results-icon">
              <RotateCcw size={28} className="text-cyan" />
            </div>
            <h3 className="no-results-title">No matching properties found</h3>
            <p className="no-results-desc">
              We couldn't find any properties matching your current search parameters. Try adjusting your location, budget, or bedroom preferences.
            </p>
            <button 
              type="button" 
              className="btn btn-primary btn-reset-filters"
              onClick={onResetFilters}
            >
              <RotateCcw size={15} /> <span>Reset All Filters</span>
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
