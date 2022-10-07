import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ScreenBlocker } from '../shared/components';
import { useLogoutMutation } from '../store/api';
import { resetUser, userSelectors } from '../store/user';

export default function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation('layout');
  const user = useSelector(userSelectors.selectIsLogged);
  const [logout, { isSuccess }] = useLogoutMutation();

  useEffect(() => {
    logout();
    dispatch(resetUser());
  }, []);

  useEffect(() => {
    if (isSuccess && !user) {
      navigate('/');
    }
  }, [user, isSuccess]);

  return (
    <ScreenBlocker>{t('loading')}...</ScreenBlocker>
  );
}
