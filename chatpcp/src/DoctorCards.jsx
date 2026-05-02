import { StarIcon, LocationIcon, ArrowRight } from './Icons'
import TapRipple from './TapRipple'

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

          <div className="doctor-tags" style={{ color: 'var(--gray-900)' }}>
            <svg width="12" height="13" viewBox="-1 -1 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.61773 6.36656C5.34075 6.36656 5.92687 5.78629 5.92687 5.07049C5.92687 4.35469 5.34075 3.77441 4.61773 3.77441C3.89471 3.77441 3.30859 4.35469 3.30859 5.07049C3.30859 5.78629 3.89471 6.36656 4.61773 6.36656Z" fill="white"/>
              <path d="M6.43896 6.78564C4.89906 7.11385 3.91949 8.61649 4.251 10.141C5.79154 9.81217 6.77112 8.31017 6.43896 6.78564Z" fill="white"/>
              <path d="M5.20703 2.63989C6.25746 3.80211 8.06126 3.90122 9.23519 2.86127C8.18411 1.69841 6.38096 1.5993 5.20703 2.63989Z" fill="white"/>
              <path d="M0 7.27949C1.17393 6.23954 2.97773 6.33865 4.02816 7.50151C2.85358 8.54145 1.05043 8.4417 0 7.27949Z" fill="white"/>
              <path d="M4.9855 0C5.31701 1.52453 4.33678 3.02717 2.79689 3.35473C2.46538 1.8302 3.44496 0.328201 4.9855 0Z" fill="white"/>
              <path d="M0.371952 2.22266C1.86764 2.71303 2.67821 4.31092 2.1829 5.79168C0.68786 5.30131-0.123362 3.70342 0.371952 2.22266Z" fill="white"/>
              <path d="M7.03284 4.36768C8.52853 4.85805 9.3391 6.45593 8.84378 7.9367C7.34874 7.44568 6.53817 5.84844 7.03284 4.36768Z" fill="white"/>
            </svg>
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
