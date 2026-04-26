import { useEffect, useRef, useState, createContext, useContext } from 'react'
import { Phone } from './ui.jsx'
import { Welcome } from './screens/Welcome.jsx'
import { StateScreen } from './screens/State.jsx'
import { PatientType } from './screens/PatientType.jsx'
import { BasicInfo } from './screens/BasicInfo.jsx'
import { Matches } from './screens/Matches.jsx'
import { TapRipple } from './TapRipple.jsx'

/*
 * Autoplay demo of the /lifestance flow.
 *
 * Orchestrator drives state, screens expose imperative actions via context,
 * and tap ripples render at absolute positions within the phone viewport.
 */

export const DemoCtx = createContext({ inDemo: false })
export const useDemo = () => useContext(DemoCtx)

const SCRIPT = [
  // delay = wait time BEFORE this step fires
  { kind: 'wait', delay: 1400 },
  { kind: 'scroll', phase: 'welcome', to: 0, delay: 0 },
  { kind: 'tap', target: '[data-demo="get-matched"]', delay: 1200 },
  { kind: 'go', to: 'state', delay: 400 },

  { kind: 'tap', target: '[data-demo="state-dropdown"]', delay: 1400 },
  { kind: 'setDropdownOpen', value: true, delay: 200 },
  { kind: 'scrollDropdown', targetCode: 'NY', delay: 1200 },
  { kind: 'tap', target: '[data-demo="state-option-NY"]', delay: 1300 },
  { kind: 'selectState', code: 'NY', delay: 300 },

  { kind: 'tap', target: '[data-demo="modal-book-online"]', delay: 2400 },
  { kind: 'go', to: 'patient-type', delay: 500 },

  { kind: 'tap', target: '[data-demo="patient-new"]', delay: 1600 },
  { kind: 'go', to: 'basic-info', delay: 500 },

  { kind: 'tap', target: '[data-demo="zip-input"]', delay: 1400 },
  { kind: 'typeZip', value: '10012', delay: 300 },

  { kind: 'tap', target: '[data-demo="dob-input"]', delay: 1400 },
  { kind: 'typeDob', value: '01/01/1990', delay: 300 },

  { kind: 'tap', target: '[data-demo="care-select"]', delay: 2400 },
  { kind: 'openCareSheet', delay: 200 },
  { kind: 'tap', target: '[data-demo="care-individual"]', delay: 1400 },
  { kind: 'selectCare', value: 'individual', delay: 300 },
  { kind: 'tap', target: '[data-demo="care-save"]', delay: 1200 },
  { kind: 'closeCareSheet', delay: 400 },

  { kind: 'tap', target: '[data-demo="payer-select"]', delay: 1400 },
  { kind: 'openPayerDropdown', delay: 200 },
  { kind: 'tap', target: '[data-demo="payer-Aetna"]', delay: 1200 },
  { kind: 'selectPayer', value: 'Aetna', delay: 300 },
  { kind: 'scrollTo', selector: '[data-demo="coverage-card"]', delay: 200 },

  // wait for Nirvana verification (2s) + read
  { kind: 'wait', delay: 2800 },

  { kind: 'scrollTo', selector: '[data-demo="meet-flexible"]', delay: 600 },
  { kind: 'tap', target: '[data-demo="meet-flexible"]', delay: 1400 },
  { kind: 'selectMeet', value: 'flexible', delay: 300 },

  { kind: 'scrollTo', selector: '[data-demo="view-matches"]', delay: 1400 },
  { kind: 'tap', target: '[data-demo="view-matches"]', delay: 1200 },
  { kind: 'go', to: 'matches', delay: 500 },

  // therapists skeleton (2s) then real content + 3s hold
  { kind: 'wait', delay: 5500 },
  { kind: 'phoneOut', delay: 0 },
  { kind: 'wait', delay: 2200 },
  { kind: 'restart', delay: 0 },
]

export default function App() {
  const [screen, setScreen] = useState('welcome')
  const [ripple, setRipple] = useState(null)
  const [phoneIn, setPhoneIn] = useState(false)
  const [cursor, setCursor] = useState(0)

  // controlled screen data (driven by demo)
  const [stateCode, setStateCode] = useState('')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  const [zip, setZip] = useState('')
  const [dob, setDob] = useState('')
  const [careType, setCareType] = useState(null)
  const [careSheetOpen, setCareSheetOpen] = useState(false)
  const [careSheetLocal, setCareSheetLocal] = useState(null)
  const [payer, setPayer] = useState(null)
  const [payerDropdownOpen, setPayerDropdownOpen] = useState(false)
  const [meetMode, setMeetMode] = useState(null)

  const phoneRef = useRef(null)
  const viewportRef = useRef(null)

  // phone enter animation — only for the very first mount
  useEffect(() => {
    requestAnimationFrame(() => setPhoneIn(true))
  }, [])

  // orchestration loop: runs one command per tick; cursor advances after delay
  useEffect(() => {
    const cmd = SCRIPT[cursor]
    if (!cmd) return

    let cancelled = false
    const doCmd = () => {
      if (cancelled) return
      const halt = runCommand(cmd)
      if (halt === 'halt') return
      setCursor((c) => c + 1)
    }
    const t = setTimeout(doCmd, cmd.delay || 0)
    return () => {
      cancelled = true
      clearTimeout(t)
    }
  }, [cursor])

  function runCommand(cmd) {
    switch (cmd.kind) {
      case 'wait':
        return
      case 'tap':
        fireTap(cmd.target)
        return
      case 'go':
        setScreen(cmd.to)
        // reset modal on screen changes
        if (cmd.to !== 'state') setModalOpen(false)
        return
      case 'scroll': {
        const v = viewportRef.current
        if (v) v.scrollTop = cmd.to
        return
      }
      case 'scrollTo': {
        const v = viewportRef.current
        const target = v && v.querySelector(cmd.selector)
        if (target && v) {
          const rect = target.getBoundingClientRect()
          const vrect = v.getBoundingClientRect()
          v.scrollBy({ top: rect.top - vrect.top - 120, behavior: 'smooth' })
        }
        return
      }
      case 'scrollDropdown': {
        const v = viewportRef.current
        const target = v && v.querySelector(`[data-demo="state-option-${cmd.targetCode}"]`)
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'center' })
        return
      }
      case 'setDropdownOpen':
        setDropdownOpen(cmd.value)
        return
      case 'selectState':
        setStateCode(cmd.code)
        setDropdownOpen(false)
        setModalOpen(true)
        return
      case 'typeZip':
        typewriter(cmd.value, setZip)
        return
      case 'typeDob':
        typewriter(cmd.value, setDob)
        return
      case 'openCareSheet':
        setCareSheetOpen(true)
        setCareSheetLocal(null)
        return
      case 'closeCareSheet':
        setCareSheetOpen(false)
        if (careSheetLocal) setCareType(careSheetLocal)
        return
      case 'selectCare':
        setCareSheetLocal(cmd.value)
        return
      case 'openPayerDropdown':
        setPayerDropdownOpen(true)
        return
      case 'selectPayer':
        setPayer(cmd.value)
        setPayerDropdownOpen(false)
        return
      case 'selectMeet':
        setMeetMode(cmd.value)
        return
      case 'phoneOut':
        setPhoneIn(false)
        return
      case 'restart':
        // reset everything, then animate phone back in and restart script
        setScreen('welcome')
        setStateCode('')
        setDropdownOpen(false)
        setModalOpen(false)
        setZip('')
        setDob('')
        setCareType(null)
        setCareSheetOpen(false)
        setCareSheetLocal(null)
        setPayer(null)
        setPayerDropdownOpen(false)
        setMeetMode(null)
        // scroll viewport to top before animating in
        if (viewportRef.current) viewportRef.current.scrollTop = 0
        setTimeout(() => {
          setPhoneIn(true)
          setCursor(0)
        }, 200)
        // break advance chain — next setCursor will be called manually above
        return 'halt'
      default:
        return
    }
  }

  function fireTap(selector) {
    const v = viewportRef.current
    const target = v && v.querySelector(selector)
    const p = phoneRef.current
    if (!target || !p) return
    const tr = target.getBoundingClientRect()
    const pr = p.getBoundingClientRect()
    setRipple({
      x: tr.left - pr.left + tr.width / 2,
      y: tr.top - pr.top + tr.height / 2,
      key: Date.now() + Math.random(),
    })
  }

  function typewriter(value, setter) {
    let i = 0
    setter('')
    const tick = () => {
      i += 1
      setter(value.slice(0, i))
      if (i < value.length) setTimeout(tick, 80)
    }
    tick()
  }

  return (
    <DemoCtx.Provider
      value={{
        inDemo: true,
        stateCode,
        setStateCode,
        dropdownOpen,
        setDropdownOpen,
        modalOpen,
        setModalOpen,
        zip,
        setZip,
        dob,
        setDob,
        careType,
        setCareType,
        careSheetOpen,
        setCareSheetOpen,
        careSheetLocal,
        setCareSheetLocal,
        payer,
        setPayer,
        payerDropdownOpen,
        setPayerDropdownOpen,
        meetMode,
        setMeetMode,
      }}
    >
      <Phone
        phoneRef={phoneRef}
        viewportRef={viewportRef}
        animateIn={phoneIn}
      >
        {screen === 'welcome' && <Welcome onNext={() => {}} />}
        {screen === 'state' && (
          <StateScreen onBack={() => {}} onNext={() => {}} initial={stateCode} />
        )}
        {screen === 'patient-type' && (
          <PatientType onNext={() => {}} onBack={() => {}} />
        )}
        {screen === 'basic-info' && (
          <BasicInfo onBack={() => {}} onNext={() => {}} />
        )}
        {screen === 'matches' && <Matches onBack={() => {}} />}
        {ripple && (
          <TapRipple
            key={ripple.key}
            x={ripple.x}
            y={ripple.y}
            onDone={() => setRipple(null)}
          />
        )}
      </Phone>
    </DemoCtx.Provider>
  )
}
