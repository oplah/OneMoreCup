import { useState, useEffect, useRef, useCallback } from 'react'

// Uses absolute timestamps (Date.now) so the countdown stays accurate
// even when the browser throttles setInterval on lock screen / background.

export function useTimer(initialSeconds) {
  const [timeLeft, setTimeLeft]   = useState(initialSeconds)
  const [isRunning, setIsRunning] = useState(false)
  const [isPaused, setIsPaused]   = useState(false)

  const endTimeRef      = useRef(null)   // absolute ms when timer should hit 0
  const remainingRef    = useRef(initialSeconds) // snapshot on pause
  const intervalRef     = useRef(null)
  const isCompleteRef   = useRef(false)

  const clearTick = () => {
    clearInterval(intervalRef.current)
    intervalRef.current = null
  }

  const tick = () => {
    const remaining = Math.max(0, Math.round((endTimeRef.current - Date.now()) / 1000))
    setTimeLeft(remaining)
    if (remaining <= 0) {
      clearTick()
      setIsRunning(false)
      isCompleteRef.current = true
    }
  }

  const startTicking = () => {
    clearTick()
    tick() // immediate update
    intervalRef.current = setInterval(tick, 500) // 500ms → correct within 1 s even if throttled
  }

  const start = useCallback(() => {
    isCompleteRef.current = false
    remainingRef.current = initialSeconds
    endTimeRef.current = Date.now() + initialSeconds * 1000
    setTimeLeft(initialSeconds)
    setIsRunning(true)
    setIsPaused(false)
  }, [initialSeconds])

  const pause = useCallback(() => {
    // Snapshot how much is left, stop ticking
    remainingRef.current = Math.max(0, Math.round((endTimeRef.current - Date.now()) / 1000))
    setIsPaused(true)
  }, [])

  const resume = useCallback(() => {
    endTimeRef.current = Date.now() + remainingRef.current * 1000
    setIsPaused(false)
  }, [])

  const cancel = useCallback(() => {
    clearTick()
    setIsRunning(false)
    setIsPaused(false)
    setTimeLeft(initialSeconds)
    isCompleteRef.current = false
  }, [initialSeconds])

  // Start/stop ticking based on running + paused state
  useEffect(() => {
    if (isRunning && !isPaused) {
      startTicking()
    } else {
      clearTick()
    }
    return clearTick
  }, [isRunning, isPaused]) // eslint-disable-line react-hooks/exhaustive-deps

  // Re-sync when tab regains visibility (phone unlock / tab switch)
  useEffect(() => {
    const onVisible = () => {
      if (isRunning && !isPaused) tick()
    }
    document.addEventListener('visibilitychange', onVisible)
    return () => document.removeEventListener('visibilitychange', onVisible)
  }, [isRunning, isPaused]) // eslint-disable-line react-hooks/exhaustive-deps

  const isComplete = timeLeft === 0 && !isRunning && isCompleteRef.current

  return { timeLeft, isRunning, isPaused, isComplete, start, pause, resume, cancel }
}

export function formatTime(seconds) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}
