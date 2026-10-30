import { routePaths, viewIds, type ViewId } from './content'

const pathViews = new Map<string, ViewId>(
  viewIds.map((view) => [routePaths[view], view]),
)

const legacyPathAliases: Record<string, ViewId> = {
  '/gallery': 'gallery',
  '/projects': 'projects',
  '/cbl': 'cbl',
  '/announcements': 'announcements',
}

export function normalizePath(pathname: string): string {
  const trimmed = pathname.replace(/\/+$/, '')
  return trimmed === '' ? '/' : trimmed
}

export function isViewId(value: string): value is ViewId {
  return (viewIds as readonly string[]).includes(value)
}

export function pathForView(view: ViewId): string {
  return routePaths[view]
}

export function viewForPath(pathname: string): ViewId | null {
  const path = normalizePath(pathname)
  return pathViews.get(path) ?? legacyPathAliases[path] ?? null
}
