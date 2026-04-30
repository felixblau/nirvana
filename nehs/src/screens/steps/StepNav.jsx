const BRAND_BLUE = '#2c61d6'
const BRAND_BLUE_ACTIVE = '#1f4db0'

export function StepNav({ onPrev, onNext, nextDisabled, nextLabel = 'Next' }) {
  return (
    <div
      style={{
        marginTop: 22,
        paddingTop: 20,
        borderTop: '1px solid #ececec',
        display: 'flex',
        alignItems: 'center',
        justifyContent: onPrev ? 'space-between' : 'flex-end',
        gap: 12,
      }}
    >
      {onPrev ? (
        <button
          type="button"
          onClick={onPrev}
          data-demo="prev-btn"
          style={{
            background: '#e9ecf2',
            color: '#1a2332',
            borderRadius: 6,
            padding: '12px 22px',
            fontFamily: 'var(--font-sans)',
            fontSize: 16,
            fontWeight: 600,
          }}
        >
          Back
        </button>
      ) : null}
      <button
        type="button"
        onClick={onNext}
        disabled={nextDisabled}
        data-demo="next-btn"
        style={{
          background: nextDisabled ? '#c8c8c8' : BRAND_BLUE,
          color: '#ffffff',
          borderRadius: 6,
          padding: '12px 26px',
          fontFamily: 'var(--font-sans)',
          fontSize: 16,
          fontWeight: 600,
          cursor: nextDisabled ? 'not-allowed' : 'pointer',
          transition: 'background 0.18s ease',
        }}
        onMouseDown={(e) => {
          if (!nextDisabled) e.currentTarget.style.background = BRAND_BLUE_ACTIVE
        }}
        onMouseUp={(e) => {
          if (!nextDisabled) e.currentTarget.style.background = BRAND_BLUE
        }}
      >
        {nextLabel}
      </button>
    </div>
  )
}
