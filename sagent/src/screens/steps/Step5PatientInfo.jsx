import { StepNav } from './StepNav.jsx'
import { FieldLabel, TextInput, Select, SectionHeading } from '../form.jsx'

export function Step5PatientInfo({ data, update, onNext, onPrev }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <SectionHeading>Patient Information</SectionHeading>

      <Field label="Patient's First Name:" required>
        <TextInput value={data.firstName} onChange={(v) => update({ firstName: v })} />
      </Field>

      <Field label="Patient's Middle Initial:">
        <TextInput value={data.middleInitial} onChange={(v) => update({ middleInitial: v })} />
      </Field>

      <Field label="Patient's Last Name:" required>
        <TextInput value={data.lastName} onChange={(v) => update({ lastName: v })} />
      </Field>

      <Field label="Patient's Date of Birth:" required>
        <div style={{ position: 'relative', width: 180 }}>
          <TextInput
            value={data.dob}
            onChange={(v) => update({ dob: v })}
            placeholder="MM/DD/YYYY"
          />
          <span
            aria-hidden
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              bottom: 0,
              width: 34,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderLeft: '1px solid #cfcfcf',
              background: '#ffffff',
              pointerEvents: 'none',
            }}
          >
            <CalendarGlyph />
          </span>
        </div>
      </Field>

      <Field label="Sex" required>
        <Select
          value={data.sex}
          onChange={(v) => update({ sex: v })}
          options={['Male', 'Female']}
        />
      </Field>

      <Field label="Gender">
        <TextInput value={data.gender} onChange={(v) => update({ gender: v })} />
      </Field>

      <Field label="Phone Number:" required>
        <TextInput value={data.phone} onChange={(v) => update({ phone: v })} />
      </Field>

      <Field label="Email Address:" required>
        <TextInput value={data.email} onChange={(v) => update({ email: v })} type="email" />
      </Field>

      <Field label="Legal Guardian Name (if applicable):">
        <TextInput value={data.guardian} onChange={(v) => update({ guardian: v })} />
      </Field>

      <Field label="Street Address:" required>
        <TextInput value={data.streetAddress} onChange={(v) => update({ streetAddress: v })} />
      </Field>

      <Field label="Apt #:">
        <TextInput value={data.apt} onChange={(v) => update({ apt: v })} />
      </Field>

      <Field label="City:" required>
        <TextInput value={data.city} onChange={(v) => update({ city: v })} />
      </Field>

      <Field label="State:" required>
        <Select
          value={data.addrState}
          onChange={(v) => update({ addrState: v })}
          options={['NY', 'IA', 'MN', 'MO', 'ND', 'WI']}
        />
      </Field>

      <Field label="Zip Code:" required>
        <TextInput value={data.zip} onChange={(v) => update({ zip: v })} />
      </Field>

      <Field label="Insurance Carrier">
        <Select
          value={data.insurance}
          onChange={(v) => update({ insurance: v })}
          options={['Aetna', 'Cigna', 'United Healthcare', 'Anthem', 'Other']}
        />
      </Field>

      <StepNav onPrev={onPrev} onNext={onNext} />
    </div>
  )
}

function Field({ label, required, children }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <FieldLabel required={required}>{label}</FieldLabel>
      {children}
    </div>
  )
}

function CalendarGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <rect x="1.5" y="2.5" width="11" height="10" rx="1" stroke="#555" strokeWidth="1" />
      <path d="M1.5 5 H12.5" stroke="#555" strokeWidth="1" />
      <rect x="3" y="1" width="1.4" height="2.2" rx="0.2" fill="#555" />
      <rect x="9.6" y="1" width="1.4" height="2.2" rx="0.2" fill="#555" />
    </svg>
  )
}
