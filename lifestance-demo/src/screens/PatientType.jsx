export function PatientType({ onNext }) {
  return (
    <main
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: '32px 22px 40px',
        background: 'white',
      }}
    >
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 36 }}>
          <img
            src={`${import.meta.env.BASE_URL}brand/logo-mark.png`}
            alt="LifeStance"
            width={56}
            height={56}
            style={{ display: 'block' }}
          />
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontWeight: 700,
            fontSize: 24,
            lineHeight: '32px',
            color: 'var(--ls-ink)',
            textAlign: 'center',
            marginBottom: 32,
            letterSpacing: '-0.01em',
          }}
        >
          Which best describes you?
        </h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <PatientCard
            imgSrc={`${import.meta.env.BASE_URL}brand/patient-new.png`}
            title="I'm a new patient"
            subtitle="Start care with a new provider"
            cta="Get started"
            onClick={() => onNext('new')}
            demoAttr="patient-new"
          />
          <PatientCard
            imgSrc={`${import.meta.env.BASE_URL}brand/patient-existing.png`}
            title="I'm an existing patient"
            subtitle="Schedule your next visit"
            cta="Continue"
            onClick={() => onNext('existing')}
          />
        </div>
    </main>
  )
}

function PatientCard({ imgSrc, title, subtitle, cta, onClick, demoAttr }) {
  return (
    <button
      onClick={onClick}
      data-demo={demoAttr}
      className="ls-patient-card"
      style={{
        width: '100%',
        padding: '24px 24px 22px',
        background: 'white',
        border: '1px solid #e5e5e5',
        borderRadius: 10,
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'all 0.18s ease',
      }}
    >
      <img
        src={imgSrc}
        alt=""
        style={{
          width: 92,
          height: 92,
          display: 'block',
          margin: '0 auto 18px',
          objectFit: 'contain',
          mixBlendMode: 'multiply',
        }}
      />
      <div
        style={{
          fontFamily: 'var(--font-serif)',
          fontWeight: 700,
          fontSize: 19,
          lineHeight: '26px',
          color: 'var(--ls-ink)',
          marginBottom: 6,
          letterSpacing: '-0.005em',
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 14,
          lineHeight: '22px',
          color: 'var(--ls-ink-soft)',
          marginBottom: 16,
        }}
      >
        {subtitle}
      </div>
      <div
        className="ls-patient-cta"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          fontFamily: 'var(--font-sans)',
          fontSize: 14,
          fontWeight: 600,
          color: 'rgb(0, 103, 206)',
          transition: 'color 0.18s ease',
        }}
      >
        <span>{cta}</span>
        <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
          <path d="M1 7H16M16 7L10 1M16 7L10 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      <style>{`
        .ls-patient-card:hover {
          background: #eaf3fc !important;
          border-color: #eaf3fc !important;
        }
        .ls-patient-card:hover .ls-patient-cta {
          color: #1a1a1a !important;
        }
      `}</style>
    </button>
  )
}
