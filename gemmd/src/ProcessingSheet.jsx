import { CheckIcon, InsuranceIcon, DollarIcon, CalendarIcon, GemMDLogo, GeminiSparkle } from './Icons'

const STEPS = [
  { label: 'Matching providers to your insurance', icon: InsuranceIcon },
  { label: 'Calculating your cost', icon: DollarIcon },
  { label: 'Checking availability across providers', icon: CalendarIcon },
]

export default function ProcessingSheet({ activeStep }) {
  return (
    <div className="sheet-overlay">
      <div className="sheet">
        <div className="sheet-handle" />
        {STEPS.map((step, i) => {
          let state = 'pending'
          if (i < activeStep) state = 'done'
          else if (i === activeStep) state = 'active'

          return (
            <div key={i} className={`step-row ${state}`}>
              <div className={`step-icon ${state}`}>
                {state === 'done' && <CheckIcon size={14} />}
                {state === 'active' && <GeminiSparkle />}
                {state === 'pending' && <step.icon />}
              </div>
              <span>{step.label}</span>
            </div>
          )
        })}
        <div className="sheet-footer">
          Powered by <GemMDLogo />
        </div>
      </div>
    </div>
  )
}
