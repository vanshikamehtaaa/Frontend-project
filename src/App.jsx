import React, { useState, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import TrustMetrics from './components/TrustMetrics.jsx';
import Properties from './components/Properties.jsx';
import HowItWorks from './components/HowItWorks.jsx';
import AIEngine from './components/AIEngine.jsx';
import Markets from './components/Markets.jsx';
import NRIDesk from './components/NRIDesk.jsx';
import EMICalculator from './components/EMICalculator.jsx';
import Testimonials from './components/Testimonials.jsx';
import FAQ from './components/FAQ.jsx';
import CTA from './components/CTA.jsx';
import Footer from './components/Footer.jsx';
import AuthModal from './components/AuthModal.jsx';
import PropertyModal from './components/PropertyModal.jsx';
import FloatingChatbot from './components/FloatingChatbot.jsx';
import Toast from './components/Toast.jsx';

import initialData from './data/data.json';

export default function App() {
  const [platformData, setPlatformData] = useState(initialData);
  const [selectedCity, setSelectedCity] = useState('All NCR');
  
  const [filters, setFilters] = useState({
    location: '',
    type: 'all',
    budget: 'any',
    bhk: 'any'
  });
  const [activeCityFilter, setActiveCityFilter] = useState('all');

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  useEffect(() => {
    fetch('./data.json')
      .then(res => {
        if (!res.ok) throw new Error('Network response not ok');
        return res.json();
      })
      .then(data => {
        if (data && data.properties && data.properties.length > 0) {
          setPlatformData(data);
        }
      })
      .catch(err => {
        console.log('Using bundled property dataset (offline resilience):', err);
      });
  }, []);

  const filteredProperties = useMemo(() => {
    const allProps = platformData?.properties || [];
    
    return allProps.filter(prop => {
      if (filters.location && filters.location.trim()) {
        const rawQuery = filters.location.toLowerCase().trim();
        
        const normalizedQuery = rawQuery
          .replace(/\bsec\b/g, 'sector')
          .replace(/\brd\b/g, 'road')
          .replace(/\bext\b/g, 'extension')
          .replace(/\bexpwy\b/g, 'expressway')
          .replace(/\bgurgaon\b/g, 'gurugram');

        const isBroadNcrQuery = normalizedQuery === 'ncr' || normalizedQuery === 'delhi ncr' || normalizedQuery === 'all ncr' || normalizedQuery === 'all';
        if (isBroadNcrQuery) {
          return true;
        }

        if (normalizedQuery === 'delhi' || normalizedQuery === 'new delhi') {
          if ((prop.city || '').toLowerCase() !== 'delhi') return false;
          return true;
        }

        const queryTokens = normalizedQuery.split(/[\s,]+/).filter(t => t.length > 0);

        const cleanLocation = (prop.location || '').replace(/,\s*Delhi\s+NCR\s*$/i, '');
        const cleanAddress = (prop.address || '').replace(/,\s*Delhi\s+NCR\s*$/i, '');

        const corpus = [
          prop.name,
          cleanAddress,
          cleanLocation,
          prop.city,
          prop.city === 'gurugram' ? 'gurgaon' : '',
          prop.type,
          prop.status,
          prop.bhk,
          prop.specs,
          prop.modalName,
          prop.reraNo,
          prop.developer
        ].filter(Boolean).join(' ').toLowerCase();

        const directMatch = corpus.includes(rawQuery) || corpus.includes(normalizedQuery);
        const allTokensMatch = queryTokens.length > 0 && queryTokens.every(token => corpus.includes(token));
        const partialMatch = queryTokens.length >= 2 && queryTokens.filter(token => corpus.includes(token)).length >= Math.ceil(queryTokens.length * 0.7);

        if (!directMatch && !allTokensMatch && !partialMatch) {
          return false;
        }
      }

      if (filters.type && filters.type !== 'all' && filters.type !== 'any') {
        const propType = (prop.type || '').toLowerCase();
        if (filters.type === 'penthouse') {
          const isPenthouse = 
            propType === 'penthouse' ||
            (prop.name || '').toLowerCase().includes('penthouse') ||
            (prop.bhk || '').toLowerCase().includes('penthouse') ||
            (prop.specs || '').toLowerCase().includes('penthouse') ||
            (prop.status || '').toLowerCase().includes('penthouse');
          if (!isPenthouse) return false;
        } else if (filters.type === 'commercial') {
          if (propType !== 'commercial') return false;
        } else if (filters.type === 'residential') {
          if (propType !== 'residential') return false;
        }
      }

      if (activeCityFilter && activeCityFilter !== 'all') {
        if (activeCityFilter === 'commercial') {
          if ((prop.type || '').toLowerCase() !== 'commercial') return false;
        } else {
          const query = (filters.location || '').toLowerCase();
          const isRegionalQuery = query.includes('delhi') || query.includes('ncr');

          if (!isRegionalQuery) {
            const queryMentionsOtherCity = 
              (activeCityFilter !== 'noida' && (query.includes('noida') || query.includes('150') || query.includes('129') || query.includes('43'))) ||
              (activeCityFilter !== 'gurugram' && (query.includes('gurugram') || query.includes('gurgaon') || query.includes('dlf') || query.includes('golf') || query.includes('dwarka') || query.includes('sohna'))) ||
              (activeCityFilter !== 'faridabad' && (query.includes('faridabad') || query.includes('86') || query.includes('surajkund'))) ||
              (activeCityFilter !== 'delhi' && (query.includes('south delhi') || query.includes('moti nagar') || query.includes('okhla') || query.includes('karol bagh')));

            if (!queryMentionsOtherCity) {
              const propCity = (prop.city || '').toLowerCase();
              if (propCity !== activeCityFilter.toLowerCase()) return false;
            }
          }
        }
      }

      if (filters.budget && filters.budget !== 'any' && filters.budget !== 'all') {
        const priceNum = prop.priceNumeric || 0;
        if (filters.budget === 'under-1cr' && priceNum >= 10000000) return false;
        if (filters.budget === '1cr-2.5cr' && (priceNum < 10000000 || priceNum > 25000000)) return false;
        if (filters.budget === '2.5cr-5cr' && (priceNum < 25000000 || priceNum > 50000000)) return false;
        if (filters.budget === '5cr-plus' && priceNum < 50000000) return false;
      }

      if (filters.bhk && filters.bhk !== 'any' && filters.bhk !== 'all') {
        const bhkStr = (prop.bhk || '').toLowerCase();
        if (filters.bhk === '1bhk' && !bhkStr.includes('1') && !bhkStr.includes('studio')) return false;
        if (filters.bhk === '2bhk' && !bhkStr.includes('2')) return false;
        if (filters.bhk === '3bhk' && !bhkStr.includes('3')) return false;
        if (filters.bhk === '4bhk' && !bhkStr.includes('4') && !bhkStr.includes('5') && !(prop.type === 'penthouse') && !(prop.name || '').toLowerCase().includes('penthouse')) return false;
      }

      return true;
    });
  }, [platformData, filters, activeCityFilter]);

  const handleSearch = (newFilters) => {
    setFilters(newFilters);
    
    if (newFilters.location && newFilters.location.trim()) {
      const lower = newFilters.location.toLowerCase();
      if (lower.includes('noida') || lower.includes('150') || lower.includes('129') || lower.includes('43')) {
        setActiveCityFilter('noida');
        setSelectedCity('Noida');
      } else if (lower.includes('gurugram') || lower.includes('gurgaon') || lower.includes('dlf') || lower.includes('golf') || lower.includes('dwarka') || lower.includes('sohna')) {
        setActiveCityFilter('gurugram');
        setSelectedCity('Gurugram');
      } else if (lower.includes('faridabad') || lower.includes('86') || lower.includes('surajkund')) {
        setActiveCityFilter('faridabad');
        setSelectedCity('Faridabad');
      } else if (lower.includes('delhi') || lower.includes('ncr')) {
        setActiveCityFilter('all');
        setSelectedCity('All NCR');
      } else {
        setActiveCityFilter('all');
        setSelectedCity('All NCR');
      }
    } else {
      setActiveCityFilter('all');
      setSelectedCity('All NCR');
    }
  };

  const handleFilterCity = (cityKey) => {
    setActiveCityFilter(cityKey);
    if (cityKey === 'all') setSelectedCity('All NCR');
    else if (cityKey === 'delhi') setSelectedCity('Delhi');
    else if (cityKey === 'gurugram') setSelectedCity('Gurugram');
    else if (cityKey === 'noida') setSelectedCity('Noida');
    else if (cityKey === 'faridabad') setSelectedCity('Faridabad');
    else if (cityKey === 'commercial') setSelectedCity('Commercial');

    if (filters.location && filters.location.trim() && cityKey !== 'all') {
      const query = filters.location.toLowerCase();
      const belongsToOther = 
        (cityKey !== 'noida' && query.includes('noida')) ||
        (cityKey !== 'gurugram' && (query.includes('gurugram') || query.includes('gurgaon'))) ||
        (cityKey !== 'faridabad' && query.includes('faridabad')) ||
        (cityKey !== 'delhi' && query.includes('delhi'));
      
      if (belongsToOther) {
        setFilters(prev => ({ ...prev, location: '' }));
      }
    }

    const propSection = document.getElementById('properties');
    if (propSection) {
      propSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleResetFilters = () => {
    setFilters({
      location: '',
      type: 'all',
      budget: 'any',
      bhk: 'any'
    });
    setActiveCityFilter('all');
    setSelectedCity('All NCR');
    showToast('Search filters have been reset to all properties.', 'success');
  };

  const handleScheduleTour = (property) => {
    setSelectedProperty(property);
  };

  const handleApplyLoan = () => {
    setIsAuthModalOpen(true);
    showToast('Please sign in to view your pre-approved bank loan options.', 'success');
  };

  const handleOpenSellerModal = () => {
    setIsAuthModalOpen(true);
    showToast('Sign in to list your property and schedule a 4K photography session.', 'success');
  };

  return (
    <div className="propcapital-app">
      <Toast toast={toast} onClose={() => setToast(null)} />

      <Navbar 
        selectedCity={selectedCity}
        onSelectCity={setSelectedCity}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onFilterCity={handleFilterCity}
      />

      <main>
        <Hero 
          onSearch={handleSearch}
          filters={filters}
          setFilters={setFilters}
          showToast={showToast}
        />

        <TrustMetrics metrics={platformData?.metrics} />

        <Properties 
          properties={filteredProperties}
          totalCount={platformData?.properties?.length || 0}
          filters={filters}
          activeCityFilter={activeCityFilter}
          onSelectCityFilter={handleFilterCity}
          onResetFilters={handleResetFilters}
          onSelectProperty={setSelectedProperty}
          onScheduleTour={handleScheduleTour}
          showToast={showToast}
        />

        <HowItWorks />

        <AIEngine onOpenChatbot={() => setIsChatbotOpen(true)} />

        <Markets 
          markets={platformData?.markets}
          onFilterCity={handleFilterCity}
        />

        <NRIDesk onOpenConsultation={() => setIsAuthModalOpen(true)} />

        <EMICalculator onApplyLoan={handleApplyLoan} />

        <Testimonials />

        <FAQ />

        <CTA onOpenSellerModal={handleOpenSellerModal} />
      </main>

      <Footer 
        onFilterCity={handleFilterCity}
        onOpenPrivacy={() => showToast('PropCapital operates with 256-bit AES encryption & 100% RERA compliance.', 'success')}
      />

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        showToast={showToast}
      />

      <PropertyModal 
        property={selectedProperty} 
        onClose={() => setSelectedProperty(null)} 
        showToast={showToast}
      />

      <FloatingChatbot 
        isOpen={isChatbotOpen} 
        onToggle={() => setIsChatbotOpen(!isChatbotOpen)}
        showToast={showToast}
      />
    </div>
  );
}
