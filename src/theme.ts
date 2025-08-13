export type ThemeMode = 'system' | 'light' | 'dark'

const STORAGE_KEY = 'theme'

export function getStoredTheme(): ThemeMode | null {
  const value = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEY) : null
  if (value === 'light' || value === 'dark' || value === 'system') return value
  return null
}

export function getSystemPrefersDark(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
}

export function applyTheme(mode: ThemeMode) {
  const root = document.documentElement
  const isDark = mode === 'dark' || (mode === 'system' && getSystemPrefersDark())
  if (isDark) root.classList.add('dark')
  else root.classList.remove('dark')
}

export function setTheme(mode: ThemeMode) {
  window.localStorage.setItem(STORAGE_KEY, mode)
  applyTheme(mode)
}

export function initializeTheme() {
  const stored = getStoredTheme()
  applyTheme(stored || 'system')
}

export function watchSystemPreference(callback: () => void) {
  if (!window.matchMedia) return () => {}
  const mql = window.matchMedia('(prefers-color-scheme: dark)')
  const handler = () => callback()
  if (typeof mql.addEventListener === 'function') mql.addEventListener('change', handler)
  else if (typeof (mql as any).addListener === 'function') (mql as any).addListener(handler)
  return () => {
    if (typeof mql.removeEventListener === 'function') mql.removeEventListener('change', handler)
    else if (typeof (mql as any).removeListener === 'function') (mql as any).removeListener(handler)
  }
}

