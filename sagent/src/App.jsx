import { useRef, useState } from 'react'
import { Phone } from './Phone.jsx'
import { Home } from './screens/Home.jsx'
import { BookingFlow } from './screens/BookingFlow.jsx'

export default function App() {
  const phoneRef = useRef(null)
  const viewportRef = useRef(null)
  const [screen, setScreen] = useState('home')

  return (
    <Phone phoneRef={phoneRef} viewportRef={viewportRef}>
      {screen === 'home' && <Home onContinue={() => setScreen('flow')} />}
      {screen === 'flow' && <BookingFlow onExit={() => setScreen('home')} />}
    </Phone>
  )
}
