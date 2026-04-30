import { StepNav } from './StepNav.jsx'
import { FieldLabel, FieldHint, TextInput, Dropdown } from '../form.jsx'

const ABOUT_ME_OPTIONS = ['New Client', 'Caregiver/Loved One', 'Referring Organization']

export function Step1Basics({ data, update, onNext, dropdownOpen, onDropdownToggle }) {
  const requiredFilled =
    !!data.aboutMe && !!data.firstName && !!data.lastName && !!data.email
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: 22 }}>
      <Field>
        <FieldLabel required>About Me</FieldLabel>
        <Dropdown
          value={data.aboutMe}
          onChange={(v) => update({ aboutMe: v })}
          options={ABOUT_ME_OPTIONS}
          placeholder="Please Select"
          demoKey="aboutMe"
          open={dropdownOpen === 'aboutMe'}
          onOpenChange={(v) => onDropdownToggle?.('aboutMe', v)}
        />
      </Field>

      <Field>
        <FieldLabel required>Client/Patient's Name</FieldLabel>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div>
            <TextInput
              value={data.firstName}
              onChange={(v) => update({ firstName: v })}
              demoKey="firstName"
            />
            <FieldHint>First Name</FieldHint>
          </div>
          <div>
            <TextInput
              value={data.lastName}
              onChange={(v) => update({ lastName: v })}
              demoKey="lastName"
            />
            <FieldHint>Last Name</FieldHint>
          </div>
        </div>
      </Field>

      <Field>
        <FieldLabel required>Client/Patient Email</FieldLabel>
        <TextInput
          value={data.email}
          onChange={(v) => update({ email: v })}
          type="email"
          demoKey="email"
        />
        <FieldHint>example@example.com</FieldHint>
      </Field>

      <div style={{ flex: 1 }} />
      <StepNav onNext={onNext} nextDisabled={!requiredFilled} />
    </div>
  )
}

function Field({ children }) {
  return <div>{children}</div>
}
