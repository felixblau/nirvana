import { StepNav } from './StepNav.jsx'
import { FieldLabel, RadioList } from '../form.jsx'

export function Step2PatientType({ value, onChange, onNext, onPrev }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <FieldLabel required>New or Existing Patient?</FieldLabel>
      <div style={{ marginTop: 6 }}>
        <RadioList
          name="patient-type"
          options={['New Patient', 'Existing Patient']}
          value={value}
          onChange={onChange}
        />
      </div>
      <div style={{ flex: 1 }} />
      <StepNav onPrev={onPrev} onNext={onNext} nextDisabled={!value} />
    </div>
  )
}
