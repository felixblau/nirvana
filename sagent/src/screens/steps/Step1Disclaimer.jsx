import { StepNav } from './StepNav.jsx'

export function Step1Disclaimer({ onNext }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', paddingTop: 40 }}>
      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 15,
          lineHeight: '24px',
          color: '#2c2c2c',
          textAlign: 'center',
          padding: '0 8px',
        }}
      >
        If you are currently in crisis or having suicidal thoughts, please contact
        the Suicide &amp; Crisis Lifeline by calling or texting{' '}
        <strong>988</strong>.
      </p>
      <StepNav onNext={onNext} />
    </div>
  )
}
