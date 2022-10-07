import React from 'react';
import { useTranslation } from 'react-i18next';

export function Banner() {
  const { t } = useTranslation('login');

  return (
    <div style={{ maxWidth: '600px' }}>
      <h2 className="db tc f2 f1-ns b mt2 mb0 lh-solid white ba">{t('appName')}</h2>
    </div>
  );
}
