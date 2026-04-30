import { StepNav } from './StepNav.jsx'
import { FieldLabel, Textarea, SectionHeading } from '../form.jsx'

export function Step6Additional({ data, update, onNext, onPrev }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <SectionHeading>Additional Information</SectionHeading>

      <FieldLabel>Briefly describe the reason for your visit:</FieldLabel>
      <Textarea
        value={data.reason}
        onChange={(v) => update({ reason: v })}
        rows={4}
      />

      <div style={{ height: 18 }} />

      <FieldLabel required>
        Do you consent to receiving text messages regarding your request for an appointment?
      </FieldLabel>
      <div style={{ display: 'flex', gap: 22 }}>
        {['Yes', 'No'].map((opt) => {
          const selected = data.consent === opt
          return (
            <label key={opt} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
              <span
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 999,
                  border: `2px solid ${selected ? 'var(--sg-purple)' : '#b5b5b5'}`,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'border-color 0.18s ease',
                }}
              >
                {selected ? (
                  <span style={{ width: 9, height: 9, borderRadius: 999, background: 'var(--sg-purple)' }} />
                ) : null}
              </span>
              <input
                type="radio"
                name="consent"
                checked={selected}
                onChange={() => update({ consent: opt })}
                style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
              />
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: 15, color: '#2c2c2c' }}>
                {opt}
              </span>
            </label>
          )
        })}
      </div>

      <p
        style={{
          marginTop: 20,
          fontFamily: 'var(--font-sans)',
          fontSize: 13,
          lineHeight: '20px',
          color: '#4a4a4a',
        }}
      >
        By submitting this form, you are giving consent to our team to contact you
        at the number provided and leave a generic voice message regarding your
        request.
      </p>

      <div style={{ flex: 1 }} />
      <StepNav onPrev={onPrev} onNext={onNext} nextDisabled={!data.consent} />
    </div>
  )
}
