import { useImperativeHandle, useState, forwardRef } from 'react'
import { SiteHeader } from '../brand/SiteHeader.jsx'
import { Step1Disclaimer } from './steps/Step1Disclaimer.jsx'
import { Step2PatientType } from './steps/Step2PatientType.jsx'
import { Step3State } from './steps/Step3State.jsx'
import { Step4Options } from './steps/Step4Options.jsx'
import { Step5PatientInfo } from './steps/Step5PatientInfo.jsx'
import { Step6Additional } from './steps/Step6Additional.jsx'
import { Step7Insurance } from './steps/Step7Insurance.jsx'
import { Step8Submit } from './steps/Step8Submit.jsx'

const TOTAL = 8

const INITIAL_DATA = {
  patientType: 'New Patient',
  state: 'Iowa',
  service: 'Therapy for Individuals',
  location: 'Des Moines Clinic - 600 42nd Street',
  mode: 'No Preference',
  firstName: 'Michael',
  middleInitial: '',
  lastName: 'Scott',
  dob: '',
  sex: 'Male',
  gender: '',
  phone: '(123)456-7890',
  email: 'mscott@dundermifflin.com',
  guardian: '',
  streetAddress: '123 Main Street',
  apt: '',
  city: 'Des Moines',
  addrState: 'IA',
  zip: '50913',
  insurance: '',
  insuranceOpen: false,
  insuranceVerified: false,
  reason: '',
  consent: '',
}

export const BookingFlow = forwardRef(function BookingFlow({ onSubmit }, ref) {
  const [step, setStep] = useState(1)
  const [direction, setDirection] = useState('forward')
  const [data, setData] = useState(INITIAL_DATA)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const update = (patch) => setData((d) => ({ ...d, ...patch }))
  const next = () => {
    setDirection('forward')
    setStep((s) => Math.min(TOTAL, s + 1))
  }
  const prev = () => {
    setDirection('back')
    setStep((s) => Math.max(1, s - 1))
  }

  useImperativeHandle(ref, () => ({
    update,
    next,
    prev,
    goTo: (s) => {
      setDirection('forward')
      setStep(s)
    },
    reset: () => {
      setData(INITIAL_DATA)
      setSubmitted(false)
      setSubmitting(false)
      setStep(1)
      setDirection('forward')
    },
    submit: () => {
      setSubmitting(true)
      setTimeout(() => {
        setSubmitting(false)
        setSubmitted(true)
        onSubmit?.()
      }, 2000)
    },
  }))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', background: '#f0f0f0', minHeight: '100%' }}>
      <SiteHeader />
      <FormCard step={step} direction={direction}>
        {submitted ? (
          <SubmittedCard />
        ) : submitting ? (
          <SubmittingCard />
        ) : (
          <StepContent step={step} data={data} update={update} next={next} prev={prev} />
        )}
      </FormCard>
      <Footer />
    </div>
  )
})

function StepContent({ step, data, update, next, prev }) {
  if (step === 1) return <Step1Disclaimer onNext={next} />
  if (step === 2) return <Step2PatientType value={data.patientType} onChange={(v) => update({ patientType: v })} onNext={next} onPrev={prev} />
  if (step === 3) return <Step3State value={data.state} onChange={(v) => update({ state: v })} onNext={next} onPrev={prev} />
  if (step === 4) return <Step4Options data={data} update={update} onNext={next} onPrev={prev} />
  if (step === 5) return <Step5PatientInfo data={data} update={update} onNext={next} onPrev={prev} />
  if (step === 6) return <Step6Additional data={data} update={update} onNext={next} onPrev={prev} />
  if (step === 7) return <Step7Insurance data={data} update={update} onNext={next} onPrev={prev} />
  if (step === 8) return <Step8Submit onPrev={prev} onSubmit={() => {}} />
  return null
}

function SubmittingCard() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
      <div
        style={{
          width: 72,
          height: 72,
          position: 'relative',
          marginBottom: 20,
        }}
      >
        <svg width="72" height="72" viewBox="0 0 72 72" fill="none" aria-hidden>
          <circle cx="36" cy="36" r="30" stroke="rgba(127,7,149,0.15)" strokeWidth="4" />
          <circle
            cx="36"
            cy="36"
            r="30"
            stroke="var(--sg-purple)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="50 200"
            fill="none"
            style={{ transformOrigin: 'center', animation: 'sgd-spin 1s linear infinite' }}
          />
        </svg>
      </div>
      <div
        style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 600,
          fontSize: 16,
          color: '#2c2c2c',
          textAlign: 'center',
        }}
      >
        Submitting your request…
      </div>
      <style>{`@keyframes sgd-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

function SubmittedCard() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: 999,
          background: 'rgba(250, 255, 14, 0.35)',
          border: '2px solid var(--sg-yellow)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 20,
        }}
      >
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
          <path d="M7 16.5 L13 22.5 L25 10.5" stroke="var(--sg-purple-deep)" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h2
        style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 700,
          fontSize: 22,
          color: '#222',
          textAlign: 'center',
          marginBottom: 10,
        }}
      >
        Form submitted successfully
      </h2>
      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 14,
          lineHeight: '22px',
          color: '#555',
          textAlign: 'center',
          maxWidth: 280,
        }}
      >
        We've received your request. A member of our care team will reach out shortly to confirm your appointment.
      </p>
    </div>
  )
}

function FormCard({ step, direction, children }) {
  return (
    <section style={{ background: '#f0f0f0', padding: '18px 0 26px' }}>
      <div
        style={{
          background: '#ffffff',
          boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <StepIndicator step={step} />
        <div
          key={step}
          style={{
            padding: '0 22px 28px',
            minHeight: 460,
            display: 'flex',
            flexDirection: 'column',
            paddingTop: 18,
            animation:
              direction === 'forward'
                ? 'sg-slide-in-right 0.38s cubic-bezier(0.22, 1, 0.36, 1)'
                : 'sg-slide-in-left 0.38s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          {children}
        </div>
        <style>{`
          @keyframes sg-slide-in-right {
            from { transform: translateX(100%); opacity: 0.6; }
            to { transform: translateX(0); opacity: 1; }
          }
          @keyframes sg-slide-in-left {
            from { transform: translateX(-100%); opacity: 0.6; }
            to { transform: translateX(0); opacity: 1; }
          }
        `}</style>
      </div>
    </section>
  )
}

function StepIndicator({ step }) {
  return (
    <div
      style={{
        padding: '18px 22px 0',
        textAlign: 'right',
        fontFamily: 'var(--font-sans)',
        fontSize: 13,
        color: '#a5a5a5',
        fontWeight: 500,
      }}
    >
      {step} / {TOTAL}
    </div>
  )
}

function Footer() {
  return (
    <footer
      style={{
        background: '#f0f0f0',
        padding: '28px 16px 24px',
        textAlign: 'center',
        fontFamily: 'var(--font-sans)',
        fontSize: 12,
        color: '#6b6b6b',
        marginTop: 'auto',
      }}
    >
      <a style={{ marginRight: 6 }}>Privacy</a>
      <span>-</span>
      <a style={{ marginLeft: 6 }}>Terms</a>
    </footer>
  )
}
