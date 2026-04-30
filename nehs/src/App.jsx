import { useRef } from 'react'
import { Phone } from './Phone.jsx'
import { BookingFlow } from './screens/BookingFlow.jsx'

export default function App() {
  const phoneRef = useRef(null)
  const viewportRef = useRef(null)

  return (
    <Phone phoneRef={phoneRef} viewportRef={viewportRef}>
      <BookingFlow />
    </Phone>
  )
}
