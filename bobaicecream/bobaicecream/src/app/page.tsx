import Image from 'next/image'
import styles from './page.module.css'
import Link from 'next/link'
import Navbar from './Navbar'

export default function Home() {
  return (
    <div className={styles.container}>
      <Navbar />
      <main>
        <div className={styles.title}>
          <span>BOBA &times;&nbsp;</span>
          <span>ICE CREAM</span>
        </div>
        <div className={styles.subtitle}>
          <span>
            A MAGICAL DUO
          </span>
          <span>
            OF BOBA
          </span>
          <span>
            AND ICE CREAM
          </span>
        </div>
      </main>
    </div>
  )
}
