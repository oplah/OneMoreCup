// ============================================================
//  BREWTIME — Hand-drawn SVG Illustrations
//  All strokes: strokeLinecap="round" strokeLinejoin="round"
//  strokeWidth: 2.5 for main, 1.5–2 for details
//  Fill: #FDFAF5 (white) or none
//  Color palette: ink #1A1A1A, coffee #C8854A, sage #8BAF8E
// ============================================================

const INK = '#1A1A1A'
const COFFEE = '#C8854A'
const SAGE = '#8BAF8E'
const WHITE = '#FDFAF5'
const PARCHMENT = '#F5F0E8'

// ── COFFEE TRUCK (hero illustration) ────────────────────────

export function CoffeeTruck({ showBarista }) {
  return (
    <svg
      viewBox="0 0 700 430"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Cozy coffee truck"
    >
      {/* Ground shadow */}
      <ellipse cx="355" cy="406" rx="265" ry="12" fill={INK} opacity="0.07" />

      {/* TRUCK BODY — main panel */}
      <path
        d="M 148 352 L 148 178 Q 149 172 157 170 L 618 170 Q 626 170 627 177 L 627 352 Z"
        fill={WHITE} stroke={INK} strokeWidth="2.5" strokeLinejoin="round"
      />

      {/* CAB / front section */}
      <path
        d="M 82 352 L 82 248 Q 84 222 100 208 L 152 182 Q 158 179 160 185 L 160 352 Z"
        fill="#EFE9DC" stroke={INK} strokeWidth="2.5" strokeLinejoin="round"
      />

      {/* Windshield */}
      <path
        d="M 90 254 Q 94 228 113 215 L 154 194 L 154 300 L 90 300 Z"
        fill="#D8EAEF" stroke={INK} strokeWidth="2" strokeLinejoin="round"
      />

      {/* Divider pillar */}
      <line x1="160" y1="172" x2="160" y2="352" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />

      {/* AWNING */}
      <path
        d="M 250 170 L 620 170 L 620 132 Q 618 124 608 120 L 260 120 Q 248 122 246 132 Z"
        fill={COFFEE} stroke={INK} strokeWidth="2.5" strokeLinejoin="round"
      />
      {/* Awning stripe lines */}
      {[0, 1, 2, 3, 4, 5].map(i => (
        <line
          key={i}
          x1={283 + i * 57} y1={120} x2={278 + i * 57} y2={170}
          stroke={WHITE} strokeWidth="8" opacity="0.25" strokeLinecap="round"
        />
      ))}
      {/* Awning bottom fringe */}
      {[0,1,2,3,4,5,6,7,8,9,10,11,12].map(i => (
        <path
          key={i}
          d={`M ${253 + i*29} 170 Q ${258 + i*29} 178 ${267 + i*29} 174`}
          stroke={WHITE} strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6"
        />
      ))}

      {/* SERVING WINDOW FRAME */}
      <rect
        x="252" y="178" width="310" height="140" rx="3"
        fill={PARCHMENT} stroke={INK} strokeWidth="2"
      />

      {/* COUNTER TOP */}
      <path
        d="M 244 318 Q 247 326 255 328 L 569 328 Q 577 326 580 318"
        stroke={INK} strokeWidth="3" strokeLinecap="round" fill="none"
      />

      {/* Counter surface detail */}
      <rect
        x="252" y="318" width="310" height="10" rx="2"
        fill="#EFE9DC" stroke={INK} strokeWidth="1.5"
      />

      {/* CHALKBOARD SIGN in window */}
      <rect
        x="298" y="200" width="160" height="68" rx="5"
        fill="#2A3830" stroke={INK} strokeWidth="2"
      />
      {/* Chalk border decoration */}
      <rect
        x="303" y="205" width="150" height="58" rx="3"
        fill="none" stroke={WHITE} strokeWidth="1" opacity="0.3"
        strokeDasharray="4 3"
      />
      <text
        x="378" y="228"
        textAnchor="middle"
        fill={WHITE}
        fontFamily="Caveat, cursive"
        fontSize="15"
        fontWeight="600"
        style={{ animation: 'chalkFadeIn 1s ease 0.8s both', display: 'inline' }}
      >
        Open. Come in.
      </text>
      <text
        x="378" y="255"
        textAnchor="middle"
        fill={COFFEE}
        fontFamily="Caveat, cursive"
        fontSize="16"
        fontWeight="700"
      >
        Order Now ↓
      </text>

      {/* COFFEE CUP on counter */}
      {/* Cup body */}
      <path
        d="M 465 295 Q 462 315 472 318 L 515 318 Q 525 315 522 295 L 518 278 L 468 278 Z"
        fill={WHITE} stroke={INK} strokeWidth="2" strokeLinejoin="round"
      />
      {/* Cup handle */}
      <path
        d="M 522 292 Q 536 292 536 302 Q 536 312 522 312"
        stroke={INK} strokeWidth="2" strokeLinecap="round" fill="none"
      />
      {/* Cup rim */}
      <ellipse cx="493" cy="278" rx="25" ry="5" fill="#E8DDD0" stroke={INK} strokeWidth="1.5" />

      {/* STEAM from cup */}
      <g className="steam-group">
        <path d="M 480 274 Q 477 262 482 250" stroke={INK} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.55" />
      </g>
      <g className="steam-group-2">
        <path d="M 494 276 Q 490 263 496 250" stroke={INK} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.45" />
      </g>
      <g className="steam-group-3">
        <path d="M 507 274 Q 505 261 511 249" stroke={INK} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.55" />
      </g>

      {/* BARISTA peek (appears on hover) */}
      <clipPath id="baristaCip">
        <rect x="252" y="195" width="310" height="123" />
      </clipPath>
      <g clipPath="url(#baristaCip)">
        <g
          className="barista-peek"
          style={{ transformOrigin: '420px 320px' }}
        >
          {/* Body/apron */}
          <path
            d="M 388 340 Q 385 330 388 318 L 452 318 Q 455 330 452 340"
            fill={COFFEE} stroke={INK} strokeWidth="2" strokeLinejoin="round"
          />
          {/* Head */}
          <circle cx="420" cy="308" r="24" fill={WHITE} stroke={INK} strokeWidth="2" />
          {/* Eyes */}
          <circle cx="412" cy="305" r="3.5" fill={INK} />
          <circle cx="428" cy="305" r="3.5" fill={INK} />
          {/* Eye shine */}
          <circle cx="413.5" cy="303.5" r="1" fill={WHITE} />
          <circle cx="429.5" cy="303.5" r="1" fill={WHITE} />
          {/* Smile */}
          <path d="M 413 313 Q 420 320 427 313" stroke={INK} strokeWidth="1.5" strokeLinecap="round" fill="none" />
          {/* Hair */}
          <path
            d="M 396 302 Q 398 284 420 282 Q 442 284 444 302"
            stroke={INK} strokeWidth="2.5" fill="#3D2B1F" strokeLinejoin="round"
          />
          {/* Hair bun */}
          <circle cx="420" cy="281" r="8" fill="#3D2B1F" stroke={INK} strokeWidth="1.5" />
          {/* Wave gesture */}
          <path
            d="M 448 300 Q 460 292 462 280 Q 464 268 456 266"
            stroke={INK} strokeWidth="2" strokeLinecap="round" fill="none"
          />
        </g>
      </g>

      {/* FRONT WHEEL */}
      <circle cx="195" cy="368" r="42" fill={WHITE} stroke={INK} strokeWidth="2.5" />
      <circle cx="195" cy="368" r="26" fill="#EFE9DC" stroke={INK} strokeWidth="2" />
      <circle cx="195" cy="368" r="9" fill={INK} />
      {[0, 60, 120, 180, 240, 300].map(a => (
        <line
          key={a}
          x1={195 + 9 * Math.cos(a * Math.PI / 180)}
          y1={368 + 9 * Math.sin(a * Math.PI / 180)}
          x2={195 + 26 * Math.cos(a * Math.PI / 180)}
          y2={368 + 26 * Math.sin(a * Math.PI / 180)}
          stroke={INK} strokeWidth="1.5" strokeLinecap="round"
        />
      ))}

      {/* REAR WHEEL */}
      <circle cx="558" cy="368" r="42" fill={WHITE} stroke={INK} strokeWidth="2.5" />
      <circle cx="558" cy="368" r="26" fill="#EFE9DC" stroke={INK} strokeWidth="2" />
      <circle cx="558" cy="368" r="9" fill={INK} />
      {[0, 60, 120, 180, 240, 300].map(a => (
        <line
          key={a}
          x1={558 + 9 * Math.cos(a * Math.PI / 180)}
          y1={368 + 9 * Math.sin(a * Math.PI / 180)}
          x2={558 + 26 * Math.cos(a * Math.PI / 180)}
          y2={368 + 26 * Math.sin(a * Math.PI / 180)}
          stroke={INK} strokeWidth="1.5" strokeLinecap="round"
        />
      ))}

      {/* WHEEL ARCHES */}
      <path d="M 152 352 Q 152 325 195 325 Q 238 325 238 352" fill="#EFE9DC" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
      <path d="M 515 352 Q 515 325 558 325 Q 601 325 601 352" fill="#EFE9DC" stroke={INK} strokeWidth="2" strokeLinejoin="round" />

      {/* HEADLIGHT */}
      <ellipse cx="84" cy="305" rx="10" ry="9" fill="#F5E88A" stroke={INK} strokeWidth="2" />

      {/* DOOR HANDLE */}
      <path
        d="M 198 268 L 218 268 Q 220 268 220 271 L 220 278 Q 220 281 218 281 L 198 281"
        stroke={INK} strokeWidth="2" strokeLinecap="round" fill="none"
      />

      {/* BREW TIME lettering on truck side */}
      <text
        x="180" y="255"
        fill={COFFEE}
        fontFamily="Caveat, cursive"
        fontSize="22"
        fontWeight="700"
        opacity="0.5"
      >
        ☕
      </text>

      {/* FLAG on roof */}
      <line x1="406" y1="170" x2="406" y2="142" stroke={INK} strokeWidth="2" strokeLinecap="round" />
      <path
        d="M 406 142 L 430 149 L 406 156 Z"
        fill={COFFEE} stroke={INK} strokeWidth="1.5" strokeLinejoin="round"
        className="flag-anim"
      />

      {/* Small decorative dots on truck body */}
      <circle cx="580" cy="190" r="3" fill={INK} opacity="0.2" />
      <circle cx="590" cy="200" r="2" fill={INK} opacity="0.15" />

      {/* Bumper */}
      <path
        d="M 72 338 Q 70 348 75 352 L 82 352"
        stroke={INK} strokeWidth="2.5" strokeLinecap="round" fill="none"
      />
      <rect x="60" y="338" width="24" height="8" rx="4" fill="#EFE9DC" stroke={INK} strokeWidth="2" />
    </svg>
  )
}

// ── DRINK ICONS (~80x80 viewBox) ──────────────────────────────

export function EspressoIcon() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Saucer */}
      <ellipse cx="40" cy="64" rx="26" ry="6" fill="#EFE9DC" stroke={INK} strokeWidth="2" />
      {/* Cup body */}
      <path d="M 24 45 Q 22 62 40 64 Q 58 62 56 45 L 52 28 L 28 28 Z"
        fill={WHITE} stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
      {/* Cup rim */}
      <ellipse cx="40" cy="28" rx="12" ry="4" fill="#E8DDD0" stroke={INK} strokeWidth="2" />
      {/* Handle */}
      <path d="M 56 40 Q 67 40 67 50 Q 67 60 56 60"
        stroke={INK} strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Coffee surface */}
      <ellipse cx="40" cy="30" rx="10" ry="3" fill={COFFEE} opacity="0.5" />
      {/* Steam 1 */}
      <path d="M 34 24 Q 32 16 36 8" stroke={INK} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5" />
      {/* Steam 2 */}
      <path d="M 42 23 Q 39 14 44 6" stroke={INK} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.4" />
    </svg>
  )
}

export function IcedCoffeeIcon() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Glass body — trapezoid wider at top */}
      <path d="M 20 16 L 60 16 L 54 70 L 26 70 Z"
        fill={WHITE} stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
      {/* Lid/rim */}
      <ellipse cx="40" cy="16" rx="20" ry="5" fill="#EFE9DC" stroke={INK} strokeWidth="2" />
      {/* Coffee liquid level */}
      <path d="M 22 30 Q 23 32 40 32 Q 57 32 58 30 L 60 16 L 20 16 Z"
        fill={COFFEE} opacity="0.25" />
      {/* Ice cubes */}
      <rect x="26" y="36" width="11" height="11" rx="2" fill="#D8EAEF" stroke={INK} strokeWidth="1.5" transform="rotate(-5 31 41)" />
      <rect x="43" y="40" width="10" height="10" rx="2" fill="#D8EAEF" stroke={INK} strokeWidth="1.5" transform="rotate(8 48 45)" />
      <rect x="32" y="50" width="10" height="10" rx="2" fill="#D8EAEF" stroke={INK} strokeWidth="1.5" transform="rotate(-3 37 55)" />
      {/* Straw */}
      <line x1="52" y1="10" x2="44" y2="70" stroke={SAGE} strokeWidth="3" strokeLinecap="round" />
      <line x1="52" y1="10" x2="44" y2="70" stroke={WHITE} strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 5" />
    </svg>
  )
}

export function MatchaIcon() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Bowl-style cup */}
      <path d="M 16 42 Q 15 64 40 68 Q 65 64 64 42 L 60 28 L 20 28 Z"
        fill={WHITE} stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
      {/* Rim */}
      <ellipse cx="40" cy="28" rx="20" ry="6" fill="#EFE9DC" stroke={INK} strokeWidth="2" />
      {/* Matcha foam surface */}
      <ellipse cx="40" cy="30" rx="18" ry="5" fill={SAGE} opacity="0.35" />
      {/* Latte swirl */}
      <path d="M 40 26 Q 48 30 40 34 Q 32 38 40 42" stroke={WHITE} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.8" />
      {/* Handle */}
      <path d="M 64 38 Q 76 38 76 50 Q 76 62 64 62"
        stroke={INK} strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Saucer */}
      <ellipse cx="40" cy="70" rx="28" ry="6" fill="#EFE9DC" stroke={INK} strokeWidth="2" />
    </svg>
  )
}

export function HojichaIcon() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Classic mug */}
      <path d="M 18 28 L 18 62 Q 19 68 40 68 Q 61 68 62 62 L 62 28 Z"
        fill={WHITE} stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
      {/* Mug top rim */}
      <ellipse cx="40" cy="28" rx="22" ry="6" fill="#EFE9DC" stroke={INK} strokeWidth="2" />
      {/* Handle — chunky ceramic style */}
      <path d="M 62 36 Q 74 36 74 44 Q 74 52 62 52 L 62 36"
        stroke={INK} strokeWidth="2.5" strokeLinecap="round" fill={WHITE} />
      {/* Tea surface */}
      <ellipse cx="40" cy="30" rx="20" ry="5" fill={COFFEE} opacity="0.3" />
      {/* Small steam */}
      <path d="M 33 24 Q 30 14 35 6" stroke={INK} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.4" />
      <path d="M 44 23 Q 42 13 47 5" stroke={INK} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.35" />
      {/* Rustic texture lines */}
      <line x1="22" y1="42" x2="58" y2="42" stroke={INK} strokeWidth="1" opacity="0.08" />
      <line x1="22" y1="52" x2="58" y2="52" stroke={INK} strokeWidth="1" opacity="0.08" />
    </svg>
  )
}

export function PourOverIcon() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* V60 dripper cone */}
      <path d="M 20 14 L 60 14 L 46 44 L 34 44 Z"
        fill={WHITE} stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
      {/* Dripper rim */}
      <path d="M 18 14 Q 20 10 40 10 Q 60 10 62 14"
        stroke={INK} strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Filter lines */}
      <line x1="40" y1="14" x2="40" y2="44" stroke={INK} strokeWidth="1.2" opacity="0.3" strokeLinecap="round" />
      <line x1="32" y1="14" x2="37" y2="44" stroke={INK} strokeWidth="1.2" opacity="0.2" strokeLinecap="round" />
      <line x1="48" y1="14" x2="43" y2="44" stroke={INK} strokeWidth="1.2" opacity="0.2" strokeLinecap="round" />
      {/* Dripper stand */}
      <line x1="40" y1="44" x2="40" y2="52" stroke={INK} strokeWidth="2" strokeLinecap="round" />
      {/* Server/cup below */}
      <path d="M 22 52 L 24 72 Q 25 76 40 76 Q 55 76 56 72 L 58 52 Z"
        fill={WHITE} stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
      <ellipse cx="40" cy="52" rx="18" ry="4" fill="#EFE9DC" stroke={INK} strokeWidth="2" />
      {/* Drip line */}
      <line x1="40" y1="44" x2="40" y2="50" stroke={COFFEE} strokeWidth="2" strokeLinecap="round" />
      {/* Coffee in cup */}
      <ellipse cx="40" cy="60" rx="14" ry="3" fill={COFFEE} opacity="0.2" />
    </svg>
  )
}

export function ColdBrewIcon() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Mason jar body */}
      <path d="M 22 22 L 22 70 Q 23 76 40 76 Q 57 76 58 70 L 58 22 Z"
        fill={WHITE} stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
      {/* Lid band */}
      <rect x="20" y="14" width="40" height="12" rx="3" fill="#EFE9DC" stroke={INK} strokeWidth="2" />
      {/* Lid top */}
      <rect x="24" y="10" width="32" height="6" rx="3" fill="#EFE9DC" stroke={INK} strokeWidth="2" />
      {/* Cold brew liquid */}
      <path d="M 23 38 L 23 70 Q 24 75 40 75 Q 56 75 57 70 L 57 38 Z"
        fill={COFFEE} opacity="0.2" />
      {/* Ice cubes floating */}
      <rect x="28" y="40" width="10" height="9" rx="2" fill="#D8EAEF" stroke={INK} strokeWidth="1.5" transform="rotate(-8 33 44)" />
      <rect x="44" y="44" width="9" height="9" rx="2" fill="#D8EAEF" stroke={INK} strokeWidth="1.5" transform="rotate(6 48 48)" />
      {/* Screw lines on jar */}
      <line x1="22" y1="28" x2="58" y2="28" stroke={INK} strokeWidth="1" opacity="0.12" />
      {/* Straw */}
      <line x1="50" y1="12" x2="42" y2="76" stroke={COFFEE} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

// ── SNACK ICONS ───────────────────────────────────────────────

export function CookieIcon() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Cookie circle — slightly imperfect */}
      <path d="M 40 10 Q 64 10 70 34 Q 76 58 52 68 Q 28 78 14 56 Q 0 34 20 18 Q 28 10 40 10 Z"
        fill="#E8C48A" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
      {/* Cross-hatch scoring */}
      <line x1="26" y1="24" x2="56" y2="56" stroke={INK} strokeWidth="1.5" strokeLinecap="round" opacity="0.35" />
      <line x1="54" y1="24" x2="24" y2="56" stroke={INK} strokeWidth="1.5" strokeLinecap="round" opacity="0.35" />
      {/* Chocolate chips */}
      <ellipse cx="30" cy="32" rx="4" ry="3" fill="#5C3A1E" transform="rotate(-15 30 32)" />
      <ellipse cx="50" cy="30" rx="4" ry="3" fill="#5C3A1E" transform="rotate(10 50 30)" />
      <ellipse cx="38" cy="50" rx="4" ry="3" fill="#5C3A1E" transform="rotate(-5 38 50)" />
      <ellipse cx="54" cy="48" rx="3.5" ry="3" fill="#5C3A1E" transform="rotate(15 54 48)" />
      {/* Texture dots */}
      <circle cx="24" cy="46" r="2" fill={INK} opacity="0.12" />
      <circle cx="56" cy="40" r="2" fill={INK} opacity="0.12" />
    </svg>
  )
}

export function CroissantIcon() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Croissant body — crescent shape */}
      <path d="M 12 52 Q 8 30 24 20 Q 36 12 50 18 Q 68 26 70 44 Q 72 58 60 64 Q 46 70 34 62 Q 20 56 14 64 Q 8 70 12 52 Z"
        fill="#EDCB80" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
      {/* Layered flake lines */}
      <path d="M 22 28 Q 40 24 56 32" stroke={WHITE} strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.6" />
      <path d="M 18 38 Q 38 32 58 40" stroke={WHITE} strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.5" />
      <path d="M 18 48 Q 36 44 54 50" stroke={WHITE} strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.4" />
      {/* Golden highlight */}
      <path d="M 24 22 Q 40 16 54 22" stroke="#C8854A" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5" />
      {/* Tips */}
      <path d="M 12 52 Q 10 62 16 66" stroke={INK} strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M 60 64 Q 68 68 70 62" stroke={INK} strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  )
}

export function MochiIcon() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Plate */}
      <ellipse cx="40" cy="70" rx="30" ry="7" fill="#EFE9DC" stroke={INK} strokeWidth="1.5" />
      {/* Mochi body — soft rounded dome */}
      <path d="M 14 52 Q 12 30 40 26 Q 68 30 66 52 Q 66 66 40 68 Q 14 66 14 52 Z"
        fill="#F5EDF5" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
      {/* Soft center indent / dimple */}
      <path d="M 32 40 Q 40 44 48 40" stroke={INK} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.3" />
      {/* Sesame dots */}
      <circle cx="36" cy="34" r="2" fill={INK} opacity="0.2" />
      <circle cx="44" cy="33" r="2" fill={INK} opacity="0.2" />
      <circle cx="40" cy="30" r="2" fill={INK} opacity="0.2" />
      {/* Pastel highlight */}
      <ellipse cx="32" cy="40" rx="8" ry="5" fill={WHITE} opacity="0.5" />
    </svg>
  )
}

export function RiceCrackerIcon() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Cracker body */}
      <circle cx="40" cy="42" r="30" fill="#E8D8B0" stroke={INK} strokeWidth="2.5" />
      {/* Grid pattern */}
      {[-12, -4, 4, 12].map(x => (
        <line key={x} x1={40 + x} y1={14} x2={40 + x} y2={70}
          stroke={INK} strokeWidth="1.2" strokeLinecap="round" opacity="0.2" />
      ))}
      {[-12, -4, 4, 12].map(y => (
        <line key={y} x1={12} y1={42 + y} x2={68} y2={42 + y}
          stroke={INK} strokeWidth="1.2" strokeLinecap="round" opacity="0.2" />
      ))}
      {/* Center circle detail */}
      <circle cx="40" cy="42" r="8" fill="none" stroke={INK} strokeWidth="1.5" opacity="0.3" />
      {/* Sesame seeds */}
      <ellipse cx="28" cy="30" rx="2.5" ry="1.5" fill={INK} opacity="0.2" transform="rotate(-30 28 30)" />
      <ellipse cx="54" cy="34" rx="2.5" ry="1.5" fill={INK} opacity="0.2" transform="rotate(20 54 34)" />
      <ellipse cx="48" cy="56" rx="2.5" ry="1.5" fill={INK} opacity="0.2" transform="rotate(-15 48 56)" />
    </svg>
  )
}

export function NothingIcon() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Empty plate */}
      <ellipse cx="40" cy="58" rx="32" ry="8" fill="#EFE9DC" stroke={INK} strokeWidth="2" />
      <ellipse cx="40" cy="54" rx="32" ry="8" fill={WHITE} stroke={INK} strokeWidth="2" />
      {/* Plate inner ring */}
      <ellipse cx="40" cy="54" rx="24" ry="6" fill="none" stroke={INK} strokeWidth="1.2" opacity="0.3" />
      {/* Zen wave / tilde */}
      <path d="M 28 54 Q 34 48 40 54 Q 46 60 52 54"
        stroke={INK} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.4" />
    </svg>
  )
}

// ── CELEBRATION SCENE ─────────────────────────────────────────

export function CelebrationScene({ drink, snack }) {
  return (
    <svg viewBox="0 0 460 340" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* BIG DRINK — left side */}
      <g transform="translate(60, 30)">
        {/* Cup body */}
        <path
          d="M 20 80 Q 16 130 60 138 Q 104 130 100 80 L 92 30 L 28 30 Z"
          fill={WHITE} stroke={INK} strokeWidth="3" strokeLinejoin="round"
          className="celebrate-path"
        />
        {/* Handle */}
        <path d="M 100 65 Q 120 65 120 90 Q 120 115 100 115"
          stroke={INK} strokeWidth="3" strokeLinecap="round" fill="none"
          className="celebrate-path-2"
        />
        {/* Coffee surface */}
        <ellipse cx="60" cy="32" rx="32" ry="9" fill={COFFEE} opacity="0.4"
          className="celebrate-path-2" />
        {/* Big steam */}
        <path d="M 42 22 Q 38 0 46 -18" stroke={INK} strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.45"
          className="celebrate-path-3" />
        <path d="M 60 18 Q 56 -6 64 -22" stroke={INK} strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.4"
          className="celebrate-path-3" />
        <path d="M 76 22 Q 74 2 82 -14" stroke={INK} strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.45"
          className="celebrate-path-3" />
        {/* Saucer */}
        <ellipse cx="60" cy="138" rx="44" ry="10" fill="#EFE9DC" stroke={INK} strokeWidth="2.5"
          className="celebrate-path-2" />
        {/* Expression lines */}
        <path d="M 102 90 Q 118 84 124 70" stroke={COFFEE} strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.7" />
        <path d="M 104 98 Q 122 98 130 90" stroke={COFFEE} strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.7" />
      </g>

      {/* SNACK — right side on a small plate */}
      <g transform="translate(270, 90)">
        {/* Plate */}
        <ellipse cx="70" cy="120" rx="62" ry="14" fill="#EFE9DC" stroke={INK} strokeWidth="2.5"
          className="celebrate-path-2" />
        <ellipse cx="70" cy="116" rx="62" ry="14" fill={WHITE} stroke={INK} strokeWidth="2.5"
          className="celebrate-path-2" />
        {/* Mochi / cookie on plate */}
        <path d="M 28 90 Q 26 60 70 56 Q 114 60 112 90 Q 112 112 70 116 Q 28 112 28 90 Z"
          fill="#F5EDF5" stroke={INK} strokeWidth="2.5" strokeLinejoin="round"
          className="celebrate-path"
        />
        {/* Highlight */}
        <ellipse cx="55" cy="78" rx="12" ry="8" fill={WHITE} opacity="0.5" />
        {/* Dots */}
        <circle cx="62" cy="70" r="3" fill={INK} opacity="0.2" />
        <circle cx="74" cy="68" r="3" fill={INK} opacity="0.2" />
        <circle cx="68" cy="64" r="3" fill={INK} opacity="0.2" />
        {/* Sparkle lines from snack */}
        <path d="M 112 80 L 126 72" stroke={COFFEE} strokeWidth="2" strokeLinecap="round" opacity="0.7"
          className="celebrate-path-3" />
        <path d="M 114 90 L 130 90" stroke={COFFEE} strokeWidth="2" strokeLinecap="round" opacity="0.7"
          className="celebrate-path-3" />
      </g>

      {/* SPARKLE STARS */}
      <g className="celebrate-path-3">
        <path d="M 230 50 L 230 30 M 220 40 L 240 40 M 222 32 L 238 48 M 238 32 L 222 48"
          stroke={COFFEE} strokeWidth="2" strokeLinecap="round" />
        <path d="M 200 140 L 200 126 M 193 133 L 207 133"
          stroke={SAGE} strokeWidth="2" strokeLinecap="round" />
        <path d="M 380 55 L 380 41 M 373 48 L 387 48"
          stroke={SAGE} strokeWidth="2" strokeLinecap="round" />
      </g>

      {/* MOTION LINES around cup */}
      <g className="celebrate-path-2" opacity="0.4">
        <path d="M 50 260 Q 40 250 30 255" stroke={COFFEE} strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M 160 270 Q 175 260 172 248" stroke={COFFEE} strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M 80 275 Q 70 268 72 255" stroke={INK} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      </g>

      {/* "Well done!" banner text area */}
      <g transform="translate(115, 270)" className="celebrate-path">
        <rect x="0" y="0" width="240" height="56" rx="6" fill={INK} />
        <text x="120" y="38" textAnchor="middle"
          fill={WHITE} fontFamily="Caveat, cursive" fontSize="32" fontWeight="700">
          Well done! ✦
        </text>
      </g>

      {/* Coffee beans confetti hints */}
      {[
        [95, 18, -20], [145, 30, 15], [310, 25, -10], [360, 40, 30],
        [420, 70, -25], [60, 280, 10], [400, 280, -15]
      ].map(([x, y, r], i) => (
        <g key={i} transform={`translate(${x}, ${y}) rotate(${r})`}>
          <ellipse cx="0" cy="0" rx="7" ry="10" fill={COFFEE} stroke={INK} strokeWidth="1.5" opacity="0.7" />
          <path d="M 0 -10 L 0 10" stroke={INK} strokeWidth="1" strokeLinecap="round" />
        </g>
      ))}
    </svg>
  )
}

// ── ICON MAP ──────────────────────────────────────────────────

export const DRINK_ICONS = {
  'espresso': EspressoIcon,
  'iced-coffee': IcedCoffeeIcon,
  'matcha': MatchaIcon,
  'hojicha': HojichaIcon,
  'pour-over': PourOverIcon,
  'cold-brew': ColdBrewIcon,
}

export const SNACK_ICONS = {
  'cookie': CookieIcon,
  'croissant': CroissantIcon,
  'mochi': MochiIcon,
  'rice-cracker': RiceCrackerIcon,
  'nothing': NothingIcon,
}
