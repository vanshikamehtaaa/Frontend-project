import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const type = toast.type || 'success';
  const toastClass = type === 'error' ? 'pc-toast-error' : type === 'info' ? 'pc-toast-info' : 'pc-toast-success';

  return (
    <div className={`pc-toast ${toastClass}`} role="alert" aria-live="polite">
      {type === 'error' ? (
        <AlertCircle size={18} className="toast-icon" />
      ) : type === 'info' ? (
        <Info size={18} className="toast-icon" />
      ) : (
        <CheckCircle2 size={18} className="toast-icon" />
      )}
      <span className="toast-text">{toast.message}</span>
      <button onClick={onClose} className="toast-close-btn" aria-label="Close notification">
        <X size={14} />
      </button>
    </div>
  );
}
