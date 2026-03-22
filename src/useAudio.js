import { useRef, useCallback, useState } from 'react'

// ── Real MP3 file mapping ────────────────────────────────────────────────────
const SOUND_FILES = {
  jazz:       '/music/softcafejazz.mp3',
  rain:       '/music/rain.mp3',
  lofi:       '/music/chilllofi.mp3',
  campfire:   '/music/campfire.mp3',
  softfocus:  '/music/Softfocusmusic.mp3',
}

// ── Standalone preview (used in Menu for sound audition) ────────────────────
export function previewSound(soundId, onDone, duration = 5000) {
  const src = SOUND_FILES[soundId]
  if (!src) { onDone?.(); return () => {} }
  try {
    const audio = new Audio(src)
    audio.volume = 0.5
    audio.play().catch(() => {})
    const tid = setTimeout(() => { audio.pause(); onDone?.() }, duration)
    return () => { clearTimeout(tid); audio.pause(); onDone?.() }
  } catch (_) {
    onDone?.()
    return () => {}
  }
}

// ── Hook ────────────────────────────────────────────────────────────────────
export function useAudio() {
  const audioRef    = useRef(null)
  const replayTimer = useRef(null)
  const stopped     = useRef(true)           // starts stopped

  const [volume, setVolumeState] = useState(0.7)
  const [muted, setMuted]       = useState(false)
  const [activeSound, setActiveSound] = useState(null)

  // Clear any pending replay timeout
  const clearReplay = () => {
    if (replayTimer.current) {
      clearTimeout(replayTimer.current)
      replayTimer.current = null
    }
  }

  // Schedule a replay 3–4 s after the track ends
  const scheduleReplay = useCallback(() => {
    const delay = 3000 + Math.random() * 1000
    replayTimer.current = setTimeout(() => {
      if (stopped.current || !audioRef.current) return
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(() => {})
    }, delay)
  }, [])

  const play = useCallback((soundId) => {
    // Tear down previous audio
    stopped.current = true
    clearReplay()
    if (audioRef.current) {
      audioRef.current.onended = null
      audioRef.current.pause()
      audioRef.current = null
    }

    if (!soundId || soundId === 'none') { setActiveSound(null); return }
    const src = SOUND_FILES[soundId]
    if (!src) { setActiveSound(null); return }

    stopped.current = false
    const audio = new Audio(src)
    audio.volume = muted ? 0 : volume
    // When the track ends naturally → pause 3–4 s, then replay
    audio.onended = () => { if (!stopped.current) scheduleReplay() }
    audio.play().catch(() => {})

    audioRef.current = audio
    setActiveSound(soundId)
  }, [volume, muted, scheduleReplay])

  const stop = useCallback(() => {
    stopped.current = true
    clearReplay()
    if (audioRef.current) {
      audioRef.current.onended = null
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      audioRef.current = null
    }
    setActiveSound(null)
  }, [])

  const setVolume = useCallback((v) => {
    setVolumeState(v)
    if (audioRef.current) audioRef.current.volume = muted ? 0 : v
  }, [muted])

  const toggleMute = useCallback(() => {
    setMuted(prev => {
      const next = !prev
      if (audioRef.current) audioRef.current.volume = next ? 0 : volume
      return next
    })
  }, [volume])

  return { play, stop, volume, setVolume, muted, toggleMute, activeSound }
}
