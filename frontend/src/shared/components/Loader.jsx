import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';

export function Loader() {
  const [language, setLanguage] = useState('ru');

  useEffect(() => {
    const lang = localStorage.getItem('i18nextLng');
    if (lang) {
      setLanguage(lang);
    }
  }, []);

  return (
    <div className="w-100 h5 flex items-center justify-center gap-2">
      <Spin size="large" />
      <h1 className="ma0">{language === 'ru' ? 'Загрузка' : 'Жүктеу'}...</h1>
    </div>
  );
}
