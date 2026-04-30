import { StepNav } from './StepNav.jsx'
import { FieldLabel, ChipSelect, Select, SectionHeading } from '../form.jsx'

export function Step4Options({ data, update, onNext, onPrev }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <SectionHeading>{data.state} Options</SectionHeading>

      <FieldLabel required>What service are you requesting?</FieldLabel>
      <ChipSelect value={data.service} onClear={() => update({ service: '' })} />

      <div style={{ height: 18 }} />

      <FieldLabel>Which location do you prefer?</FieldLabel>
      <ChipSelect value={data.location} onClear={() => update({ location: '' })} />

      <div style={{ height: 18 }} />

      <FieldLabel required>Mode of Service</FieldLabel>
      <Select
        value={data.mode}
        onChange={(v) => update({ mode: v })}
        options={['No Preference', 'In Person', 'Virtual']}
      />

      <div style={{ flex: 1 }} />
      <StepNav onPrev={onPrev} onNext={onNext} />
    </div>
  )
}
