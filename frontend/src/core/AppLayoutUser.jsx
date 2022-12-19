import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Link } from "react-router-dom";
import { Layout, Menu, Avatar } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
const { Header, Sider, Content } = Layout;

export default function AppLayout() {
  return (
    <Layout>
      <div style={{margin:'10px'}}>
        <img src='logo.jpg' style={{height: '32px', display:'block', marginLeft:'auto', marginRight:'auto'}} />
      </div>
      <Menu  style={{ display: 'block' }} theme='dark' mode='horizontal'>
          <Menu.Item style={{float: 'left', margin:'10px', marginLeft:'30px'}}>Restaurants
            <Link to='/restaurants'/>
          </Menu.Item>
          <Menu.Item style={{float: 'right'}}>
            <Avatar style={{margin:'16px', marginRight:'30px'}} size={30} icon={<UserOutlined />}/>
            <Link to='/logout'/>
          </Menu.Item>
      </Menu>
      <Layout className="site-layout">
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
