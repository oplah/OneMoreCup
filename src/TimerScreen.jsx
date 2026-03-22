import { useEffect, useRef, useState } from 'react'
import { useTimer, formatTime } from './useTimer'

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <rect x="6" y="4" width="4" height="16" rx="1" fill="currentColor" stroke="none" />
      <rect x="14" y="4" width="4" height="16" rx="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M 6 4 L 20 12 L 6 20 Z" />
    </svg>
  )
}

function CancelIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

function VolumeIcon({ muted }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      {muted ? (
        <>
          <path d="M 11 5 L 6 9 H 2 v 6 h 4 l 5 4 V 5 Z" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </>
      ) : (
        <>
          <path d="M 11 5 L 6 9 H 2 v 6 h 4 l 5 4 V 5 Z" />
          <path d="M 15.5 8.5 a 5 5 0 0 1 0 7" />
          <path d="M 19.07 5.93 a 10 10 0 0 1 0 12.14" />
        </>
      )}
    </svg>
  )
}

function SteamPuff({ style }) {
  return <div className="steam-puff" style={style} />
}

function playCompleteChime() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const notes = [523.25, 659.25, 783.99, 1046.5]
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.type = 'sine'
      osc.frequency.value = freq
      gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.15)
      gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + i * 0.15 + 0.05)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.15 + 0.6)
      osc.start(ctx.currentTime + i * 0.15)
      osc.stop(ctx.currentTime + i * 0.15 + 0.7)
    })
  } catch (_) {}
}

// Audio props come from App.jsx (called inside user gesture = autoplay-safe)
export default function TimerScreen({ drink, snack, onComplete, onCancel, play, stop, muted, toggleMute }) {
  const totalSeconds = (drink?.minutes || 25) * 60
  const { timeLeft, isPaused, isComplete, start, pause, resume, cancel } = useTimer(totalSeconds)
  const [puffs, setPuffs] = useState([])
  const lastPuffMinute = useRef(null)
  const hasStarted = useRef(false)

  // Start timer (audio already started by App.jsx before screen mounted)
  useEffect(() => {
    if (!hasStarted.current) {
      hasStarted.current = true
      start()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Handle completion
  useEffect(() => {
    if (isComplete) {
      stop()
      playCompleteChime()
      setTimeout(onComplete, 800)
    }
  }, [isComplete]) // eslint-disable-line react-hooks/exhaustive-deps

  // Steam puff every 5 minutes
  useEffect(() => {
    const minutesLeft = Math.ceil(timeLeft / 60)
    const minutesPassed = (drink?.minutes || 25) - minutesLeft

    if (minutesPassed > 0 && minutesPassed % 5 === 0 && minutesPassed !== lastPuffMinute.current) {
      lastPuffMinute.current = minutesPassed
      const id = Date.now()
      setPuffs(prev => [...prev, { id, x: Math.random() * 80 + 10, y: Math.random() * 40 + 20 }])
      setTimeout(() => setPuffs(prev => prev.filter(p => p.id !== id)), 900)
    }
  }, [timeLeft, drink?.minutes])

  const handlePauseResume = () => {
    if (isPaused) {
      resume()
      if (snack?.sound && snack.sound !== 'none') play(snack.sound)
    } else {
      pause()
      stop()
    }
  }

  const handleCancel = () => {
    cancel()
    stop()
    onCancel()
  }

  const almostDone = timeLeft <= 60 && timeLeft > 0

  return (
    <div className="timer-screen">
      {puffs.map(p => (
        <SteamPuff key={p.id} style={{ left: `${p.x}%`, top: `${p.y}%` }} />
      ))}

      {/* RECEIPT CARD */}
      <div className="receipt-card">
        <div className="receipt-header">Order Ticket</div>
        <div className="receipt-divider">{'─'.repeat(26)}</div>
        <div className="receipt-title">L E T S B R E W</div>
        <div className="receipt-divider">{'─'.repeat(26)}</div>

        <div className="receipt-drink">
          <span className="receipt-drink-name">{drink?.name}</span>
          <span className="receipt-drink-time">{formatTime(totalSeconds)}</span>
        </div>

        {snack && snack.id !== 'nothing' && (
          <div className="receipt-snack">
            + {snack.name}
            {snack.sound !== 'none' && (
              <span style={{ opacity: 0.6 }}> ({snack.soundLabel})</span>
            )}
          </div>
        )}

        <div className="receipt-divider">{'─'.repeat(26)}</div>
        <div className="receipt-thanks">
          {isPaused ? 'Paused… zzz' : 'Thank you! Brewing...'}
        </div>
      </div>

      {/* TIMER DISPLAY */}
      <div className="timer-display" style={{ position: 'relative' }}>
        <div
          className={`timer-digits ${isPaused ? 'paused' : ''} ${almostDone ? 'almost-done' : ''}`}
          aria-live="polite"
          aria-label={`${formatTime(timeLeft)} remaining`}
        >
          {formatTime(timeLeft)}
        </div>
        {isPaused && <div className="timer-zzz">zzz…</div>}
      </div>

      {/* CONTROLS */}
      <div className="timer-controls">
        <button
          className="ctrl-btn"
          onClick={handlePauseResume}
          aria-label={isPaused ? 'Resume timer' : 'Pause timer'}
        >
          {isPaused ? <PlayIcon /> : <PauseIcon />}
        </button>

        <button
          className="ctrl-btn"
          onClick={handleCancel}
          aria-label="Cancel and go back to menu"
        >
          <CancelIcon />
        </button>

        <button
          className={`ctrl-btn ${muted ? 'muted' : ''}`}
          onClick={toggleMute}
          aria-label={muted ? 'Unmute sound' : 'Mute sound'}
          disabled={!snack?.sound || snack.sound === 'none'}
        >
          <VolumeIcon muted={muted} />
        </button>
      </div>
    </div>
  )
}
