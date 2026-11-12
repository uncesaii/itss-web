import { LogoMark } from './LogoMark'
import './Logo.css'

type LogoProps = {
  light?: boolean
  mark?: boolean
}

export function Logo({ light = false, mark = false }: LogoProps) {
  if (mark) {
    return (
      <span className={`logo logo--mark${light ? ' logo--light' : ''}`} aria-hidden="true">
        <LogoMark className="logo__badge" />
      </span>
    )
  }

  return (
    <span className={`logo${light ? ' logo--light' : ''}`} aria-hidden="true">
      <LogoMark className="logo__badge" />
      <span className="logo__divider" />
      <span className="logo__text">
        <span className="logo__eyebrow">Cavite State University - Silang Campus</span>
        <span className="logo__name">Information Technology Student Society</span>
      </span>
    </span>
  )
}
