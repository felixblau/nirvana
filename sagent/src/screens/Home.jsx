import { SiteHeader } from '../brand/SiteHeader.jsx'

export function Home({ onContinue }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', background: '#f0f0f0', minHeight: '100%' }}>
      <SiteHeader />
      <BookingCard onContinue={onContinue} />
      <Footer />
    </div>
  )
}

function BookingCard({ onContinue }) {
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

        <ContinueButton onClick={onContinue}>Continue</ContinueButton>
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

function ContinueButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
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
