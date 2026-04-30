import { useState } from 'react'
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

export function BookingFlow() {
  const [step, setStep] = useState(1)
  const [direction, setDirection] = useState('forward')
  const [data, setData] = useState({
    patientType: '',
    state: '',
    service: '',
    location: '',
    mode: '',
    firstName: 'Michael',
    middleInitial: '',
    lastName: 'Scott',
    dob: '',
    sex: '',
    gender: '',
    phone: '',
    email: '',
    guardian: '',
    streetAddress: '',
    apt: '',
    city: '',
    addrState: '',
    zip: '',
    insurance: '',
    insuranceVerified: false,
    reason: '',
    consent: '',
  })

  const update = (patch) => setData((d) => ({ ...d, ...patch }))

  const next = () => {
    if (step >= TOTAL) return
    setDirection('forward')
    setStep((s) => s + 1)
  }
  const prev = () => {
    if (step <= 1) return
    setDirection('back')
    setStep((s) => s - 1)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', background: '#f0f0f0', minHeight: '100%' }}>
      <SiteHeader />
      <FormCard step={step} direction={direction}>
        <StepContent step={step} data={data} update={update} next={next} prev={prev} />
      </FormCard>
      <Footer />
    </div>
  )
}

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
