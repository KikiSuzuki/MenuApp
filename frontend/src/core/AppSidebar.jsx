import React from 'react';
import { Link } from 'react-router-dom';
import { ImportOutlined } from '@ant-design/icons';
import logo from '../logo.svg';

export function AppSidebar() {
  return (
    <div className="dn flex-ns flex-column justify-between br b--e1 pa2 vh-100">
      <Link className="pt1" to="/desktop"><img src={logo} className="flex-1" alt="Logo" /></Link>
      <div className="flex flex-column items-center">
        {/*
        <Link title="Settings" to="/settings" className="mb3 grow hover-dark-blue">
          <SettingOutlined style={{ fontSize: '1.7rem' }} />
        </Link>
        */}
        <Link title="Exit" to="/logout" className="mb2 pt2 grow hover-dark-blue">
          <ImportOutlined style={{ fontSize: '1.7rem' }} />
        </Link>
      </div>
    </div>
  );
}
