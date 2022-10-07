import React from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input, Button } from 'antd';
import {
  MailOutlined,
  LockOutlined,
} from '@ant-design/icons';

export function LoginForm({ onFinish, onFinishFailed, isLoading }) {
  const { t } = useTranslation('login');

  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item name="login" rules={[{ required: true, message: t('emailRequired') }]}>
        <Input placeholder={t('email')} addonBefore={<MailOutlined />} disabled={isLoading} />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true, message: t('passwordRequired') }]}>
        <Input.Password placeholder={t('password')} addonBefore={<LockOutlined />} disabled={isLoading} />
      </Form.Item>
      <div className="tc">
        <Button htmlType="submit" disabled={isLoading} type="primary">
          {t('signIn')}
        </Button>
      </div>
    </Form>
  );
}
