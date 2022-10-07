import React from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input, Button } from 'antd';
import {
  MailOutlined,
  HolderOutlined,
} from '@ant-design/icons';

export function PasswordRecovery({ onFinish, onFinishFailed }) {
  const { t } = useTranslation('login');

  return (
    <Form
      layout="vertical"
      autoComplete="off"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item name="email" rules={[{ required: true, message: t('emailRequired') }]}>
        <Input
          id="recoveryEmail"
          placeholder={t('email')}
          addonBefore={<MailOutlined />}
        />
      </Form.Item>
      {/*
      <Form.Item name="pin" rules={[{ required: true }]}>
        <Input placeholder="Pin code" addonBefore={<HolderOutlined />} />
      </Form.Item>
    */}
      <Button
        block
        className="db cb silver tc ma0 mt3 pa0 f6 pointer hover-blue"
        type="submit"
      >
        {t('sendEmail')}
      </Button>
    </Form>
  );
}
