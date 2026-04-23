import { ChevronRight, LockIcon, NirvanaLogo } from './Icons'
import TapRipple from './TapRipple'

export default function PaymentSheet({ cvvFilled, onConfirm, showTap }) {
  return (
    <div className="sheet-overlay">
      <div className="sheet">
        <div className="sheet-handle" />

        <div className="booking-title">Book appointment</div>

        <div className="appt-summary">
          <div className="appt-row">
            <span className="appt-row-label">Doctor</span>
            <span className="appt-row-value">Dr. Priya Sharma, MD</span>
          </div>
          <div className="appt-row">
            <span className="appt-row-label">Date</span>
            <span className="appt-row-value">Mon, Mar 24</span>
          </div>
          <div className="appt-row">
            <span className="appt-row-label">Time</span>
            <span className="appt-row-value">9:00AM</span>
          </div>
          <div className="appt-row">
            <span className="appt-row-label">Location</span>
            <span className="appt-row-value">425 E 61st St, New York, NY 10065</span>
          </div>
        </div>

        <div className="copay-bar">
          <span className="copay-label">Estimated copay with insurance</span>
          <span className="copay-amount">$45.00</span>
        </div>

        <div className="payment-section-label">Payment Method</div>
        <div className="payment-card">
          <div className="visa-badge">VISA</div>
          <div className="card-info">
            <div className="card-name">Chase Sapphire</div>
            <div className="card-number">•••• 4242</div>
          </div>
          <ChevronRight />
        </div>

        <div className="cvv-section">
          <div className="payment-section-label">CVV</div>
          <div className="cvv-input" style={{ position: 'relative', overflow: 'hidden' }}>
            {cvvFilled ? <span className="cvv-dots">•••</span> : null}
            <LockIcon />
            {showTap && !cvvFilled && <TapRipple />}
          </div>
        </div>

        <button
          className={`book-appointment-btn ${cvvFilled ? '' : 'disabled'}`}
          onClick={cvvFilled ? onConfirm : undefined}
          style={{ position: 'relative', overflow: 'hidden' }}
        >
          Book Appointment – $45.00
          {showTap && cvvFilled && <TapRipple />}
        </button>

        <div className="sheet-footer">
          Powered by <NirvanaLogo /> <span style={{ fontSize: 16, color: '#f97316', marginLeft: 2 }}>●</span>
        </div>
      </div>
    </div>
  )
}
