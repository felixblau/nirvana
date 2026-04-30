export const REQUIRED_STAR = (
  <span style={{ color: '#e88a8a', marginLeft: 6, fontSize: 16 }}>*</span>
)

export function FieldLabel({ children, required }) {
  return (
    <label
      style={{
        display: 'block',
        fontFamily: 'var(--font-sans)',
        fontSize: 14,
        fontWeight: 700,
        color: '#2c2c2c',
        marginBottom: 8,
      }}
    >
      {children}
      {required ? REQUIRED_STAR : null}
    </label>
  )
}

export function SectionHeading({ children }) {
  return (
    <h3
      style={{
        fontFamily: 'var(--font-sans)',
        fontWeight: 700,
        fontSize: 16,
        color: '#222',
        marginBottom: 18,
      }}
    >
      {children}
    </h3>
  )
}

export function TextInput({ value, onChange, type = 'text', placeholder, demoKey }) {
  return (
    <input
      type={type}
      value={value ?? ''}
      placeholder={placeholder}
      onChange={(e) => onChange?.(e.target.value)}
      data-demo={demoKey}
      style={{
        width: '100%',
        padding: '10px 12px',
        background: '#ffffff',
        border: '1px solid #cfcfcf',
        borderRadius: 4,
        fontFamily: 'var(--font-sans)',
        fontSize: 14,
        color: '#2c2c2c',
        outline: 'none',
      }}
    />
  )
}

export function Textarea({ value, onChange, placeholder, rows = 3, demoKey }) {
  return (
    <textarea
      value={value ?? ''}
      placeholder={placeholder}
      rows={rows}
      onChange={(e) => onChange?.(e.target.value)}
      data-demo={demoKey}
      style={{
        width: '100%',
        padding: '10px 12px',
        background: '#ffffff',
        border: '1px solid #cfcfcf',
        borderRadius: 4,
        fontFamily: 'var(--font-sans)',
        fontSize: 14,
        color: '#2c2c2c',
        outline: 'none',
        resize: 'vertical',
      }}
    />
  )
}

export function Select({ value, onChange, options, placeholder = 'Select...', demoKey }) {
  const isEmpty = !value
  return (
    <div data-demo={demoKey} style={{ position: 'relative' }}>
      <select
        value={value ?? ''}
        onChange={(e) => onChange?.(e.target.value)}
        style={{
          width: '100%',
          padding: '10px 36px 10px 12px',
          background: '#ffffff',
          border: '1px solid #cfcfcf',
          borderRadius: 4,
          fontFamily: 'var(--font-sans)',
          fontSize: 14,
          color: isEmpty ? '#9a9a9a' : '#2c2c2c',
          outline: 'none',
          appearance: 'none',
          WebkitAppearance: 'none',
          cursor: 'pointer',
        }}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
      <span
        aria-hidden
        style={{
          position: 'absolute',
          right: 10,
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: 10,
          color: '#555',
          pointerEvents: 'none',
          lineHeight: 1,
        }}
      >
        ▲▼
      </span>
    </div>
  )
}

export function RadioList({ options, value, onChange, name }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {options.map((opt) => {
        const selected = value === opt
        return (
          <label
            key={opt}
            data-demo={`${name}-${opt}`}
            style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}
          >
            <span
              style={{
                width: 20,
                height: 20,
                borderRadius: 999,
                border: `2px solid ${selected ? 'var(--sg-purple)' : '#b5b5b5'}`,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'border-color 0.18s ease',
              }}
            >
              {selected ? (
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 999,
                    background: 'var(--sg-purple)',
                  }}
                />
              ) : null}
            </span>
            <input
              type="radio"
              name={name}
              checked={selected}
              onChange={() => onChange?.(opt)}
              style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
            />
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: 15, color: '#2c2c2c' }}>
              {opt}
            </span>
          </label>
        )
      })}
    </div>
  )
}

export function Chip({ children, onRemove }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '5px 8px 5px 10px',
        background: '#ececec',
        borderRadius: 4,
        fontFamily: 'var(--font-sans)',
        fontSize: 14,
        color: '#2c2c2c',
      }}
    >
      {children}
      <button
        onClick={onRemove}
        aria-label="Remove"
        style={{
          width: 16,
          height: 16,
          padding: 0,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#666',
          fontSize: 14,
          lineHeight: 1,
        }}
      >
        ×
      </button>
    </span>
  )
}

export function ChipSelect({ value, onClear }) {
  return (
    <div
      style={{
        padding: 8,
        background: '#ffffff',
        border: '1px solid #cfcfcf',
        borderRadius: 4,
        minHeight: 42,
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 6,
      }}
    >
      {value ? <Chip onRemove={onClear}>{value}</Chip> : null}
    </div>
  )
}
