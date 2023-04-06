'use client'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from '@/styles/components/LoginForm.module.css'
import { useState } from 'react';
import { useCookies } from "react-cookie"
import { useRouter } from 'next/navigation'

const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
});


export default function Home() {
  const [error, setError] = useState('')
  const [_cookie, setCookie] = useCookies(["user"])
  const router = useRouter()
  return (
    <>
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            const response = await fetch('/api/auth', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(values),
            });

            const data = await response.json();
            if (response.ok) {
              console.log('Form submitted successfully:', data);
              setCookie("user", data.token, {
                path: "/",
                maxAge: 43200, // Expires after 12hr
                sameSite: true,
              })
              router.push('/')
              resetForm();
            } else {
              console.error('Error submitting form:', response.statusText);
              setError(data.error)
              resetForm();
            }
          } catch (error) {
            console.error('Error submitting form:', error);
            setError('Something fatal has happened')
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className={styles.container}>
              <label htmlFor="username">Username</label>
              <Field type="text" name="username" />
              <ErrorMessage className={styles.errorMessage} name="username" component="p" />
            </div>
            <div className={styles.container}>
              <label htmlFor="password">Password</label>
              <Field type="password" name="password" />
              <ErrorMessage className={styles.errorMessage} name="password" component="p" />
            </div>
            {error ? <p className={styles.errorMessage}>{error}</p> : null}
            <button className={styles.button} type="submit" disabled={isSubmitting}>
              Login
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
}
