import React from 'react';
import { CopyRight, Banner, FormAuth } from './components';
import styles from './Login.module.css';

function Login() {
  return (
    <div className="h-100">
      <main className={styles.main}>
        <Banner />
        <FormAuth />
      </main>
      <footer className={styles.footer}>
        <CopyRight />
      </footer>
    </div>
  );
}

export default Login;
