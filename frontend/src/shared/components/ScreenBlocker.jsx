import React from 'react';
import { Spin } from 'antd';
import { useTranslation } from 'react-i18next';

export function ScreenBlocker() {
  const { t } = useTranslation('layout');

  return (
    <div className="fixed w-100 h-100 bg-black-70 top-0 left-0 z-9999 flex items-center justify-center gap-2">
      <Spin size="large" />
      <h1 className="ma0 white-60">{t('loading')}...</h1>
    </div>
  );
}

export default ScreenBlocker;
