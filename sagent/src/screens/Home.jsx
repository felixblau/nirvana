import { SagentLogo } from '../brand/SagentLogo.jsx'

const HEADER_PURPLE = '#7F0795'

export function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', background: '#f0f0f0', minHeight: '100%' }}>
      <SiteHeader />
      <BookingCard />
      <Footer />
    </div>
  )
}

function SiteHeader() {
  return (
    <header
      style={{
        background: '#ffffff',
        padding: '16px 18px 14px',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: 12,
      }}
    >
      <SagentLogo width={120} />
      <div
        style={{
          textAlign: 'right',
          color: HEADER_PURPLE,
          fontFamily: 'var(--font-sans)',
          fontSize: 11,
          lineHeight: '16px',
          fontWeight: 500,
          paddingTop: 26,
        }}
      >
        <div>Healing that moves you.</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 4, marginTop: 2 }}>
          <PhoneGlyph />
          <span>844.697.8766</span>
        </div>
        <div>www.sagentbh.com</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 6, marginTop: 4 }}>
          <SocialFacebook />
          <SocialInstagram />
          <SocialLinkedIn />
        </div>
      </div>
    </header>
  )
}

function PhoneGlyph() {
  return (
    <svg width="11" height="11" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3 3 L5.5 3 L7 6 L5.5 7.5 C6.5 9.5 7.5 10.5 9 11.5 L10.5 10 L13.5 11.5 L13.5 13.5 C12 14 10 13.5 8 12.5 C5.5 11 3.5 9 2.5 6.5 C1.5 4.5 2 3 3 3 Z"
        fill={HEADER_PURPLE}
      />
    </svg>
  )
}

function SocialFacebook() {
  return (
    <span
      style={{
        width: 16,
        height: 16,
        borderRadius: 3,
        background: HEADER_PURPLE,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <svg width="9" height="9" viewBox="0 0 10 10" fill="none" aria-hidden>
        <path
          d="M6.5 10 V5.5 H8 L8.2 3.8 H6.5 V2.9 C6.5 2.4 6.6 2.1 7.3 2.1 H8.3 V0.6 C8.1 0.6 7.5 0.5 6.9 0.5 C5.4 0.5 4.5 1.3 4.5 2.7 V3.8 H3.3 V5.5 H4.5 V10 H6.5 Z"
          fill="white"
        />
      </svg>
    </span>
  )
}

function SocialInstagram() {
  return (
    <span
      style={{
        width: 16,
        height: 16,
        borderRadius: 4,
        background: HEADER_PURPLE,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden>
        <rect x="1.5" y="1.5" width="9" height="9" rx="2.5" stroke="white" strokeWidth="1" />
        <circle cx="6" cy="6" r="2" stroke="white" strokeWidth="1" />
        <circle cx="8.6" cy="3.4" r="0.6" fill="white" />
      </svg>
    </span>
  )
}

function SocialLinkedIn() {
  return (
    <span
      style={{
        width: 16,
        height: 16,
        borderRadius: 3,
        background: HEADER_PURPLE,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <svg width="9" height="9" viewBox="0 0 10 10" fill="none" aria-hidden>
        <rect x="0.5" y="3.5" width="2" height="6" fill="white" />
        <circle cx="1.5" cy="1.5" r="1" fill="white" />
        <path d="M4 3.5 H6 V4.5 C6.3 4 7 3.4 8 3.4 C9.3 3.4 9.8 4.2 9.8 5.6 V9.5 H7.8 V6 C7.8 5.2 7.5 4.8 6.8 4.8 C6.1 4.8 6 5.3 6 6 V9.5 H4 V3.5 Z" fill="white" />
      </svg>
    </span>
  )
}

function BookingCard() {
  return (
    <section style={{ background: '#f0f0f0', padding: '18px 0 26px' }}>
      <div
        style={{
          background: '#ffffff',
          padding: '36px 22px 32px',
          boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 500,
            fontSize: 20,
            lineHeight: '28px',
            color: '#222',
            textAlign: 'center',
            marginBottom: 22,
          }}
        >
          Please enter the patient's
          <br />
          name and email:
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 18 }}>
          <FormInput placeholder="Patient's Full Name" />
          <FormInput placeholder="Your Email" type="email" />
        </div>

        <ContinueButton>Continue</ContinueButton>
      </div>
    </section>
  )
}

function FormInput({ placeholder, type = 'text' }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      style={{
        width: '100%',
        padding: '13px 14px',
        background: '#ffffff',
        border: '1px solid #d8d8d8',
        borderRadius: 4,
        fontFamily: 'var(--font-sans)',
        fontSize: 14,
        color: '#333',
        outline: 'none',
      }}
    />
  )
}

function ContinueButton({ children }) {
  return (
    <button
      style={{
        width: '100%',
        padding: '14px 24px',
        background: 'var(--sg-purple)',
        color: '#ffffff',
        border: 'none',
        borderRadius: 4,
        fontFamily: 'var(--font-sans)',
        fontWeight: 500,
        fontSize: 16,
        letterSpacing: '0.01em',
        cursor: 'pointer',
        transition: 'background 0.18s ease',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--sg-purple-deep)' }}
      onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--sg-purple)' }}
    >
      {children}
    </button>
  )
}

function Footer() {
  return (
    <footer
      style={{
        background: '#f0f0f0',
        padding: '32px 16px 28px',
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
