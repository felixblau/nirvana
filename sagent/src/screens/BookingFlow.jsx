import { useState } from 'react'
import { SiteHeader } from '../brand/SiteHeader.jsx'
import { Step1Disclaimer } from './steps/Step1Disclaimer.jsx'
import { Step2PatientType } from './steps/Step2PatientType.jsx'
import { Step3State } from './steps/Step3State.jsx'
import { Step4Options } from './steps/Step4Options.jsx'
import { Step5PatientInfo } from './steps/Step5PatientInfo.jsx'
import { Step6Additional } from './steps/Step6Additional.jsx'
import { Step7Submit } from './steps/Step7Submit.jsx'

const TOTAL = 7

export function BookingFlow({ onExit }) {
  const [step, setStep] = useState(1)
  const [data, setData] = useState({
    patientType: 'New Patient',
    state: 'Iowa',
    service: 'Therapy for Individuals',
    location: 'Des Moines Clinic - 600 42nd Street',
    mode: 'No Preference',
    firstName: 'Michael',
    middleInitial: '',
    lastName: 'Scott',
    dob: '02/01/1990',
    sex: 'Male',
    gender: '',
    phone: '(123) 456-7890',
    email: 'mscott@dundermifflin.com',
    guardian: '',
    streetAddress: '123 Brookfield Lane',
    apt: '',
    city: 'Iowata',
    addrState: 'NY',
    zip: '10012',
    insurance: 'Aetna',
    reason: 'test flow',
    consent: 'Yes',
  })

  const update = (patch) => setData((d) => ({ ...d, ...patch }))

  const next = () => setStep((s) => Math.min(TOTAL, s + 1))
  const prev = () => {
    if (step === 1) onExit?.()
    else setStep((s) => s - 1)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', background: '#f0f0f0', minHeight: '100%' }}>
      <SiteHeader />
      <FormCard step={step}>
        {step === 1 && <Step1Disclaimer onNext={next} />}
        {step === 2 && <Step2PatientType value={data.patientType} onChange={(v) => update({ patientType: v })} onNext={next} onPrev={prev} />}
        {step === 3 && <Step3State value={data.state} onChange={(v) => update({ state: v })} onNext={next} onPrev={prev} />}
        {step === 4 && <Step4Options data={data} update={update} onNext={next} onPrev={prev} />}
        {step === 5 && <Step5PatientInfo data={data} update={update} onNext={next} onPrev={prev} />}
        {step === 6 && <Step6Additional data={data} update={update} onNext={next} onPrev={prev} />}
        {step === 7 && <Step7Submit onPrev={prev} onSubmit={() => onExit?.()} />}
      </FormCard>
      <Footer />
    </div>
  )
}

function FormCard({ step, children }) {
  return (
    <section style={{ background: '#f0f0f0', padding: '18px 0 26px' }}>
      <div
        style={{
          background: '#ffffff',
          padding: '18px 22px 28px',
          boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
          position: 'relative',
          minHeight: 460,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <StepIndicator step={step} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', paddingTop: 18 }}>
          {children}
        </div>
      </div>
    </section>
  )
}

function StepIndicator({ step }) {
  return (
    <div
      style={{
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
