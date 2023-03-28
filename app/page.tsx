import styles from '@/styles/pages/login.module.css'
import LoginForm from '@/components/LoginForm'

export default function Home() {
  return (
    <section className={styles.login}>
      <h1>Login</h1>
      <LoginForm />
    </section>
  )
}
