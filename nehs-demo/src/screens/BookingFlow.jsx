import { useImperativeHandle, useMemo, useState, forwardRef } from 'react'
import { SiteHeader } from '../brand/SiteHeader.jsx'
import { Step1Basics } from './steps/Step1Basics.jsx'
import { Step2Details } from './steps/Step2Details.jsx'
import { Step3Consent } from './steps/Step3Consent.jsx'

const BRAND_BLUE = '#173A64'
const BRAND_BLUE_DEEP = '#0f2a49'
const BRAND_LINK = '#3a6fb5'

const INITIAL_DATA = {
  aboutMe: '',
  firstName: '',
  lastName: '',
  email: '',
  dob: '',
  phone: '',
  appointmentType: '',
  nearestClinic: '',
  hearAbout: '',
  insurance: '',
  altTreatmentInterest: '',
  preferredTimes: [],
  helpMessage: '',
  consent: false,
}

// Fields on each step, in order, counted against the progress bar.
const STEP1_FIELDS = ['aboutMe', 'firstName', 'lastName', 'email']
const STEP2_FIELDS = [
  'dob',
  'phone',
  'appointmentType',
  'nearestClinic',
  'hearAbout',
  'insurance',
]
// Visual total: 15 to match the real NEHS form's counter feel
const TOTAL_FIELDS = 15

export const BookingFlow = forwardRef(function BookingFlow(_props, ref) {
  const [step, setStep] = useState(1)
  const [direction, setDirection] = useState('forward')
  const [data, setData] = useState(INITIAL_DATA)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(null)

  const update = (patch) =>
    setData((d) => {
      const next = { ...d, ...patch }
      return next
    })

  const next = () => {
    setDirection('forward')
    setDropdownOpen(null)
    setStep((s) => Math.min(3, s + 1))
  }
  const prev = () => {
    setDirection('back')
    setDropdownOpen(null)
    setStep((s) => Math.max(1, s - 1))
  }

  const handleDropdownToggle = (key, open) => {
    setDropdownOpen(open ? key : (prev) => (prev === key ? null : prev))
  }

  useImperativeHandle(ref, () => ({
    update,
    next,
    prev,
    openDropdown: (key) => setDropdownOpen(key),
    closeDropdown: () => setDropdownOpen(null),
    reset: () => {
      setData(INITIAL_DATA)
      setSubmitted(false)
      setSubmitting(false)
      setStep(1)
      setDirection('forward')
      setDropdownOpen(null)
    },
    submit,
  }))

  function submit() {
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setSubmitted(true)
    }, 2000)
  }

  const filledCount = useMemo(() => {
    if (submitting || submitted) return TOTAL_FIELDS
    const scalarFields = [...STEP1_FIELDS, ...STEP2_FIELDS]
    const baseCount = scalarFields.filter((k) => String(data[k] ?? '').trim()).length
    const step3Count =
      (data.altTreatmentInterest ? 1 : 0) +
      ((data.preferredTimes ?? []).length > 0 ? 1 : 0) +
      (data.helpMessage?.trim() ? 1 : 0) +
      (data.consent === true ? 1 : 0)
    return Math.min(TOTAL_FIELDS, baseCount + step3Count)
  }, [data, submitting, submitted])
  const percent = Math.round((filledCount / TOTAL_FIELDS) * 100)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', background: BRAND_BLUE, minHeight: '100%' }}>
      <SiteHeader />
      <Hero />
      <FormCard direction={direction}>
        <ProgressBar percent={percent} filled={filledCount} total={TOTAL_FIELDS} />
        {submitted ? (
          <SubmittedCard />
        ) : submitting ? (
          <SubmittingCard />
        ) : step === 1 ? (
          <Step1Basics
            data={data}
            update={update}
            onNext={next}
            dropdownOpen={dropdownOpen}
            onDropdownToggle={handleDropdownToggle}
          />
        ) : step === 2 ? (
          <Step2Details
            data={data}
            update={update}
            onNext={next}
            onPrev={prev}
            dropdownOpen={dropdownOpen}
            onDropdownToggle={handleDropdownToggle}
          />
        ) : (
          <Step3Consent
            data={data}
            update={update}
            onSubmit={submit}
            onPrev={prev}
          />
        )}
      </FormCard>
      <HipaaFooter />
      <BelowFold />
    </div>
  )
})

function Hero() {
  return (
    <section style={{ background: BRAND_BLUE, padding: '20px 18px 18px', color: '#ffffff' }}>
      <h1
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 22,
          fontWeight: 700,
          lineHeight: 1.25,
          marginBottom: 12,
          letterSpacing: '-0.01em',
        }}
      >
        Schedule a New Client Appointment at Northeast Health Services
      </h1>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, lineHeight: 1.55, marginBottom: 10 }}>
        It's easy to get started with Northeast Health Services. You can:
      </p>
      <ul style={{ paddingLeft: 16, marginBottom: 10, fontSize: 13, lineHeight: 1.55 }}>
        <li>
          Call us at <strong style={{ color: '#ffffff' }}>781.620.5755</strong> to speak with a member of our intake team.
        </li>
        <li>
          Complete our secure new client appointment form, and our team will contact you to arrange your first appointment.
        </li>
      </ul>
      <p style={{ fontStyle: 'italic', fontSize: 12, color: 'rgba(255,255,255,0.82)', lineHeight: 1.55, marginBottom: 14 }}>
        Note: Please have your insurance card available when our team reaches out to schedule your visit.
      </p>
      <p style={{ fontSize: 13, lineHeight: 1.55, marginBottom: 14 }}>
        <strong>If you are an existing client</strong> who needs to reschedule an appointment, request medication refills, or contact your provider, please visit our{' '}
        <a style={{ color: '#a8c4ea', textDecoration: 'underline' }}>locations page</a> to reach your clinic directly.
      </p>
      <button
        type="button"
        style={{
          background: '#ffffff',
          color: BRAND_BLUE_DEEP,
          borderRadius: 999,
          padding: '12px 22px',
          fontFamily: 'var(--font-sans)',
          fontSize: 14,
          fontWeight: 700,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        Current Client? Click Here!
      </button>
    </section>
  )
}

function FormCard({ children, direction }) {
  return (
    <section style={{ background: BRAND_BLUE, padding: '14px 14px 0' }}>
      <div
        style={{
          background: '#ffffff',
          borderRadius: 10,
          boxShadow: '0 6px 18px rgba(10,20,40,0.24)',
          padding: '20px 20px 22px',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div
          key={direction}
          style={{
            animation:
              direction === 'forward'
                ? 'nehs-slide-in-right 0.38s cubic-bezier(0.22, 1, 0.36, 1)'
                : 'nehs-slide-in-left 0.38s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          {children}
        </div>
        <style>{`
          @keyframes nehs-slide-in-right {
            from { transform: translateX(8%); opacity: 0.4; }
            to { transform: translateX(0); opacity: 1; }
          }
          @keyframes nehs-slide-in-left {
            from { transform: translateX(-8%); opacity: 0.4; }
            to { transform: translateX(0); opacity: 1; }
          }
        `}</style>
      </div>
    </section>
  )
}

function ProgressBar({ percent, filled, total }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div
        style={{
          height: 7,
          borderRadius: 999,
          background: '#cfd5df',
          overflow: 'hidden',
          marginBottom: 8,
        }}
      >
        <div
          style={{
            width: `${Math.max(2, percent)}%`,
            height: '100%',
            background: '#4f8bd8',
            transition: 'width 0.35s ease',
            borderRadius: 999,
          }}
        />
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontFamily: 'var(--font-sans)',
          fontSize: 12,
          color: '#6a6a6a',
          fontWeight: 500,
        }}
      >
        <span>{percent}% Completed</span>
        <span>
          Fields Completed {filled} / {total}
        </span>
      </div>
    </div>
  )
}

function SubmittingCard() {
  return (
    <div
      data-demo="submitting"
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 20px' }}
    >
      <div
        style={{
          width: 84,
          height: 84,
          borderRadius: 999,
          background: BRAND_BLUE,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 20,
          position: 'relative',
        }}
      >
        <svg width="96" height="96" viewBox="0 0 96 96" fill="none" aria-hidden style={{ position: 'absolute', inset: -6 }}>
          <circle
            cx="48"
            cy="48"
            r="44"
            stroke={BRAND_BLUE}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="46 220"
            fill="none"
            style={{ transformOrigin: 'center', animation: 'nehs-submit-spin 1s linear infinite' }}
          />
        </svg>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden style={{ opacity: 0.35 }}>
          <path d="M7 16.5 L13 22.5 L25 10.5" stroke="#ffffff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 17, color: '#1a2332', textAlign: 'center', marginBottom: 6 }}>
        Submitting your request…
      </div>
      <div style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: '#5a6a85', textAlign: 'center', maxWidth: 260, lineHeight: 1.5 }}>
        Sending your information to our intake team.
      </div>
      <style>{`@keyframes nehs-submit-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

function SubmittedCard() {
  return (
    <div
      data-demo="submitted"
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 20px' }}
    >
      <div
        style={{
          width: 84,
          height: 84,
          borderRadius: 999,
          background: BRAND_BLUE,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 20,
          animation: 'nehs-submit-pop 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        <svg width="40" height="40" viewBox="0 0 32 32" fill="none" aria-hidden>
          <path d="M7 16.5 L13 22.5 L25 10.5" stroke="#ffffff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 22, color: '#1a2332', textAlign: 'center', marginBottom: 10 }}>
        Form submitted successfully
      </h2>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, lineHeight: '22px', color: '#5a6a85', textAlign: 'center', maxWidth: 280 }}>
        We've received your request. A member of our intake team will reach out shortly to confirm your appointment.
      </p>
      <style>{`@keyframes nehs-submit-pop {
        0% { transform: scale(0.6); opacity: 0; }
        60% { transform: scale(1.06); opacity: 1; }
        100% { transform: scale(1); opacity: 1; }
      }`}</style>
    </div>
  )
}

function HipaaFooter() {
  return (
    <div
      style={{
        background: BRAND_BLUE,
        padding: '0 14px 16px',
      }}
    >
      <div
        style={{
          background: '#ffffff',
          borderRadius: '0 0 10px 10px',
          padding: '14px 18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          boxShadow: '0 6px 18px rgba(10,20,40,0.24)',
          marginTop: -6,
          position: 'relative',
          borderTop: '1px solid #eef1f6',
        }}
      >
        <HipaaShield />
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: 18, fontWeight: 800, color: BRAND_LINK }}>HIPAA</span>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 700, color: '#7b8795', letterSpacing: '0.12em' }}>
            COMPLIANCE
          </span>
        </div>
      </div>
    </div>
  )
}

function HipaaShield() {
  return (
    <svg width="30" height="34" viewBox="0 0 30 34" fill="none" aria-hidden>
      <path
        d="M15 2 L27 6 V16 C27 24 21 30 15 32 C9 30 3 24 3 16 V6 L15 2 Z"
        fill="#e2ebf7"
        stroke="#3a6fb5"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M15 10 V22 M10 16 H20 M12 13 V19 M18 13 V19" stroke="#3a6fb5" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

function BelowFold() {
  return (
    <section
      style={{
        background: BRAND_BLUE,
        padding: '24px 18px 40px',
        color: '#ffffff',
      }}
    >
      <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: 26, lineHeight: 1.2, fontWeight: 800, marginBottom: 8 }}>
        We accept most health insurance.
      </h2>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, lineHeight: 1.55, color: 'rgba(255,255,255,0.85)' }}>
        Our intake team will verify your coverage and benefits before your first appointment, so you'll know what to expect — no surprises.
      </p>
    </section>
  )
}
