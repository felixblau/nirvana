import { useEffect, useRef, useState } from 'react'
import { Phone } from './Phone.jsx'
import { BookingFlow } from './screens/BookingFlow.jsx'
import { TapRipple } from './TapRipple.jsx'

/*
 * Autoplay demo of /sagent.
 *
 * Script commands:
 * - `tap` — ripple on a [data-demo="..."] target
 * - `setField` / `call` — drive booking ref (update / next / prev / submit)
 * - `type` — typewrite into a field via booking.update
 * - `scrollTo` — smooth-scroll viewport so a target is visible
 * - `wait` — idle delay (before the next command)
 * - `phoneIn` / `phoneOut` — animate phone in / out
 * - `restart` — reset booking, scroll to top, phone back in, loop
 */

const SCRIPT = [
  { kind: 'wait', delay: 1400 },

  // STEP 1 — disclaimer
  { kind: 'tap', target: 'next-btn', delay: 1600 },
  { kind: 'call', fn: 'next', delay: 420 },

  // STEP 2 — New Patient
  { kind: 'tap', target: 'patient-type-New Patient', delay: 1300 },
  { kind: 'setField', patch: { patientType: 'New Patient' }, delay: 260 },
  { kind: 'tap', target: 'next-btn', delay: 1100 },
  { kind: 'call', fn: 'next', delay: 420 },

  // STEP 3 — Iowa
  { kind: 'tap', target: 'state-Iowa', delay: 1300 },
  { kind: 'setField', patch: { state: 'Iowa' }, delay: 260 },
  { kind: 'tap', target: 'next-btn', delay: 1100 },
  { kind: 'call', fn: 'next', delay: 420 },

  // STEP 4 — Options
  { kind: 'tap', target: 'service', delay: 1200 },
  { kind: 'setField', patch: { service: 'Therapy for Individuals' }, delay: 360 },
  { kind: 'tap', target: 'location', delay: 1100 },
  { kind: 'setField', patch: { location: 'Des Moines Clinic - 600 42nd Street' }, delay: 360 },
  { kind: 'tap', target: 'mode', delay: 1100 },
  { kind: 'setField', patch: { mode: 'No Preference' }, delay: 360 },
  { kind: 'tap', target: 'next-btn', delay: 1100 },
  { kind: 'call', fn: 'next', delay: 420 },

  // STEP 5 — Patient Info (scroll + tap + type, field by field)
  { kind: 'scrollTo', target: 'dob', delay: 800 },
  { kind: 'tap', target: 'dob', delay: 800 },
  { kind: 'type', key: 'dob', value: '01/01/1990', delay: 260 },

  { kind: 'scrollTo', target: 'sex', delay: 900 },
  { kind: 'tap', target: 'sex', delay: 700 },
  { kind: 'setField', patch: { sex: 'Male' }, delay: 360 },

  { kind: 'scrollTo', target: 'phone', delay: 900 },
  { kind: 'tap', target: 'phone', delay: 700 },
  { kind: 'type', key: 'phone', value: '(123)456-7890', delay: 260 },

  { kind: 'scrollTo', target: 'email', delay: 900 },
  { kind: 'tap', target: 'email', delay: 700 },
  { kind: 'type', key: 'email', value: 'mscott@dundermifflin.com', delay: 260 },

  { kind: 'scrollTo', target: 'streetAddress', delay: 900 },
  { kind: 'tap', target: 'streetAddress', delay: 700 },
  { kind: 'type', key: 'streetAddress', value: '123 Main Street', delay: 260 },

  { kind: 'scrollTo', target: 'city', delay: 900 },
  { kind: 'tap', target: 'city', delay: 700 },
  { kind: 'type', key: 'city', value: 'Des Moines', delay: 260 },

  { kind: 'scrollTo', target: 'addrState', delay: 900 },
  { kind: 'tap', target: 'addrState', delay: 700 },
  { kind: 'setField', patch: { addrState: 'IA' }, delay: 360 },

  { kind: 'scrollTo', target: 'zip', delay: 900 },
  { kind: 'tap', target: 'zip', delay: 700 },
  { kind: 'type', key: 'zip', value: '50913', delay: 260 },

  { kind: 'scrollTo', target: 'next-btn', delay: 900 },
  { kind: 'tap', target: 'next-btn', delay: 900 },
  { kind: 'call', fn: 'next', delay: 420 },

  // STEP 6 — Additional
  { kind: 'tap', target: 'reason', delay: 900 },
  {
    kind: 'type',
    key: 'reason',
    value:
      "Get help addressing challenges and improve wellbeing with a therapist's guidance.",
    delay: 220,
  },
  { kind: 'tap', target: 'consent-Yes', delay: 1000 },
  { kind: 'setField', patch: { consent: 'Yes' }, delay: 260 },
  { kind: 'tap', target: 'next-btn', delay: 1100 },
  { kind: 'call', fn: 'next', delay: 420 },

  // STEP 7 — Insurance + Nirvana verification
  { kind: 'tap', target: 'insurance', delay: 1200 },
  { kind: 'setField', patch: { insurance: 'Aetna' }, delay: 360 },
  // wait for the 3s Nirvana loader + a beat to read the card
  { kind: 'wait', delay: 4200 },
  { kind: 'tap', target: 'next-btn', delay: 900 },
  { kind: 'call', fn: 'next', delay: 420 },

  // STEP 8 — Submit
  { kind: 'tap', target: 'submit-btn', delay: 1200 },
  { kind: 'call', fn: 'submit', delay: 420 },

  { kind: 'wait', delay: 3200 },
  { kind: 'phoneOut', delay: 0 },
  { kind: 'wait', delay: 1600 },
  { kind: 'restart', delay: 0 },
]

export default function App() {
  const phoneRef = useRef(null)
  const viewportRef = useRef(null)
  const bookingRef = useRef(null)

  const [phoneIn, setPhoneIn] = useState(false)
  const [cursor, setCursor] = useState(0)
  const [ripple, setRipple] = useState(null)

  // phone enter animation on first mount
  useEffect(() => {
    requestAnimationFrame(() => setPhoneIn(true))
  }, [])

  // orchestration loop
  useEffect(() => {
    const cmd = SCRIPT[cursor]
    if (!cmd) return

    let cancelled = false
    const timers = []

    const runCmd = () => {
      if (cancelled) return
      const halt = runCommand(cmd, {
        bookingRef,
        phoneRef,
        viewportRef,
        setRipple,
        setPhoneIn,
        setCursor,
        timers,
      })
      if (halt === 'halt') return
      if (cancelled) return
      setCursor((c) => c + 1)
    }

    const t = setTimeout(runCmd, cmd.delay || 0)
    timers.push(t)

    return () => {
      cancelled = true
      timers.forEach(clearTimeout)
    }
  }, [cursor])

  return (
    <Phone phoneRef={phoneRef} viewportRef={viewportRef} animateIn={phoneIn}>
      <BookingFlow ref={bookingRef} />
      {ripple && (
        <TapRipple
          key={ripple.key}
          x={ripple.x}
          y={ripple.y}
          onDone={() => setRipple(null)}
        />
      )}
    </Phone>
  )
}

function runCommand(cmd, ctx) {
  switch (cmd.kind) {
    case 'wait':
      return
    case 'tap':
      fireTap(cmd.target, ctx)
      return
    case 'call':
      if (cmd.fn === 'next') ctx.bookingRef.current?.next()
      if (cmd.fn === 'prev') ctx.bookingRef.current?.prev()
      if (cmd.fn === 'submit') ctx.bookingRef.current?.submit()
      return
    case 'setField':
      ctx.bookingRef.current?.update(cmd.patch)
      return
    case 'type':
      typewriter(cmd.key, cmd.value, ctx)
      return
    case 'scrollTo': {
      const v = ctx.viewportRef.current
      const target = v && v.querySelector(`[data-demo="${cmd.target}"]`)
      if (v && target) {
        const tr = target.getBoundingClientRect()
        const vr = v.getBoundingClientRect()
        v.scrollBy({ top: tr.top - vr.top - 200, behavior: 'smooth' })
      }
      return
    }
    case 'phoneOut':
      ctx.setPhoneIn(false)
      return
    case 'phoneIn':
      ctx.setPhoneIn(true)
      return
    case 'restart': {
      ctx.bookingRef.current?.reset()
      const v = ctx.viewportRef.current
      if (v) v.scrollTop = 0
      const t = setTimeout(() => {
        ctx.setPhoneIn(true)
        ctx.setCursor(0)
      }, 220)
      ctx.timers.push(t)
      return 'halt'
    }
    default:
      return
  }
}

function fireTap(targetKey, ctx) {
  // escape selector for keys that contain spaces/punctuation
  const selector = `[data-demo="${cssEscape(targetKey)}"]`
  const v = ctx.viewportRef.current
  const target = v && v.querySelector(selector)
  const p = ctx.phoneRef.current
  if (!target || !p) return
  const tr = target.getBoundingClientRect()
  const pr = p.getBoundingClientRect()
  ctx.setRipple({
    x: tr.left - pr.left + tr.width / 2,
    y: tr.top - pr.top + tr.height / 2,
    key: Date.now() + Math.random(),
  })
}

function cssEscape(s) {
  // attribute value is already inside quotes; just escape embedded double quotes and backslashes
  return String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"')
}

function typewriter(key, value, ctx) {
  let i = 0
  ctx.bookingRef.current?.update({ [key]: '' })
  const tick = () => {
    i += 1
    ctx.bookingRef.current?.update({ [key]: value.slice(0, i) })
    if (i < value.length) {
      const t = setTimeout(tick, 45)
      ctx.timers.push(t)
    }
  }
  tick()
}
