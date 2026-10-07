import { Logo } from '@/components/atoms/Logo'
import decorativeIcon from './assets/geolocation-error-decorative.svg'
import styles from './GeolocationErrorPage.module.css'

/**
 * No Figma frame existed for this one (unlike BrowserNotSupportedPage, ported from a real
 * frame) — built as its sibling instead, same shell and the same decorative icon, on request.
 * Reference only, same as BrowserNotSupportedPage: nothing in this prototype actually checks the
 * visitor's location, so no route or redirect ever lands here on its own — reachable only from
 * the prototype index's own menu.
 */
export function GeolocationErrorPage() {
  return (
    <main className={styles.page}>
      <div className={styles.leftPanel}>
        <Logo className={styles.logo} />
        <div className={styles.content}>
          <img src={decorativeIcon} alt="" aria-hidden="true" className={styles.icon} />
          <h1 className={styles.title}>Not Available In Your Region</h1>
          <p className={styles.body}>
            The Linus Health app is not available for patients outside of the United States.
            We&rsquo;re sorry for any inconvenience.
          </p>
        </div>
      </div>
      <div className={styles.rightPanel} aria-hidden="true" />
    </main>
  )
}
