import { StarIcon, LocationIcon, ArrowRight } from './Icons'
import TapRipple from './TapRipple'

const base = import.meta.env.BASE_URL

const DOCTORS = [
  {
    name: 'Dr. Priya Sharma, MD',
    specialty: 'Radiologist',
    rating: 4.92,
    reviews: 187,
    distance: '2.3 mi',
    address: '425 E 61st St, New York, NY 10065',
    initials: 'PS',
  },
  {
    name: 'Dr. Marcus Chen, MD',
    specialty: 'Radiologist',
    rating: 4.90,
    reviews: 243,
    distance: '3.1 mi',
    address: '1305 York Ave, New York, NY 10021',
    initials: 'MC',
  },
  {
    name: 'Dr. Sarah Williams, MD',
    specialty: 'Radiologist',
    rating: 4.87,
    reviews: 156,
    distance: '4.2 mi',
    address: '560 First Ave, New York, NY 10016',
    initials: 'SW',
  },
]

export default function DoctorCards({ onBook, showTap, disabled }) {
  return (
    <div className="doctor-cards">
      {DOCTORS.map((doc, i) => (
        <div key={i} className="doctor-card fade-in">
          <div className="doctor-header">
            <div className="doctor-avatar">
              <div style={{ width: 36, height: 36, background: '#e5e7eb', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 600, color: '#6b7280' }}>
                {doc.initials}
              </div>
            </div>
            <div>
              <div className="doctor-name">{doc.name}</div>
              <div className="doctor-specialty">{doc.specialty}</div>
            </div>
          </div>

          <div className="doctor-rating">
            <StarIcon /> <strong>{doc.rating}</strong>
            <span className="reviews">{doc.reviews} reviews</span>
            <LocationIcon />
            <span className="distance">{doc.distance}</span>
          </div>

          <div className="doctor-address">{doc.address}</div>

          <div className="doctor-tags">
            <img src={`${base}assets/nirvana-glyph.png`} alt="" style={{ height: 12, width: 'auto' }} />
            <img src={`${base}assets/amazone-one.png`} alt="" style={{ height: 16, width: 'auto' }} />
            In-network
          </div>

          <button
            className={`book-btn${disabled ? ' disabled' : ''}`}
            onClick={!disabled && i === 0 ? onBook : undefined}
            style={{ position: 'relative', overflow: 'hidden' }}
          >
            Book <ArrowRight />
            {i === 0 && showTap && !disabled && <TapRipple />}
          </button>
        </div>
      ))}
    </div>
  )
}
