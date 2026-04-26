import { useEffect, useRef, useState } from 'react'
import { NirvanaMark, NirvanaGlyph } from '../Logo.jsx'

const CARE_TYPES = [
  {
    value: 'individual',
    title: 'Individual Therapy',
    description: "Get help addressing challenges and improve well-being with a therapist's guidance.",
  },
  {
    value: 'medication',
    title: 'Medication Management',
    description: 'Treat and prevent mental health disorders using medication and therapy.',
  },
  {
    value: 'couples',
    title: 'Couples Therapy',
    description: "Helps partners address relationship conflict and improve communication with a therapist's guidance.",
  },
  {
    value: 'family',
    title: 'Family Therapy',
    description: "Improve communication and resolve conflicts within family dynamics with a therapist's guidance.",
  },
]

const PAYERS = [
  'Self-pay (out of pocket)',
  'Aetna',
  'Aetna-Medicare',
  'Amerigroup (Empire BCBS)',
  'Anthem/Empire BCBS',
  'Anthem/Empire BCBS-Medicare',
  'Beacon',
  'Beacon-Medicare',
  'Cigna',
  'Humana',
  'Optum',
  'Oxford',
  'UnitedHealthcare',
]

export function BasicInfo({ onBack, onNext }) {
  const [zip, setZip] = useState('')
  const [dob, setDob] = useState('')
  const [careType, setCareType] = useState(null)
  const [payer, setPayer] = useState(null)
  const [meetMode, setMeetMode] = useState(null)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [payerOpen, setPayerOpen] = useState(false)

  const zipValid = /^\d{5}$/.test(zip)
  const dobValid = /^\d{2}\/\d{2}\/\d{4}$/.test(dob)

  const showDob = zipValid
  const showCare = zipValid && dobValid
  const showPayer = zipValid && dobValid && !!careType
  const showMeet = zipValid && dobValid && !!careType && !!payer
  const canSubmit = zipValid && dobValid && !!careType && !!payer && !!meetMode

  const handleSubmit = () => {
    if (canSubmit) onNext({ zip, dob, careType, payer, meetMode })
  }

  return (
    <main
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: '20px 24px 40px',
        background: 'white',
        position: 'relative',
      }}
    >
      <TopBar onBack={onBack} />

      <h1
        style={{
          fontFamily: 'var(--font-serif)',
          fontWeight: 400,
          fontSize: 24,
          lineHeight: '32px',
          color: 'var(--ls-ink)',
          textAlign: 'center',
          marginBottom: 10,
          letterSpacing: '-0.01em',
          marginTop: 8,
        }}
      >
        Let's personalize your care
      </h1>
      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 14,
          lineHeight: '22px',
          color: 'var(--ls-ink-soft)',
          textAlign: 'center',
          marginBottom: 32,
        }}
      >
        We'll ask a few questions to understand your needs to recommend providers who are a good fit.
      </p>

      <Field label="What is your zip code?">
        <TextInput
          value={zip}
          onChange={(v) => setZip(v.replace(/\D/g, '').slice(0, 5))}
          placeholder="e.g. 12345"
          inputMode="numeric"
          maxLength={5}
        />
      </Field>

      {showDob && (
        <Field
          label="What is the patient's date of birth?"
          help
          style={{ marginTop: 18 }}
        >
          <TextInput
            value={dob}
            onChange={(v) => setDob(formatDob(v))}
            placeholder="MM/DD/YYYY"
            inputMode="numeric"
            maxLength={10}
          />
        </Field>
      )}

      {showCare && (
        <Field
          label="What type of care are you looking for?"
          accessory={
            <a
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 13,
                fontWeight: 600,
                color: 'rgb(0, 103, 206)',
                cursor: 'pointer',
              }}
            >
              Not sure
            </a>
          }
          style={{ marginTop: 18 }}
        >
          <SelectButton
            value={careType ? CARE_TYPES.find((c) => c.value === careType)?.title : null}
            placeholder="Select an option"
            onClick={() => setSheetOpen(true)}
          />
        </Field>
      )}

      {showPayer && (
        <Field label="How would you like to pay?" style={{ marginTop: 18 }}>
          <SelectButton
            value={payer}
            placeholder="Select an option"
            onClick={() => setPayerOpen(true)}
          />
          {payer && payer !== 'Self-pay (out of pocket)' && (
            <CoverageCard key={payer} payer={payer} />
          )}
        </Field>
      )}

      {showMeet && (
        <Field label="How would you like to meet?" style={{ marginTop: 28 }}>
          <MeetOptions value={meetMode} onChange={setMeetMode} />
        </Field>
      )}

      <button
        onClick={handleSubmit}
        disabled={!canSubmit}
        style={{
          width: '100%',
          padding: '16px 28px',
          marginTop: 28,
          background: canSubmit ? 'rgb(0, 103, 206)' : '#d9d9d9',
          color: canSubmit ? 'white' : '#8a8a8a',
          border: 'none',
          borderRadius: 8,
          fontFamily: 'var(--font-sans)',
          fontSize: 15,
          fontWeight: 600,
          letterSpacing: '0.01em',
          cursor: canSubmit ? 'pointer' : 'not-allowed',
          transition: 'background 0.18s ease',
        }}
        onMouseEnter={(e) => {
          if (canSubmit) e.currentTarget.style.background = 'rgb(0, 86, 172)'
        }}
        onMouseLeave={(e) => {
          if (canSubmit) e.currentTarget.style.background = 'rgb(0, 103, 206)'
        }}
      >
        View matches
      </button>

      <div
        style={{
          textAlign: 'center',
          marginTop: 16,
          fontFamily: 'var(--font-sans)',
          fontSize: 14,
          color: 'var(--ls-ink-soft)',
        }}
      >
        Already have an account?{' '}
        <a style={{ color: 'rgb(0, 103, 206)', fontWeight: 600, cursor: 'pointer' }}>Sign in</a>
      </div>

      {sheetOpen && (
        <CareTypeSheet
          value={careType}
          onSelect={setCareType}
          onClose={() => setSheetOpen(false)}
        />
      )}

      {payerOpen && (
        <PayerDropdown
          anchor="how-pay"
          onSelect={(p) => {
            setPayer(p)
            setPayerOpen(false)
          }}
          onClose={() => setPayerOpen(false)}
        />
      )}
    </main>
  )
}

function TopBar({ onBack }) {
  return (
    <div style={{ position: 'relative', height: 40, marginBottom: 28 }}>
      <button
        onClick={onBack}
        aria-label="Back"
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: '1px solid #e5e5e5',
          background: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M11 4L6 9L11 14" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <div style={{ position: 'absolute', left: '50%', top: 0, transform: 'translateX(-50%)' }}>
        <img
          src={`${import.meta.env.BASE_URL}brand/logo-mark.png`}
          alt="LifeStance"
          width={40}
          height={40}
          style={{ display: 'block' }}
        />
      </div>
    </div>
  )
}

function Field({ label, children, style = {}, help, accessory }) {
  return (
    <div style={style}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 10,
          gap: 8,
        }}
      >
        <label
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 14,
            fontWeight: 600,
            color: 'var(--ls-ink)',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          {label}
          {help && (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="6.5" stroke="rgb(0, 103, 206)" strokeWidth="1.3"/>
              <path d="M6.4 6.2c0-1 .7-1.6 1.6-1.6.9 0 1.6.6 1.6 1.4 0 .6-.3 1-.9 1.3-.6.3-.9.6-.9 1.1M8 10.4v.1" stroke="rgb(0, 103, 206)" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
          )}
        </label>
        {accessory}
      </div>
      {children}
    </div>
  )
}

function TextInput({ value, onChange, placeholder, inputMode, maxLength }) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      inputMode={inputMode}
      maxLength={maxLength}
      style={{
        width: '100%',
        padding: '14px 16px',
        border: '1px solid #d9d9d9',
        borderRadius: 8,
        background: 'white',
        fontFamily: 'var(--font-sans)',
        fontSize: 15,
        color: 'var(--ls-ink)',
        outline: 'none',
      }}
      onFocus={(e) => {
        e.target.style.borderColor = 'rgb(0, 103, 206)'
        e.target.style.boxShadow = '0 0 0 3px rgba(0, 103, 206, 0.12)'
      }}
      onBlur={(e) => {
        e.target.style.borderColor = '#d9d9d9'
        e.target.style.boxShadow = 'none'
      }}
    />
  )
}

function SelectButton({ value, placeholder, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        padding: '14px 16px',
        border: '1px solid #d9d9d9',
        borderRadius: 8,
        background: 'white',
        fontFamily: 'var(--font-sans)',
        fontSize: 15,
        color: value ? 'var(--ls-ink)' : '#9a9a9a',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        cursor: 'pointer',
        textAlign: 'left',
      }}
    >
      <span>{value || placeholder}</span>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M3 5L7 9L11 5" stroke="#4a4a4a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  )
}

function CareTypeSheet({ value, onSelect, onClose }) {
  const [localValue, setLocalValue] = useState(value)
  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.35)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        zIndex: 60,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'white',
          borderTopLeftRadius: 18,
          borderTopRightRadius: 18,
          height: '92%',
          display: 'flex',
          flexDirection: 'column',
          animation: 'ls-sheet-slide 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 16px 14px',
            borderBottom: '1px solid #eeeeee',
          }}
        >
          <button
            onClick={onClose}
            aria-label="Close"
            style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M3 3L15 15M15 3L3 15" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 600, color: 'var(--ls-ink)' }}>
            Type of care
          </div>
          <div style={{ width: 32 }} />
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 14px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {CARE_TYPES.map((c) => {
              const selected = localValue === c.value
              return (
                <button
                  key={c.value}
                  onClick={() => setLocalValue(c.value)}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '14px 16px',
                    background: selected ? '#eaf3fc' : 'white',
                    border: selected ? '1.5px solid rgb(0, 103, 206)' : '1px solid #e5e5e5',
                    borderRadius: 10,
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 600, color: 'var(--ls-ink)', marginBottom: 4 }}>
                    {c.title}
                  </div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: 13, lineHeight: '20px', color: 'var(--ls-ink-soft)' }}>
                    {c.description}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        <div style={{ padding: '12px 16px 18px', borderTop: '1px solid #eeeeee' }}>
          <button
            onClick={() => {
              if (localValue) onSelect(localValue)
              onClose()
            }}
            disabled={!localValue}
            style={{
              width: '100%',
              padding: '14px 24px',
              background: localValue ? 'rgb(0, 103, 206)' : '#d9d9d9',
              color: 'white',
              border: 'none',
              borderRadius: 8,
              fontFamily: 'var(--font-sans)',
              fontSize: 15,
              fontWeight: 600,
              cursor: localValue ? 'pointer' : 'not-allowed',
            }}
          >
            Save &amp; close
          </button>
        </div>
      </div>
      <style>{`@keyframes ls-sheet-slide { from { transform: translateY(100%); } to { transform: translateY(0); } }`}</style>
    </div>
  )
}

function PayerDropdown({ onSelect, onClose }) {
  const ref = useRef(null)
  useEffect(() => {
    function handle(e) {
      if (ref.current && !ref.current.contains(e.target)) onClose()
    }
    setTimeout(() => document.addEventListener('mousedown', handle), 0)
    return () => document.removeEventListener('mousedown', handle)
  }, [onClose])

  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        left: 24,
        right: 24,
        top: '50%',
        maxHeight: 340,
        background: 'white',
        border: '1px solid #e5e5e5',
        borderRadius: 10,
        boxShadow: '0 18px 40px rgba(0,0,0,0.12)',
        overflowY: 'auto',
        zIndex: 50,
        padding: '8px 0',
      }}
    >
      {PAYERS.map((p, i) => (
        <button
          key={p}
          onClick={() => onSelect(p)}
          style={{
            display: 'block',
            width: '100%',
            textAlign: 'left',
            padding: '14px 22px',
            fontFamily: 'var(--font-sans)',
            fontSize: 15,
            color: 'var(--ls-ink)',
            cursor: 'pointer',
            borderBottom: i === 0 ? '1px solid #eeeeee' : 'none',
          }}
        >
          {p}
        </button>
      ))}
    </div>
  )
}

function MeetOptions({ value, onChange }) {
  const options = [
    {
      value: 'video',
      label: 'Video visit',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="7" width="12" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.6"/>
          <path d="M15 10.5l5-2.5v8l-5-2.5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      value: 'in-office',
      label: 'In-office',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <rect x="5" y="4" width="14" height="16" rx="1.2" stroke="currentColor" strokeWidth="1.6"/>
          <path d="M8.5 8h1M11.5 8h1M14.5 8h1M8.5 11h1M11.5 11h1M14.5 11h1M8.5 14h1M11.5 14h1M14.5 14h1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
          <path d="M10.5 20v-3h3v3" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      value: 'flexible',
      label: "I'm flexible (no preference)",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <circle cx="9" cy="12" r="5" stroke="currentColor" strokeWidth="1.6"/>
          <circle cx="15" cy="12" r="5" stroke="currentColor" strokeWidth="1.6"/>
        </svg>
      ),
    },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {options.map((o) => {
        const selected = value === o.value
        return (
          <button
            key={o.value}
            onClick={() => onChange(o.value)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              width: '100%',
              textAlign: 'left',
              padding: '14px 16px',
              background: selected ? '#eaf3fc' : 'white',
              border: selected ? '1.5px solid rgb(0, 103, 206)' : '1px solid #d9d9d9',
              borderRadius: 8,
              fontFamily: 'var(--font-sans)',
              fontSize: 15,
              color: 'var(--ls-ink)',
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            <span style={{ color: '#1a1a1a', flexShrink: 0, display: 'inline-flex' }}>{o.icon}</span>
            {o.label}
          </button>
        )
      })}
    </div>
  )
}

function CoverageCard({ payer }) {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setLoading(true)
    const t = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(t)
  }, [payer])

  if (loading) {
    return (
      <div
        style={{
          marginTop: 14,
          background: 'rgb(240, 243, 228)',
          borderRadius: 10,
          padding: '40px 18px 44px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 220,
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'ls-spin 1.4s linear infinite',
            marginBottom: 18,
          }}
        >
          <NirvanaGlyph size={56} color="#0b2b4a" />
        </div>
        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontWeight: 400,
            fontSize: 16,
            lineHeight: '24px',
            color: 'var(--ls-ink)',
            textAlign: 'center',
            letterSpacing: '-0.005em',
          }}
        >
          Looking up your information...
        </p>
        <style>{`@keyframes ls-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  return (
    <div
      style={{
        marginTop: 14,
        background: 'rgb(240, 243, 228)',
        borderRadius: 10,
        padding: '18px 18px 20px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          rowGap: 10,
          columnGap: 12,
          paddingBottom: 14,
          borderBottom: '1px solid rgba(115, 135, 85, 0.25)',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 16,
            fontWeight: 600,
            color: 'var(--ls-ink)',
            whiteSpace: 'nowrap',
          }}
        >
          {payer}
        </div>
        <div
          style={{
            height: 28,
            padding: '0 14px',
            background: '#569489',
            color: 'white',
            borderRadius: 999,
            fontFamily: 'var(--font-sans)',
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: 0,
            display: 'inline-flex',
            alignItems: 'center',
            lineHeight: 1,
            flexShrink: 0,
            whiteSpace: 'nowrap',
          }}
        >
          VERIFIED · IN-NETWORK
        </div>
      </div>

      <p
        style={{
          marginTop: 12,
          fontFamily: 'var(--font-sans)',
          fontSize: 13,
          lineHeight: '20px',
          color: 'var(--ls-ink-soft)',
          marginBottom: 2,
        }}
      >
        Here's what we found:
      </p>

      <div style={{ marginTop: 4 }}>
        <CoverageRow
          icon={<SearchIcon />}
          label="Your member ID is"
          value="W584638564"
        />
        <CoverageRow
          icon={<CopayIcon />}
          label="Your"
          accent="copay"
          labelAfter="is"
          value="$15"
        />
        <CoverageRow
          icon={<PayerIcon />}
          label="Your"
          accent="payer"
          labelAfter="is"
          value={payer}
          sub="Open Access POS"
        />
        <CoverageRow
          icon={<CalendarIcon />}
          label="Your plan expires on"
          value="12 / 31 / 2026"
          last
        />
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: 6,
          marginTop: 6,
          paddingTop: 6,
          borderTop: '1px solid rgba(86, 148, 137, 0.22)',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--ls-ink-muted)',
          }}
        >
          Powered by
        </span>
        <NirvanaMark height={11} color="#0b2b4a" />
      </div>
    </div>
  )
}

function CoverageRow({ icon, label, accent, labelAfter, value, sub, last }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        padding: '10px 0',
        borderBottom: last ? 'none' : '1px solid rgba(86, 148, 137, 0.22)',
      }}
    >
      <div style={{ color: '#0f5b6c', flexShrink: 0, display: 'flex', alignItems: 'center' }}>{icon}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 14,
            lineHeight: sub ? '18px' : '20px',
            color: 'var(--ls-ink)',
          }}
        >
          {label}
          {accent ? (
            <>
              {' '}
              <span style={{ color: '#0f5b6c' }}>{accent}</span>
            </>
          ) : null}
          {labelAfter ? ` ${labelAfter}` : ''}
          {' '}
          <strong style={{ color: '#0b2b4a', fontWeight: 700 }}>{value}</strong>
        </div>
        {sub ? (
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 13,
              lineHeight: '16px',
              color: 'var(--ls-ink-muted)',
              marginTop: 0,
            }}
          >
            {sub}
          </div>
        ) : null}
      </div>
    </div>
  )
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  )
}

function CopayIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="7" width="18" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.8"/>
      <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.8"/>
    </svg>
  )
}

function PayerIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M12 3l9 4-9 4-9-4 9-4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M3 12l9 4 9-4M3 17l9 4 9-4" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect x="3.5" y="5" width="17" height="14" rx="1.8" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M3.5 9.5H20.5" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M8 3.5V6.5M16 3.5V6.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  )
}

function formatDob(v) {
  const digits = v.replace(/\D/g, '').slice(0, 8)
  if (digits.length <= 2) return digits
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`
}
