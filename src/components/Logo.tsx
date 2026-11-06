import './Logo.css'

type LogoProps = {
  light?: boolean
  mark?: boolean
}

export function Logo({ light = false, mark = false }: LogoProps) {
  if (mark) {
    return (
      <span className={`logo logo--mark${light ? ' logo--light' : ''}`} aria-hidden="true">
        <img className="logo__badge" src="/itss-logo.png" alt="" width="512" height="512" />
      </span>
    )
  }

  return (
    <span className={`logo${light ? ' logo--light' : ''}`} aria-hidden="true">
      <img className="logo__badge" src="/itss-logo.png" alt="" width="512" height="512" />
      <span className="logo__text">
        <span className="logo__eyebrow">Cavite State University — Silang Campus</span>
        <span className="logo__top">Information Technology</span>
        <span className="logo__name">Student Society</span>
      </span>
    </span>
  )
}
