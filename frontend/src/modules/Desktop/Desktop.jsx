import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
   IdcardOutlined,
  LoginOutlined,
} from '@ant-design/icons';
import styles from './Desktop.module.css';

function MenuItem({
  path = '/', icon = '', name = 'A', color = '',
}) {
  return (
    <Link to={path}>
      <div className={styles.menuItem}>
        <p className={styles.menuItemText} style={{ color }}>
          {icon}
          {' '}
          <span className="ml2 ml3-l pl1-l">{name}</span>
        </p>
      </div>
    </Link>
  );
}

export default function Desktop() {
  const { t } = useTranslation('desktop');

  return (
    <div className={styles.grid}>
      AAAA
      {/* <MenuItem icon={<IdcardOutlined className={styles.icon} />} path="/users" name={t('users')} color="#f4b183" />
      <MenuItem icon={<LoginOutlined className={styles.icon} />} path="/session-logs" name={t('session-logs')} color="#c00000" /> */}
    </div>
  );
}
