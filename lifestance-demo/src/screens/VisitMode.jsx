import { useState } from 'react'
import { Header, Body, Title, StickyFooter, PrimaryButton, OptionCard } from '../ui.jsx'

const MODES = [
  {
    value: 'video',
    title: 'Video visit',
    description: 'Meet from anywhere on your phone or laptop.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="6" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.6"/>
        <path d="M16 10l6-3v10l-6-3" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    value: 'in-person',
    title: 'In-person visit',
    description: 'Visit a nearby LifeStance office.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M4 10l8-6 8 6v10a1 1 0 01-1 1h-4v-7h-6v7H5a1 1 0 01-1-1V10z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
      </svg>
    ),
  },
]

export function VisitMode({ step, totalSteps, onBack, onNext }) {
  const [selected, setSelected] = useState('video')
  return (
    <>
      <Header onBack={onBack} step={step} totalSteps={totalSteps} />
      <Body>
        <Title subtitle="Most New York providers offer both video and in-person visits.">
          How would you like to meet?
        </Title>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {MODES.map((m) => (
            <OptionCard
              key={m.value}
              icon={m.icon}
              title={m.title}
              description={m.description}
              selected={selected === m.value}
              onClick={() => setSelected(m.value)}
            />
          ))}
        </div>
      </Body>
      <StickyFooter>
        <PrimaryButton onClick={() => onNext(selected)}>View my matches</PrimaryButton>
      </StickyFooter>
    </>
  )
}
