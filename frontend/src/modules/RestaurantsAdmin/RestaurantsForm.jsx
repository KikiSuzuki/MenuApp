import React, { useEffect } from 'react';
import {
  Form, Input, Button,
} from 'antd';

export function RestaurantForm({
  onSubmit, isSubmitting, isSuccess,
}) {
  const [form] = Form.useForm();
  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
    }
  }, [isSuccess]);

  return (
    <Form form={form} name="restaurant" onFinish={onSubmit}>
      <Form.Item name="name" label='name' rules={[{ required: true }]}>
        <Input disabled={isSubmitting} />
      </Form.Item>
      <Form.Item name="phone" label='phone' rules={[{ required: true }]}>
        <Input disabled={isSubmitting} />
      </Form.Item>
      <Button htmlType="submit" type="primary" disabled={isSubmitting}>
        Save
      </Button>
    </Form>
  );
}
