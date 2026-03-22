import { useRef, useEffect, useState, useCallback } from 'react'
import { DRINKS, SNACKS } from './data'
import { previewSound } from './useAudio'

// Tiny UI click feedback
function playTick(type = 'select') {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.type = 'sine'
    if (type === 'select') {
      osc.frequency.value = 880
      gain.gain.setValueAtTime(0.08, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08)
    } else {
      osc.frequency.value = 440
      gain.gain.setValueAtTime(0.05, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06)
    }
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.1)
  } catch (_) {}
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
      <path d="M5 4l15 8-15 8V4z" />
    </svg>
  )
}

function StopIcon() {
  return (
    <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
      <rect x="4" y="4" width="16" height="16" rx="2" />
    </svg>
  )
}

// ── Drink item — shows + / ✓ select button ──────────────────────────────────
function DrinkItem({ item, selected, onSelect }) {
  const handleClick = () => {
    playTick(selected ? 'deselect' : 'select')
    onSelect(selected ? null : item)
  }

  return (
    <div
      className={`menu-item ${selected ? 'selected' : ''}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      aria-label={`${item.name} — ${item.minutes} minutes`}
      onKeyDown={e => e.key === 'Enter' && handleClick()}
    >
      <div className="menu-item-icon" aria-hidden="true">
        <img src={`/${item.icon}`} alt="" width="68" height="68" />
      </div>
      <div className="menu-item-info">
        <div className="menu-item-name">{item.name}</div>
        <div className="menu-item-detail">{item.description}</div>
      </div>
      <div className="menu-item-time">{item.minutes}'</div>
      <button
        className={`select-btn ${selected ? 'selected' : ''}`}
        onClick={e => { e.stopPropagation(); handleClick() }}
        aria-label={selected ? `Deselect ${item.name}` : `Select ${item.name}`}
        tabIndex={-1}
      >
        {selected ? '✓' : '+'}
      </button>
    </div>
  )
}

// ── Snack item — shows preview ▶ button + + / ✓ select button ───────────────
function SnackItem({ item, selected, onSelect, previewingId, onPreview }) {
  const isPreviewing = previewingId === item.id

  const handleClick = () => {
    playTick(selected ? 'deselect' : 'select')
    onSelect(selected ? null : item)
  }

  const handlePreview = e => {
    e.stopPropagation()
    onPreview(item)
  }

  return (
    <div
      className={`menu-item ${selected ? 'selected' : ''}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      aria-label={`${item.name} — ${item.soundLabel}`}
      onKeyDown={e => e.key === 'Enter' && handleClick()}
    >
      <div className="menu-item-icon" aria-hidden="true">
        <img src={`/${item.icon}`} alt="" width="68" height="68" />
      </div>
      <div className="menu-item-info">
        <div className="menu-item-name">{item.name}</div>
        <div className="menu-item-detail">{item.soundLabel}</div>
      </div>
      <button
        className={`preview-btn ${isPreviewing ? 'previewing' : ''}`}
        onClick={handlePreview}
        aria-label={isPreviewing ? `Stop preview` : `Preview ${item.soundLabel}`}
        disabled={item.sound === 'none'}
        title={item.sound === 'none' ? 'No sound' : `Preview: ${item.soundLabel}`}
      >
        {isPreviewing ? <StopIcon /> : <PlayIcon />}
      </button>
      <button
        className={`select-btn ${selected ? 'selected' : ''}`}
        onClick={e => { e.stopPropagation(); handleClick() }}
        aria-label={selected ? `Deselect ${item.name}` : `Select ${item.name}`}
        tabIndex={-1}
      >
        {selected ? '✓' : '+'}
      </button>
    </div>
  )
}

// ── Menu screen ──────────────────────────────────────────────────────────────
export default function Menu({
  selectedDrink,
  selectedSnack,
  onDrinkSelect,
  onSnackSelect,
  onOrder,
}) {
  const canOrder = selectedDrink && selectedSnack
  const [previewingId, setPreviewingId] = useState(null)
  const stopPreviewRef = useRef(null)

  useEffect(() => {
    return () => { if (stopPreviewRef.current) stopPreviewRef.current() }
  }, [])

  const handlePreview = useCallback((snack) => {
    if (stopPreviewRef.current) {
      stopPreviewRef.current()
      stopPreviewRef.current = null
    }
    if (previewingId === snack.id || snack.sound === 'none') {
      setPreviewingId(null)
      return
    }
    setPreviewingId(snack.id)
    stopPreviewRef.current = previewSound(snack.sound, () => {
      setPreviewingId(null)
      stopPreviewRef.current = null
    })
  }, [previewingId])

  return (
    <div className="menu-screen">
      <header className="menu-header">
        <h1 className="menu-title">The Menu</h1>
        <p className="menu-tagline">Pick a drink and a snack</p>
      </header>

      <div className="menu-divider" />

      <div className="menu-sections">

        {/* ── DRINKS card ── */}
        <div className="menu-card">
          <div className="menu-card-header">
            <h2 className="menu-section-title">Drinks</h2>
            <p className="menu-section-sub">Your focus duration</p>
          </div>
          <div className="menu-card-divider" />
          <div className="menu-items-list">
            {DRINKS.map(drink => (
              <DrinkItem
                key={drink.id}
                item={drink}
                selected={selectedDrink?.id === drink.id}
                onSelect={onDrinkSelect}
              />
            ))}
          </div>
        </div>

        {/* ── SNACKS card ── */}
        <div className="menu-card">
          <div className="menu-card-header">
            <h2 className="menu-section-title">Snacks</h2>
            <p className="menu-section-sub">Your background sound</p>
          </div>
          <div className="menu-card-divider" />
          <div className="menu-items-list">
            {SNACKS.map(snack => (
              <SnackItem
                key={snack.id}
                item={snack}
                selected={selectedSnack?.id === snack.id}
                onSelect={onSnackSelect}
                previewingId={previewingId}
                onPreview={handlePreview}
              />
            ))}
          </div>
        </div>

      </div>

      {/* ── Fixed order bar ── */}
      <div className="order-bar">
        <div className="order-summary">
          {canOrder ? (
            <>
              <span style={{ fontWeight: 700, color: 'var(--title-ink)' }}>My order: </span>
              <span className="order-summary-highlight">{selectedDrink.name}</span>
              {' and '}
              <span className="order-summary-highlight">{selectedSnack.name}</span>
            </>
          ) : (
            <span style={{ opacity: 0.4 }}>
              {!selectedDrink && !selectedSnack
                ? 'Pick a drink and a snack…'
                : !selectedDrink
                ? 'Now pick a drink…'
                : 'Now pick a snack…'}
            </span>
          )}
        </div>
        <button
          className="order-btn"
          onClick={canOrder ? onOrder : undefined}
          disabled={!canOrder}
          aria-disabled={!canOrder}
        >
          place order
        </button>
      </div>
    </div>
  )
}
