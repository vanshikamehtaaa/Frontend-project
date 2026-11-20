import React, { useState, useEffect } from 'react';
import { X, Lock, ArrowRight } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, showToast, modalContext = 'Sign In' }) {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [city, setCity] = useState('Gurugram');
  const [step, setStep] = useState('phone');
  const [otp, setOtp] = useState('');

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSendOtp = (e) => {
    e.preventDefault();
    const cleanPhone = phone.trim().replace(/\D/g, '');
    const indianPhoneRegex = /^[6-9]\d{9}$/;

    if (!indianPhoneRegex.test(cleanPhone)) {
      showToast('Please enter a valid 10-digit Indian mobile number starting with 6-9.', 'error');
      return;
    }

    setStep('otp');
    showToast(`Verification OTP sent via SMS to +91 ${cleanPhone}`, 'success');
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otp.length < 4) {
      showToast('Please enter the 4-digit verification code.', 'error');
      return;
    }
    showToast(`Welcome${name ? ', ' + name : ''}! Your request has been confirmed with ₹0 brokerage.`, 'success');
    onClose();
    setStep('phone');
    setPhone('');
    setName('');
    setOtp('');
  };

  return (
    <div 
      className={`modal-backdrop ${isOpen ? 'active show' : ''}`} 
      id="authModal" 
      onClick={onClose}
      role="dialog" 
      aria-modal="true"
    >
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <button 
          type="button" 
          className="modal-close-icon" 
          id="authCloseBtn" 
          onClick={onClose} 
          aria-label="Close"
        >
          <X size={16} />
        </button>
        
        <div className="modal-head">
          <div className="section-tag tag-cyan">Client Portal</div>
          <h3>{step === 'phone' ? 'Sign In to PropCapital' : 'Enter 4-Digit Code'}</h3>
          <p>
            {step === 'phone' 
              ? 'Access your saved properties, RERA reports, and 4K virtual tours.' 
              : `We sent a security code to +91 ${phone}`}
          </p>
        </div>

        {step === 'phone' ? (
          <form className="modal-form-wrap" id="authForm" onSubmit={handleSendOtp}>
            <div className="form-row">
              <label htmlFor="authPhone">Mobile Number (WhatsApp)</label>
              <input 
                type="tel" 
                id="authPhone" 
                required 
                placeholder="+91 98765 43210" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="form-row">
              <label htmlFor="authName">Full Name (Optional)</label>
              <input 
                type="text" 
                id="authName" 
                placeholder="e.g. Aryan Sharma" 
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-row">
              <label htmlFor="authCity">Preferred Market</label>
              <select 
                id="authCity" 
                value={city} 
                onChange={(e) => setCity(e.target.value)}
              >
                <option value="Delhi">Delhi (South Delhi / Moti Nagar / Karol Bagh)</option>
                <option value="Gurugram">Gurugram (Golf Course / DLF / Sohna)</option>
                <option value="Noida">Noida / Gr. Noida (Sec 150 / Expwy)</option>
                <option value="Faridabad">Faridabad (Sector 86 / NIT)</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary btn-block" id="authSubmitBtn">
              Send OTP & Verify <ArrowRight size={16} />
            </button>

            <p className="privacy-note">
              <Lock size={12} style={{ display: 'inline', marginRight: '4px' }} /> 
              100% Secure. Bank-grade data encryption.
            </p>
          </form>
        ) : (
          <form className="modal-form-wrap" onSubmit={handleVerifyOtp}>
            <div className="form-row">
              <label htmlFor="authOtp">4-Digit Security Code</label>
              <input 
                type="text" 
                id="authOtp" 
                maxLength={4}
                required 
                placeholder="• • • •" 
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                style={{ textAlign: 'center', letterSpacing: '8px', fontSize: '1.2rem' }}
              />
            </div>

            <button type="submit" className="btn btn-primary btn-block">
              Verify & Confirm Appointment
            </button>

            <button 
              type="button" 
              className="btn btn-secondary btn-block"
              style={{ marginTop: '8px' }}
              onClick={() => setStep('phone')}
            >
              Change Mobile Number
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
