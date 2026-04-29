import { SagentLogo } from '../brand/SagentLogo.jsx'
import { InsuranceLogos } from '../brand/InsuranceLogos.jsx'

export function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', background: 'var(--sg-purple)' }}>
      <SiteHeader />
      <Hero />
      <InsuranceStrip />
      <AccessibilityBubble />
    </div>
  )
}

function SiteHeader() {
  return (
    <header
      style={{
        padding: '14px 18px 10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'var(--sg-purple)',
        position: 'sticky',
        top: 0,
        zIndex: 20,
      }}
    >
      <SagentLogo width={96} />
      <button
        aria-label="Menu"
        style={{
          width: 36,
          height: 36,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(0, 0, 0, 0.28)',
          borderRadius: 4,
        }}
      >
        <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
          <rect y="0" width="18" height="2" rx="0.5" fill="white" />
          <rect y="6" width="18" height="2" rx="0.5" fill="white" />
          <rect y="12" width="18" height="2" rx="0.5" fill="white" />
        </svg>
      </button>
    </header>
  )
}

function Hero() {
  return (
    <section
      style={{
        position: 'relative',
        padding: '28px 24px 36px',
        color: 'var(--sg-white)',
        textAlign: 'center',
        overflow: 'hidden',
        isolation: 'isolate',
      }}
    >
      {/* background image at 60% opacity, layered behind purple wash */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${import.meta.env.BASE_URL}brand/hero.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 20%',
          opacity: 0.6,
          zIndex: -2,
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(109, 43, 141, 0.55) 0%, rgba(109, 43, 141, 0.35) 40%, rgba(109, 43, 141, 0.75) 100%)',
          zIndex: -1,
        }}
      />

      <h1
        style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 800,
          fontSize: 30,
          lineHeight: '36px',
          color: 'var(--sg-yellow)',
          letterSpacing: '-0.01em',
          margin: '12px 0 14px',
        }}
      >
        Therapy + Psychiatry
        <br />
        on your schedule
      </h1>

      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontStyle: 'italic',
          fontWeight: 400,
          fontSize: 15,
          lineHeight: '22px',
          color: 'var(--sg-white)',
          marginBottom: 22,
        }}
      >
        Match with a provider who gets you.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 26 }}>
        <CtaSolid>Book Now</CtaSolid>
        <CtaOutline>Find Your Provider</CtaOutline>
      </div>

      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14, textAlign: 'left', padding: '0 6px' }}>
        <BulletRow>Book &amp; Be Seen Quickly</BulletRow>
        <BulletRow>80+ Locations</BulletRow>
        <BulletRow>In-person or Virtual Visit Options</BulletRow>
      </ul>
    </section>
  )
}

function CtaSolid({ children }) {
  return (
    <button
      style={{
        width: '100%',
        padding: '14px 24px',
        background: 'var(--sg-yellow)',
        color: 'var(--sg-purple-deep)',
        borderRadius: 999,
        fontFamily: 'var(--font-sans)',
        fontWeight: 700,
        fontSize: 16,
        letterSpacing: '0.01em',
        boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
      }}
    >
      {children}
    </button>
  )
}

function CtaOutline({ children }) {
  return (
    <button
      style={{
        width: '100%',
        padding: '13px 24px',
        background: 'transparent',
        color: 'var(--sg-white)',
        border: '2px solid var(--sg-yellow)',
        borderRadius: 999,
        fontFamily: 'var(--font-sans)',
        fontWeight: 600,
        fontSize: 15,
        letterSpacing: '0.01em',
      }}
    >
      {children}
    </button>
  )
}

function BulletRow({ children }) {
  return (
    <li style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
      <span
        style={{
          width: 24,
          height: 24,
          flexShrink: 0,
          border: '1.5px solid var(--sg-yellow)',
          borderRadius: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M2 7.5 L5.5 11 L12 3.5" stroke="#FAFF0E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: 15, color: 'var(--sg-white)' }}>
        {children}
      </span>
    </li>
  )
}

function InsuranceStrip() {
  return (
    <section style={{ background: 'var(--sg-white)', padding: '24px 24px 32px' }}>
      <h3
        style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 600,
          fontSize: 14,
          color: 'var(--sg-ink)',
          textAlign: 'center',
          marginBottom: 18,
        }}
      >
        We Accept Most Insurances, Including:
      </h3>
      <InsuranceLogos />
    </section>
  )
}

function AccessibilityBubble() {
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        right: 12,
        bottom: 70,
        width: 36,
        height: 36,
        borderRadius: 999,
        background: '#0f6fd1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
        zIndex: 5,
      }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="4.5" r="2" fill="white" />
        <path d="M4.5 8.5 L19.5 8.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M9 8.5 L9 14 L7.5 21" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M15 8.5 L15 14 L16.5 21" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M9 14 L15 14" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    </div>
  )
}
