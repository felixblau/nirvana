import { useEffect, useState } from 'react'
import { NirvanaGlyph } from '../Logo.jsx'

const THERAPISTS = [
  {
    name: 'Shannon Lamprecht, MSW, LCSW',
    miles: '1.09 miles away',
    photo: 'brand/therapist-1.webp',
    slots: ['Thu 4/30, 10:00 AM', 'Wed 5/13, 1:00 PM'],
  },
  {
    name: 'Corrada Spatola, MA, LMHC',
    miles: '1.24 miles away',
    photo: 'brand/therapist-2.webp',
    slots: ['Mon 5/11, 10:45 AM', 'Wed 5/13, 7:45 AM'],
  },
]

export function Matches({ onBack }) {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    // scroll the inner phone viewport back to top on mount
    const main = document.querySelector('main')
    const scroller = main && main.parentElement
    if (scroller) scroller.scrollTop = 0
    const t = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(t)
  }, [])

  if (loading) return <MatchesSkeleton onBack={onBack} />

  return (
    <main style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'white' }}>
      <TopBar onBack={onBack} />

      <div style={{ padding: '20px 20px 10px' }}>
        <div
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 13,
            color: 'var(--ls-ink-muted)',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 4,
          }}
        >
          <span>Individual Therapy</span>
          <span style={{ color: '#cccccc' }}>|</span>
          <span>Aetna</span>
          <button
            aria-label="Edit filters"
            style={{
              width: 22,
              height: 22,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M11.5 1.5l3 3-9.5 9.5H2v-3L11.5 1.5z" stroke="var(--ls-ink-muted)" strokeWidth="1.3" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontFamily: 'var(--font-sans)',
            marginBottom: 16,
          }}
        >
          <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--ls-ink)' }}>
            91 Provider matches
          </span>
          <button
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              fontSize: 14,
              fontWeight: 600,
              color: 'rgb(0, 103, 206)',
              cursor: 'pointer',
            }}
          >
            60 miles from 10012
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M3 5l3 3 3-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <FilterChips />
      </div>

      <div style={{ padding: '4px 20px 40px', display: 'flex', flexDirection: 'column', gap: 28 }}>
        {THERAPISTS.map((t) => (
          <TherapistCard key={t.name} therapist={t} />
        ))}
      </div>
    </main>
  )
}

function MatchesSkeleton({ onBack }) {
  return (
    <main style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'white' }}>
      <TopBar onBack={onBack} />

      <div style={{ padding: '20px 20px 10px' }}>
        <Shimmer w="60%" h={14} style={{ marginBottom: 10 }} />
        <Shimmer w="85%" h={18} style={{ marginBottom: 18 }} />
        <FilterChips />
      </div>

      <div style={{ padding: '20px 20px 40px', display: 'flex', flexDirection: 'column', gap: 36 }}>
        {[0, 1, 2].map((i) => (
          <TherapistSkeletonCard key={i} />
        ))}
      </div>

      <style>{`
        @keyframes ls-shimmer {
          0% { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
      `}</style>
    </main>
  )
}

function Shimmer({ w = '100%', h = 12, style = {}, round = 6 }) {
  return (
    <div
      style={{
        width: w,
        height: h,
        borderRadius: round,
        background:
          'linear-gradient(90deg, #ececec 0%, #f5f5f5 40%, #ececec 80%)',
        backgroundSize: '800px 100%',
        animation: 'ls-shimmer 1.6s linear infinite',
        ...style,
      }}
    />
  )
}

function TherapistSkeletonCard() {
  return (
    <div>
      <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 14 }}>
        <Shimmer w={76} h={76} round="50%" />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 8 }}>
          <Shimmer w="55%" h={12} />
          <Shimmer w="85%" h={14} />
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
        <Shimmer w="40%" h={10} />
        <Shimmer w="30%" h={10} />
      </div>
      <Shimmer w="40%" h={10} style={{ marginBottom: 14 }} />
      <Shimmer h={44} style={{ marginBottom: 8 }} />
      <Shimmer h={44} />
    </div>
  )
}

function TopBar({ onBack }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 20px 8px',
      }}
    >
      <button
        onClick={onBack}
        aria-label="Back"
        style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          border: '1px solid #e5e5e5',
          background: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
      >
        <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
          <path d="M11 4L6 9L11 14" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <button
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          padding: '8px 16px',
          border: '1px solid #e5e5e5',
          borderRadius: 999,
          background: 'white',
          fontFamily: 'var(--font-sans)',
          fontSize: 13,
          fontWeight: 600,
          color: 'var(--ls-ink)',
          cursor: 'pointer',
        }}
      >
        <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
          <path d="M5 4.5h2.5l1.5 3.5-1.8 1A10 10 0 0 0 12 13l1-1.8 3.5 1.5V15a1.5 1.5 0 0 1-1.6 1.5A14 14 0 0 1 3.5 5.1 1.5 1.5 0 0 1 5 4.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
        </svg>
        Contact us
      </button>
    </div>
  )
}

function FilterChips() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        flexWrap: 'nowrap',
        overflowX: 'auto',
      }}
    >
      <Chip label="Video" active />
      <Chip label="In-office" active />
      <Chip label="More" active={false} slidersIcon />
      <SortButton />
    </div>
  )
}

function Chip({ label, active, slidersIcon }) {
  return (
    <button
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        height: 34,
        padding: '0 14px',
        borderRadius: 999,
        border: active ? '1.5px solid rgb(0, 103, 206)' : '1px solid #d9d9d9',
        background: 'white',
        color: active ? 'rgb(0, 103, 206)' : 'var(--ls-ink)',
        fontFamily: 'var(--font-sans)',
        fontSize: 14,
        fontWeight: 500,
        cursor: 'pointer',
        flexShrink: 0,
        lineHeight: 1,
      }}
    >
      {active && <CheckSquare />}
      {label}
      {slidersIcon && <SlidersIcon />}
    </button>
  )
}

function CheckSquare() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="1" y="1" width="14" height="14" rx="3" fill="rgb(0, 103, 206)" />
      <path d="M4.5 8.2l2 2 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function SlidersIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <path d="M3 5h8M13 5h0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      <circle cx="11" cy="5" r="1.8" fill="white" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M3 11h2M7 11h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      <circle cx="5" cy="11" r="1.8" fill="white" stroke="currentColor" strokeWidth="1.6"/>
    </svg>
  )
}

function SortButton() {
  return (
    <button
      aria-label="Sort"
      style={{
        width: 34,
        height: 34,
        borderRadius: '50%',
        border: '1px solid #d9d9d9',
        background: 'white',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        flexShrink: 0,
        marginLeft: 'auto',
      }}
    >
      <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
        <path d="M6 4v12M6 16l-2.5-2.5M6 16l2.5-2.5M14 16V4M14 4l-2.5 2.5M14 4l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  )
}

function TherapistCard({ therapist }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 14 }}>
        <img
          src={`${import.meta.env.BASE_URL}${therapist.photo}`}
          alt=""
          width={76}
          height={76}
          style={{
            width: 76,
            height: 76,
            borderRadius: '50%',
            objectFit: 'cover',
            flexShrink: 0,
          }}
        />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.14em',
              color: 'rgb(0, 103, 206)',
              marginBottom: 4,
            }}
          >
            THERAPIST
          </div>
          <div
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 400,
              fontSize: 19,
              lineHeight: '26px',
              color: 'var(--ls-ink)',
              marginBottom: 6,
              letterSpacing: '-0.01em',
            }}
          >
            {therapist.name}
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              fontFamily: 'var(--font-sans)',
              fontSize: 13,
              color: 'var(--ls-ink-muted)',
              marginBottom: 1,
              lineHeight: 1.2,
            }}
          >
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <path d="M7 1.5c-2.2 0-4 1.8-4 4 0 3 4 7 4 7s4-4 4-7c0-2.2-1.8-4-4-4z" stroke="currentColor" strokeWidth="1.2"/>
              <circle cx="7" cy="5.5" r="1.3" stroke="currentColor" strokeWidth="1.2"/>
            </svg>
            {therapist.miles}
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontFamily: 'var(--font-sans)',
              fontSize: 13,
              fontWeight: 500,
              color: 'var(--ls-ink)',
            }}
          >
            <NirvanaGlyph size={14} color="#0b2b4a" />
            In Network
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 12 }}>
        {therapist.slots.map((s) => (
          <SlotRow key={s} slot={s} />
        ))}
      </div>

      <button
        style={{
          width: '100%',
          padding: '13px 20px',
          background: 'rgb(0, 103, 206)',
          color: 'white',
          border: 'none',
          borderRadius: 8,
          fontFamily: 'var(--font-sans)',
          fontSize: 14,
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'background 0.18s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = 'rgb(0, 86, 172)')}
        onMouseLeave={(e) => (e.currentTarget.style.background = 'rgb(0, 103, 206)')}
      >
        View profile &amp; availability
      </button>
    </div>
  )
}

function SlotRow({ slot }) {
  return (
    <button
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        padding: '12px 14px',
        background: 'white',
        border: '1px solid #d9d9d9',
        borderRadius: 8,
        fontFamily: 'var(--font-sans)',
        fontSize: 14,
        color: 'var(--ls-ink)',
        cursor: 'pointer',
        textAlign: 'center',
      }}
    >
      <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
        <rect x="2.5" y="6" width="11" height="8" rx="1.2" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M13.5 9l4-2v6l-4-2" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
      </svg>
      {slot}
    </button>
  )
}
