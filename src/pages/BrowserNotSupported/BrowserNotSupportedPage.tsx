import { Logo } from '@/components/atoms/Logo'
import decorativeIcon from './assets/browser-not-supported-decorative.svg'
import styles from './BrowserNotSupportedPage.module.css'

/**
 * Ported from Figma (node 688:10923) for reference only — not wired into the real funnel.
 * Nothing in this prototype actually detects the visitor's browser, so there's no route or
 * redirect that ever lands here on its own; it's reachable only from the prototype index's own
 * menu, the same way every other stub/reference screen is.
 */
export function BrowserNotSupportedPage() {
  return (
    <main className={styles.page}>
      <div className={styles.leftPanel}>
        <Logo className={styles.logo} />
        <div className={styles.content}>
          <img src={decorativeIcon} alt="" aria-hidden="true" className={styles.icon} />
          <h1 className={styles.title}>Browser Not Supported</h1>
          <p className={styles.body}>
            Linus Health works best in the latest version of Chrome, Edge, or Safari. Please switch
            browsers or update to continue.
          </p>
        </div>
      </div>
      <div className={styles.rightPanel} aria-hidden="true" />
    </main>
  )
}
