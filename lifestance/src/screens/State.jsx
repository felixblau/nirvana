import { useState } from 'react'
import { Header } from '../ui.jsx'

const ACTIVE_STATES = [
  'AZ', 'CA', 'CO', 'DE', 'FL', 'GA', 'ID', 'IL', 'IN', 'KS', 'MD',
  'MA', 'MI', 'MN', 'MO', 'NH', 'NJ', 'NM', 'NY', 'NC', 'OH', 'OK',
  'OR', 'PA', 'RI', 'SC', 'TN', 'TX', 'VA', 'WA', 'WV', 'WI', 'DC',
]

const STATE_NAMES = {
  AZ: 'Arizona', CA: 'California', CO: 'Colorado', DE: 'Delaware',
  FL: 'Florida', GA: 'Georgia', ID: 'Idaho', IL: 'Illinois',
  IN: 'Indiana', KS: 'Kansas', MD: 'Maryland', MA: 'Massachusetts',
  MI: 'Michigan', MN: 'Minnesota', MO: 'Missouri', NH: 'New Hampshire',
  NJ: 'New Jersey', NM: 'New Mexico', NY: 'New York', NC: 'North Carolina',
  OH: 'Ohio', OK: 'Oklahoma', OR: 'Oregon', PA: 'Pennsylvania',
  RI: 'Rhode Island', SC: 'South Carolina', TN: 'Tennessee', TX: 'Texas',
  VA: 'Virginia', WA: 'Washington', WV: 'West Virginia', WI: 'Wisconsin',
  DC: 'Washington D.C.',
}

const SORTED = ACTIVE_STATES
  .map((c) => ({ code: c, name: STATE_NAMES[c] }))
  .sort((a, b) => a.name.localeCompare(b.name))

export function StateScreen({ step, totalSteps, onBack, onNext, initial }) {
  const [selected, setSelected] = useState(initial || '')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [modalState, setModalState] = useState(null)

  const handleSelect = (code) => {
    setSelected(code)
    setDropdownOpen(false)
    setModalState(code)
  }

  const handleModalContinue = () => {
    onNext && onNext(modalState)
    setModalState(null)
  }

  return (
    <>
      <Header onBack={onBack} step={step} totalSteps={totalSteps} />

      {/* cream hero block */}
      <section
        style={{
          background: 'rgb(255, 242, 222)',
          padding: '32px 24px 32px',
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontWeight: 400,
            fontSize: 26,
            lineHeight: '34px',
            color: '#0067CE',
            marginBottom: 16,
            letterSpacing: '-0.015em',
          }}
        >
          Get Matched With A Mental Health Provider Near You
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 400,
            fontSize: 13,
            lineHeight: '22px',
            color: 'var(--ls-ink)',
            marginBottom: 22,
          }}
        >
          At LifeStance, we understand how important it is to find the right mental health care provider for your unique needs. With over 8,000 highly trained clinicians in 33 states, we are committed to providing accessible, high-quality care. Select your state to get matched with a provider near you.
        </p>

        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setDropdownOpen((o) => !o)}
            style={{
              width: '100%',
              padding: '14px 18px',
              background: 'white',
              border: '1px solid #d9d9d9',
              borderRadius: 8,
              fontFamily: 'var(--font-sans)',
              fontSize: 15,
              color: selected ? 'var(--ls-ink)' : '#7a7a7a',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: 'pointer',
            }}
          >
            <span>{selected ? STATE_NAMES[selected] : 'Select your state'}</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ transform: dropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
              <path d="M3 5L7 9L11 5" stroke="#4a4a4a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {dropdownOpen && (
            <div
              style={{
                position: 'absolute',
                top: 'calc(100% + 4px)',
                left: 0,
                right: 0,
                background: 'white',
                border: '1px solid #d9d9d9',
                borderRadius: 8,
                boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                maxHeight: 280,
                overflowY: 'auto',
                zIndex: 10,
              }}
            >
              {SORTED.map((s) => (
                <button
                  key={s.code}
                  onClick={() => handleSelect(s.code)}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    padding: '12px 18px',
                    fontFamily: 'var(--font-sans)',
                    fontSize: 14,
                    color: 'var(--ls-ink)',
                    cursor: 'pointer',
                    background: selected === s.code ? '#f4f8fb' : 'white',
                  }}
                >
                  {s.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* map + list */}
      <section style={{ background: 'white', padding: '40px 24px 24px', textAlign: 'center' }}>
        <h2
          style={{
            fontFamily: 'var(--font-serif)',
            fontWeight: 400,
            fontSize: 22,
            lineHeight: '30px',
            color: '#0067CE',
            marginBottom: 20,
            letterSpacing: '-0.01em',
          }}
        >
          Select Your State to Get<br />Matched
        </h2>

        <div style={{ marginBottom: 28, padding: '0 4px' }}>
          <img
            src={`${import.meta.env.BASE_URL}brand/us-map.png`}
            alt="US map of LifeStance states"
            width={906}
            height={560}
            style={{ width: '100%', height: 'auto', display: 'block', margin: '0 auto' }}
          />
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            rowGap: 14,
            columnGap: 16,
            textAlign: 'left',
            padding: '0 8px',
          }}
        >
          {SORTED.map((s) => (
            <button
              key={s.code}
              onClick={() => handleSelect(s.code)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontFamily: 'var(--font-sans)',
                fontSize: 14,
                color: selected === s.code ? 'var(--ls-teal-dark)' : 'var(--ls-ink)',
                fontWeight: selected === s.code ? 600 : 400,
                cursor: 'pointer',
                padding: '4px 0',
                textAlign: 'left',
              }}
            >
              <span style={{ color: 'rgb(0, 103, 206)', fontWeight: 700 }}>→</span>
              {s.name}
            </button>
          ))}
        </div>
      </section>

      {modalState && (
        <MatchModal
          stateName={STATE_NAMES[modalState]}
          onContinue={handleModalContinue}
          onClose={() => setModalState(null)}
        />
      )}
    </>
  )
}

function MatchModal({ stateName, onContinue, onClose }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.45)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        zIndex: 50,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'white',
          borderRadius: 12,
          width: '100%',
          maxWidth: 360,
          padding: '28px 24px 28px',
          position: 'relative',
          boxShadow: '0 20px 50px rgba(0,0,0,0.22)',
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            width: 36,
            height: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M3 3L15 15M15 3L3 15" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </button>

        <h2
          style={{
            fontFamily: 'var(--font-serif)',
            fontWeight: 400,
            fontSize: 24,
            lineHeight: '32px',
            color: 'var(--ls-ink)',
            marginBottom: 28,
            marginTop: 8,
            letterSpacing: '-0.015em',
            paddingRight: 20,
          }}
        >
          Get Matched with Licensed Mental Health Providers in {stateName}
        </h2>

        <button
          onClick={onContinue}
          style={{
            width: '100%',
            padding: '14px 20px',
            background: 'rgb(0, 103, 206)',
            color: 'white',
            border: 'none',
            borderRadius: 8,
            fontFamily: 'var(--font-sans)',
            fontSize: 15,
            fontWeight: 500,
            letterSpacing: '0.01em',
            cursor: 'pointer',
            marginBottom: 18,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgb(0, 86, 172)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'rgb(0, 103, 206)')}
        >
          Book An Appointment Online
        </button>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            margin: '0 0 18px',
          }}
        >
          <div style={{ flex: 1, height: 1, background: '#1a1a1a' }} />
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600, color: 'var(--ls-ink)' }}>OR</span>
          <div style={{ flex: 1, height: 1, background: '#1a1a1a' }} />
        </div>

        <button
          style={{
            width: '100%',
            padding: '14px 20px',
            background: 'white',
            color: 'var(--ls-ink)',
            border: '1.5px solid rgb(0, 103, 206)',
            borderRadius: 8,
            fontFamily: 'var(--font-sans)',
            fontSize: 15,
            fontWeight: 500,
            letterSpacing: '0.01em',
            cursor: 'pointer',
            marginBottom: 22,
          }}
        >
          Call 845-808-9682 To Book
        </button>

        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 13,
            lineHeight: '20px',
            color: 'var(--ls-ink)',
            textAlign: 'center',
          }}
        >
          If you have additional questions or are a returning LifeStance patient, please call{' '}
          <a style={{ textDecoration: 'underline', color: 'var(--ls-ink)' }}>845-808-9682</a>{' '}
          to speak with a representative.
        </p>
      </div>
    </div>
  )
}
