import { useState } from 'react'
import { Header, Body, Title, StickyFooter, PrimaryButton, OptionCard } from '../ui.jsx'

const MODES = [
  {
    value: 'online',
    title: 'Book appointment online',
    description: 'Take a 2-minute questionnaire and get matched today.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="3.5" y="5" width="17" height="14" rx="2" stroke="currentColor" strokeWidth="1.6"/>
        <path d="M3.5 9H20.5" stroke="currentColor" strokeWidth="1.6"/>
        <path d="M8 3.5V6.5M16 3.5V6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        <circle cx="12" cy="14" r="1.5" fill="currentColor"/>
      </svg>
    ),
  },
  {
    value: 'call',
    title: 'Call to book',
    description: 'Speak with a care coordinator: (888) 908-0143.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M5 4.5h3l1.5 4-2 1.5a11 11 0 006.5 6.5l1.5-2 4 1.5v3a2 2 0 01-2.2 2A17 17 0 013 6.7 2 2 0 015 4.5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    value: 'text',
    title: 'Text with a coordinator',
    description: 'We\'ll text you back within minutes.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M4 6a2 2 0 012-2h12a2 2 0 012 2v9a2 2 0 01-2 2h-6l-4 3v-3H6a2 2 0 01-2-2V6z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
      </svg>
    ),
  },
]

export function BookingMode({ step, totalSteps, onBack, onNext }) {
  const [selected, setSelected] = useState('online')
  return (
    <>
      <Header onBack={onBack} step={step} totalSteps={totalSteps} />
      <Body>
        <Title subtitle="Choose how you'd like to get started.">
          How would you like to book?
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
        <PrimaryButton onClick={() => onNext(selected)}>Continue</PrimaryButton>
      </StickyFooter>
    </>
  )
}
