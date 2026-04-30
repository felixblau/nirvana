import { StepNav } from './StepNav.jsx'
import { FieldLabel, Select, SectionHeading } from '../form.jsx'

const SERVICES_BY_STATE = {
  Iowa: [
    'Therapy for Individuals',
    'Therapy for Couples',
    'Therapy for Families',
    'Psychiatry / Medication Management',
  ],
  Minnesota: [
    'Therapy for Individuals',
    'Therapy for Families',
    'Psychiatry / Medication Management',
  ],
  Missouri: ['Therapy for Individuals', 'Psychiatry / Medication Management'],
  'North Dakota': ['Therapy for Individuals'],
  Wisconsin: ['Therapy for Individuals', 'Therapy for Couples'],
}

const LOCATIONS_BY_STATE = {
  Iowa: [
    'Des Moines Clinic - 600 42nd Street',
    'Cedar Rapids Clinic - 1200 Blairs Ferry',
    'Iowa City Clinic - 2400 Towncrest Dr',
  ],
  Minnesota: ['Minneapolis Clinic - 510 Nicollet Mall'],
  Missouri: ['St. Louis Clinic - 1010 Market Street'],
  'North Dakota': ['Fargo Clinic - 3005 32nd Ave'],
  Wisconsin: ['Milwaukee Clinic - 550 Wisconsin Ave'],
}

export function Step4Options({ data, update, onNext, onPrev }) {
  const services = SERVICES_BY_STATE[data.state] ?? []
  const locations = LOCATIONS_BY_STATE[data.state] ?? []
  const disabled = !data.service || !data.mode

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <SectionHeading>{data.state || ''} Options</SectionHeading>

      <FieldLabel required>What service are you requesting?</FieldLabel>
      <Select
        value={data.service}
        onChange={(v) => update({ service: v })}
        options={services}
        placeholder="Select a service"
        demoKey="service"
      />

      <div style={{ height: 18 }} />

      <FieldLabel>Which location do you prefer?</FieldLabel>
      <Select
        value={data.location}
        onChange={(v) => update({ location: v })}
        options={locations}
        placeholder="Select a location"
        demoKey="location"
      />

      <div style={{ height: 18 }} />

      <FieldLabel required>Mode of Service</FieldLabel>
      <Select
        value={data.mode}
        onChange={(v) => update({ mode: v })}
        options={['No Preference', 'In Person', 'Virtual']}
        placeholder="Select a mode"
        demoKey="mode"
      />

      <div style={{ flex: 1 }} />
      <StepNav onPrev={onPrev} onNext={onNext} nextDisabled={disabled} />
    </div>
  )
}
