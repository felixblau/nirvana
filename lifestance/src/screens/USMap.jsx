/**
 * Simplified US map — stylized blocks per state, correctly laid out.
 * Active states fill navy; inactive fill light gray.
 */

// Layout: 11 columns x 8 rows grid, each cell is a state block.
// [col, row, width, height]
const STATES = {
  WA: [0, 0, 1, 1], OR: [0, 1, 1, 1], CA: [0, 2, 1, 2], NV: [1, 1, 1, 2],
  ID: [1, 0, 1, 1], MT: [2, 0, 1, 1], WY: [2, 1, 1, 1], UT: [2, 2, 1, 1],
  AZ: [2, 3, 1, 1], NM: [3, 3, 1, 1], CO: [3, 2, 1, 1], ND: [3, 0, 1, 1],
  SD: [3, 1, 1, 1], NE: [4, 1, 1, 1], KS: [4, 2, 1, 1], OK: [4, 3, 1, 1],
  TX: [4, 4, 1, 2], MN: [4, 0, 1, 1], IA: [5, 1, 1, 1], MO: [5, 2, 1, 1],
  AR: [5, 3, 1, 1], LA: [5, 4, 1, 1], WI: [5, 0, 1, 1], IL: [6, 1, 1, 2],
  MS: [6, 3, 1, 1], AL: [6, 4, 1, 1], MI: [6, 0, 1, 1], IN: [7, 2, 1, 1],
  KY: [7, 3, 1, 1], TN: [7, 4, 1, 1], GA: [7, 5, 1, 1], OH: [8, 1, 1, 1],
  WV: [8, 2, 1, 1], VA: [8, 3, 1, 1], NC: [8, 4, 1, 1], SC: [8, 5, 1, 1],
  FL: [8, 6, 2, 1], PA: [9, 1, 1, 1], MD: [9, 2, 1, 1], DC: [9, 3, 1, 1],
  NY: [9, 0, 1, 1], NJ: [10, 1, 1, 1], DE: [10, 2, 1, 1], VT: [10, 0, 1, 1],
  NH: [10, 3, 1, 1], MA: [10, 4, 1, 1], CT: [10, 5, 1, 1], RI: [10, 6, 1, 1],
  ME: [11, 0, 1, 1], AK: [0, 5, 1, 2], HI: [1, 6, 1, 1],
}

export function USMap({ activeStates, selectedState, onSelect }) {
  const CELL = 24
  const GAP = 2
  const COLS = 12
  const ROWS = 8
  const WIDTH = COLS * CELL + (COLS - 1) * GAP
  const HEIGHT = ROWS * CELL + (ROWS - 1) * GAP

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: 'auto', maxWidth: 360, margin: '0 auto', display: 'block' }}
      aria-label="US state selector"
    >
      {Object.entries(STATES).map(([code, [c, r, w, h]]) => {
        const x = c * (CELL + GAP)
        const y = r * (CELL + GAP)
        const width = w * CELL + (w - 1) * GAP
        const height = h * CELL + (h - 1) * GAP
        const active = activeStates.includes(code)
        const selected = selectedState === code
        const fill = selected
          ? 'rgb(0, 103, 206)'
          : active
          ? 'var(--ls-cta-navy)'
          : '#d9d9d9'

        return (
          <g key={code}>
            <rect
              x={x}
              y={y}
              width={width}
              height={height}
              rx={3}
              fill={fill}
              stroke="white"
              strokeWidth="1"
              style={{ cursor: active ? 'pointer' : 'default', transition: 'fill 0.15s' }}
              onClick={() => active && onSelect(code)}
            />
            <text
              x={x + width / 2}
              y={y + height / 2 + 3.5}
              textAnchor="middle"
              fontFamily="var(--font-sans)"
              fontSize="8"
              fontWeight="600"
              fill={active ? 'white' : '#8a8a8a'}
              style={{ pointerEvents: 'none', userSelect: 'none' }}
            >
              {code}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
