export function Phone({ children, phoneRef, viewportRef, animateIn }) {
  const animated = animateIn !== undefined
  return (
    <div
      style={{
        background: '#e5e5e5',
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
          background: 'var(--sg-white)',
          borderRadius: 44,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 24px 80px rgba(0, 0, 0, 0.5)',
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
            background: '#ffffff',
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
          className="nehs-viewport"
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
