type ArrowRightProps = {
  className?: string
}

export function ArrowRight({ className }: ArrowRightProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M3.5 12h17M14.5 5.5 21 12l-6.5 6.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="square"
      />
    </svg>
  )
}
