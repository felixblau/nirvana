import { useEffect, useState } from 'react'
import { StepNav } from './StepNav.jsx'
import { FieldLabel, FieldHint, TextInput, Dropdown } from '../form.jsx'
import { NirvanaMark } from '../../brand/NirvanaMark.jsx'

const APPOINTMENT_TYPES = ['In Person', 'Telehealth', 'Either']

const NEAREST_CLINICS = [
  'Attleboro',
  'Auburn',
  'Beverly',
  'Billerica',
  'Boston - Government Center',
  'Boston - South End',
  'Braintree',
  'Brighton',
  'Brockton',
  'Brookline - Coming Soon',
  'Chelsea',
  'Danvers',
  'Dedham',
  'Fall River',
  'Falmouth',
  'Fitchburg - Coming Soon',
  'Foxborough',
]

const HEAR_ABOUT_US = [
  'Billboard',
  'Direct Mail / Flyer',
  'Google / Internet Search',
  'Health Insurance Directory',
  'Returning Patient',
  'Radio / Podcast',
  'Clinic Signage',
  'Social Media',
  'Referred from Hospital',
  'Referred from Primary Care Doctor / Pediatrician',
  'Referred from Specialty Doctor (OB-GYN, Chiropractor, etc.)',
  'Referred from Psychiatrist',
  'Referred from Therapist',
]

const INSURANCE_PLANS = [
  'Aetna',
  'Blue Cross Blue Shield',
  'Health Partners',
  'Medical Assistance',
  'Medica / Optum / UBH',
  'Medicare',
  'Other',
]

export function Step2Details({ data, update, onNext, onPrev, dropdownOpen, onDropdownToggle }) {
  const required =
    !!data.dob &&
    !!data.phone &&
    !!data.appointmentType &&
    !!data.nearestClinic &&
    !!data.hearAbout
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: 22 }}>
      <Field>
        <FieldLabel required>Client/Patient Date of Birth</FieldLabel>
        <TextInput
          value={data.dob}
          onChange={(v) => update({ dob: v })}
          placeholder="MM-DD-YYYY"
          demoKey="dob"
          suffix={<CalendarGlyph />}
        />
        <FieldHint>Date</FieldHint>
      </Field>

      <Field>
        <FieldLabel required>Client/Patient Phone Number</FieldLabel>
        <TextInput
          value={data.phone}
          onChange={(v) => update({ phone: v })}
          placeholder="(000) 000-0000"
          demoKey="phone"
        />
        <FieldHint>Please enter a valid phone number.</FieldHint>
      </Field>

      <Field>
        <FieldLabel required>Appointment Type</FieldLabel>
        <Dropdown
          value={data.appointmentType}
          onChange={(v) => update({ appointmentType: v })}
          options={APPOINTMENT_TYPES}
          placeholder="Please Select"
          demoKey="appointmentType"
          open={dropdownOpen === 'appointmentType'}
          onOpenChange={(v) => onDropdownToggle?.('appointmentType', v)}
        />
      </Field>

      <Field>
        <FieldLabel required>Nearest Clinic</FieldLabel>
        <Dropdown
          value={data.nearestClinic}
          onChange={(v) => update({ nearestClinic: v })}
          options={NEAREST_CLINICS}
          placeholder="Please Select"
          demoKey="nearestClinic"
          open={dropdownOpen === 'nearestClinic'}
          onOpenChange={(v) => onDropdownToggle?.('nearestClinic', v)}
        />
      </Field>

      <Field>
        <FieldLabel required>How did you hear about us?</FieldLabel>
        <Dropdown
          value={data.hearAbout}
          onChange={(v) => update({ hearAbout: v })}
          options={HEAR_ABOUT_US}
          placeholder="Please Select"
          demoKey="hearAbout"
          open={dropdownOpen === 'hearAbout'}
          onOpenChange={(v) => onDropdownToggle?.('hearAbout', v)}
        />
      </Field>

      <Field>
        <FieldLabel>Insurance Plan</FieldLabel>
        <Dropdown
          value={data.insurance}
          onChange={(v) => update({ insurance: v })}
          options={INSURANCE_PLANS}
          placeholder="Please Select"
          demoKey="insurance"
          open={dropdownOpen === 'insurance'}
          onOpenChange={(v) => onDropdownToggle?.('insurance', v)}
        />
        <InsuranceVerification payer={data.insurance} />
      </Field>

      <div style={{ flex: 1 }} />
      <StepNav onPrev={onPrev} onNext={onNext} nextDisabled={!required} />
    </div>
  )
}

function Field({ children }) {
  return <div>{children}</div>
}

function CalendarGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <rect x="2" y="3.5" width="12" height="10.5" rx="1.2" stroke="#5a5a5a" strokeWidth="1.2" />
      <path d="M2 7 H14" stroke="#5a5a5a" strokeWidth="1.2" />
      <rect x="4" y="1.8" width="1.2" height="2.6" rx="0.2" fill="#5a5a5a" />
      <rect x="10.8" y="1.8" width="1.2" height="2.6" rx="0.2" fill="#5a5a5a" />
    </svg>
  )
}

function InsuranceVerification({ payer }) {
  const [phase, setPhase] = useState('idle')
  useEffect(() => {
    if (!payer) {
      setPhase('idle')
      return
    }
    setPhase('checking')
    const t = setTimeout(() => setPhase('verified'), 2600)
    return () => clearTimeout(t)
  }, [payer])
  if (phase === 'idle') return null
  if (phase === 'checking') return <CheckingCard payer={payer} />
  return <VerifiedCard payer={payer} />
}

function CheckingCard({ payer }) {
  return (
    <div
      style={{
        marginTop: 16,
        background: '#f5f1e6',
        borderRadius: 12,
        padding: '22px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 14,
      }}
      data-demo="nirvana-checking"
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 999,
          background: '#e8e0cf',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <svg width="56" height="56" viewBox="0 0 56 56" style={{ position: 'absolute', inset: 0 }}>
          <circle
            cx="28"
            cy="28"
            r="24"
            stroke="#173A64"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="26 140"
            fill="none"
            style={{ transformOrigin: 'center', animation: 'nehs-spin 1.1s linear infinite' }}
          />
        </svg>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M12 2L3 7v5c0 5 3.8 9.4 9 10 5.2-.6 9-5 9-10V7l-9-5z" stroke="#0f2a49" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M9 12.5l2 2 4-4" stroke="#0f2a49" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div
        style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 700,
          fontSize: 16,
          color: '#2c2c2c',
          textAlign: 'center',
        }}
      >
        Checking your coverage
      </div>
      <div
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 13,
          color: '#555',
          textAlign: 'center',
          lineHeight: '20px',
          maxWidth: 260,
        }}
      >
        Verifying {payer} benefits. This usually takes a few seconds.
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 2 }}>
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: 9, fontWeight: 600, letterSpacing: '0.16em', color: '#999' }}>
          POWERED BY
        </span>
        <NirvanaMark height={10} color="#999" />
      </div>
      <style>{`@keyframes nehs-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

function VerifiedCard({ payer }) {
  return (
    <div
      style={{
        marginTop: 16,
        background: 'rgba(255, 247, 176, 0.35)',
        borderRadius: 12,
        padding: '18px 18px 16px',
      }}
      data-demo="nirvana-verified"
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 8,
          marginBottom: 14,
        }}
      >
        <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 18, color: '#2a1f05' }}>
          {payer}
        </div>
        <span
          style={{
            background: '#FAFF0E',
            color: '#000000',
            fontFamily: 'var(--font-sans)',
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.14em',
            padding: '6px 12px',
            borderRadius: 999,
          }}
        >
          VERIFIED · IN-NETWORK
        </span>
      </div>

      <div
        style={{
          borderTop: '1px solid rgba(90, 72, 10, 0.18)',
          paddingTop: 12,
          fontFamily: 'var(--font-sans)',
          fontSize: 13,
          color: '#5c4a1e',
          marginBottom: 10,
        }}
      >
        Here's what we found:
      </div>

      <Row
        icon={
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="7" stroke="#3a2e0a" strokeWidth="1.6" />
            <path d="M20 20l-3.5-3.5" stroke="#3a2e0a" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        }
        label="Your member ID is"
        value="W584638564"
      />
      <Row
        icon={
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="6" width="18" height="12" rx="2" stroke="#3a2e0a" strokeWidth="1.6" />
            <path d="M3 10h18" stroke="#3a2e0a" strokeWidth="1.6" />
          </svg>
        }
        label="Your"
        labelAccent="copay"
        labelSuffix="is"
        value="$15"
      />
      <Row
        icon={
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M6 4l6 3 6-3v13l-6 3-6-3V4z" stroke="#3a2e0a" strokeWidth="1.6" strokeLinejoin="round" />
            <path d="M12 7v13" stroke="#3a2e0a" strokeWidth="1.6" />
          </svg>
        }
        label="Your"
        labelAccent="payer"
        labelSuffix="is"
        value={payer}
        sub="Open Access POS"
      />
      <Row
        icon={
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <rect x="3.5" y="5" width="17" height="14" rx="2" stroke="#3a2e0a" strokeWidth="1.6" />
            <path d="M3.5 9H20.5" stroke="#3a2e0a" strokeWidth="1.6" />
            <path d="M8 3.5V6.5M16 3.5V6.5" stroke="#3a2e0a" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        }
        label="Your plan expires on"
        value="12 / 31 / 2026"
        last
      />

      <div
        style={{
          marginTop: 12,
          borderTop: '1px solid rgba(90, 72, 10, 0.18)',
          paddingTop: 10,
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: '0.16em',
            color: '#7a6a3a',
          }}
        >
          POWERED BY
        </span>
        <NirvanaMark height={11} color="#2a1f05" />
      </div>
    </div>
  )
}

function Row({ icon, label, labelAccent, labelSuffix, value, sub, last }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 12,
        padding: '10px 0',
        borderBottom: last ? 'none' : '1px solid rgba(90, 72, 10, 0.18)',
      }}
    >
      <div style={{ paddingTop: 2 }}>{icon}</div>
      <div style={{ flex: 1, fontFamily: 'var(--font-sans)', fontSize: 14, color: '#2a1f05', lineHeight: '20px' }}>
        <span>
          {label}
          {labelAccent ? <> <span style={{ color: '#436a8a' }}>{labelAccent}</span></> : null}
          {labelSuffix ? ` ${labelSuffix}` : ''}
        </span>{' '}
        <strong style={{ fontWeight: 700 }}>{value}</strong>
        {sub ? (
          <div style={{ fontSize: 13, color: '#7a6a3a', marginTop: 1 }}>{sub}</div>
        ) : null}
      </div>
    </div>
  )
}
