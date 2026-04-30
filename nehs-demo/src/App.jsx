import { useEffect, useRef, useState } from 'react'
import { Phone } from './Phone.jsx'
import { BookingFlow } from './screens/BookingFlow.jsx'
import { TapRipple } from './TapRipple.jsx'

/*
 * Autoplay demo of /nehs.
 *
 * Script commands:
 * - `tap` — ripple on a [data-demo="..."] target
 * - `openDropdown` / `closeDropdown` — programmatically open/close a
 *   controlled Dropdown (so the menu stays visible for ripple taps)
 * - `setField` / `call` — drive booking ref (update / next / prev / submit)
 * - `type` — typewrite into a field via booking.update
 * - `scrollTo` — smooth-scroll viewport so a target is visible
 * - `wait` — idle delay (before the next command)
 * - `phoneIn` / `phoneOut` — animate phone in / out
 * - `restart` — reset booking, scroll to top, phone back in, loop
 */

const SCRIPT = [
  { kind: 'wait', delay: 1400 },

  // STEP 1 — About Me dropdown
  { kind: 'scrollTo', target: 'aboutMe', delay: 700 },
  { kind: 'tap', target: 'aboutMe', delay: 900 },
  { kind: 'openDropdown', target: 'aboutMe', delay: 420 },
  { kind: 'wait', delay: 700 },
  { kind: 'tap', target: 'aboutMe-opt-New Client', delay: 900 },
  { kind: 'setField', patch: { aboutMe: 'New Client' }, delay: 260 },
  { kind: 'closeDropdown', delay: 220 },

  // First name
  { kind: 'scrollTo', target: 'firstName', delay: 700 },
  { kind: 'tap', target: 'firstName', delay: 700 },
  { kind: 'type', key: 'firstName', value: 'Michael', delay: 260 },

  // Last name
  { kind: 'scrollTo', target: 'lastName', delay: 700 },
  { kind: 'tap', target: 'lastName', delay: 700 },
  { kind: 'type', key: 'lastName', value: 'Scott', delay: 260 },

  // Email
  { kind: 'scrollTo', target: 'email', delay: 700 },
  { kind: 'tap', target: 'email', delay: 700 },
  { kind: 'type', key: 'email', value: 'mscott@dundermifflin.com', delay: 260 },

  // Advance to step 2
  { kind: 'scrollTo', target: 'next-btn', delay: 800 },
  { kind: 'tap', target: 'next-btn', delay: 900 },
  { kind: 'call', fn: 'next', delay: 420 },

  // STEP 2 — DOB
  { kind: 'scrollTo', target: 'dob', delay: 800 },
  { kind: 'tap', target: 'dob', delay: 700 },
  { kind: 'type', key: 'dob', value: '01-01-1990', delay: 260 },

  // Phone
  { kind: 'scrollTo', target: 'phone', delay: 700 },
  { kind: 'tap', target: 'phone', delay: 700 },
  { kind: 'type', key: 'phone', value: '(123) 456-7890', delay: 260 },

  // Appointment Type
  { kind: 'scrollTo', target: 'appointmentType', delay: 800 },
  { kind: 'tap', target: 'appointmentType', delay: 800 },
  { kind: 'openDropdown', target: 'appointmentType', delay: 420 },
  { kind: 'wait', delay: 700 },
  { kind: 'tap', target: 'appointmentType-opt-Either', delay: 900 },
  { kind: 'setField', patch: { appointmentType: 'Either' }, delay: 260 },
  { kind: 'closeDropdown', delay: 220 },

  // Nearest Clinic
  { kind: 'scrollTo', target: 'nearestClinic', delay: 800 },
  { kind: 'tap', target: 'nearestClinic', delay: 800 },
  { kind: 'openDropdown', target: 'nearestClinic', delay: 420 },
  { kind: 'wait', delay: 900 },
  { kind: 'tap', target: 'nearestClinic-opt-Attleboro', delay: 900 },
  { kind: 'setField', patch: { nearestClinic: 'Attleboro' }, delay: 260 },
  { kind: 'closeDropdown', delay: 220 },

  // How did you hear
  { kind: 'scrollTo', target: 'hearAbout', delay: 800 },
  { kind: 'tap', target: 'hearAbout', delay: 800 },
  { kind: 'openDropdown', target: 'hearAbout', delay: 420 },
  { kind: 'wait', delay: 900 },
  { kind: 'tap', target: 'hearAbout-opt-Google / Internet Search', delay: 900 },
  { kind: 'setField', patch: { hearAbout: 'Google / Internet Search' }, delay: 260 },
  { kind: 'closeDropdown', delay: 220 },

  // Insurance — Aetna triggers Nirvana check + verified card
  { kind: 'scrollTo', target: 'insurance', delay: 800 },
  { kind: 'tap', target: 'insurance', delay: 800 },
  { kind: 'openDropdown', target: 'insurance', delay: 420 },
  { kind: 'wait', delay: 800 },
  { kind: 'tap', target: 'insurance-opt-Aetna', delay: 900 },
  { kind: 'setField', patch: { insurance: 'Aetna' }, delay: 260 },
  { kind: 'closeDropdown', delay: 220 },

  // Watch the Nirvana checking → verified card
  { kind: 'scrollTo', target: 'nirvana-checking', delay: 800 },
  { kind: 'wait', delay: 3400 },
  { kind: 'scrollTo', target: 'nirvana-verified', delay: 400 },
  { kind: 'wait', delay: 3200 },

  // Advance to Step 3
  { kind: 'scrollTo', target: 'next-btn', delay: 700 },
  { kind: 'tap', target: 'next-btn', delay: 900 },
  { kind: 'call', fn: 'next', delay: 420 },

  // STEP 3 — pick "No" on alt treatments, then check consent, then submit
  { kind: 'wait', delay: 900 },
  { kind: 'scrollTo', target: 'altTreatmentInterest-No', delay: 700 },
  { kind: 'tap', target: 'altTreatmentInterest-No', delay: 900 },
  { kind: 'setField', patch: { altTreatmentInterest: 'No' }, delay: 260 },

  { kind: 'scrollTo', target: 'consent', delay: 900 },
  { kind: 'tap', target: 'consent', delay: 900 },
  { kind: 'setField', patch: { consent: true }, delay: 260 },

  { kind: 'scrollTo', target: 'next-btn', delay: 800 },
  { kind: 'tap', target: 'next-btn', delay: 900 },
  { kind: 'call', fn: 'submit', delay: 420 },

  // Submitting spinner is 2s, hold success confirmation 3.5s, then loop
  { kind: 'wait', delay: 5500 },
  { kind: 'phoneOut', delay: 0 },
  { kind: 'wait', delay: 1600 },
  { kind: 'restart', delay: 0 },
]

export default function App() {
  const phoneRef = useRef(null)
  const viewportRef = useRef(null)
  const bookingRef = useRef(null)
  const typingTimersRef = useRef(new Set())

  const [phoneIn, setPhoneIn] = useState(false)
  const [cursor, setCursor] = useState(0)
  const [ripple, setRipple] = useState(null)

  useEffect(() => {
    requestAnimationFrame(() => setPhoneIn(true))
  }, [])

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
        typingTimersRef,
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
      return 'halt'
    case 'openDropdown':
      ctx.bookingRef.current?.openDropdown(cmd.target)
      return
    case 'closeDropdown':
      ctx.bookingRef.current?.closeDropdown()
      return
    case 'scrollTo': {
      const v = ctx.viewportRef.current
      const target = v && v.querySelector(`[data-demo="${cssEscape(cmd.target)}"]`)
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
      ctx.typingTimersRef.current.forEach(clearTimeout)
      ctx.typingTimersRef.current.clear()
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
  return String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"')
}

function typewriter(key, value, ctx) {
  let i = 0
  ctx.bookingRef.current?.update({ [key]: '' })
  const tick = () => {
    i += 1
    ctx.bookingRef.current?.update({ [key]: value.slice(0, i) })
    if (i < value.length) {
      const t = setTimeout(() => {
        ctx.typingTimersRef.current.delete(t)
        tick()
      }, 45)
      ctx.typingTimersRef.current.add(t)
    } else {
      const t = setTimeout(() => {
        ctx.typingTimersRef.current.delete(t)
        ctx.setCursor((c) => c + 1)
      }, 120)
      ctx.typingTimersRef.current.add(t)
    }
  }
  tick()
}
