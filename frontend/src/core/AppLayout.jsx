/* eslint-disable no-plusplus */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Outlet, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import HeaderMenu from './HeaderMenu';
import styles from './AppLayout.module.css';
import { resetUser } from '../store/user';

export default function AppLayout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation('layout');

  useEffect(() => {
    const cookie = (function getCookie(user) {
      const cookieArr = document.cookie.split(';');
      for (let i = 0; i < cookieArr.length; i++) {
        const cookiePair = cookieArr[i].split('=');
        if (user === cookiePair[0].trim()) {
          return decodeURIComponent(cookiePair[1]);
        }
      }
      return null;
    }('connect.sid'));
    if (!cookie) {
      dispatch(resetUser());
      navigate('/');
    }
  }, []);

  return (
    <div className={styles.grid}>
      <div className="flex flex-column w-100">
        <header className={styles.header}>
          <Link className="ma0 lh-solid b black" to="/desktop"><span className={styles.headerTitle}>{t('mainMenu')}</span></Link>
          <HeaderMenu />
        </header>
        <main className={styles.content}>
          <Outlet />
        </main>
        <footer className="flex bt b--e1 items-center pv1">
        </footer>
      </div>
    </div>
  );
}
