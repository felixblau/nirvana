export function Welcome({ onNext }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--ls-white)',
      }}
    >
      <SiteHeader />
      <HeroSection onNext={onNext} />
      <BannerStrip />
      <InsurancesSection />
    </div>
  )
}

function SiteHeader() {
  return (
    <header
      style={{
        height: 64,
        padding: '0 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'var(--ls-white)',
        borderBottom: '1px solid #eeeeee',
        position: 'sticky',
        top: 0,
        zIndex: 20,
      }}
    >
      <img
        src="/lifestance-demo/brand/lifestance-logo.png"
        alt="LifeStance Health"
        width={100}
        height={46}
        style={{ display: 'block', width: 100, height: 46, objectFit: 'contain' }}
      />
      <button
        aria-label="Menu"
        style={{
          width: 32,
          height: 32,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width="26" height="22" viewBox="0 0 26 22" fill="none">
          <rect y="0" width="26" height="2.5" rx="0.5" fill="#333333" />
          <rect y="9.75" width="26" height="2.5" rx="0.5" fill="#333333" />
          <rect y="19.5" width="26" height="2.5" rx="0.5" fill="#333333" />
        </svg>
      </button>
    </header>
  )
}

function HeroSection({ onNext }) {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: 560,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '72px 28px 72px',
        color: 'var(--ls-white)',
        textAlign: 'center',
        overflow: 'hidden',
        backgroundImage:
          'linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)), url(/lifestance-demo/brand/hero.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <h1
        style={{
          fontFamily: 'var(--font-serif)',
          fontWeight: 400,
          fontSize: 31,
          lineHeight: '41px',
          color: 'var(--ls-white)',
          marginBottom: 22,
          letterSpacing: '-0.03em',
          maxWidth: 520,
        }}
      >
        Get the Mental Health Help You Need, the Way You Need It
      </h1>
      <p
        style={{
          fontFamily: 'var(--font-serif)',
          fontWeight: 400,
          fontSize: 18,
          lineHeight: '30px',
          color: 'var(--ls-white)',
          marginBottom: 36,
          maxWidth: 520,
        }}
      >
        Choose in-person or virtual visits from one of the largest networks of providers.
      </p>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          width: '100%',
          maxWidth: 520,
        }}
      >
        <HeroButton onClick={onNext} demoAttr="get-matched">Get Matched With A Provider</HeroButton>
        <HeroButton>Provider Directory</HeroButton>
      </div>
    </section>
  )
}

function HeroButton({ children, onClick, demoAttr }) {
  return (
    <button
      onClick={onClick}
      data-demo={demoAttr}
      style={{
        width: '100%',
        fontFamily: 'var(--font-sans)',
        fontWeight: 400,
        fontSize: 14,
        lineHeight: '25px',
        letterSpacing: '0.04em',
        padding: '13px 26px',
        background: 'rgb(0, 103, 206)',
        color: 'var(--ls-white)',
        border: 'none',
        borderRadius: 8,
        cursor: 'pointer',
        transition: 'background 0.18s ease',
        textAlign: 'center',
        textTransform: 'none',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgb(0, 86, 172)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgb(0, 103, 206)'
      }}
    >
      {children}
    </button>
  )
}

function BannerStrip() {
  return (
    <div
      style={{
        background: 'var(--ls-cta-navy)',
        color: 'var(--ls-white)',
        textAlign: 'center',
        fontFamily: 'var(--font-serif)',
        fontWeight: 400,
        fontSize: 15,
        padding: '16px 20px',
        lineHeight: 1.55,
      }}
    >
      <strong style={{ fontWeight: 600 }}>Affordable</strong> Care Starts Here: Most Copays are between $22-$36 with Insurance*
    </div>
  )
}

function InsurancesSection() {
  return (
    <section style={{ padding: '56px 28px 64px', background: 'var(--ls-white)' }}>
      <h2
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 28,
          lineHeight: '36px',
          textAlign: 'center',
          color: 'var(--ls-ink)',
          marginBottom: 32,
          letterSpacing: '-0.02em',
        }}
      >
        290+ Insurances Accepted
      </h2>

      <LogoCarousel />

      <div style={{ textAlign: 'center', marginTop: 36 }}>
        <button
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 15,
            fontWeight: 500,
            padding: '18px 32px',
            border: 'none',
            background: 'rgb(255, 242, 222)',
            color: 'var(--ls-ink)',
            borderRadius: 8,
            boxShadow: '0 2px 10px rgba(140, 110, 50, 0.10)',
            cursor: 'pointer',
            minWidth: 280,
          }}
        >
          View All Accepted Insurances
        </button>
      </div>

      <ReviewBlock />
      <TrustBadges />
    </section>
  )
}

function TrustBadges() {
  return (
    <div
      style={{
        marginTop: 40,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 20,
        justifyItems: 'center',
      }}
    >
      <WebMDBadge />
      <VitalsBadge />
      <WebMDBadge variant="provider" />
      <BBBBadge />
    </div>
  )
}

function WebMDBadge({ variant = 'patient' }) {
  const label = variant === 'patient' ? "PATIENTS' CHOICE" : "PROVIDER CHOICE"
  return (
    <svg viewBox="0 0 120 110" width="108" height="100">
      <defs>
        <linearGradient id="wmd-ribbon" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8fb8e0"/>
          <stop offset="1" stopColor="#5a89b8"/>
        </linearGradient>
      </defs>
      {/* ribbon shield */}
      <path
        d="M20 10 L100 10 L100 80 L60 100 L20 80 Z"
        fill="url(#wmd-ribbon)"
      />
      <path
        d="M20 10 L100 10 L100 80 L60 100 L20 80 Z"
        fill="none"
        stroke="#3d6d9b"
        strokeWidth="1.5"
      />
      <text x="60" y="32" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="10" fontWeight="700" fill="white" letterSpacing="0.5">
        WebMD
      </text>
      <line x1="32" y1="38" x2="88" y2="38" stroke="white" strokeWidth="0.6" opacity="0.5"/>
      <text x="60" y="56" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="11" fontWeight="700" fill="white" letterSpacing="0.4">
        {label.split(' ')[0]}
      </text>
      <text x="60" y="70" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="11" fontWeight="700" fill="white" letterSpacing="0.4">
        {label.split(' ')[1]}
      </text>
    </svg>
  )
}

function VitalsBadge() {
  return (
    <svg viewBox="0 0 120 110" width="108" height="100">
      <defs>
        <linearGradient id="vitals-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f5f0e4"/>
          <stop offset="1" stopColor="#e4d9bc"/>
        </linearGradient>
      </defs>
      <path
        d="M20 18 L100 18 L100 78 L60 96 L20 78 Z"
        fill="url(#vitals-g)"
        stroke="#c8a84a"
        strokeWidth="1.5"
      />
      {/* red header */}
      <path d="M32 10 L88 10 L92 22 L28 22 Z" fill="#c83535"/>
      <text x="60" y="19" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="9" fontWeight="700" fill="white" letterSpacing="1">
        vitals
      </text>
      <text x="60" y="48" textAnchor="middle" fontFamily="var(--font-serif)" fontStyle="italic" fontSize="10" fontWeight="600" fill="#8a6b1a">
        PREFERRED
      </text>
      <text x="60" y="62" textAnchor="middle" fontFamily="var(--font-serif)" fontStyle="italic" fontSize="10" fontWeight="600" fill="#8a6b1a">
        PROVIDER
      </text>
      <text x="60" y="80" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="6.5" fill="#8a6b1a">
        2024
      </text>
    </svg>
  )
}

function BBBBadge() {
  return (
    <svg viewBox="0 0 140 70" width="108" height="54">
      <rect x="2" y="10" width="60" height="52" fill="#0065a0"/>
      <text x="32" y="28" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="10" fontWeight="700" fill="white">ACCREDITED</text>
      <text x="32" y="42" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="12" fontWeight="700" fill="white" letterSpacing="0.5">BUSINESS</text>
      <text x="32" y="55" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="7" fill="white">SINCE 2007</text>
      <rect x="62" y="10" width="76" height="52" fill="white" stroke="#0065a0" strokeWidth="1.5"/>
      <text x="100" y="36" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="26" fontWeight="700" fill="#0065a0" letterSpacing="-1">BBB</text>
      <text x="100" y="52" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="8" fill="#0065a0">Rating: A+</text>
    </svg>
  )
}

function LogoCarousel() {
  // placeholder logos — real ones will replace these
  const logos = [
    { key: 'bcbs', el: <BcbsMark /> },
    { key: 'carefirst', el: <CareFirstMark /> },
    { key: 'cigna', el: <CignaMark /> },
    { key: 'aetna', el: <AetnaMark /> },
    { key: 'united', el: <UnitedMark /> },
    { key: 'humana', el: <HumanaMark /> },
  ]
  // duplicate for seamless marquee loop
  const loop = [...logos, ...logos]

  return (
    <div
      style={{
        overflow: 'hidden',
        position: 'relative',
        maskImage:
          'linear-gradient(to right, transparent 0, #000 8%, #000 92%, transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to right, transparent 0, #000 8%, #000 92%, transparent 100%)',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: 48,
          alignItems: 'center',
          width: 'max-content',
          animation: 'ls-marquee 28s linear infinite',
        }}
      >
        {loop.map((l, i) => (
          <div
            key={`${l.key}-${i}`}
            style={{
              flexShrink: 0,
              width: 120,
              height: 56,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {l.el}
          </div>
        ))}
      </div>
      <style>{`
        @keyframes ls-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}

function BcbsMark() {
  return (
    <svg viewBox="0 0 140 52" width="120" height="50">
      <text x="0" y="20" fontFamily="var(--font-sans)" fontSize="14" fontWeight="700" fill="#004990">BlueCross</text>
      <text x="0" y="36" fontFamily="var(--font-sans)" fontSize="14" fontWeight="700" fill="#004990">BlueShield</text>
      <text x="0" y="48" fontFamily="var(--font-sans)" fontSize="6" fill="#004990" letterSpacing="0.5">ILA. PLAN FOR COVERAGE</text>
    </svg>
  )
}

function CareFirstMark() {
  return (
    <svg viewBox="0 0 140 52" width="120" height="50">
      <text x="70" y="30" textAnchor="middle" fontFamily="var(--font-serif)" fontSize="24" fontWeight="700" fill="#003865">CareFirst</text>
      <g transform="translate(22, 38)">
        <rect x="0" y="0" width="14" height="8" fill="#003865"/>
        <path d="M14 0 L28 4 L14 8 Z" fill="#0078ae"/>
        <circle cx="46" cy="4" r="4" fill="#ec1c24"/>
        <circle cx="58" cy="4" r="4" fill="#003865"/>
        <circle cx="70" cy="4" r="4" fill="#0078ae"/>
        <circle cx="82" cy="4" r="4" fill="#80c342"/>
      </g>
    </svg>
  )
}

function CignaMark() {
  return (
    <svg viewBox="0 0 140 52" width="120" height="50">
      <path d="M28 14 A 12 12 0 1 0 28 38 L 28 32 A 6 6 0 1 1 28 20 Z" fill="#f26522"/>
      <text x="48" y="34" fontFamily="var(--font-sans)" fontSize="24" fontWeight="700" fill="#0096d6" letterSpacing="-0.5">Cigna.</text>
    </svg>
  )
}

function AetnaMark() {
  return (
    <svg viewBox="0 0 140 52" width="120" height="50">
      <text x="70" y="34" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="30" fontWeight="700" fill="#7c2d8a" letterSpacing="-1">aetna</text>
    </svg>
  )
}

function UnitedMark() {
  return (
    <svg viewBox="0 0 140 52" width="120" height="50">
      <text x="0" y="20" fontFamily="var(--font-sans)" fontSize="12" fontWeight="700" fill="#002677">United</text>
      <text x="0" y="36" fontFamily="var(--font-sans)" fontSize="12" fontWeight="700" fill="#002677">Healthcare</text>
      <path d="M100 18 Q 106 14 112 18 T 124 18" stroke="#ff6a00" strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  )
}

function HumanaMark() {
  return (
    <svg viewBox="0 0 140 52" width="120" height="50">
      <text x="70" y="34" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="24" fontWeight="700" fill="#78be20" letterSpacing="-0.5">Humana.</text>
    </svg>
  )
}

function ReviewBlock() {
  return (
    <div style={{ marginTop: 52, background: 'var(--ls-cream-soft)', borderRadius: 4, padding: '32px 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 4 }}>
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 600, color: 'var(--ls-ink)' }}>4.9</span>{' '}
        <span style={{ color: '#f5a623', letterSpacing: 1 }}>★★★★★</span>{' '}
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--ls-ink-muted)' }}>
          (159,531 Total Reviews)
        </span>
      </div>
      <div style={{ marginTop: 18 }}>
        <div style={{ fontFamily: 'var(--font-serif)', fontSize: 40, lineHeight: 1, color: 'var(--ls-teal)', marginBottom: -18 }}>&ldquo;</div>
        <p style={{ fontFamily: 'var(--font-serif)', fontSize: 16, lineHeight: '26px', color: 'var(--ls-ink)', marginBottom: 10 }}>
          Jeff has been a pivotal part of my healing journey, helping me navigate anxiety and depression with compassion and expertise.
        </p>
        <a style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--ls-teal)', textDecoration: 'underline' }}>
          See more reviews
        </a>
      </div>
    </div>
  )
}
