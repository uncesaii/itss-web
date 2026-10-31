import { Component, type ErrorInfo, type ReactNode } from 'react'
import './ErrorBoundary.css'

type ErrorBoundaryProps = {
  children: ReactNode
}

type ErrorBoundaryState = {
  hasError: boolean
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Unhandled UI error', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary" role="alert">
          <div className="error-boundary__inner">
            <p className="error-boundary__eyebrow">Something went wrong</p>
            <h1 className="error-boundary__title">The page could not be displayed</h1>
            <p className="error-boundary__text">
              Try reloading the page. If the problem continues, contact ITSS.
            </p>
            <button
              className="btn btn--dark"
              type="button"
              onClick={() => window.location.reload()}
            >
              Reload page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
