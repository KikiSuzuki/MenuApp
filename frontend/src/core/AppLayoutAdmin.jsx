import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Layout, Menu, Icon } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
const { Header, Sider, Content } = Layout;

export default function AppLayout() {
  const nav = useNavigate();
  return (
    <Layout>
      <Sider trigger={null}>
        <div>
          <img src='logo.jpg' style={{margin:'16px', height: '32px'}} />
        </div>
        <Menu
          theme="dark"
          mode="inline">
            <Menu.Item>Users
              <Link to='/users'/>
            </Menu.Item>
            <Menu.Item>Restaurants
              <Link to='/restaurants'/>
            </Menu.Item>
            <Menu.Item>SessionLogs
              <Link to='/session-logs'/>
            </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        >
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 800,
          }}
        >
          <Outlet/>
        </Content>
      </Layout>
    </Layout>
  );
}
