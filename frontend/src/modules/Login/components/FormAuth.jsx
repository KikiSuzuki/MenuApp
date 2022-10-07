import React, { useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Card, Select } from 'antd';
import logo from '../../../logo.svg';
//  import { PasswordRecovery } from './PasswordRecovery';
import { LoginForm } from './LoginForm';
import { RegistrationForm } from './RegistrationForm';
import { loginUser, registrationUser } from '../../../store/user/user.slice';
import { userSelectors } from '../../../store/user';

export function FormAuth() {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation('login');
  const [tab, setTab] = useState('0');
  const user = useSelector(userSelectors.selectUser);
  const isLoading = useSelector(userSelectors.selectUserIsLoading);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/users');
    }
  }, [user]);

  const handleLoginFormSubmit = useCallback((data) => {
    dispatch(loginUser(data));
  }, [dispatch]);

  const handleRegistrationFormSubmit = useCallback((data) => {
    dispatch(registrationUser(data));
  }, [dispatch]);

  const handleLanguageSelect = useCallback((lang) => {
    i18n.changeLanguage(lang);
  }, []);

  return (
    <div style={{ maxWidth: '550px', width: '100%' }}>
      <span className="db tc mb3">
        <img src={logo} alt="Logo" width={86} height={86} />
      </span>
      <Card
        activeTabKey={tab}
        onTabChange={setTab}
        tabProps={{ centered: true }}
        tabList={[
          { key: '0', tab: t('signIn') },
          { key: '1', tab: t('register') },
          //  { key: '2', tab: t('resetPassword') },
        ]}
        style={{backgroundColor:'black', opacity:'.7' }}
      >
        <div className="ph4 pv1">
          <div className="flex mb2">
            <Select onChange={handleLanguageSelect} value={i18n.language} className="flex-1">
              <Select.Option value="ru">Ru</Select.Option>
              <Select.Option value="kz">Kz</Select.Option>
            </Select>
          </div>
          {tab === '0' && (
            <LoginForm
              isLoading={isLoading}
              onFinish={handleLoginFormSubmit}
            />
          )}
          {
          tab === '1' && (
            <RegistrationForm
              isLoading={isLoading}
              onFinish={handleRegistrationFormSubmit}
            />
          )
          }
          {/*
          tab === '2' && (
            <PasswordRecovery
              isLoading={isLoading}
              onFinish={onFinish}
            />
          )
          */}
          <div onClick={()=>setTab('1')}>Registation</div>
        </div>
      </Card>
    </div>
  );
}
