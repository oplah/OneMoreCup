import { CoffeeMachineSvg } from './CoffeeMachineSvg'

export default function Landing({ onEnter }) {
  return (
    <div className="landing">
      <h1 className="landing-title">One More Cup</h1>
      <p className="landing-subtitle">hand-crafted focus sessions</p>

      <div
        className="truck-wrapper"
        onClick={onEnter}
        role="button"
        tabIndex={0}
        aria-label="Enter the café — click to order"
        onKeyDown={e => e.key === 'Enter' && onEnter()}
      >
        <CoffeeMachineSvg />
      </div>

      <button className="cta-label" onClick={onEnter}>
        Start ordering
      </button>
    </div>
  )
}
