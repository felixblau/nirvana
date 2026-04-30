import { StepNav } from './StepNav.jsx'
import { FieldLabel } from '../form.jsx'

const TIME_SLOTS = [
  '8:00 am - 9:00 am',
  '9:00 am - 10:00 am',
  '10:00 am - 11:00 am',
  '11:00 am - 12:00 pm',
  '12:00 pm - 1:00 pm',
  '1:00 pm - 2:00 pm',
  '2:00 pm - 3:00 pm',
  '3:00 pm - 4:00 pm',
  '4:00 pm - 5:00 pm',
  '5:00 pm - 6:00 pm',
]

const BRAND_BLUE = '#173A64'
const FIELD_BORDER = '#b4b4b4'

export function Step3Consent({ data, update, onSubmit, onPrev }) {
  const readyToSubmit =
    (data.altTreatmentInterest === 'Yes' || data.altTreatmentInterest === 'No') &&
    data.consent === true
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: 20 }}>
      <div>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 15,
            lineHeight: 1.5,
            color: '#222',
            marginBottom: 14,
          }}
        >
          For those who are eligible, we offer FDA-approved alternative treatments for
          depression such as Transcranial Magnetic Stimulation and Spravato. Would you
          be interested in learning more about these alternative treatment options?
        </p>
        <RadioList
          name="altTreatmentInterest"
          value={data.altTreatmentInterest}
          onChange={(v) => update({ altTreatmentInterest: v })}
          options={['Yes', 'No']}
        />
      </div>

      <div>
        <FieldLabel>What is the best time of day to reach you?</FieldLabel>
        <TimeMultiSelect
          value={data.preferredTimes ?? []}
          onChange={(v) => update({ preferredTimes: v })}
        />
      </div>

      <div>
        <FieldLabel>How can we help?</FieldLabel>
        <textarea
          value={data.helpMessage ?? ''}
          onChange={(e) => update({ helpMessage: e.target.value })}
          rows={3}
          data-demo="helpMessage"
          style={{
            width: '100%',
            padding: '12px 14px',
            background: '#ffffff',
            border: `1px solid ${FIELD_BORDER}`,
            borderRadius: 4,
            fontFamily: 'var(--font-sans)',
            fontSize: 15,
            color: '#1a2332',
            outline: 'none',
            resize: 'vertical',
          }}
        />
      </div>

      <ConsentRow
        checked={data.consent === true}
        onToggle={() => update({ consent: !data.consent })}
      />

      <StepNav
        onPrev={onPrev}
        onNext={onSubmit}
        nextDisabled={!readyToSubmit}
        nextLabel="Submit"
      />

      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 12,
          color: '#4a4a4a',
          lineHeight: 1.55,
        }}
      >
        *By submitting this form, I confirm I have read, understood, and agree to the{' '}
        <a style={{ color: '#2c61d6', textDecoration: 'underline' }}>Privacy Policy</a>
      </p>
    </div>
  )
}

function RadioList({ options, value, onChange, name }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {options.map((opt) => {
        const selected = value === opt
        return (
          <label
            key={opt}
            data-demo={`${name}-${opt}`}
            onClick={() => onChange?.(opt)}
            style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}
          >
            <span
              style={{
                width: 20,
                height: 20,
                borderRadius: 999,
                border: `2px solid ${selected ? BRAND_BLUE : '#b4b4b4'}`,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'border-color 0.18s ease',
              }}
            >
              {selected ? (
                <span style={{ width: 10, height: 10, borderRadius: 999, background: BRAND_BLUE }} />
              ) : null}
            </span>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: 15, color: '#1a2332' }}>
              {opt}
            </span>
          </label>
        )
      })}
    </div>
  )
}

function TimeMultiSelect({ value, onChange }) {
  const toggle = (slot) => {
    const next = value.includes(slot) ? value.filter((s) => s !== slot) : [...value, slot]
    onChange?.(next)
  }
  return (
    <div
      data-demo="preferredTimes"
      style={{
        border: `1px solid ${FIELD_BORDER}`,
        borderRadius: 4,
        background: '#ffffff',
        maxHeight: 96,
        overflowY: 'auto',
      }}
    >
      {TIME_SLOTS.map((slot) => {
        const selected = value.includes(slot)
        return (
          <button
            type="button"
            key={slot}
            data-demo={`preferredTimes-opt-${slot}`}
            onClick={() => toggle(slot)}
            style={{
              display: 'block',
              width: '100%',
              textAlign: 'left',
              padding: '10px 14px',
              background: selected ? '#cfe0f5' : '#ffffff',
              color: '#1a2332',
              fontFamily: 'var(--font-sans)',
              fontSize: 14,
              fontWeight: selected ? 600 : 500,
              border: 'none',
              cursor: 'pointer',
            }}
          >
            {slot}
          </button>
        )
      })}
    </div>
  )
}

function ConsentRow({ checked, onToggle }) {
  return (
    <label
      data-demo="consent"
      onClick={onToggle}
      style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer' }}
    >
      <span
        style={{
          width: 20,
          height: 20,
          flexShrink: 0,
          borderRadius: 3,
          border: `2px solid ${checked ? BRAND_BLUE : '#9aa3ae'}`,
          background: checked ? BRAND_BLUE : '#ffffff',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 2,
          transition: 'background 0.18s ease, border-color 0.18s ease',
        }}
      >
        {checked ? (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
            <path d="M2.5 6.3 L5 8.8 L9.5 3.8" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : null}
      </span>
      <span style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: '#1a2332', lineHeight: 1.45 }}>
        By submitting this form, you are permitting Northeast Health Services to contact you by phone, email, and text.{' '}
        <span style={{ color: '#d03a3a' }}>*</span>
      </span>
    </label>
  )
}
