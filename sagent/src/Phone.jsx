export function Phone({ children, phoneRef, viewportRef }) {
  return (
    <div
      style={{
        background: '#0f0b14',
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
        }}
      >
        {/* iOS status bar with notch */}
        <div
          style={{
            width: '100%',
            height: 45,
            flexShrink: 0,
            position: 'relative',
            background: 'var(--sg-purple)',
            zIndex: 30,
          }}
        >
          <img
            src={`${import.meta.env.BASE_URL}ios-bar.svg`}
            alt=""
            style={{
              width: '100%',
              height: 45,
              display: 'block',
              filter: 'invert(1) brightness(2)',
            }}
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
