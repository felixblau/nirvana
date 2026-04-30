import { useEffect } from 'react'

export function TapRipple({ x, y, onDone }) {
  useEffect(() => {
    const t = setTimeout(() => onDone && onDone(), 900)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: 0,
        height: 0,
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: -22,
          top: -22,
          width: 44,
          height: 44,
          borderRadius: '50%',
          background: 'rgba(56, 189, 248, 0.4)',
          transform: 'scale(0)',
          animation: 'sgd-tap-down 0.9s cubic-bezier(0.25, 0.1, 0.25, 1) forwards',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: -22,
          top: -22,
          width: 44,
          height: 44,
          borderRadius: '50%',
          background: 'transparent',
          border: '2px solid #38bdf8',
          transform: 'scale(1)',
          animation: 'sgd-tap-ring 0.9s cubic-bezier(0.25, 0.1, 0.25, 1) 0.15s forwards',
          opacity: 0,
        }}
      />
      <style>{`
        @keyframes sgd-tap-down {
          0% { transform: scale(0); opacity: 0; }
          30% { transform: scale(1); opacity: 1; }
          70% { transform: scale(1); opacity: 1; }
          100% { transform: scale(0.9); opacity: 0; }
        }
        @keyframes sgd-tap-ring {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(3); opacity: 0; }
        }
      `}</style>
    </div>
  )
}
