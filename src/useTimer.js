import { useState, useEffect, useRef, useCallback } from 'react'

export function useTimer(initialSeconds) {
  const [timeLeft, setTimeLeft] = useState(initialSeconds)
  const [isRunning, setIsRunning] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef(null)
  const isCompleteRef = useRef(false)

  const clearTick = () => clearInterval(intervalRef.current)

  const start = useCallback(() => {
    isCompleteRef.current = false
    setTimeLeft(initialSeconds)
    setIsRunning(true)
    setIsPaused(false)
  }, [initialSeconds])

  const pause = useCallback(() => {
    setIsPaused(true)
  }, [])

  const resume = useCallback(() => {
    setIsPaused(false)
  }, [])

  const cancel = useCallback(() => {
    clearTick()
    setIsRunning(false)
    setIsPaused(false)
    setTimeLeft(initialSeconds)
    isCompleteRef.current = false
  }, [initialSeconds])

  useEffect(() => {
    if (isRunning && !isPaused) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current)
            setIsRunning(false)
            isCompleteRef.current = true
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      clearTick()
    }
    return clearTick
  }, [isRunning, isPaused])

  const isComplete = timeLeft === 0 && !isRunning && isCompleteRef.current

  return {
    timeLeft,
    isRunning,
    isPaused,
    isComplete,
    start,
    pause,
    resume,
    cancel,
  }
}

export function formatTime(seconds) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}
