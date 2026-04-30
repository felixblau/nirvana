import { StepNav } from './StepNav.jsx'
import { FieldLabel, RadioList } from '../form.jsx'

export function Step3State({ value, onChange, onNext, onPrev }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <FieldLabel required>Please select a state</FieldLabel>
      <div style={{ marginTop: 6 }}>
        <RadioList
          name="state"
          options={['Iowa', 'Minnesota', 'Missouri', 'North Dakota', 'Wisconsin']}
          value={value}
          onChange={onChange}
        />
      </div>
      <div style={{ flex: 1 }} />
      <StepNav onPrev={onPrev} onNext={onNext} nextDisabled={!value} />
    </div>
  )
}
