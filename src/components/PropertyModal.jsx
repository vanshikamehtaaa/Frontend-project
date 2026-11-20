import React, { useEffect } from 'react';
import { X, ShieldCheck, MapPin, Waves, Dumbbell, Shield, Zap, Car, Leaf, FileCheck, ArrowRight } from 'lucide-react';

export default function PropertyModal({ property, onClose, showToast }) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        onClose();
      }
    }
    if (property) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [property, onClose]);

  if (!property) return null;

  const handleBookVisit = () => {
    showToast(`Escorted site visit scheduled for "${property.name}"! Our on-ground property advisor will contact you within 2 hours.`, 'success');
    onClose();
  };

  return (
    <div 
      className="modal-backdrop active show" 
      id="propertyModal" 
      onClick={onClose}
      role="dialog" 
      aria-modal="true"
    >
      <div className="modal-dialog prop-detail-dialog" onClick={(e) => e.stopPropagation()}>
        <button 
          type="button" 
          className="modal-close-icon" 
          id="propModalCloseBtn" 
          onClick={onClose} 
          aria-label="Close"
        >
          <X size={16} />
        </button>
        
        <div className="prop-detail-grid">
          <div className="detail-img-col">
            <img 
              id="detailImg" 
              src={property.detailImage || property.image} 
              alt={property.name} 
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = property.fallbackImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&auto=format&fit=crop&q=80';
              }}
            />
            <div className="detail-img-badge" id="detailReraBadge">
              <ShieldCheck size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} /> 
              Verified RERA
            </div>
          </div>
          
          <div className="detail-content-col">
            <div className="detail-price-row">
              <div className="detail-price" id="detailPrice">{property.price}</div>
              <div className="ai-match-tag">✨ {property.aiMatch || '98%'} Match</div>
            </div>

            <h3 className="detail-title" id="detailTitle">{property.name}</h3>
            <p className="detail-loc" id="detailLoc">
              <MapPin size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle', color: 'var(--cyan)' }} /> 
              {property.address || property.location}
            </p>

            <div className="detail-specs-box" id="detailSpecs">
              {property.specs || `${property.bhk || ''} • ${property.baths || ''} • ${property.area || property.carpetArea || ''}`}
            </div>

            <div className="amenities-list">
              <h4>Key Highlights & Amenities</h4>
              <div className="amenity-chips">
                <span><Waves size={13} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} /> Swimming Pool</span>
                <span><Dumbbell size={13} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} /> Modern Gymnasium</span>
                <span><Shield size={13} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} /> 3-Tier Security</span>
                <span><Zap size={13} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} /> 100% Power Backup</span>
                <span><Car size={13} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} /> Reserved Parking</span>
                <span><Leaf size={13} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} /> 80% Green Open Area</span>
              </div>
            </div>

            <div className="rera-verify-strip">
              <FileCheck size={16} style={{ flexShrink: 0, color: 'var(--cyan)' }} />
              <div>
                <strong>RERA Registration No:</strong>
                <span id="detailReraNo" style={{ display: 'block', fontSize: '0.8rem', color: 'var(--cyan)' }}>
                  {property.reraNo || property.reraNumber || '100% RERA Verified on File'}
                </span>
              </div>
            </div>

            <div className="detail-actions-row">
              <button 
                type="button" 
                className="btn btn-primary btn-block" 
                id="detailBookVisitBtn"
                onClick={handleBookVisit}
              >
                Schedule Free Site Visit <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
