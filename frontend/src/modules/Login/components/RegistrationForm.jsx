import React from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input, Button } from 'antd';
import {
  MailOutlined,
  UserOutlined,
  LockOutlined,
} from '@ant-design/icons';

export function RegistrationForm({ onFinish, onFinishFailed }) {
  const { t } = useTranslation('login');

  return (
    <Form
      layout="vertical"
      autoComplete="off"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item name="firstname" rules={[{ required: true, message: t('firstnameRequired') }]}>
        <Input placeholder={t('firstname')} addonBefore={<UserOutlined />} />
      </Form.Item>
      <Form.Item name="lastname" rules={[{ required: true, message: t('lastnameRequired') }]}>
        <Input placeholder={t('lastname')} addonBefore={<UserOutlined />} />
      </Form.Item>
      <Form.Item name="login" rules={[{ required: true, message: t('emailRequired') }]}>
        <Input placeholder={t('email')} addonBefore={<MailOutlined />} />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true, message: t('passwordRequired') }]}>
        <Input.Password placeholder={t('password')} addonBefore={<LockOutlined />} />
      </Form.Item>
      <Button htmlType="submit" block>
        {t('save')}
      </Button>
    </Form>
  );
}
