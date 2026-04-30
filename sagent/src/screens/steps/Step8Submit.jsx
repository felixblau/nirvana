import { StepNav } from './StepNav.jsx'

export function Step8Submit({ onPrev, onSubmit }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', paddingTop: 40 }}>
      <h2
        style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 500,
          fontSize: 20,
          lineHeight: '28px',
          textAlign: 'center',
          color: '#222',
          marginBottom: 28,
        }}
      >
        Do you want to submit this form?
      </h2>
      <StepNav onPrev={onPrev} submit onSubmit={onSubmit} />
    </div>
  )
}
