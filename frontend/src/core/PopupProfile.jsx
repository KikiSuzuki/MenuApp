import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Popover, Avatar, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { userSelectors } from '../store/user';

export default function PopupProfile() {
  const user = useSelector(userSelectors.selectUser);
  const { t } = useTranslation('layout');

  const content = (
    <div className="db tc pa4 ba b--dashed b--e1">
      <Avatar className="f1 mb3" size={92} icon={<UserOutlined />} />
      <ul className="list ma0 pa0 mv3">
        <li className="b">
          {`${user?.lastname || ''} ${user?.firstname || ''}`}
        </li>
        <li>{user?.position}</li>
        <li>{user?.email}</li>
      </ul>
      <Link to="/profile">
        <Button type="primary" shape="round">{t('profile')}</Button>
      </Link>
    </div>
  );
  return (
    <Popover placement="bottom" content={content} trigger="click">
      <UserOutlined className="pointer" />
    </Popover>
  );
}
