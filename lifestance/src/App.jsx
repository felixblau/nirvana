import { useState } from 'react'
import { Phone } from './ui.jsx'
import { Welcome } from './screens/Welcome.jsx'
import { StateScreen } from './screens/State.jsx'
import { PatientType } from './screens/PatientType.jsx'
import { BasicInfo } from './screens/BasicInfo.jsx'
import { Matches } from './screens/Matches.jsx'

const STEPS = [
  'welcome',
  'state',
  'patient-type',
  'basic-info',
  'matches',
]

export default function App() {
  const [stepIdx, setStepIdx] = useState(0)
  const [data, setData] = useState({})

  const screen = STEPS[stepIdx]
  const next = (key, value) => {
    if (key) setData((d) => ({ ...d, [key]: value }))
    setStepIdx((i) => Math.min(i + 1, STEPS.length - 1))
  }
  const back = () => setStepIdx((i) => Math.max(i - 1, 0))

  return (
    <Phone>
      {screen === 'welcome' && <Welcome onNext={() => next()} />}
      {screen === 'state' && (
        <StateScreen
          onBack={back}
          onNext={(v) => next('state', v)}
          initial={data.state}
        />
      )}
      {screen === 'patient-type' && (
        <PatientType onNext={(v) => next('patientType', v)} onBack={back} />
      )}
      {screen === 'basic-info' && (
        <BasicInfo onBack={back} onNext={(v) => next('basicInfo', v)} />
      )}
      {screen === 'matches' && <Matches onBack={back} />}
    </Phone>
  )
}
