'use client'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from '@/styles/components/LoginForm.module.css'

const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
});


export default function Home() {
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

            if (response.ok) {
              const data = await response.json();
              console.log('Form submitted successfully:', data);
              resetForm();
            } else {
              console.error('Error submitting form:', response.statusText);
              resetForm();
            }
          } catch (error) {
            console.error('Error submitting form:', error);
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
            <button className={styles.button} type="submit" disabled={isSubmitting}>
              Login
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
}
