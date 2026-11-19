/**
 * PropCapital.ai — Modern Interactive Frontend Script
 * Features:
 *  1. Lucide Icons initialization
 *  2. Mobile Navigation Drawer toggle
 *  3. City selector dropdown toggle & sync
 *  4. Search bar mode tab switching
 *  5. Location Search Autocomplete suggestions
 *  6. Trending search tags autofill
 *  7. Property Cards filter tabs (All / Gurugram / Noida / Faridabad)
 *  8. Property Quick View Modal with amenities & RERA info
 *  9. Real-Time EMI & Loan Calculator with Indian Rupee formatting
 *  10. Floating Interactive AI Chatbot (IRA) with conversational responses
 *  11. Authentication & Sign In Modal with phone OTP & Google OAuth simulation
 *  12. Inquiry & Site Visit Booking Modal
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. Mobile Menu Drawer Toggle
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const menuOpenIcon = document.getElementById('menuOpenIcon');
  const menuCloseIcon = document.getElementById('menuCloseIcon');

  if (mobileMenuToggle && mobileDrawer) {
    mobileMenuToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      if (menuOpenIcon && menuCloseIcon) {
        menuOpenIcon.classList.toggle('hidden', isOpen);
        menuCloseIcon.classList.toggle('hidden', !isOpen);
      }
    });

    const mobileLinks = mobileDrawer.querySelectorAll('.mobile-nav-link, .btn');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        if (menuOpenIcon && menuCloseIcon) {
          menuOpenIcon.classList.remove('hidden');
          menuCloseIcon.classList.add('hidden');
        }
      });
    });
  }

  // 3. City Selector Dropdown
  const cityDropdownBtn = document.getElementById('cityDropdownBtn');
  const cityDropdownMenu = document.getElementById('cityDropdownMenu');
  const selectedCityName = document.getElementById('selectedCityName');

  if (cityDropdownBtn && cityDropdownMenu) {
    cityDropdownBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      cityDropdownMenu.classList.toggle('show');
    });

    const cityItems = cityDropdownMenu.querySelectorAll('.city-item');
    cityItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        cityItems.forEach(ci => ci.classList.remove('active'));
        item.classList.add('active');
        const chosenCity = item.getAttribute('data-city');
        if (selectedCityName) {
          selectedCityName.textContent = chosenCity;
        }
        cityDropdownMenu.classList.remove('show');
        filterProperties(chosenCity.toLowerCase());
      });
    });

    document.addEventListener('click', () => {
      cityDropdownMenu.classList.remove('show');
    });
  }

  // 4. Search Tabs Switching (Buy, Rent, Commercial, AI Smart Match)
  const searchTabs = document.querySelectorAll('.search-tab');
  const searchInputLoc = document.getElementById('searchInputLoc');
  const btnExecuteSearch = document.getElementById('btnExecuteSearch');

  searchTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      searchTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const mode = tab.getAttribute('data-tab');
      const searchPropType = document.getElementById('searchPropType');
      if (mode === 'ai') {
        if (searchInputLoc) searchInputLoc.placeholder = 'Describe ideal property (e.g. 3 BHK with green view or Grade-A office)';
        if (btnExecuteSearch) btnExecuteSearch.innerHTML = '<i data-lucide="sparkles"></i> <span>Run AI Match</span>';
      } else if (mode === 'rent') {
        if (searchInputLoc) searchInputLoc.placeholder = 'Search verified rental properties (e.g. DLF 5, Sec 150, Sohna Rd)';
        if (btnExecuteSearch) btnExecuteSearch.innerHTML = '<i data-lucide="key"></i> <span>Find Rentals</span>';
      } else if (mode === 'commercial') {
        if (searchInputLoc) searchInputLoc.placeholder = 'Search Grade-A offices, retail shops & SCO plots in NCR';
        if (btnExecuteSearch) btnExecuteSearch.innerHTML = '<i data-lucide="building"></i> <span>Find Commercial</span>';
        if (searchPropType) searchPropType.value = 'commercial';
      } else {
        if (searchInputLoc) searchInputLoc.placeholder = 'e.g. Golf Course Rd, Sec 150, DLF 5';
        if (btnExecuteSearch) btnExecuteSearch.innerHTML = '<i data-lucide="sparkles"></i> <span>Search</span>';
        if (searchPropType && searchPropType.value === 'commercial') searchPropType.value = 'all';
      }

      if (window.lucide) window.lucide.createIcons();
    });
  });

  // 5. Search Location Autocomplete
  const locSuggestions = document.getElementById('locSuggestions');
  if (searchInputLoc && locSuggestions) {
    searchInputLoc.addEventListener('focus', () => {
      locSuggestions.classList.add('open');
    });

    searchInputLoc.addEventListener('input', () => {
      locSuggestions.classList.add('open');
    });

    const suggestItems = locSuggestions.querySelectorAll('.suggest-item');
    suggestItems.forEach(item => {
      item.addEventListener('click', () => {
        searchInputLoc.value = item.getAttribute('data-val');
        locSuggestions.classList.remove('open');
      });
    });

    document.addEventListener('click', (e) => {
      if (!searchInputLoc.contains(e.target) && !locSuggestions.contains(e.target)) {
        locSuggestions.classList.remove('open');
      }
    });
  }

  // 6. Trending Tags Autofill
  const quickPills = document.querySelectorAll('.quick-pill');
  quickPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const query = pill.getAttribute('data-query');
      if (searchInputLoc) {
        searchInputLoc.value = query;
        searchInputLoc.focus();
      }
    });
  });

  // 7. Property Filter Tabs (All / Gurugram / Noida / Faridabad)
  const filterBtns = document.querySelectorAll('.pill-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const targetFilter = btn.getAttribute('data-filter');
      filterProperties(targetFilter);
    });
  });

  // 8. Interactive Real-Time EMI Calculator
  const loanAmountInput = document.getElementById('loanAmount');
  const interestRateInput = document.getElementById('interestRate');
  const loanTenureInput = document.getElementById('loanTenure');

  const loanAmountDisplay = document.getElementById('loanAmountDisplay');
  const interestRateDisplay = document.getElementById('interestRateDisplay');
  const loanTenureDisplay = document.getElementById('loanTenureDisplay');

  const monthlyEmiDisplay = document.getElementById('monthlyEmiDisplay');
  const summaryPrincipal = document.getElementById('summaryPrincipal');
  const summaryInterest = document.getElementById('summaryInterest');
  const summaryTotal = document.getElementById('summaryTotal');

  function formatIndianCurrency(num) {
    return '₹ ' + Math.round(num).toLocaleString('en-IN');
  }

  function calculateEMI() {
    if (!loanAmountInput || !interestRateInput || !loanTenureInput) return;

    const principal = parseFloat(loanAmountInput.value);
    const annualRate = parseFloat(interestRateInput.value);
    const tenureYears = parseInt(loanTenureInput.value, 10);

    if (loanAmountDisplay) loanAmountDisplay.textContent = formatIndianCurrency(principal);
    if (interestRateDisplay) interestRateDisplay.textContent = annualRate.toFixed(1) + '%';
    if (loanTenureDisplay) loanTenureDisplay.textContent = tenureYears + ' Years';

    const monthlyRate = annualRate / (12 * 100);
    const totalMonths = tenureYears * 12;

    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
    const totalPayment = emi * totalMonths;
    const totalInterest = totalPayment - principal;

    if (monthlyEmiDisplay) monthlyEmiDisplay.textContent = formatIndianCurrency(emi);
    if (summaryPrincipal) summaryPrincipal.textContent = formatIndianCurrency(principal);
    if (summaryInterest) summaryInterest.textContent = formatIndianCurrency(totalInterest);
    if (summaryTotal) summaryTotal.textContent = formatIndianCurrency(totalPayment);
  }

  if (loanAmountInput && interestRateInput && loanTenureInput) {
    loanAmountInput.addEventListener('input', calculateEMI);
    interestRateInput.addEventListener('input', calculateEMI);
    loanTenureInput.addEventListener('input', calculateEMI);
    calculateEMI();
  }

  // 9. Heart Wishlist Button Toggle
  const heartBtns = document.querySelectorAll('.heart-btn');
  heartBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      btn.classList.toggle('active');
      if (btn.classList.contains('active')) {
        btn.style.background = '#ff4757';
        btn.style.borderColor = '#ff4757';
      } else {
        btn.style.background = 'rgba(7, 9, 14, 0.75)';
        btn.style.borderColor = 'var(--border-subtle)';
      }
    });
  });

  // 10. Sticky Navbar Scroll Effect
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.6)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  });

  // Search button click handler
  if (btnExecuteSearch) {
    btnExecuteSearch.addEventListener('click', () => {
      const propertiesSection = document.getElementById('properties');
      if (propertiesSection) {
        propertiesSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // 11. Floating AI Chatbot Toggle
  const chatbotToggleBtn = document.getElementById('chatbotToggleBtn');
  const chatbotWindow = document.getElementById('chatbotWindow');
  const closeChatBtn = document.getElementById('closeChatBtn');

  if (chatbotToggleBtn && chatbotWindow) {
    chatbotToggleBtn.addEventListener('click', () => {
      chatbotWindow.classList.toggle('active');
      // Hide ping badge once opened
      const ping = chatbotToggleBtn.querySelector('.bot-ping-badge');
      if (ping) ping.style.display = 'none';
      if (window.lucide) window.lucide.createIcons();
    });
  }

  if (closeChatBtn && chatbotWindow) {
    closeChatBtn.addEventListener('click', () => {
      chatbotWindow.classList.remove('active');
    });
  }

  // Chat Suggestion Chips
  const chipItems = document.querySelectorAll('.chip-item');
  chipItems.forEach(chip => {
    chip.addEventListener('click', () => {
      const text = chip.getAttribute('data-text');
      sendChatMessage(text);
    });
  });

  // 12. Auth / Login Modal Triggers
  const openLoginBtn = document.getElementById('openLoginBtn');
  const authModal = document.getElementById('authModal');
  const authCloseBtn = document.getElementById('authCloseBtn');

  if (openLoginBtn && authModal) {
    openLoginBtn.addEventListener('click', () => {
      openAuthModal('signin');
    });
  }

  if (authCloseBtn && authModal) {
    authCloseBtn.addEventListener('click', () => {
      authModal.classList.remove('active');
    });

    authModal.addEventListener('click', (e) => {
      if (e.target === authModal) authModal.classList.remove('active');
    });
  }

  // Role Option Radios
  const roleOptions = document.querySelectorAll('.role-option');
  roleOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      roleOptions.forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
      const radio = opt.querySelector('input');
      if (radio) radio.checked = true;
    });
  });

  // 13. Property Quick View Modal Close
  const propertyModal = document.getElementById('propertyModal');
  const propModalCloseBtn = document.getElementById('propModalCloseBtn');

  if (propModalCloseBtn && propertyModal) {
    propModalCloseBtn.addEventListener('click', () => {
      propertyModal.classList.remove('active');
    });

    propertyModal.addEventListener('click', (e) => {
      if (e.target === propertyModal) propertyModal.classList.remove('active');
    });
  }

  // 14. Contact / Visit Modal Close
  const contactModal = document.getElementById('contactModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');

  if (modalCloseBtn && contactModal) {
    modalCloseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      contactModal.classList.remove('active');
    });

    contactModal.addEventListener('click', (e) => {
      if (e.target === contactModal) contactModal.classList.remove('active');
    });
  }

  // 15. Escape Key Closes Any Open Modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (contactModal) contactModal.classList.remove('active');
      if (propertyModal) propertyModal.classList.remove('active');
      if (authModal) authModal.classList.remove('active');
      if (chatbotWindow) chatbotWindow.classList.remove('active');
    }
  });

  // 16. Stat Counter Animation on Scroll (IntersectionObserver)
  const metricVals = document.querySelectorAll('.metric-val[data-target]');
  if ('IntersectionObserver' in window && metricVals.length > 0) {
    let countersAnimated = false;
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !countersAnimated) {
          countersAnimated = true;
          metricVals.forEach(valEl => {
            const target = parseFloat(valEl.getAttribute('data-target'));
            const suffix = valEl.getAttribute('data-suffix') || '';
            const prefix = valEl.getAttribute('data-prefix') || '';
            const decimals = parseInt(valEl.getAttribute('data-decimals') || '0', 10);
            const duration = 1400;
            const startTime = performance.now();

            function updateCounter(currentTime) {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              // easeOutQuart
              const easeProgress = 1 - Math.pow(1 - progress, 4);
              const currentVal = target * easeProgress;

              if (decimals > 0) {
                valEl.textContent = prefix + currentVal.toFixed(decimals) + suffix;
              } else {
                valEl.textContent = prefix + Math.round(currentVal).toLocaleString('en-IN') + suffix;
              }

              if (progress < 1) {
                requestAnimationFrame(updateCounter);
              }
            }
            requestAnimationFrame(updateCounter);
          });
        }
      });
    }, { threshold: 0.25 });

    const metricsStrip = document.querySelector('.metrics-strip');
    if (metricsStrip) counterObserver.observe(metricsStrip);
  }

  // 17. Smooth Scroll for Internal Nav Links with Sticky Header Offset
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 70;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        // Close mobile drawer if open
        if (mobileDrawer && mobileDrawer.classList.contains('open')) {
          mobileDrawer.classList.remove('open');
          if (menuOpenIcon && menuCloseIcon) {
            menuOpenIcon.classList.remove('hidden');
            menuCloseIcon.classList.add('hidden');
          }
        }
      }
    });
  });
});

// Global Function: Filter Properties
function filterProperties(filter) {
  const cards = document.querySelectorAll('.prop-card');
  cards.forEach(card => {
    const cardCity = card.getAttribute('data-city');
    const cardType = card.getAttribute('data-type');
    if (filter === 'all' || cardCity === filter || cardType === filter) {
      card.style.display = 'flex';
      card.style.animation = 'fadeIn 0.35s ease';
    } else {
      card.style.display = 'none';
    }
  });

  const filterBtns = document.querySelectorAll('.pill-btn');
  filterBtns.forEach(b => {
    if (b.getAttribute('data-filter') === filter) {
      b.classList.add('active');
    } else {
      b.classList.remove('active');
    }
  });
}

// Global Function: Open Contact / Site Visit Modal
function openContactModal(propertyName) {
  const modal = document.getElementById('contactModal');
  const modalHeading = document.getElementById('modalHeading');
  const modalSub = document.getElementById('modalSub');

  if (modal) {
    if (modalHeading && propertyName) {
      modalHeading.textContent = `Schedule Visit: ${propertyName}`;
    }
    if (modalSub) {
      modalSub.textContent = 'Connect directly with a verified RERA specialist with zero brokerage.';
    }
    modal.classList.add('active');
  }
}

// Global Function: Open Property Quick View Detail Modal
function openPropertyDetail(title, price, loc, specs, imgUrl, reraNo) {
  const propModal = document.getElementById('propertyModal');
  const detailTitle = document.getElementById('detailTitle');
  const detailPrice = document.getElementById('detailPrice');
  const detailLoc = document.getElementById('detailLoc');
  const detailSpecs = document.getElementById('detailSpecs');
  const detailImg = document.getElementById('detailImg');
  const detailReraNo = document.getElementById('detailReraNo');
  const detailBookVisitBtn = document.getElementById('detailBookVisitBtn');

  if (propModal) {
    if (detailTitle) detailTitle.textContent = title;
    if (detailPrice) detailPrice.textContent = price;
    if (detailLoc) detailLoc.innerHTML = `<i data-lucide="map-pin"></i> ${loc}`;
    if (detailSpecs) detailSpecs.textContent = specs;
    if (detailImg) detailImg.src = imgUrl;
    if (detailReraNo) detailReraNo.textContent = reraNo;

    if (detailBookVisitBtn) {
      detailBookVisitBtn.onclick = () => {
        propModal.classList.remove('active');
        openContactModal(title);
      };
    }

    propModal.classList.add('active');
    if (window.lucide) window.lucide.createIcons();
  }
}

// Global Function: Open Auth / Login Modal
function openAuthModal(tab) {
  const authModal = document.getElementById('authModal');
  if (authModal) {
    switchAuthTab(tab);
    authModal.classList.add('active');
    if (window.lucide) window.lucide.createIcons();
  }
}

function switchAuthTab(tab) {
  const tabSignInBtn = document.getElementById('tabSignInBtn');
  const tabSignUpBtn = document.getElementById('tabSignUpBtn');
  const authTitle = document.getElementById('authTitle');
  const authNameField = document.getElementById('authNameField');
  const authSubmitBtn = document.getElementById('authSubmitBtn');

  if (tab === 'signup') {
    if (tabSignUpBtn) tabSignUpBtn.classList.add('active');
    if (tabSignInBtn) tabSignInBtn.classList.remove('active');
    if (authTitle) authTitle.textContent = 'Create PropCapital Account';
    if (authNameField) authNameField.style.display = 'flex';
    if (authSubmitBtn) authSubmitBtn.innerHTML = 'Register with OTP <i data-lucide="arrow-right"></i>';
  } else {
    if (tabSignInBtn) tabSignInBtn.classList.add('active');
    if (tabSignUpBtn) tabSignUpBtn.classList.remove('active');
    if (authTitle) authTitle.textContent = 'Welcome Back to PropCapital';
    if (authNameField) authNameField.style.display = 'none';
    if (authSubmitBtn) authSubmitBtn.innerHTML = 'Send OTP & Sign In <i data-lucide="arrow-right"></i>';
  }
  if (window.lucide) window.lucide.createIcons();
}

function handleAuthSubmit(event) {
  event.preventDefault();
  const phone = document.getElementById('authPhone').value;
  alert(`OTP has been sent to +91 ${phone}! Check WhatsApp for your 6-digit login code.`);
  const authModal = document.getElementById('authModal');
  if (authModal) authModal.classList.remove('active');
}

function simulateOAuth(provider) {
  alert(`Connecting to ${provider} OAuth... Sign In successful! Welcome to PropCapital.`);
  const authModal = document.getElementById('authModal');
  if (authModal) authModal.classList.remove('active');
}

// Global Function: Chatbot Message Engine
function triggerChatbotPrompt(query) {
  const chatbotWindow = document.getElementById('chatbotWindow');
  if (chatbotWindow) {
    chatbotWindow.classList.add('active');
    sendChatMessage(query);
  }
}

function handleChatSubmit(event) {
  event.preventDefault();
  const chatInputText = document.getElementById('chatInputText');
  if (chatInputText && chatInputText.value.trim() !== '') {
    sendChatMessage(chatInputText.value.trim());
    chatInputText.value = '';
  }
}

function sendChatMessage(userText) {
  const chatMessages = document.getElementById('chatMessages');
  if (!chatMessages) return;

  // 1. Add User Message
  const userRow = document.createElement('div');
  userRow.className = 'chat-bubble-row user-row';
  userRow.innerHTML = `
    <div class="bubble-avatar"><i data-lucide="user"></i></div>
    <div class="bubble-content">
      <p>${escapeHtml(userText)}</p>
      <span class="msg-time">Just now</span>
    </div>
  `;
  chatMessages.appendChild(userRow);
  if (window.lucide) window.lucide.createIcons();
  chatMessages.scrollTop = chatMessages.scrollHeight;

  // 2. Add Typing Indicator
  const typingRow = document.createElement('div');
  typingRow.className = 'chat-bubble-row bot-row typing-row';
  typingRow.innerHTML = `
    <div class="bubble-avatar"><i data-lucide="bot"></i></div>
    <div class="bubble-content">
      <p><em>IRA is analyzing RERA records...</em></p>
    </div>
  `;
  chatMessages.appendChild(typingRow);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  // 3. Generate Intelligent Response after 700ms
  setTimeout(() => {
    typingRow.remove();

    const botReply = generateSmartBotReply(userText);
    const botRow = document.createElement('div');
    botRow.className = 'chat-bubble-row bot-row';
    botRow.innerHTML = `
      <div class="bubble-avatar"><i data-lucide="bot"></i></div>
      <div class="bubble-content">
        <p>${botReply}</p>
        <span class="msg-time">Just now</span>
      </div>
    `;
    chatMessages.appendChild(botRow);
    if (window.lucide) window.lucide.createIcons();
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, 700);
}

function generateSmartBotReply(input) {
  const q = input.toLowerCase();

  if (q.includes('stamp duty') || q.includes('registration')) {
    return '📋 <strong>Haryana Stamp Duty Rates (Gurugram & Faridabad):</strong><br/>• Male Buyers: <strong>7%</strong><br/>• Female Buyers: <strong>5%</strong><br/>• Joint (Male + Female): <strong>6%</strong><br/>Registration fee is ~1% (capped at ₹3 Lakh). For Noida (UP), it is 7% with ₹20,000 concession for women.';
  } else if (q.includes('nri') || q.includes('fema') || q.includes('abroad')) {
    return '✈️ <strong>NRI Property Guidelines:</strong><br/>NRIs and OCIs can freely purchase residential and commercial properties in India with zero prior RBI approval under FEMA rules. PropCapital offers virtual 4K video site visits and NRE/NRO banking assistance.';
  } else if (q.includes('noida') || q.includes('150')) {
    return '📍 <strong>Noida Sector 150 Spotlight:</strong><br/>Sector 150 is NCR\'s greenest hub (80% green coverage) with direct expressway connectivity. Top verified projects include <strong>Tata Eureka Park</strong> (₹1.45 Cr) and <strong>Godrej Woods</strong> (₹2.60 Cr). Would you like to schedule a site visit?';
  } else if (q.includes('3 bhk') || q.includes('gurugram') || q.includes('dlf') || q.includes('golf course')) {
    return '✨ <strong>Top 3 BHK Matches in Gurugram:</strong><br/>1. <strong>M3M Golfestate (Sector 65)</strong>: ₹3.85 Cr (98% AI Match, Ready to Move)<br/>2. <strong>Sobha City (Dwarka Expressway)</strong>: ₹3.20 Cr<br/>Both have zero buyer brokerage and verified RERA certificates.';
  } else if (q.includes('emi') || q.includes('loan') || q.includes('interest')) {
    return '📊 Use our interactive <strong>EMI Planner</strong> on this page! Current prime home loan interest rates in India start from <strong>8.35% – 8.75% p.a.</strong> You can adjust loan tenure up to 30 years with instant Rupee calculations.';
  } else {
    return `✨ Thank you for asking about "<strong>${escapeHtml(input)}</strong>". I've shortlisted verified RERA projects in Gurugram, Noida, and Faridabad that match your criteria with zero brokerage. You can click <strong>"Book Visit"</strong> on any property or request a callback!`;
  }
}

function escapeHtml(text) {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
  return text.replace(/[&<>"']/g, m => map[m]);
}

// Global Function: Lead Form Submit
function handleFormSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('leadName').value;
  const phone = document.getElementById('leadPhone').value;
  const city = document.getElementById('leadCity').value;

  alert(`Thank you, ${name}! Your site visit request for ${city} has been confirmed. Our certified RERA advisor will call you at ${phone} within 2 hours.`);
  
  const modal = document.getElementById('contactModal');
  if (modal) modal.classList.remove('active');
  
  const form = document.getElementById('leadForm');
  if (form) form.reset();
}
