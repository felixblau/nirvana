import { useEffect, useState } from 'react'
import { Header, Body, PrimaryButton, StickyFooter } from '../ui.jsx'
import { NirvanaMark } from '../Logo.jsx'

export function Coverage({ step, totalSteps, onBack, onNext }) {
  const [phase, setPhase] = useState('checking')

  useEffect(() => {
    const t = setTimeout(() => setPhase('covered'), 2100)
    return () => clearTimeout(t)
  }, [])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        background: 'var(--ls-cream-soft)',
      }}
    >
      <Header onBack={onBack} step={step} totalSteps={totalSteps} />

      {phase === 'checking' ? <Checking /> : <Covered onNext={onNext} />}

      <NirvanaFooter />
    </div>
  )
}

function Checking() {
  return (
    <Body style={{ alignItems: 'center', justifyContent: 'center', padding: '60px 24px' }}>
      <div
        style={{
          width: 96,
          height: 96,
          borderRadius: '50%',
          background: 'var(--ls-sage-soft)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 28,
          position: 'relative',
        }}
      >
        <svg width="96" height="96" viewBox="0 0 96 96" style={{ position: 'absolute', inset: 0 }}>
          <circle
            cx="48"
            cy="48"
            r="44"
            stroke="var(--ls-teal)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="40 240"
            fill="none"
            style={{
              transformOrigin: 'center',
              animation: 'spin 1.1s linear infinite',
            }}
          />
        </svg>
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L3 7v5c0 5 3.8 9.4 9 10 5.2-.6 9-5 9-10V7l-9-5z" stroke="var(--ls-teal-dark)" strokeWidth="1.6" strokeLinejoin="round"/>
          <path d="M9 12.5l2 2 4-4" stroke="var(--ls-teal-dark)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <h1
        className="serif"
        style={{ fontSize: 26, color: 'var(--ls-ink)', marginBottom: 10, textAlign: 'center' }}
      >
        Checking your coverage
      </h1>
      <p
        style={{
          fontSize: 15,
          color: 'var(--ls-ink-muted)',
          textAlign: 'center',
          maxWidth: 280,
          lineHeight: 1.55,
        }}
      >
        This usually takes a few seconds. We're confirming your benefits and visit cost.
      </p>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </Body>
  )
}

function Covered({ onNext }) {
  return (
    <>
      <Body style={{ padding: '16px 20px 20px' }}>
        {/* verified coverage card (navy, Nirvana-style) */}
        <div
          style={{
            background: 'linear-gradient(155deg, var(--nv-navy) 0%, var(--nv-navy-soft) 100%)',
            borderRadius: 'var(--ls-radius-lg)',
            padding: '22px 22px 24px',
            color: 'var(--ls-white)',
            marginBottom: 14,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* soft lavender glow */}
          <div
            style={{
              position: 'absolute',
              top: -40,
              right: -40,
              width: 200,
              height: 200,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(196,181,253,0.22) 0%, rgba(196,181,253,0) 70%)',
              pointerEvents: 'none',
            }}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7.3l2.6 2.7 5.4-6" stroke="var(--nv-lavender)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', color: 'var(--nv-lavender)' }}>
                VERIFIED
              </span>
            </div>
            <span style={{ color: 'rgba(196,181,253,0.4)', fontSize: 11 }}>·</span>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', color: 'var(--nv-lavender)' }}>
              IN-NETWORK
            </span>
          </div>
          <h2
            className="serif"
            style={{ fontSize: 32, lineHeight: 1.15, marginBottom: 6, color: 'var(--ls-white)' }}
          >
            You're <em style={{ fontStyle: 'italic', color: 'var(--nv-lavender-soft)' }}>covered!</em>
          </h2>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.72)', lineHeight: 1.55 }}>
            Here's what we found:
          </p>
        </div>

        <div
          style={{
            background: 'var(--ls-white)',
            border: '1px solid var(--ls-border-soft)',
            borderRadius: 'var(--ls-radius-lg)',
            overflow: 'hidden',
            marginBottom: 20,
          }}
        >
          <Row
            icon={(
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.6"/>
                <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
            )}
            label="Your member ID is"
            value="W584638564"
          />
          <Row
            icon={(
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.6"/>
                <path d="M3 10h18" stroke="currentColor" strokeWidth="1.6"/>
              </svg>
            )}
            label="Your copay is"
            value="$75"
          />
          <Row
            icon={(
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M6 4l6 3 6-3v13l-6 3-6-3V4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
                <path d="M12 7v13" stroke="currentColor" strokeWidth="1.6"/>
              </svg>
            )}
            label="Your payer is"
            value="Aetna"
            sub="Commercial (Open Access POS)"
          />
          <Row
            icon={(
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <rect x="3.5" y="5" width="17" height="14" rx="2" stroke="currentColor" strokeWidth="1.6"/>
                <path d="M3.5 9H20.5" stroke="currentColor" strokeWidth="1.6"/>
                <path d="M8 3.5V6.5M16 3.5V6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
            )}
            label="Your plan expires"
            value="12/31/2026"
            last
          />
        </div>
      </Body>

      <StickyFooter>
        <div style={{ background: 'transparent' }}>
          <PrimaryButton onClick={onNext}>
            Confirm and schedule my visit →
          </PrimaryButton>
        </div>
      </StickyFooter>
    </>
  )
}

function Row({ icon, label, value, sub, last }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 14,
        padding: '16px 18px',
        borderBottom: last ? 'none' : '1px solid var(--ls-border-soft)',
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: 'var(--ls-sage-soft)',
          color: 'var(--ls-teal-dark)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          marginTop: 1,
        }}
      >
        {icon}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, color: 'var(--ls-ink-muted)', marginBottom: 2 }}>{label}</div>
        <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--ls-ink)' }}>{value}</div>
        {sub ? (
          <div style={{ fontSize: 13, color: 'var(--ls-ink-muted)', marginTop: 1 }}>{sub}</div>
        ) : null}
      </div>
    </div>
  )
}

function NirvanaFooter() {
  return (
    <div
      style={{
        padding: '14px 20px 22px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        borderTop: '1px solid var(--ls-border-soft)',
        background: 'var(--ls-white)',
      }}
    >
      <span
        style={{
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'var(--ls-ink-muted)',
        }}
      >
        Powered by
      </span>
      <NirvanaMark height={12} color="#0a1d3a" />
    </div>
  )
}
