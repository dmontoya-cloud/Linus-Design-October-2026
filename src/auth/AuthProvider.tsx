import { useMemo, useState, type ReactNode } from 'react'
import { AuthContext, type AuthState, type Profile, type ConsentRecord } from './authContext'

/**
 * Mock authentication + onboarding state, held in memory only — this repo
 * is mock-data-only (no real backend), so "logging in" just flips a
 * flag and "consenting" just records a timestamp. Nothing persists across
 * a reload.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  // Running inside an iframe only happens in this repo's own prototype-index thumbnails
  // (App.tsx's MenuCard) — each one is a fresh browsing context with no access to the real
  // app's auth state, so without this every RequireAuth-gated route's thumbnail would just
  // show the Login redirect instead of the real page. `window.top` is safe to read here since
  // these thumbnails are always same-origin. jsdom (tests) has no real iframe, so
  // `self === top` there and this stays `false`, same as before. Excludes the three pre-auth
  // pages (Login, Verify Email, Verify Account) — their whole point is to show the signed-out
  // state, and `LoginRoute` redirects straight past Login once authenticated, which would
  // otherwise make its own thumbnail show some other page entirely.
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const isPreAuthPage = ['/login', '/verify-email', '/verify-account'].some((path) =>
      window.location.pathname.endsWith(path),
    )
    return window.self !== window.top && !isPreAuthPage
  })
  const [preferredName, setPreferredName] = useState<string | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [consent, setConsent] = useState<ConsentRecord | null>(null)
  const [completedActivityIds, setCompletedActivityIds] = useState<string[]>([])
  const [hasBuiltReport, setHasBuiltReport] = useState(false)

  const value = useMemo<AuthState>(
    () => ({
      isAuthenticated,
      preferredName,
      profile,
      consent,
      completedActivityIds,
      hasBuiltReport,
      login: () => setIsAuthenticated(true),
      logout: () => {
        setIsAuthenticated(false)
        setPreferredName(null)
        setProfile(null)
        setConsent(null)
        setCompletedActivityIds([])
        setHasBuiltReport(false)
      },
      setPreferredName: (name: string) => setPreferredName(name),
      saveProfile: (nextProfile: Profile) => setProfile(nextProfile),
      giveConsent: () => setConsent({ acceptedAt: new Date().toISOString() }),
      completeActivity: (id: string) => {
        if (completedActivityIds.includes(id)) return
        setCompletedActivityIds((ids) => [...ids, id])
        setHasBuiltReport(false)
      },
      markReportBuilt: () => setHasBuiltReport(true),
    }),
    [isAuthenticated, preferredName, profile, consent, completedActivityIds, hasBuiltReport],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
