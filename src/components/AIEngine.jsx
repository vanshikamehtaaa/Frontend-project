import React from 'react';
import { Sparkles, Cpu, FileCheck2, Percent, ArrowRight } from 'lucide-react';

export default function AIEngine({ onOpenChatbot }) {
  const handleScrollToCalc = (e) => {
    e.preventDefault();
    const el = document.getElementById('calculator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="section ai-section" id="ai-engine">
      <div className="container">
        
        <div className="ai-engine-grid">
          <div className="ai-info-col">
            <div className="section-tag tag-cyan">
              <Sparkles size={13} /> <span>Proprietary Intelligence</span>
            </div>
            <h2 className="section-heading">How PropCapital AI Outperforms Traditional Brokers</h2>
            <p className="section-subtext">Traditional brokers waste your time with fake listings and biased recommendations. Our AI scores every parameter objectively against public RERA records.</p>

            <div className="tech-points-list">
              <div className="tech-point">
                <div className="point-icon">
                  <Cpu size={18} className="text-cyan" />
                </div>
                <div>
                  <h4>140+ Micro-Signals Evaluated</h4>
                  <p>Sunlight exposure, layout efficiency, builder delivery track record, and neighborhood appreciation index.</p>
                </div>
              </div>

              <div className="tech-point">
                <div className="point-icon">
                  <FileCheck2 size={18} className="text-cyan" />
                </div>
                <div>
                  <h4>Real-Time RERA Legal Clearance</h4>
                  <p>Live verification against Haryana (HRERA) and UP (UP-RERA) registries to ensure clean titles.</p>
                </div>
              </div>

              <div className="tech-point">
                <div className="point-icon">
                  <Percent size={18} className="text-cyan" />
                </div>
                <div>
                  <h4>Zero Brokerage Guarantee</h4>
                  <p>Save between ₹1.5 Lakh to ₹10+ Lakh in broker fees on every single property transaction.</p>
                </div>
              </div>
            </div>

            <div className="ai-action-row">
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={onOpenChatbot}
              >
                <Sparkles size={16} /> <span>Launch Live AI Advisor</span>
              </button>
              <a 
                href="#calculator" 
                className="btn btn-secondary"
                onClick={handleScrollToCalc}
              >
                Open EMI Planner
              </a>
            </div>
          </div>

          <div className="ai-mockup-col">
            <div className="ai-terminal-card">
              
              <div className="terminal-bar">
                <div className="dots-wrap">
                  <span className="dot red"></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                </div>
                <div className="terminal-title">IRA — Real Estate AI Advisor</div>
                <div className="status-indicator">
                  <span className="pulse-cyan"></span> Live
                </div>
              </div>

              <div className="terminal-body">
                <div className="terminal-chat user-msg">
                  <div className="msg-author">You</div>
                  <p>"Find a 3 BHK near Golf Course Ext with high sunlight and under ₹3 Cr. Must be ready to move."</p>
                </div>

                <div className="terminal-chat ai-msg">
                  <div className="msg-author ai-author">
                    <Sparkles size={13} /> <span>IRA Real Estate AI</span>
                  </div>
                  <div className="match-score-badge">98.6% Best Match Found</div>
                  <h4>M3M Golfestate (Sector 65, Gurugram)</h4>
                  <p>Matches all 4 criteria: 2,450 sq.ft, unobstructed morning sunlight, 12 min drive to DLF Cyber Hub via Golf Course Road, RERA verified (RC/REP/HARERA/GGM/2018).</p>
                  
                  <div className="msg-chips">
                    <span>Price: ₹2.85 Cr</span>
                    <span>Brokerage: ₹0</span>
                    <span>Status: Ready</span>
                  </div>
                </div>

                <div className="terminal-footer">
                  <div className="meter-label">AI Confidence Index</div>
                  <div className="meter-bar"><div className="meter-fill" style={{ width: '98%' }}></div></div>
                  <span className="meter-percent">98.6%</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
