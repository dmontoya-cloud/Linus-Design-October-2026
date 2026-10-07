import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useAuth } from '@/auth'
import { Toast } from '@/components/atoms/Toast'
import { DashboardNavBar } from '../DashboardNavBar'
import { FullCheckInCardV2 } from './FullCheckInCardV2'
import { PostReportSurvey } from './PostReportSurvey'
import { ReportCTACard } from './ReportCTACard'
import { TOTAL_ACTIVITY_COUNT } from './activitiesV2'
import { ResourcesCard } from './ResourcesCard'
import { cascadeDelay } from '../cascade'
import styles from './DashboardPageV2.module.css'

/** How long the "Activity completed" toast stays up before auto-dismissing, on top of its own
 * always-available manual close (×) button. */
const ACTIVITY_TOAST_AUTO_DISMISS_MS = 5000

/**
 * DashboardPageV2 — second, independently-editable version of the Dashboard screen, rebuilt per
 * the Figma mock at node 884:2881 (file `uajF7CIU6kCyd2epbvlNNl`). Which one actually renders at
 * `/dashboard` is picked in App.tsx by `ACTIVE_DASHBOARD_VARIANT` (see `dashboardVariant.ts`),
 * not by anything in the UI.
 *
 * Differs from Dashboard 1 in two ways, per that mock: `FullCheckInCardV2` merges the hero
 * header and the three-activity row into one card (each activity's icon recolors success-green
 * once complete, rather than a separate progress-bar tracker plus a standalone card grid below
 * it — see that component's own doc comment), and a new `ReportCTACard` section sits between it
 * and "Learn more about brain health", reusing the exact same visibility rule Dashboard 1's
 * `FullCheckInCard` already applies to its own secondary "Create my report" button.
 */
export function DashboardPageV2() {
  const { profile } = useAuth()
  const location = useLocation()
  const [showSurvey, setShowSurvey] = useState(
    () => (location.state as { showSurvey?: boolean } | null)?.showSurvey === true,
  )
  // Set by ReportReadyPage's "Go to Dashboard" button (see its own `handleGoToDashboard`) —
  // the one real place in the app an activity actually finishes. Same `location.state`
  // hand-off pattern as `showSurvey` above.
  const [showActivityToast, setShowActivityToast] = useState(
    () =>
      (location.state as { activityJustCompleted?: boolean } | null)?.activityJustCompleted ===
      true,
  )

  useEffect(() => {
    if (!showActivityToast) return
    const timer = window.setTimeout(
      () => setShowActivityToast(false),
      ACTIVITY_TOAST_AUTO_DISMISS_MS,
    )
    return () => window.clearTimeout(timer)
  }, [showActivityToast])

  return (
    <div className={styles.page}>
      <DashboardNavBar />

      <main className={styles.content}>
        <h1
          className={[styles.welcome, styles.reveal].join(' ')}
          style={{ animationDelay: cascadeDelay(0) }}
        >
          Welcome, {profile?.firstName ?? 'there'}!
          <br className={styles.welcomeBreak} />{' '}
          <span className={styles.welcomeSubtext}>We&rsquo;re so glad you&rsquo;re here.</span>
        </h1>
        <div className={styles.reveal} style={{ animationDelay: cascadeDelay(1) }}>
          <FullCheckInCardV2 />
        </div>
        <div className={styles.reveal} style={{ animationDelay: cascadeDelay(2) }}>
          <ReportCTACard totalActivityCount={TOTAL_ACTIVITY_COUNT} />
        </div>
        <h2
          className={[styles.copy, styles.copyNoSubtext, styles.reveal].join(' ')}
          style={{ animationDelay: cascadeDelay(3) }}
        >
          Learn more about brain health
        </h2>
        <div className={styles.reveal} style={{ animationDelay: cascadeDelay(4) }}>
          <ResourcesCard />
        </div>
      </main>
      {showSurvey ? <PostReportSurvey onClose={() => setShowSurvey(false)} /> : null}
      {showActivityToast ? (
        <div className={styles.toastWrapper}>
          <Toast
            variant="success"
            title="Activity completed"
            message="Your progress is saved"
            onClose={() => setShowActivityToast(false)}
          />
        </div>
      ) : null}
    </div>
  )
}
