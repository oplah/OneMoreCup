import { useEffect, useState } from 'react'

const CONFETTI_COLORS = ['#C8854A', '#8BAF8E', '#1A1A1A', '#E8C48A', '#F5EDF5', '#D8EAEF']

function ConfettiBeans({ count = 28 }) {
  const [beans] = useState(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 1.5,
      duration: 2.5 + Math.random() * 2,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      rotate: Math.random() * 360,
      size: 6 + Math.random() * 8,
    }))
  )

  return (
    <div className="confetti-container" aria-hidden="true">
      {beans.map(b => (
        <div
          key={b.id}
          className="confetti-bean"
          style={{
            left: `${b.left}%`,
            top: `-${b.size * 2}px`,
            width: `${b.size * 0.7}px`,
            height: `${b.size}px`,
            backgroundColor: b.color,
            transform: `rotate(${b.rotate}deg)`,
            animationDelay: `${b.delay}s`,
            animationDuration: `${b.duration}s`,
          }}
        />
      ))}
    </div>
  )
}

export default function Completion({ drink, snack, onOrderAgain, onNewOrder }) {
  const [showConfetti, setShowConfetti] = useState(false)
  const showSnack = snack && snack.id !== 'nothing'

  useEffect(() => {
    const t = setTimeout(() => setShowConfetti(true), 300)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="completion-screen">
      {showConfetti && <ConfettiBeans />}

      <h1 className="completion-banner">Order Up!</h1>

      {/* Ordered items — large icons centred on screen */}
      <div className="completion-order">
        {drink && (
          <div className="completion-order-item">
            <img src={`/${drink.icon}`} alt={drink.name} />
            <span className="completion-order-name">{drink.name}</span>
          </div>
        )}
        {showSnack && (
          <div className="completion-order-item">
            <img src={`/${snack.icon}`} alt={snack.name} />
            <span className="completion-order-name">{snack.name}</span>
          </div>
        )}
      </div>

      <div className="completion-actions">
        <button className="btn-primary" onClick={onOrderAgain}>
          Order Again ↺
        </button>
        <button className="btn-secondary" onClick={onNewOrder}>
          New Order
        </button>
      </div>
    </div>
  )
}
