export function SagentLogo({ width = 160 }) {
  return (
    <img
      src={`${import.meta.env.BASE_URL}brand/sagent-logo.png`}
      alt="Sagent Behavioral Health"
      width={width}
      style={{ display: 'block', height: 'auto' }}
    />
  )
}
