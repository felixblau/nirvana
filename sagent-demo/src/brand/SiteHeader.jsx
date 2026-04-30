import { SagentLogo } from './SagentLogo.jsx'

const HEADER_PURPLE = '#7F0795'

export function SiteHeader() {
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
    <span style={socialWrap}>
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
    <span style={{ ...socialWrap, borderRadius: 4 }}>
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
    <span style={socialWrap}>
      <svg width="9" height="9" viewBox="0 0 10 10" fill="none" aria-hidden>
        <rect x="0.5" y="3.5" width="2" height="6" fill="white" />
        <circle cx="1.5" cy="1.5" r="1" fill="white" />
        <path d="M4 3.5 H6 V4.5 C6.3 4 7 3.4 8 3.4 C9.3 3.4 9.8 4.2 9.8 5.6 V9.5 H7.8 V6 C7.8 5.2 7.5 4.8 6.8 4.8 C6.1 4.8 6 5.3 6 6 V9.5 H4 V3.5 Z" fill="white" />
      </svg>
    </span>
  )
}

const socialWrap = {
  width: 16,
  height: 16,
  borderRadius: 3,
  background: HEADER_PURPLE,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
}
