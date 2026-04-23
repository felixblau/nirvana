import { useState, useEffect, useRef } from 'react'
import {
  MenuIcon, EditIcon, CloseIcon, PlusIcon, MicIcon,
  SignalIcon, WifiIcon, BatteryIcon,
} from './Icons'
import ProcessingSheet from './ProcessingSheet'
import BookingSheet from './BookingSheet'
import PaymentSheet from './PaymentSheet'
import DoctorCards from './DoctorCards'

function AnimateIn({ children, delay = 0, style }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(t)
  }, [delay])

  return (
    <div style={{
      transition: 'all 0.5s ease-out',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(16px)',
      ...style,
    }}>
      {children}
    </div>
  )
}

const STEPS = {
  INITIAL_CHAT: 0,
  USER_REPLY: 1,
  RETRIEVAL: 2,
  PROCESSING_1: 3,
  PROCESSING_2: 4,
  PROCESSING_3: 5,
  RESULTS: 6,
  BOOKING: 7,
  PAYMENT_EMPTY: 8,
  PAYMENT_FILLED: 9,
  CONFIRMATION: 10,
}

const TIMINGS = {
  [STEPS.INITIAL_CHAT]: 3000,
  [STEPS.USER_REPLY]: 1500,
  [STEPS.RETRIEVAL]: 2000,
  [STEPS.PROCESSING_1]: 2000,
  [STEPS.PROCESSING_2]: 2000,
  [STEPS.PROCESSING_3]: 2000,
  [STEPS.RESULTS]: 3000,
  [STEPS.BOOKING]: 3000,
  [STEPS.PAYMENT_EMPTY]: 2000,
  [STEPS.PAYMENT_FILLED]: 2500,
  [STEPS.CONFIRMATION]: 4000,
}

export default function App() {
  const [step, setStep] = useState(STEPS.INITIAL_CHAT)
  const [paused, setPaused] = useState(false)
  const chatRef = useRef(null)
  const endRef = useRef(null)

  useEffect(() => {
    if (paused) return
    const delay = TIMINGS[step]
    if (delay == null) return
    const t = setTimeout(() => {
      if (step === STEPS.CONFIRMATION) {
        setStep(STEPS.INITIAL_CHAT)
      } else {
        setStep(s => s + 1)
      }
    }, delay)
    return () => clearTimeout(t)
  }, [step, paused])

  useEffect(() => {
    setTimeout(() => {
      endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }, 150)
  }, [step])

  const showSheet = step >= STEPS.PROCESSING_1 && step <= STEPS.PROCESSING_3
  const showResults = step >= STEPS.RESULTS && step !== STEPS.CONFIRMATION
  const showBooking = step === STEPS.BOOKING
  const showPayment = step === STEPS.PAYMENT_EMPTY || step === STEPS.PAYMENT_FILLED
  const showConfirmation = step === STEPS.CONFIRMATION

  let processingStep = 0
  if (step === STEPS.PROCESSING_2) processingStep = 1
  if (step === STEPS.PROCESSING_3) processingStep = 2

  return (
    <div className="phone" onClick={() => setPaused(p => !p)}>
      {/* Status bar */}
      <div className="status-bar">
        <span>9:41</span>
        <div className="status-bar-icons">
          <SignalIcon />
          <WifiIcon />
          <BatteryIcon />
        </div>
      </div>

      {/* Nav bar */}
      <div className="nav-bar">
        <div className="nav-bar-left">
          <MenuIcon />
          <span className="nav-bar-title">Health AI</span>
        </div>
        <div className="nav-bar-right">
          <EditIcon />
          <CloseIcon />
        </div>
      </div>

      {/* Chat area */}
      <div className="chat-area" ref={chatRef}>
        {/* Identifier bar - only on screen 1 */}
        {step === STEPS.INITIAL_CHAT && (
          <div className="identifier-bar">
            <div className="identifier-avatar">M</div>
            <span className="identifier-name">Michael</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        )}

        {/* User query */}
        <div className="msg-user">
          I've been having persistent knee pain for the past two weeks, especially when climbing stairs. It's a sharp pain on the outer side of my right knee.
        </div>

        {/* AI response */}
        <div className="msg-ai">
          I'm sorry to hear about your knee pain. Based on what you're describing - sharp pain on the outer side of your right knee that worsens with stair climbing - this could be related to several conditions, including iliotibial band syndrome, a lateral meniscus issue, or possible ligament strain.
          <br /><br />
          In this case, imaging would be really helpful. <strong>Based on your symptoms, I suggest you consult a radiologist.</strong> Would you like me to find some radiologists you can reach out to?
        </div>

        {/* User reply */}
        {step >= STEPS.USER_REPLY && (
          <AnimateIn style={{ alignSelf: 'flex-end' }}>
            <div className="msg-user">yes please</div>
          </AnimateIn>
        )}

        {/* Retrieval indicator */}
        {step === STEPS.RETRIEVAL && (
          <AnimateIn>
            <div className="retrieval">
              <div className="spinner" />
              Retrieving your insurance information...
            </div>
          </AnimateIn>
        )}

        {/* Doctor results */}
        {showResults && (
          <AnimateIn>
            <div className="msg-ai">
              Here are 3 radiologists near you that accept your insurance and are available for booking via Nirvana:
            </div>
            <div style={{ marginTop: 12 }}>
              <DoctorCards onBook={() => {}} />
            </div>
          </AnimateIn>
        )}

        {/* Confirmation message */}
        {showConfirmation && (
          <>
            <div className="msg-ai">
              Here are 3 radiologists near you that accept your insurance and are available for booking via Nirvana:
            </div>
            <DoctorCards onBook={() => {}} />
            <AnimateIn>
              <div className="msg-ai">
                Okay! Appointment is booked.<br />
                Your appointment is with Dr. Priya Sharma, on Monday March 24 at 9:00AM. You will also shortly receive a confirmation email at <strong>michael@dundermifflin.com</strong>
              </div>
            </AnimateIn>
          </>
        )}

        {/* Bottom spacer — keeps room to scroll before content pushes layout */}
        <div ref={endRef} style={{ minHeight: '60vh', flexShrink: 0 }} />
      </div>

      {/* Input bar */}
      <div className="input-bar">
        <PlusIcon />
        <div className="input-field">Ask Health AI</div>
        <MicIcon />
      </div>

      {/* Sheets */}
      {showSheet && <ProcessingSheet activeStep={processingStep} />}
      {showBooking && <BookingSheet onBook={() => {}} />}
      {showPayment && <PaymentSheet cvvFilled={step === STEPS.PAYMENT_FILLED} onConfirm={() => {}} />}

      {/* Pause indicator */}
      {paused && (
        <div style={{
          position: 'absolute', top: 60, left: '50%', transform: 'translateX(-50%)',
          background: 'rgba(0,0,0,0.7)', color: 'white', padding: '4px 12px',
          borderRadius: 12, fontSize: 12, zIndex: 20,
        }}>
          paused — tap to resume
        </div>
      )}
    </div>
  )
}
