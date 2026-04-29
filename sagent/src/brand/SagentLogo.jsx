export function SagentLogo({ width = 100 }) {
  return (
    <img
      src={`${import.meta.env.BASE_URL}brand/sagent-logo.svg`}
      alt="Sagent Behavioral Health"
      width={width}
      style={{ display: 'block', height: 'auto' }}
    />
  )
}
