export function StepNav({ onPrev, onNext, nextLabel = 'Next', submit, onSubmit }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 22,
        marginTop: 28,
      }}
    >
      {onPrev ? (
        <button
          onClick={onPrev}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '10px 4px',
            background: 'transparent',
            color: 'var(--sg-purple)',
            fontFamily: 'var(--font-sans)',
            fontSize: 15,
            fontWeight: 600,
          }}
        >
          <span aria-hidden>←</span>
          Previous
        </button>
      ) : null}
      {submit ? (
        <button
          onClick={onSubmit}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '11px 22px',
            background: 'var(--sg-purple)',
            color: '#fff',
            borderRadius: 4,
            fontFamily: 'var(--font-sans)',
            fontSize: 15,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          <UploadGlyph />
          Submit Form
        </button>
      ) : onNext ? (
        <button
          onClick={onNext}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '11px 22px',
            background: 'var(--sg-purple)',
            color: '#fff',
            borderRadius: 4,
            fontFamily: 'var(--font-sans)',
            fontSize: 15,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          {nextLabel}
          <span aria-hidden>→</span>
        </button>
      ) : null}
    </div>
  )
}

function UploadGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M7 2 L7 9" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M4 5 L7 2 L10 5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="2" y="10" width="10" height="2" rx="0.5" fill="white" />
    </svg>
  )
}
