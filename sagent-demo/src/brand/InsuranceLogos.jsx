export function InsuranceLogos() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        rowGap: 20,
        columnGap: 14,
        alignItems: 'center',
        justifyItems: 'center',
      }}
    >
      <AetnaMark />
      <UnitedMark />
      <CignaMark />
      <AnthemMark />
    </div>
  )
}

function AetnaMark() {
  return (
    <svg viewBox="0 0 180 44" width="130" height="32" aria-label="Aetna">
      {/* heart */}
      <path
        d="M4 22 C4 14, 14 10, 20 18 C26 10, 36 14, 36 22 C36 30, 20 40, 20 40 C20 40, 4 30, 4 22 Z"
        fill="#7c2d8a"
      />
      <text
        x="46"
        y="32"
        fontFamily="Poppins, sans-serif"
        fontSize="28"
        fontWeight="700"
        fill="#7c2d8a"
        letterSpacing="-1"
      >
        aetna
      </text>
      <circle cx="170" cy="14" r="2.5" fill="#7c2d8a" />
    </svg>
  )
}

function UnitedMark() {
  return (
    <svg viewBox="0 0 180 50" width="140" height="38" aria-label="United Healthcare">
      {/* U logo */}
      <rect x="2" y="10" width="28" height="32" rx="2" fill="#002677" />
      <path
        d="M8 18 L8 30 C8 34, 12 36, 16 36 C20 36, 24 34, 24 30 L24 18"
        stroke="#ff6a00"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      <text x="36" y="22" fontFamily="Poppins, sans-serif" fontSize="12" fontWeight="700" fill="#002677">
        United
      </text>
      <text x="36" y="38" fontFamily="Poppins, sans-serif" fontSize="12" fontWeight="700" fill="#002677">
        Healthcare
      </text>
    </svg>
  )
}

function CignaMark() {
  return (
    <svg viewBox="0 0 180 44" width="130" height="32" aria-label="Cigna">
      <g transform="translate(4, 8)">
        <path
          d="M14 0 C22 0, 28 6, 28 14 C28 22, 22 28, 14 28 C6 28, 0 22, 0 14 C0 6, 6 0, 14 0 Z"
          fill="none"
          stroke="#f26522"
          strokeWidth="4"
        />
        <path d="M24 14 L28 14" stroke="white" strokeWidth="5" />
      </g>
      <text
        x="48"
        y="32"
        fontFamily="Poppins, sans-serif"
        fontSize="26"
        fontWeight="700"
        fill="#0096d6"
        letterSpacing="-0.5"
      >
        Cigna
      </text>
      <circle cx="132" cy="30" r="2.5" fill="#0096d6" />
    </svg>
  )
}

function AnthemMark() {
  return (
    <svg viewBox="0 0 200 46" width="140" height="32" aria-label="Anthem">
      <g transform="translate(0, 6)">
        <path
          d="M4 24 L14 4 L24 24 L20 24 L17 17 L11 17 L8 24 Z M12.5 13 L15.5 13 L14 9 Z"
          fill="#0a3b7d"
        />
      </g>
      <text
        x="36"
        y="32"
        fontFamily="Poppins, sans-serif"
        fontSize="24"
        fontWeight="700"
        fill="#0a3b7d"
        letterSpacing="-0.3"
      >
        Anthem.
      </text>
    </svg>
  )
}
