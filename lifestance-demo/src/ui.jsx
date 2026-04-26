export function Phone({ children, phoneRef, viewportRef, animateIn }) {
  const animated = animateIn !== undefined
  return (
    <div
      style={{
        background: '#f6f2ec',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '24px 16px',
      }}
    >
      <div
        ref={phoneRef}
        style={{
          width: 390,
          height: 820,
          background: 'var(--ls-white)',
          borderRadius: 44,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 24px 80px rgba(8, 18, 69, 0.16)',
          position: 'relative',
          border: '7px solid black',
          transition: animated ? 'all 1.4s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
          opacity: animated ? (animateIn ? 1 : 0) : 1,
          transform: animated
            ? animateIn
              ? 'translateY(0) scale(1)'
              : 'translateY(80px) scale(0.95)'
            : 'none',
          filter: animated ? (animateIn ? 'blur(0px)' : 'blur(8px)') : 'none',
        }}
      >
        {/* iOS status bar with notch */}
        <div
          style={{
            width: '100%',
            height: 45,
            flexShrink: 0,
            position: 'relative',
            background: 'var(--ls-white)',
            zIndex: 30,
          }}
        >
          <img
            src={`${import.meta.env.BASE_URL}ios-bar.svg`}
            alt=""
            style={{ width: '100%', height: 45, display: 'block' }}
          />
          <div
            style={{
              position: 'absolute',
              top: 10,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 120,
              height: 32,
              background: 'black',
              borderRadius: 20,
            }}
          />
        </div>

        {/* scrollable viewport */}
        <div
          ref={viewportRef}
          style={{
            flex: 1,
            overflowY: 'auto',
            overflowX: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

export function Header({ onBack, step, totalSteps, showLogo = true }) {
  return (
    <header
      style={{
        padding: '0 20px',
        background: 'var(--ls-white)',
        position: 'sticky',
        top: 0,
        zIndex: 10,
        borderBottom: '1px solid #eeeeee',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 64,
        }}
      >
        {onBack ? (
          <button
            onClick={onBack}
            aria-label="Back"
            style={{
              width: 36,
              height: 36,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--ls-ink)',
              marginLeft: -6,
            }}
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M13.5 5L7 11L13.5 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        ) : (
          <div style={{ width: 36 }} />
        )}
        {showLogo && (
          <img
            src={`${import.meta.env.BASE_URL}brand/lifestance-logo.png`}
            alt="LifeStance Health"
            width={100}
            height={46}
            style={{ display: 'block', width: 100, height: 46, objectFit: 'contain' }}
          />
        )}
        <button aria-label="Menu" style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="22" height="18" viewBox="0 0 26 22" fill="none">
            <rect y="0" width="26" height="2.5" rx="0.5" fill="#333333" />
            <rect y="9.75" width="26" height="2.5" rx="0.5" fill="#333333" />
            <rect y="19.5" width="26" height="2.5" rx="0.5" fill="#333333" />
          </svg>
        </button>
      </div>
      {typeof step === 'number' && totalSteps ? (
        <ProgressBar step={step} totalSteps={totalSteps} />
      ) : null}
    </header>
  )
}

export function ProgressBar({ step, totalSteps }) {
  const pct = Math.max(0, Math.min(100, ((step + 1) / totalSteps) * 100))
  return (
    <div
      style={{
        height: 3,
        background: 'var(--ls-border-soft)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: `${pct}%`,
          height: '100%',
          background: 'var(--ls-teal)',
          transition: 'width 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />
    </div>
  )
}

export function Body({ children, style = {} }) {
  return (
    <main
      style={{
        flex: 1,
        padding: '32px 24px 120px',
        display: 'flex',
        flexDirection: 'column',
        ...style,
      }}
    >
      {children}
    </main>
  )
}

export function Title({ children, eyebrow, subtitle }) {
  return (
    <div style={{ marginBottom: 28 }}>
      {eyebrow ? (
        <div
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--ls-teal)',
            marginBottom: 12,
          }}
        >
          {eyebrow}
        </div>
      ) : null}
      <h1
        style={{
          fontFamily: 'var(--font-serif)',
          fontWeight: 400,
          fontSize: 31,
          lineHeight: '41px',
          color: 'var(--ls-ink)',
          marginBottom: subtitle ? 12 : 0,
          letterSpacing: '-0.005em',
        }}
      >
        {children}
      </h1>
      {subtitle ? (
        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontWeight: 400,
            fontSize: 18,
            lineHeight: '30px',
            color: 'var(--ls-ink-soft)',
          }}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  )
}

export function OptionCard({ icon, title, description, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        textAlign: 'left',
        padding: '18px 18px',
        borderRadius: 'var(--ls-radius)',
        background: selected ? '#f4f8fb' : 'var(--ls-white)',
        border: selected
          ? '1.5px solid var(--ls-teal)'
          : '1px solid #e2e2e2',
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        transition: 'all 0.18s ease',
        boxShadow: selected ? 'var(--ls-shadow-sm)' : 'none',
        fontFamily: 'var(--font-sans)',
      }}
    >
      {icon ? (
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 8,
            background: selected ? 'var(--ls-teal)' : '#eef4fa',
            color: selected ? 'var(--ls-white)' : 'var(--ls-teal)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            transition: 'all 0.18s ease',
          }}
        >
          {icon}
        </div>
      ) : null}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 16,
            fontWeight: 500,
            lineHeight: '24px',
            color: 'var(--ls-ink)',
            marginBottom: description ? 2 : 0,
          }}
        >
          {title}
        </div>
        {description ? (
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--ls-ink-muted)', lineHeight: '20px' }}>
            {description}
          </div>
        ) : null}
      </div>
      <div
        style={{
          width: 20,
          height: 20,
          borderRadius: 10,
          border: selected
            ? '6px solid var(--ls-teal)'
            : '1.5px solid #cccccc',
          flexShrink: 0,
          transition: 'all 0.18s ease',
        }}
      />
    </button>
  )
}

export function RadioList({ options, value, onChange }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {options.map((opt) => (
        <OptionCard
          key={opt.value}
          title={opt.label}
          description={opt.description}
          icon={opt.icon}
          selected={value === opt.value}
          onClick={() => onChange(opt.value)}
        />
      ))}
    </div>
  )
}

export function TextField({ label, value, onChange, placeholder, type = 'text', inputMode, maxLength, autoFocus }) {
  return (
    <label style={{ display: 'block' }}>
      {label ? (
        <span
          style={{
            display: 'block',
            fontFamily: 'var(--font-sans)',
            fontSize: 13,
            fontWeight: 600,
            color: 'var(--ls-ink-soft)',
            marginBottom: 8,
            letterSpacing: '0.02em',
          }}
        >
          {label}
        </span>
      ) : null}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        inputMode={inputMode}
        maxLength={maxLength}
        autoFocus={autoFocus}
        style={{
          width: '100%',
          padding: '14px 16px',
          border: '1px solid #d9d9d9',
          borderRadius: 2,
          background: 'var(--ls-white)',
          fontFamily: 'var(--font-sans)',
          fontSize: 16,
          color: 'var(--ls-ink)',
          outline: 'none',
          transition: 'border-color 0.15s, box-shadow 0.15s',
        }}
        onFocus={(e) => {
          e.target.style.borderColor = 'var(--ls-teal)'
          e.target.style.boxShadow = '0 0 0 3px rgba(46, 124, 191, 0.12)'
        }}
        onBlur={(e) => {
          e.target.style.borderColor = '#d9d9d9'
          e.target.style.boxShadow = 'none'
        }}
      />
    </label>
  )
}

export function PrimaryButton({ children, onClick, disabled, fullWidth = true }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: fullWidth ? '100%' : 'auto',
        padding: '14px 28px',
        background: disabled ? '#cccccc' : 'var(--ls-cta-navy)',
        color: 'var(--ls-white)',
        borderRadius: 8,
        fontFamily: 'var(--font-sans)',
        fontWeight: 400,
        fontSize: 14,
        lineHeight: '25px',
        letterSpacing: '0.02em',
        transition: 'all 0.18s ease',
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
      onMouseEnter={(e) => {
        if (!disabled) e.currentTarget.style.background = 'var(--ls-cta-navy-hover)'
      }}
      onMouseLeave={(e) => {
        if (!disabled) e.currentTarget.style.background = 'var(--ls-cta-navy)'
      }}
    >
      {children}
    </button>
  )
}

export function StickyFooter({ children }) {
  return (
    <div
      style={{
        position: 'sticky',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '16px 24px 28px',
        background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, var(--ls-white) 30%)',
        marginTop: 'auto',
      }}
    >
      {children}
    </div>
  )
}
