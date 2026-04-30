import { useEffect, useState } from 'react'
import { StepNav } from './StepNav.jsx'
import { FieldLabel, Select, SectionHeading } from '../form.jsx'
import { NirvanaMark } from '../../brand/NirvanaMark.jsx'

const PAYERS = [
  'Aetna',
  'Cigna',
  'United Healthcare',
  'Anthem Blue Cross Blue Shield',
  'Blue Cross Blue Shield',
  'Humana',
  'Other',
]

export function Step7Insurance({ data, update, onNext, onPrev }) {
  const [phase, setPhase] = useState(data.insuranceVerified ? 'verified' : 'idle')

  // whenever the payer changes to a valid option, kick off a 3s "checking" phase
  useEffect(() => {
    if (!data.insurance) {
      setPhase('idle')
      return
    }
    setPhase('checking')
    const t = setTimeout(() => setPhase('verified'), 3000)
    return () => clearTimeout(t)
  }, [data.insurance])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <SectionHeading>Insurance</SectionHeading>

      <FieldLabel required>How would you like to pay?</FieldLabel>
      <Select
        value={data.insurance}
        onChange={(v) => update({ insurance: v, insuranceVerified: false })}
        options={PAYERS}
      />

      <div style={{ marginTop: 18 }}>
        {phase === 'checking' ? <CheckingCard payer={data.insurance} /> : null}
        {phase === 'verified' ? <VerifiedCard payer={data.insurance} /> : null}
      </div>

      <div style={{ flex: 1 }} />
      <StepNav onPrev={onPrev} onNext={onNext} />
    </div>
  )
}

function CheckingCard({ payer }) {
  return (
    <div
      style={{
        background: '#f5f1e6',
        borderRadius: 12,
        padding: '22px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 14,
      }}
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
            stroke="var(--sg-purple)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="26 140"
            fill="none"
            style={{ transformOrigin: 'center', animation: 'sg-spin 1.1s linear infinite' }}
          />
        </svg>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M12 2L3 7v5c0 5 3.8 9.4 9 10 5.2-.6 9-5 9-10V7l-9-5z" stroke="var(--sg-purple-deep)" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M9 12.5l2 2 4-4" stroke="var(--sg-purple-deep)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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

      <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 4 }}>
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: 9, fontWeight: 600, letterSpacing: '0.16em', color: '#999' }}>
          POWERED BY
        </span>
        <NirvanaMark height={10} color="#999" />
      </div>

      <style>{`@keyframes sg-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

function VerifiedCard({ payer }) {
  return (
    <div
      style={{
        background: '#e7ecd9',
        borderRadius: 12,
        padding: '18px 18px 16px',
      }}
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
        <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 18, color: '#1a2a16' }}>
          {payer}
        </div>
        <span
          style={{
            background: '#7a9071',
            color: '#ffffff',
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
          borderTop: '1px solid rgba(26, 42, 22, 0.15)',
          paddingTop: 12,
          fontFamily: 'var(--font-sans)',
          fontSize: 13,
          color: '#45513f',
          marginBottom: 10,
        }}
      >
        Here's what we found:
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Row
          icon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="#2a3a26" strokeWidth="1.6" />
              <path d="M20 20l-3.5-3.5" stroke="#2a3a26" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          }
          label="Your member ID is"
          value="W584638564"
        />
        <Row
          icon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="6" width="18" height="12" rx="2" stroke="#2a3a26" strokeWidth="1.6" />
              <path d="M3 10h18" stroke="#2a3a26" strokeWidth="1.6" />
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
              <path d="M6 4l6 3 6-3v13l-6 3-6-3V4z" stroke="#2a3a26" strokeWidth="1.6" strokeLinejoin="round" />
              <path d="M12 7v13" stroke="#2a3a26" strokeWidth="1.6" />
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
              <rect x="3.5" y="5" width="17" height="14" rx="2" stroke="#2a3a26" strokeWidth="1.6" />
              <path d="M3.5 9H20.5" stroke="#2a3a26" strokeWidth="1.6" />
              <path d="M8 3.5V6.5M16 3.5V6.5" stroke="#2a3a26" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          }
          label="Your plan expires on"
          value="12 / 31 / 2026"
          last
        />
      </div>

      <div
        style={{
          marginTop: 12,
          borderTop: '1px solid rgba(26, 42, 22, 0.15)',
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
            color: '#5a6a53',
          }}
        >
          POWERED BY
        </span>
        <NirvanaMark height={11} color="#1a2a16" />
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
        borderBottom: last ? 'none' : '1px solid rgba(26, 42, 22, 0.15)',
      }}
    >
      <div style={{ paddingTop: 2 }}>{icon}</div>
      <div style={{ flex: 1, fontFamily: 'var(--font-sans)', fontSize: 14, color: '#1a2a16', lineHeight: '20px' }}>
        <span>
          {label}
          {labelAccent ? <> <span style={{ color: '#436a8a' }}>{labelAccent}</span></> : null}
          {labelSuffix ? ` ${labelSuffix}` : ''}
        </span>{' '}
        <strong style={{ fontWeight: 700 }}>{value}</strong>
        {sub ? (
          <div style={{ fontSize: 13, color: '#5a6a53', marginTop: 1 }}>{sub}</div>
        ) : null}
      </div>
    </div>
  )
}
