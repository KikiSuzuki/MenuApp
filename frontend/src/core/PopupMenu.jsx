import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Popover, Menu } from 'antd';
import {
  MenuOutlined, PlusCircleOutlined, ApartmentOutlined, DesktopOutlined,
  ExportOutlined,
} from '@ant-design/icons';

export default function PopupMenu() {
  const navigate = useNavigate();
  const { t } = useTranslation('desktop');
  const handleMenuItemClick = useCallback(({ key }) => {
    navigate(`/${key}`);
  }, []);

  return (
    <Popover
      placement="bottom"
      content={(
        <Menu onClick={handleMenuItemClick}>
          <Menu.Item icon={<DesktopOutlined />} key="desktop">{t('desktop')}</Menu.Item>
          <Menu.Item icon={<PlusCircleOutlined />} key="scope">{t('scope')}</Menu.Item>
          <Menu.Item icon={<ApartmentOutlined />} key="journal">{t('journal')}</Menu.Item>
          {/*
          <Menu.Item icon={<SettingOutlined />} key="settings">{t('settings')}</Menu.Item>
          */}
          <Menu.Item icon={<ExportOutlined />} key="logout">{t('exit')}</Menu.Item>
        </Menu>
      )}
      trigger="click"
    >
      <MenuOutlined className="pointer" />
    </Popover>
  );
}
