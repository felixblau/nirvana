import { useState, useEffect, useRef } from 'react'
import {
  HamburgerIcon, GeminiEditIcon, ShareIcon, KebabIcon, MicIcon,
  SignalIcon, WifiIcon, BatteryIcon, GeminiSparkleStatic,
  ThumbsUpIcon, ThumbsDownIcon, CopyIcon, PlusIcon, SettingsIcon,
} from './Icons'
import ProcessingSheet from './ProcessingSheet'
import BookingSheet from './BookingSheet'
import PaymentSheet from './PaymentSheet'
import DoctorCards from './DoctorCards'

function Typewriter({ text, speed = 8, onDone }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    setCount(0)
  }, [text])

  useEffect(() => {
    if (count >= text.length) {
      onDone?.()
      return
    }
    const t = setTimeout(() => setCount(c => c + 1), speed)
    return () => clearTimeout(t)
  }, [count, text, speed])

  const visible = text.slice(0, count)
  const lines = visible.split('\n')

  return <>{lines.map((line, li) => {
    const parts = line.split(/(\*\*[^*]*\*?\*?)/)
    const rendered = parts.map((part, pi) => {
      const bold = part.match(/^\*\*(.+)\*\*$/)
      if (bold) return <strong key={pi}>{bold[1]}</strong>
      return part
    })
    return <span key={li}>{li > 0 && <br />}{rendered}</span>
  })}</>
}

function AnimateIn({ children, delay = 0, style }) {
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    requestAnimationFrame(() => {
      setMounted(true)
      const t = setTimeout(() => setVisible(true), Math.max(delay, 30))
      return () => clearTimeout(t)
    })
  }, [])

  return (
    <div style={{
      transition: mounted ? 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'none',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.92)',
      transformOrigin: 'bottom right',
      ...style,
    }}>
      {children}
    </div>
  )
}

function AiActions() {
  return (
    <div className="ai-actions">
      <button className="ai-action-btn"><ThumbsUpIcon /></button>
      <button className="ai-action-btn"><ThumbsDownIcon /></button>
      <button className="ai-action-btn"><ShareIcon size={16} /></button>
      <button className="ai-action-btn"><CopyIcon /></button>
      <button className="ai-action-btn"><KebabIcon size={16} /></button>
    </div>
  )
}

function AiMessage({ children, showActions }) {
  return (
    <>
      <div className="msg-ai-wrapper">
        <GeminiSparkleStatic />
        <div className="msg-ai">{children}</div>
      </div>
      {showActions && <AiActions />}
    </>
  )
}

const STEPS = {
  ENTER: 0,
  INITIAL: 1,
  AI_RESPONSE: 2,
  USER_REPLY: 3,
  RETRIEVAL: 4,
  PROCESSING_1: 5,
  PROCESSING_2: 6,
  PROCESSING_3: 7,
  RESULTS: 8,
  BOOKING: 9,
  PAYMENT_EMPTY: 10,
  PAYMENT_FILLED: 11,
  CONFIRMATION: 12,
  EXIT: 13,
}

const AI_MSG_1 = "I'm sorry to hear about your knee pain. Based on what you're describing - sharp pain on the outer side of your right knee that worsens with stair climbing - this could be related to several conditions, including iliotibial band syndrome, a lateral meniscus issue, or possible ligament strain.\n\nIn this case, imaging would be really helpful. **Based on your symptoms, I suggest you consult a radiologist.** Would you like me to find some radiologists you can reach out to?"
const AI_MSG_2 = "Here are 3 radiologists near you that accept your insurance and are available for booking:"
const AI_MSG_3 = "Okay! Appointment is booked.\nYour appointment is with Dr. Priya Sharma, on Monday March 24 at 9:00AM. You will also shortly receive a confirmation email at **michael@dundermifflin.com**"

const TIMINGS = {
  [STEPS.ENTER]: 2200,
  [STEPS.INITIAL]: 800,
  [STEPS.USER_REPLY]: 1500,
  [STEPS.RETRIEVAL]: 2000,
  [STEPS.PROCESSING_1]: 2000,
  [STEPS.PROCESSING_2]: 2000,
  [STEPS.PROCESSING_3]: 2000,
  [STEPS.RESULTS]: 4000,
  [STEPS.BOOKING]: 3000,
  [STEPS.PAYMENT_EMPTY]: 2000,
  [STEPS.PAYMENT_FILLED]: 2500,
  [STEPS.CONFIRMATION]: 6000,
  [STEPS.EXIT]: 2200,
}

export default function App() {
  const [step, setStep] = useState(STEPS.ENTER)
  const [paused, setPaused] = useState(false)
  const [showTap, setShowTap] = useState(false)
  const [firstDone, setFirstDone] = useState(false)
  const chatRef = useRef(null)
  const endRef = useRef(null)

  const TAP_STEPS = new Set([STEPS.RESULTS, STEPS.BOOKING, STEPS.PAYMENT_EMPTY, STEPS.PAYMENT_FILLED])
  const TAP_LEAD = 900

  const advanceStep = () => {
    setShowTap(false)
    if (step === STEPS.EXIT) {
      chatRef.current?.scrollTo({ top: 0 })
      setFirstDone(false)
      setStep(STEPS.ENTER)
    } else {
      setStep(s => s + 1)
    }
  }

  useEffect(() => {
    if (paused) return
    if (step === STEPS.AI_RESPONSE) return
    const delay = TIMINGS[step]
    if (delay == null) return

    const hasTap = TAP_STEPS.has(step)
    let tapTimer, stepTimer

    if (hasTap) {
      tapTimer = setTimeout(() => setShowTap(true), delay - TAP_LEAD)
    }

    stepTimer = setTimeout(advanceStep, delay)

    return () => { clearTimeout(tapTimer); clearTimeout(stepTimer) }
  }, [step, paused])

  const handleFirstTypeDone = () => {
    setFirstDone(true)
    if (paused) return
    setTimeout(advanceStep, 1500)
  }

  useEffect(() => {
    if (step < STEPS.RESULTS) return
    setTimeout(() => {
      endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }, 150)
  }, [step])

  const phoneVisible = step >= STEPS.INITIAL && step <= STEPS.CONFIRMATION
  const [phoneMounted, setPhoneMounted] = useState(false)
  useEffect(() => {
    if (phoneVisible) {
      requestAnimationFrame(() => setPhoneMounted(true))
    } else {
      setPhoneMounted(false)
    }
  }, [phoneVisible])

  const showAiResponse = step >= STEPS.AI_RESPONSE
  const showSheet = step >= STEPS.PROCESSING_1 && step <= STEPS.PROCESSING_3
  const showResults = step >= STEPS.RESULTS
  const showBooking = step === STEPS.BOOKING
  const showPayment = step === STEPS.PAYMENT_EMPTY || step === STEPS.PAYMENT_FILLED
  const showConfirmation = step === STEPS.CONFIRMATION

  let processingStep = 0
  if (step === STEPS.PROCESSING_2) processingStep = 1
  if (step === STEPS.PROCESSING_3) processingStep = 2

  return (
    <div
      className="phone"
      onClick={() => setPaused(p => !p)}
      style={{
        transition: 'all 1.8s cubic-bezier(0.16, 1, 0.3, 1)',
        opacity: phoneMounted ? 1 : 0,
        transform: phoneMounted ? 'translateY(0) scale(1)' : 'translateY(120px) scale(0.95)',
        filter: phoneMounted ? 'blur(0px)' : 'blur(12px)',
      }}
    >
      <div className="status-bar">
        <span>9:41</span>
        <div className="status-bar-icons">
          <SignalIcon />
          <WifiIcon />
          <BatteryIcon />
        </div>
      </div>

      <div className="nav-bar">
        <div className="nav-bar-left">
          <HamburgerIcon />
        </div>
        <div className="nav-bar-right">
          <GeminiEditIcon />
          <ShareIcon />
          <KebabIcon />
          <div className="nav-avatar">
            <span>F</span>
          </div>
        </div>
      </div>

      <div className="chat-area" ref={chatRef}>
        <div className="msg-user">
          I've been having persistent knee pain for the past two weeks, especially when climbing stairs. It's a sharp pain on the outer side of my right knee.
        </div>

        {showAiResponse && (
          <AiMessage showActions={firstDone && step >= STEPS.USER_REPLY}>
            <Typewriter text={AI_MSG_1} onDone={handleFirstTypeDone} />
          </AiMessage>
        )}

        {step >= STEPS.USER_REPLY && (
          <AnimateIn style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <div className="msg-user" style={{ whiteSpace: 'nowrap' }}>yes please</div>
          </AnimateIn>
        )}

        {step === STEPS.RETRIEVAL && (
          <AnimateIn>
            <div className="retrieval">
              <div className="spinner" />
              Retrieving your insurance information...
            </div>
          </AnimateIn>
        )}

        {showResults && (
          <AnimateIn>
            <AiMessage showActions={false}>
              <Typewriter text={AI_MSG_2} />
            </AiMessage>
            <div style={{ marginTop: 12, paddingLeft: 38 }}>
              <DoctorCards onBook={() => {}} showTap={showTap && step === STEPS.RESULTS} disabled={showConfirmation} />
            </div>
          </AnimateIn>
        )}

        {showConfirmation && (
          <AnimateIn>
            <AiMessage showActions={false}>
              <Typewriter text={AI_MSG_3} />
            </AiMessage>
          </AnimateIn>
        )}

        <div ref={endRef} style={{ minHeight: '30vh', flexShrink: 0 }} />
      </div>

      <div className="input-bar">
        <div className="input-container">
          <span className="input-placeholder">Ask GemMD</span>
          <div className="input-actions-row">
            <PlusIcon />
            <SettingsIcon />
            <span className="input-fast">Fast <span className="input-chevron">›</span></span>
            <div style={{ flex: 1 }} />
            <MicIcon />
          </div>
        </div>
        <div className="input-disclaimer">GemMD is AI and can make mistakes.</div>
      </div>

      {showSheet && <ProcessingSheet activeStep={processingStep} />}
      {showBooking && <BookingSheet onBook={() => {}} showTap={showTap} />}
      {showPayment && <PaymentSheet cvvFilled={step === STEPS.PAYMENT_FILLED} onConfirm={() => {}} showTap={showTap} />}

      {paused && (
        <div style={{
          position: 'absolute', top: 60, left: '50%', transform: 'translateX(-50%)',
          background: 'rgba(0,0,0,0.8)', color: 'white', padding: '4px 12px',
          borderRadius: 12, fontSize: 12, zIndex: 20,
        }}>
          paused — tap to resume
        </div>
      )}
    </div>
  )
}
