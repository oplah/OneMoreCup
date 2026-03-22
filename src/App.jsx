import { useState } from 'react'
import { useAudio } from './useAudio'
import Landing from './Landing'
import Menu from './Menu'
import TimerScreen from './TimerScreen'
import Completion from './Completion'

export default function App() {
  const [screen, setScreen] = useState('landing')
  const [selectedDrink, setSelectedDrink] = useState(null)
  const [selectedSnack, setSelectedSnack] = useState(null)

  // Audio lives here so play() is called within the user-gesture call stack,
  // satisfying browser autoplay policy.
  const { play, stop, muted, toggleMute } = useAudio()

  const startAudio = (snack) => {
    if (snack?.sound && snack.sound !== 'none') play(snack.sound)
  }

  // Called directly from the "place order" click → inside user gesture
  const handleOrder = () => {
    startAudio(selectedSnack)
    setScreen('timer')
  }

  const handleComplete = () => {
    stop()
    setScreen('complete')
  }

  // "Order Again" restarts the same session + same music
  const handleOrderAgain = () => {
    startAudio(selectedSnack)
    setScreen('timer')
  }

  const handleNewOrder = () => {
    stop()
    setSelectedDrink(null)
    setSelectedSnack(null)
    setScreen('menu')
  }

  const handleCancel = () => {
    stop()
    setScreen('menu')
  }

  return (
    <div className="app">
      {screen === 'landing' && (
        <Landing onEnter={() => setScreen('menu')} />
      )}
      {screen === 'menu' && (
        <Menu
          selectedDrink={selectedDrink}
          selectedSnack={selectedSnack}
          onDrinkSelect={setSelectedDrink}
          onSnackSelect={setSelectedSnack}
          onOrder={handleOrder}
        />
      )}
      {screen === 'timer' && (
        <TimerScreen
          drink={selectedDrink}
          snack={selectedSnack}
          onComplete={handleComplete}
          onCancel={handleCancel}
          play={play}
          stop={stop}
          muted={muted}
          toggleMute={toggleMute}
        />
      )}
      {screen === 'complete' && (
        <Completion
          drink={selectedDrink}
          snack={selectedSnack}
          onOrderAgain={handleOrderAgain}
          onNewOrder={handleNewOrder}
        />
      )}
    </div>
  )
}
