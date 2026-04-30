const BRAND_BLUE = '#173A64'
const BRAND_BLUE_DEEP = '#0f2a49'

export function SiteHeader() {
  return (
    <header style={{ background: '#ffffff', display: 'flex', flexDirection: 'column' }}>
      <TopUtilityBar />
      <LogoRow />
      <ColorStripe />
    </header>
  )
}

function TopUtilityBar() {
  return (
    <div
      style={{
        background: '#ffffff',
        borderBottom: '1px solid #e9ecf2',
        padding: '10px 14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontFamily: 'var(--font-sans)',
        fontSize: 11,
        fontWeight: 600,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 3, lineHeight: 1.15, color: BRAND_BLUE_DEEP }}>
        <a style={{ textDecoration: 'underline' }}>We're Hiring!</a>
        <a style={{ textDecoration: 'underline' }}>Make a Referral!</a>
      </div>
      <button
        style={{
          background: BRAND_BLUE,
          color: '#ffffff',
          borderRadius: 999,
          padding: '9px 16px',
          fontFamily: 'var(--font-sans)',
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.02em',
          boxShadow: '0 1px 2px rgba(15,42,73,0.18)',
        }}
      >
        Start Here!
      </button>
    </div>
  )
}

function LogoRow() {
  return (
    <div
      style={{
        background: '#ffffff',
        padding: '14px 16px 12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <img
        src={`${import.meta.env.BASE_URL}brand/nehs-logo.webp`}
        alt="Northeast Health Services"
        style={{ height: 38, width: 'auto', display: 'block' }}
      />
      <button aria-label="Menu" style={{ width: 28, height: 28, display: 'flex', flexDirection: 'column', gap: 4, justifyContent: 'center' }}>
        <span style={{ height: 3, background: BRAND_BLUE_DEEP, borderRadius: 2 }} />
        <span style={{ height: 3, background: BRAND_BLUE_DEEP, borderRadius: 2 }} />
        <span style={{ height: 3, background: BRAND_BLUE_DEEP, borderRadius: 2 }} />
      </button>
    </div>
  )
}

function ColorStripe() {
  return (
    <div style={{ display: 'flex', height: 5 }}>
      <span style={{ flex: 1, background: '#f7941d' }} />
      <span style={{ flex: 1, background: '#4ebeb6' }} />
      <span style={{ flex: 1, background: '#9a3a98' }} />
      <span style={{ flex: 1, background: '#2aace2' }} />
      <span style={{ flex: 1, background: '#8a3ea8' }} />
      <span style={{ flex: 1, background: '#ec6f91' }} />
    </div>
  )
}
