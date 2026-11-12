type LogoMarkProps = {
  className?: string
}

export function LogoMark({ className }: LogoMarkProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 96 96"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <circle
        cx="48"
        cy="48"
        r="45.2"
        stroke="currentColor"
        strokeOpacity="0.5"
        strokeWidth="1.4"
      />

      <path
        d="M48 15 76.6 31.5v33L48 81 19.4 64.5v-33Z"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinejoin="round"
      />

      <path
        d="M48 22 70.5 35v26L48 74 25.5 61V35Z"
        stroke="#2f37ff"
        strokeWidth="3.4"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      <g fill="currentColor" stroke="#2f37ff" strokeWidth="2.4">
        <circle cx="48" cy="22" r="3.1" />
        <circle cx="70.5" cy="35" r="3.1" />
        <circle cx="70.5" cy="61" r="3.1" />
        <circle cx="48" cy="74" r="3.1" />
        <circle cx="25.5" cy="61" r="3.1" />
        <circle cx="25.5" cy="35" r="3.1" />
      </g>

      <text
        x="48"
        y="58"
        textAnchor="middle"
        fontFamily="Roboto, Arial, sans-serif"
        fontSize="26"
        fontWeight="900"
        letterSpacing="-1.2"
        fill="#2f37ff"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
        paintOrder="stroke"
      >
        IT
      </text>
    </svg>
  )
}