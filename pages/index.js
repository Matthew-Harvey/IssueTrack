import styles from '../styles/Home.module.css';
import SignIn from './signIn';

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main} id="root">
        <SignIn />
      </main>
    </div>
  )
}
