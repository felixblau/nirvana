import { NirvanaLogo } from './Icons'
import TapRipple from './TapRipple'

export default function InsuranceConfirmSheet({ showTap, onConfirm }) {
  const base = import.meta.env.BASE_URL
  return (
    <div className="sheet-overlay">
      <div className="sheet insurance-confirm-sheet">
        <div className="sheet-handle" />

        <div className="ic-heading">I found the following insurance information. Does it look right?</div>

        <div className="ic-card">
          <div className="ic-plan">Open Choice PPO</div>

          <div className="ic-card-image">
            <img src={`${base}assets/insurance-card.png`} alt="Insurance card" />
          </div>

          <ul className="ic-details">
            <li>
              <svg className="ic-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <span>Your member ID is <span className="ic-bold">W584638564</span></span>
            </li>
            <li>
              <svg className="ic-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="8" />
                <path d="M12 7v10M9 9.5h4.5a1.5 1.5 0 0 1 0 3h-3a1.5 1.5 0 0 0 0 3H15" />
              </svg>
              <span>Your <span className="ic-accent">copay</span> is $20</span>
            </li>
            <li>
              <svg className="ic-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <polyline points="9 12 11 14 15 10" />
              </svg>
              <span className="ic-payer-line">
                Your <span className="ic-accent">payer is</span>
                <span className="ic-aetna-chip"><img src={`${base}assets/aetna-logo.jpg`} alt="Aetna" /></span>
                <span className="ic-dim">(60054)</span>
              </span>
            </li>
            <li>
              <svg className="ic-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <circle cx="9" cy="11" r="2" />
                <path d="M14 10h4M14 14h4M5 17c1-2 3-3 4-3s3 1 4 3" />
              </svg>
              <span>Your plan expires on 12/31/25</span>
            </li>
          </ul>
        </div>

        <div className="ic-actions">
          <button className="ic-btn ic-btn-secondary">Something's off</button>
          <button className="ic-btn ic-btn-primary" onClick={onConfirm} style={{ position: 'relative', overflow: 'hidden' }}>
            Looks right
            {showTap && <TapRipple />}
          </button>
        </div>

        <div className="sheet-footer">
          Powered by <NirvanaLogo />
        </div>
      </div>
    </div>
  )
}
