import { useState } from 'react'
import { Header, Body, Title, StickyFooter, PrimaryButton, OptionCard } from '../ui.jsx'

export function PatientStatus({ step, totalSteps, onBack, onNext }) {
  const [selected, setSelected] = useState('new')
  return (
    <>
      <Header onBack={onBack} step={step} totalSteps={totalSteps} />
      <Body>
        <Title subtitle="This helps us get you to the right place faster.">
          Are you new to LifeStance?
        </Title>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <OptionCard
            title="I'm a new patient"
            description="I haven't seen a LifeStance provider before."
            selected={selected === 'new'}
            onClick={() => setSelected('new')}
          />
          <OptionCard
            title="I'm a returning patient"
            description="I'd like to book with my existing provider."
            selected={selected === 'returning'}
            onClick={() => setSelected('returning')}
          />
        </div>
      </Body>
      <StickyFooter>
        <PrimaryButton onClick={() => onNext(selected)}>Continue</PrimaryButton>
      </StickyFooter>
    </>
  )
}
