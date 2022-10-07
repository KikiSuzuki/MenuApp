import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Select } from 'antd';
import PopupProfile from './PopupProfile';
import PopupMenu from './PopupMenu';
import styles from './HeaderMenu.module.css';

export default function HeaderMenu() {
  const { i18n } = useTranslation();

  const handleLanguageSelect = useCallback((lang) => {
    i18n.changeLanguage(lang);
  }, []);

  return (
    <div className={styles.menuSection}>
      <Select onChange={handleLanguageSelect} value={i18n.language}>
        <Select.Option value="ru">Ru</Select.Option>
        <Select.Option value="kz">Kz</Select.Option>
      </Select>
      <PopupProfile />
      <PopupMenu />
    </div>
  );
}
