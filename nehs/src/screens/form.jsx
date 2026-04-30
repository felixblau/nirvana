import { useEffect, useRef, useState } from 'react'

const BRAND_BLUE_DEEP = '#0f2a49'
const FIELD_BORDER = '#b4b4b4'

export function FieldLabel({ children, required }) {
  return (
    <label
      style={{
        display: 'block',
        fontFamily: 'var(--font-sans)',
        fontSize: 15,
        fontWeight: 700,
        color: '#222',
        marginBottom: 8,
      }}
    >
      {children}
      {required ? <span style={{ color: '#d03a3a', marginLeft: 4 }}>*</span> : null}
    </label>
  )
}

export function FieldHint({ children }) {
  return (
    <div
      style={{
        fontFamily: 'var(--font-sans)',
        fontSize: 12,
        color: '#6e6e6e',
        marginTop: 4,
      }}
    >
      {children}
    </div>
  )
}

export function TextInput({
  value,
  onChange,
  type = 'text',
  placeholder,
  demoKey,
  width,
  suffix,
}) {
  return (
    <div style={{ position: 'relative', width: width ?? '100%' }}>
      <input
        type={type}
        value={value ?? ''}
        placeholder={placeholder}
        onChange={(e) => onChange?.(e.target.value)}
        data-demo={demoKey}
        style={{
          width: '100%',
          padding: suffix ? '12px 42px 12px 14px' : '12px 14px',
          background: '#ffffff',
          border: `1px solid ${FIELD_BORDER}`,
          borderRadius: 4,
          fontFamily: 'var(--font-sans)',
          fontSize: 15,
          color: '#1a2332',
          outline: 'none',
        }}
      />
      {suffix ? (
        <span
          aria-hidden
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: 38,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#5a5a5a',
            pointerEvents: 'none',
          }}
        >
          {suffix}
        </span>
      ) : null}
    </div>
  )
}

/**
 * Custom dropdown rendered in-DOM so it stays visible during automated
 * demo clickthroughs (a native <select> popup cannot be captured).
 */
export function Dropdown({
  value,
  onChange,
  options,
  placeholder = 'Please Select',
  demoKey,
  open: controlledOpen,
  onOpenChange,
}) {
  const [internalOpen, setInternalOpen] = useState(false)
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen
  const setOpen = (v) => {
    if (controlledOpen === undefined) setInternalOpen(v)
    onOpenChange?.(v)
  }
  const rootRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const close = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [open])

  const isEmpty = !value

  return (
    <div ref={rootRef} data-demo={demoKey} style={{ position: 'relative' }}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          padding: '12px 36px 12px 14px',
          background: '#ffffff',
          border: `1px solid ${FIELD_BORDER}`,
          borderRadius: 4,
          fontFamily: 'var(--font-sans)',
          fontSize: 15,
          color: isEmpty ? '#8a8a8a' : '#1a2332',
          textAlign: 'left',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 8,
        }}
      >
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {value || placeholder}
        </span>
        <Chevron open={open} />
      </button>

      {open ? (
        <div
          data-demo={demoKey ? `${demoKey}-menu` : undefined}
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            left: 0,
            right: 0,
            background: '#ffffff',
            border: `1px solid ${FIELD_BORDER}`,
            borderRadius: 6,
            boxShadow: '0 10px 24px rgba(15, 42, 73, 0.18)',
            maxHeight: 260,
            overflowY: 'auto',
            zIndex: 20,
          }}
        >
          {options.map((o) => {
            const selected = o === value
            return (
              <button
                key={o}
                type="button"
                data-demo={demoKey ? `${demoKey}-opt-${o}` : undefined}
                onClick={() => {
                  onChange?.(o)
                  setOpen(false)
                }}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  padding: '10px 14px',
                  background: selected ? '#eaf1fb' : '#ffffff',
                  color: selected ? BRAND_BLUE_DEEP : '#1a2332',
                  fontFamily: 'var(--font-sans)',
                  fontSize: 14,
                  fontWeight: selected ? 600 : 500,
                  cursor: 'pointer',
                  border: 'none',
                }}
              >
                {o}
              </button>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}

function Chevron({ open }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      style={{ transition: 'transform 0.18s ease', transform: open ? 'rotate(180deg)' : 'none' }}
      aria-hidden
    >
      <path d="M3 5 L7 9 L11 5" stroke="#1a2332" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
