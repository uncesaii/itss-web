import './Logo.css'

type LogoProps = {
  light?: boolean
}

export function Logo({ light = false }: LogoProps) {
  return (
    <span className={`logo${light ? ' logo--light' : ''}`} aria-hidden="true">
      <span className="logo__name">ITSS</span>
      <span className="logo__tagline">Information Technology Student Society</span>
    </span>
  )
}
