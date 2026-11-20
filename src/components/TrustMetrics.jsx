import React from 'react';

export default function TrustMetrics({ metrics }) {
  const data = metrics || {
    verifiedProperties: '12,000+',
    brokerageForBuyers: '₹0',
    certifiedBuilders: '186+',
    aiMatchSatisfaction: '98.4%',
    advisorResponseTime: '< 2 Hrs'
  };

  return (
    <section className="metrics-strip" aria-label="Key Trust Metrics">
      <div className="container metrics-container">
        
        <div className="metric-block">
          <div className="metric-val">{data.verifiedProperties}</div>
          <div className="metric-desc">RERA Verified Properties</div>
        </div>

        <div className="metric-sep"></div>

        <div className="metric-block">
          <div className="metric-val gradient-cyan-text">{data.brokerageForBuyers}</div>
          <div className="metric-desc">Brokerage for Buyers</div>
        </div>

        <div className="metric-sep"></div>

        <div className="metric-block">
          <div className="metric-val">{data.certifiedBuilders}</div>
          <div className="metric-desc">Certified NCR Builders</div>
        </div>

        <div className="metric-sep"></div>

        <div className="metric-block">
          <div className="metric-val gradient-cyan-text">{data.aiMatchSatisfaction}</div>
          <div className="metric-desc">AI Match Satisfaction</div>
        </div>

        <div className="metric-sep"></div>

        <div className="metric-block">
          <div className="metric-val">{data.advisorResponseTime}</div>
          <div className="metric-desc">Advisor Response Guarantee</div>
        </div>

      </div>
    </section>
  );
}
