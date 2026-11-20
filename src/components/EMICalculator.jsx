import React, { useState, useMemo } from 'react';
import { ArrowRight } from 'lucide-react';

export default function EMICalculator({ onApplyLoan }) {
  const [loanAmount, setLoanAmount] = useState(15000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenureYears, setTenureYears] = useState(20);

  const calculation = useMemo(() => {
    const P = Number(loanAmount);
    const annualRate = Number(interestRate);
    const years = Number(tenureYears);

    const r = annualRate / 12 / 100;
    const n = years * 12;

    let emi = 0;
    if (r === 0) {
      emi = P / n;
    } else {
      const compound = Math.pow(1 + r, n);
      emi = (P * r * compound) / (compound - 1);
    }

    const totalPayment = emi * n;
    const totalInterest = totalPayment - P;

    return {
      monthlyEmi: Math.round(emi),
      principal: P,
      totalInterest: Math.round(totalInterest),
      totalPayment: Math.round(totalPayment)
    };
  }, [loanAmount, interestRate, tenureYears]);

  const formatRupee = (num) => {
    return '₹ ' + num.toLocaleString('en-IN');
  };

  return (
    <section className="section calculator-section" id="calculator">
      <div className="container">
        
        <div className="section-title-wrap">
          <div className="section-tag tag-cyan">Financial Precision</div>
          <h2 className="section-heading">Real-Time EMI & Loan Planner</h2>
          <p className="section-subtext">Calculate your exact monthly payments and total interest before you make an offer.</p>
        </div>

        <div className="fin-calc-box">
          <div className="calc-slider-col">
            <div className="control-group">
              <div className="control-header">
                <label htmlFor="loanAmount">Loan Amount</label>
                <span className="control-val" id="loanAmountDisplay">{formatRupee(loanAmount)}</span>
              </div>
              <input 
                type="range" 
                id="loanAmount" 
                min="2000000" 
                max="100000000" 
                step="500000" 
                value={loanAmount} 
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="neon-slider" 
                aria-label="Loan Amount Slider"
              />
              <div className="control-bounds">
                <span>₹20 Lakh</span>
                <span>₹5 Crore</span>
                <span>₹10 Crore</span>
              </div>
            </div>

            <div className="control-group">
              <div className="control-header">
                <label htmlFor="interestRate">Interest Rate (% p.a.)</label>
                <span className="control-val" id="interestRateDisplay">{interestRate}%</span>
              </div>
              <input 
                type="range" 
                id="interestRate" 
                min="6.5" 
                max="14.0" 
                step="0.1" 
                value={interestRate} 
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="neon-slider" 
                aria-label="Interest Rate Slider"
              />
              <div className="control-bounds">
                <span>6.5%</span>
                <span>10.0%</span>
                <span>14.0%</span>
              </div>
            </div>

            <div className="control-group">
              <div className="control-header">
                <label htmlFor="loanTenure">Loan Tenure</label>
                <span className="control-val" id="loanTenureDisplay">{tenureYears} Years</span>
              </div>
              <input 
                type="range" 
                id="loanTenure" 
                min="5" 
                max="30" 
                step="1" 
                value={tenureYears} 
                onChange={(e) => setTenureYears(Number(e.target.value))}
                className="neon-slider" 
                aria-label="Loan Tenure Slider"
              />
              <div className="control-bounds">
                <span>5 Years</span>
                <span>15 Years</span>
                <span>30 Years</span>
              </div>
            </div>
          </div>

          <div className="calc-output-col">
            <div className="output-top-label">Estimated Monthly EMI</div>
            <div className="output-emi-number" id="monthlyEmiDisplay">
              {formatRupee(calculation.monthlyEmi)}
            </div>
            <div className="output-sub">Based on chosen tenure & interest rate</div>

            <div className="output-breakdown-list">
              <div className="breakdown-item">
                <span>Principal Amount</span>
                <strong id="summaryPrincipal">{formatRupee(calculation.principal)}</strong>
              </div>
              <div className="breakdown-item">
                <span>Total Interest Payable</span>
                <strong id="summaryInterest">{formatRupee(calculation.totalInterest)}</strong>
              </div>
              <div className="breakdown-item item-total">
                <span>Total Amount (P + I)</span>
                <strong id="summaryTotal">{formatRupee(calculation.totalPayment)}</strong>
              </div>
            </div>

            <button 
              type="button" 
              className="btn btn-primary btn-block" 
              onClick={() => onApplyLoan && onApplyLoan('Pre-Approved Loan Offer')}
            >
              Get Pre-Approved Loan Offer <ArrowRight size={16} />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
