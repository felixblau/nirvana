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
  { kind: 'wait', delay: 1000 },

  // STEP 1 — disclaimer
  { kind: 'tap', target: 'next-btn', delay: 1200 },
  { kind: 'call', fn: 'next', delay: 360 },

  // STEP 2 — New Patient (prefilled)
  { kind: 'tap', target: 'next-btn', delay: 1400 },
  { kind: 'call', fn: 'next', delay: 360 },

  // STEP 3 — Iowa (prefilled)
  { kind: 'tap', target: 'next-btn', delay: 1400 },
  { kind: 'call', fn: 'next', delay: 360 },

  // STEP 4 — Options (prefilled)
  { kind: 'tap', target: 'next-btn', delay: 1400 },
  { kind: 'call', fn: 'next', delay: 360 },

  // STEP 5 — Patient Info (only DOB needs entry; rest prefilled)
  { kind: 'scrollTo', target: 'dob', delay: 600 },
  { kind: 'tap', target: 'dob', delay: 600 },
  { kind: 'type', key: 'dob', value: '01/01/1990', delay: 200 },

  { kind: 'scrollTo', target: 'next-btn', delay: 700 },
  { kind: 'tap', target: 'next-btn', delay: 700 },
  { kind: 'call', fn: 'next', delay: 360 },

  // STEP 6 — Additional
  { kind: 'tap', target: 'reason', delay: 700 },
  {
    kind: 'type',
    key: 'reason',
    value: 'Help improving wellbeing with therapy.',
    delay: 180,
  },
  { kind: 'tap', target: 'consent-Yes', delay: 700 },
  { kind: 'setField', patch: { consent: 'Yes' }, delay: 220 },
  { kind: 'tap', target: 'next-btn', delay: 800 },
  { kind: 'call', fn: 'next', delay: 360 },

  // STEP 7 — Insurance + Nirvana verification
  { kind: 'tap', target: 'insurance', delay: 900 },
  { kind: 'setField', patch: { insuranceOpen: true }, delay: 260 },
  { kind: 'tap', target: 'insurance-Aetna', delay: 900 },
  { kind: 'setField', patch: { insurance: 'Aetna', insuranceOpen: false }, delay: 300 },
  // 3s Nirvana loader + brief read time on the verified card
  { kind: 'wait', delay: 4200 },
  { kind: 'tap', target: 'next-btn', delay: 700 },
  { kind: 'call', fn: 'next', delay: 360 },

  // STEP 8 — Submit (2s spinner then confirmation)
  { kind: 'tap', target: 'submit-btn', delay: 900 },
  { kind: 'call', fn: 'submit', delay: 360 },

  // 2s spinner + brief read time on the confirmation
  { kind: 'wait', delay: 3400 },
  { kind: 'phoneOut', delay: 0 },
  { kind: 'wait', delay: 1400 },
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
      // halt the cursor; typewriter advances it when the string finishes
      return 'halt'
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
      // abort any typewriter in flight before we wipe state
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
      const t = setTimeout(() => {
        ctx.typingTimersRef.current.delete(t)
        tick()
      }, 45)
      ctx.typingTimersRef.current.add(t)
    } else {
      // finished typing — let the orchestrator advance to the next command
      const t = setTimeout(() => {
        ctx.typingTimersRef.current.delete(t)
        ctx.setCursor((c) => c + 1)
      }, 120)
      ctx.typingTimersRef.current.add(t)
    }
  }
  tick()
}
