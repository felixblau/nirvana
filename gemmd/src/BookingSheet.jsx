import { GemMDLogo } from './Icons'
import TapRipple from './TapRipple'

const DATES = [
  { day: 'MON', num: 24 },
  { day: 'TUE', num: 25 },
  { day: 'WED', num: 26 },
  { day: 'THU', num: 27 },
  { day: 'FRI', num: 28 },
]

const TIMES = [
  '9:00AM', '9:30AM', '10:00AM', '10:30AM',
  '11:30AM', '12:00PM', '12:30PM', '1:00PM',
  '1:30PM', '2:00PM', '2:30PM', '3:00PM',
]

export default function BookingSheet({ onBook, showTap }) {
  return (
    <div className="sheet-overlay">
      <div className="sheet">
        <div className="sheet-handle" />

        <div className="booking-doctor">
          <div className="doctor-avatar">
            <div style={{ width: 36, height: 36, background: '#ddd', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: '#666' }}>PS</div>
          </div>
          <div>
            <div className="doctor-name">Dr. Priya Sharma, MD</div>
            <div className="doctor-specialty">Radiologist</div>
          </div>
        </div>

        <div className="date-picker">
          <div className="date-picker-label">Select date</div>
          <div className="date-row">
            {DATES.map((d, i) => (
              <div key={i} className={`date-chip ${i === 0 ? 'selected' : ''}`}>
                <div className="date-chip-day">{d.day}</div>
                <div className="date-chip-num">{d.num}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="time-picker-label">Select times</div>
          <div className="time-grid">
            {TIMES.map((t, i) => (
              <div key={i} className={`time-chip ${i === 0 ? 'selected' : ''}`}>{t}</div>
            ))}
          </div>
        </div>

        <button className="book-appointment-btn" onClick={onBook} style={{ position: 'relative', overflow: 'hidden' }}>
          Book Appointment →
          {showTap && <TapRipple />}
        </button>

        <div className="sheet-footer">
          Powered by <GemMDLogo />
        </div>
      </div>
    </div>
  )
}
