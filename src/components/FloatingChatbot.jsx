import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, RotateCcw, Building2, MapPin, ShieldCheck, TrendingUp, IndianRupee } from 'lucide-react';

const INITIAL_GREETING = {
  sender: 'bot',
  text: 'Hello! I am **IRA**, your verified NCR real estate intelligence assistant. I can help you with:\n\n• **RERA Verification & Due Diligence**\n• **Price Benchmarks** in Delhi, Noida, Gurugram & Faridabad\n• **High-Yield Commercial & Rental Assets** (up to 8.4% yield)\n• **Zero Brokerage Guarantee** for buyers\n\nWhat corridor or property can I evaluate for you today?',
  time: 'Just now'
};

const QUICK_PROMPTS = [
  { label: '📍 Delhi & NCR Options', query: 'Show me verified properties in Delhi & NCR' },
  { label: '🏙️ Sector 150 Noida', query: 'What are the top projects and price trends in Sector 150 Noida?' },
  { label: '💎 Golf Course Luxury', query: 'Tell me about ultra-luxury projects on Golf Course Road Gurugram' },
  { label: '🛡️ Zero Brokerage FAQ', query: 'How does your 100% Zero Brokerage model work for buyers?' },
  { label: '📈 Commercial 8%+ Yield', query: 'Which commercial properties offer the highest rental yield?' },
  { label: '🏦 Home Loan & EMI', query: 'What are current home loan interest rates and EMI estimates?' }
];

export default function FloatingChatbot({ isOpen, onToggle, showToast }) {
  const [messages, setMessages] = useState([INITIAL_GREETING]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      if (window.innerWidth > 768) {
        setTimeout(() => inputRef.current?.focus(), 150);
      }
    }
  }, [messages, isOpen, isTyping]);

  const handleSend = (textToSend) => {
    const text = (textToSend !== undefined ? textToSend : inputText).trim();
    if (!text) return;

    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const userMsg = { sender: 'user', text, time: currentTime };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const lower = text.toLowerCase();
      let botResponse = '';

      if (lower.includes('delhi') || lower.includes('moti nagar') || lower.includes('south delhi') || lower.includes('okhla')) {
        botResponse = `**Delhi Prime Real Estate Insights:**\n\n• **DLF One Midtown (Moti Nagar, New Delhi)**: Luxury 3 BHK starting at ₹3.50 Cr with direct metro access and 128 acres of surrounding greens. RERA No: \`DLRERA2021P0007\`.\n• **Godrej South Estate (Okhla Phase 1, South Delhi)**: Ultra-luxury 4 BHK tower with air purification technology. RERA No: \`DLRERA2019P0003\`.\n• **Greater NCR Corridors**: Seamlessly connected to Gurugram via Delhi-Gurgaon Expressway and Noida via DND Flyway.\n\nAll listings on PropCapital feature **100% verified title deeds and ₹0 buyer brokerage**. Would you like to schedule an escorted 4K private tour?`;
      } else if (lower.includes('noida') || lower.includes('150') || lower.includes('129') || lower.includes('43')) {
        botResponse = `**Noida & Greater Noida Market Intelligence:**\n\n• **Sector 150 (Sports City)**: The greenest sector in NCR (80% green canopy). Projects like **Tata Eureka Park** (₹1.45 Cr, smart home tech) and **Godrej Woods** (Sector 43, ₹2.60 Cr) are standout performers.\n• **Price Benchmark**: ₹6,500 – ₹15,000/sqft across the Noida-Greater Noida Expressway.\n• **Growth Drivers**: Jewar International Airport, metro line extension, and commercial office clusters at Sector 129.\n\nForecasted 3-year capital appreciation is **8.5% – 11.2% per annum**.`;
      } else if (lower.includes('golf course') || lower.includes('gurugram') || lower.includes('gurgaon') || lower.includes('dlf') || lower.includes('dwarka expressway')) {
        botResponse = `**Gurugram Ultra-Luxury Corridors:**\n\n• **DLF Phase 5 & Golf Course Road**: The pinnacle of Indian luxury living. **DLF Phase 5 Sky Residences** and **M3M Golfestate Signature Suites** trade between ₹18,000 – ₹26,000/sqft with top tier amenities.\n• **Dwarka Expressway (Sector 106–109)**: **Sobha City** offers waterfront living at ₹13,800/sqft with immense appreciation potential post cloverleaf completion.\n• **RERA Verification**: 100% verified with HARERA-GGM certificates on file.\n\nWe offer curated white-glove site visits with developer senior leadership for high-net-worth buyers.`;
      } else if (lower.includes('faridabad') || lower.includes('86') || lower.includes('surajkund') || lower.includes('neharpar')) {
        botResponse = `**Greater Faridabad Corridors:**\n\n• **Sector 86 & Neharpar**: **Puri Diplomatic Greens** provides 3 BHK gated township homes at an accessible price of ₹1.15 Cr (₹6,200/sqft).\n• **Surajkund Road**: **Omaxe Forest Spa Penthouses** (₹2.10 Cr) offers panoramic Aravalli bio-reserve views right on the South Delhi border.\n• **Key Connectivity**: FNG Expressway link and Delhi-Mumbai Expressway make this NCR's fastest expanding value hub.`;
      } else if (lower.includes('brokerage') || lower.includes('fee') || lower.includes('commission') || lower.includes('zero')) {
        botResponse = `**Why PropCapital Charges ₹0 Brokerage to Buyers:**\n\n1. **Direct Builder Partnerships**: We partner officially with 186+ certified Tier-1 builders (DLF, Tata, Godrej, M3M, Sobha) who compensate our platform.\n2. **Zero Hidden Fees**: You pay the exact same or discounted direct builder rate.\n3. **Complimentary Legal & RERA Vetting**: Our legal team inspects title deeds, encumbrance certificates, and RERA approvals at zero cost to you.\n4. **Escorted 4K Site Visits**: Free chauffeur service for site visits across Delhi NCR.`;
      } else if (lower.includes('commercial') || lower.includes('yield') || lower.includes('office') || lower.includes('retail')) {
        botResponse = `**High-Yield Commercial Opportunities:**\n\n• **Cyber City Horizon (DLF Phase 5, Gurugram)**: Grade-A corporate office suites delivering **8.4% Net Rental Yield** with Fortune 500 pre-leases.\n• **Max Square Corporate Suites (Sector 129, Noida)**: IGBC Gold certified spaces with **7.8% Net Rental Yield** at ₹2.75 Cr.\n• **Capital Safety**: All commercial assets have pre-fitted leases with 9-year terms and 15% escalation every 3 years.`;
      } else if (lower.includes('loan') || lower.includes('emi') || lower.includes('interest') || lower.includes('bank')) {
        botResponse = `**Home Loan & Financing Guidance:**\n\n• **Interest Rates**: Prime benchmark rates start at **8.35% – 8.75% p.a.** via our partner banks (SBI, HDFC Bank, ICICI Bank, Axis Bank).\n• **Pre-Approved Inventory**: All listed properties have APF numbers for instant 48-hour sanction.\n• **EMI Example**: A ₹1.5 Cr loan at 8.4% for 20 years equates to approx **₹1,29,200/month**.\n\nYou can also experiment with our interactive EMI Planner section on the page!`;
      } else {
        botResponse = `Thank you for your inquiry regarding "${text}".\n\nI have cross-referenced our real-time database of **12,000+ RERA-approved listings** across Delhi NCR.\n\n• **Next Step**: Would you like me to filter matching listings in the main catalog, or connect you with a senior on-ground relationship advisor for a private 4K virtual tour?`;
      }

      setMessages(prev => [...prev, {
        sender: 'bot',
        text: botResponse,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setIsTyping(false);
    }, 650);
  };

  const handleResetChat = () => {
    setMessages([INITIAL_GREETING]);
    setInputText('');
    setIsTyping(false);
    if (showToast) showToast('Conversation reset. Ready for your next query.', 'info');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const renderFormattedText = (rawText) => {
    const lines = rawText.split('\n');
    return lines.map((line, idx) => {
      if (!line.trim()) {
        return <div key={idx} className="chat-spacer" />;
      }
      
      const parts = line.split(/(\*\*.*?\*\*|`.*?`)/g);
      const formattedParts = parts.map((part, pIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={pIdx} className="chat-bold">{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith('`') && part.endsWith('`')) {
          return <code key={pIdx} className="chat-code">{part.slice(1, -1)}</code>;
        }
        return part;
      });

      if (line.startsWith('• ')) {
        return (
          <div key={idx} className="chat-bullet-line">
            <span className="bullet-dot">•</span>
            <span>{formattedParts.slice(1)}</span>
          </div>
        );
      }

      return <div key={idx} className="chat-text-line">{formattedParts}</div>;
    });
  };

  return (
    <aside className="floating-chatbot-container" id="chatbotContainer" aria-label="AI Property Assistant">
      <button 
        type="button" 
        className={`chatbot-trigger-btn ${isOpen ? 'active' : ''}`}
        id="chatbotToggleBtn" 
        onClick={onToggle}
        aria-label={isOpen ? 'Close AI Assistant' : 'Open AI Assistant'}
        aria-expanded={isOpen}
      >
        <div className="bot-avatar-icon">
          <Sparkles size={18} className="trigger-sparkle" />
        </div>
        <div className="bot-trigger-text">
          <span className="bot-title">Ask IRA</span>
          <span className="bot-status">
            <span className="pulse-cyan"></span> AI Active
          </span>
        </div>
        {hasUnread && !isOpen && (
          <span className="bot-ping-badge" aria-label="1 unread notification">1</span>
        )}
      </button>

      <div 
        className={`chatbot-window ${isOpen ? 'active show' : ''}`} 
        id="chatbotWindow"
        role="dialog"
        aria-modal="true"
        aria-labelledby="chatBotHeading"
      >
        <div className="chat-header">
          <div className="chat-header-info">
            <div className="chat-avatar-badge">
              <Sparkles size={18} />
              <span className="avatar-online-dot"></span>
            </div>
            <div>
              <div className="chat-bot-title" id="chatBotHeading">
                IRA <span className="ai-tag-pill">AI Engine</span>
              </div>
              <div className="chat-bot-desc">
                <span className="pulse-cyan"></span> Live • 100% RERA Verified • Delhi NCR
              </div>
            </div>
          </div>

          <div className="chat-header-actions">
            <button 
              type="button" 
              className="chat-action-btn" 
              onClick={handleResetChat}
              title="Restart Conversation"
              aria-label="Restart Conversation"
            >
              <RotateCcw size={15} />
            </button>
            <button 
              type="button" 
              className="chat-action-btn chat-close-btn" 
              id="closeChatBtn" 
              onClick={onToggle} 
              title="Close Assistant"
              aria-label="Close Assistant"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        <div className="chat-chips-scroll" role="toolbar" aria-label="Suggested questions">
          {QUICK_PROMPTS.map((prompt, idx) => (
            <button 
              key={idx}
              type="button" 
              className="chat-chip-btn"
              onClick={() => handleSend(prompt.query)}
            >
              {prompt.label}
            </button>
          ))}
        </div>

        <div className="chat-messages-container" id="chatBody" role="log" aria-live="polite">
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`chat-bubble-row ${msg.sender === 'user' ? 'user-row' : 'bot-row'}`}
            >
              {msg.sender === 'bot' && (
                <div className="bubble-avatar" aria-hidden="true">
                  <Sparkles size={13} />
                </div>
              )}
              
              <div className="bubble-content-wrap">
                <div className="bubble-content">
                  {renderFormattedText(msg.text)}
                </div>
                <span className="msg-timestamp">{msg.time}</span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="chat-bubble-row bot-row typing-row" aria-live="assertive">
              <div className="bubble-avatar" aria-hidden="true">
                <Sparkles size={13} />
              </div>
              <div className="bubble-content-wrap">
                <div className="bubble-content typing-bubble">
                  <div className="typing-dots-anim">
                    <span className="dot dot-1"></span>
                    <span className="dot dot-2"></span>
                    <span className="dot dot-3"></span>
                  </div>
                  <span className="typing-label">IRA is analyzing RERA verified records...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input-dock">
          <form 
            className="chat-input-form" 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          >
            <input 
              ref={inputRef}
              type="text" 
              id="chatInput" 
              className="chat-input-field"
              placeholder="Ask about prices, Delhi, Noida, RERA, EMI..." 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              autoComplete="off"
              aria-label="Ask IRA AI property advisor"
            />
            <button 
              type="submit" 
              id="sendChatBtn" 
              className={`chat-send-btn ${inputText.trim() ? 'has-text' : ''}`}
              disabled={!inputText.trim() && !isTyping}
              aria-label="Send message"
            >
              <Send size={15} />
            </button>
          </form>
          <div className="chat-dock-disclaimer">
            <span>PropCapital AI Core</span> • <span>100% Zero Brokerage For Buyers</span>
          </div>
        </div>

      </div>
    </aside>
  );
}
