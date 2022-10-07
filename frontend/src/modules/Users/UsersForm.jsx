import React, { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Form, Input, Button, Select, Row, Col, Checkbox,
} from 'antd';
import { useGetDepartmentsQuery, useGetCompaniesQuery } from '../../store/api';
import { getLanguage } from '../../shared/functions';

export function UsersForm({
  onSubmit, isSubmitting, isSuccess, isEditing = false, initialValues,
}) {
  const { t, i18n } = useTranslation('users');
  const [form] = Form.useForm();
  const { data: departments, isLoading: isLoadingDepartments } = useGetDepartmentsQuery();
  const { data: companies, isLoading: isLoadingCompanies } = useGetCompaniesQuery();

  const languagePrefix = useMemo(() => `_${getLanguage(i18n.language)}`, [i18n.language]);

  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues]);

  return (
    <Form form={form} name="user" onFinish={onSubmit}>
      <Row gutter={32}>
        <Col lg={12} sm={24}>
          <Form.Item name="lastname" label={t('lastname')} rules={[{ required: !isEditing }]}>
            <Input disabled={isSubmitting} />
          </Form.Item>
        </Col>
        <Col lg={12} sm={24}>
          <Form.Item name="firstname" label={t('firstname')} rules={[{ required: !isEditing }]}>
            <Input disabled={isSubmitting} />
          </Form.Item>
        </Col>
        <Col lg={12} sm={24}>
          <Form.Item name="middlename" label={t('middlename')}>
            <Input disabled={isSubmitting} />
          </Form.Item>
        </Col>
        <Col lg={12} sm={24}>
          <Form.Item name="iin" label={t('iin')} rules={[{ required: !isEditing, len: 12 }]}>
            <Input disabled={isSubmitting} />
          </Form.Item>
        </Col>
        <Col lg={12} sm={24}>
          <Form.Item name="position_ru" label={t('position_ru')} rules={[{ required: !isEditing }]}>
            <Input disabled={isSubmitting} />
          </Form.Item>
        </Col>
        <Col lg={12} sm={24}>
          <Form.Item name="position_kz" label={t('position_kz')} rules={[{ required: !isEditing }]}>
            <Input disabled={isSubmitting} />
          </Form.Item>
        </Col>
        <Col lg={12} sm={24}>
          <Form.Item name="phone" label={t('phone')}>
            <Input disabled={isSubmitting} />
          </Form.Item>
        </Col>
        <Col lg={12} sm={24}>
          <Form.Item name="department" label={t('department')}>
            <Select loading={isLoadingDepartments} disabled={isSubmitting}>
              {departments?.map((location) => (
                <Select.Option value={location._id} key={location._id}>
                  {location?.[`name${languagePrefix}`]}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col lg={12} sm={24}>
          <Form.Item name="company" label={t('company')}>
            <Select loading={isLoadingCompanies} disabled={isSubmitting}>
              {companies?.map((location) => (
                <Select.Option value={location._id} key={location._id}>
                  {location?.[`name${languagePrefix}`]}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col lg={12} sm={24}>
          <Form.Item name="login" label={t('login')} rules={[{ required: !isEditing }]}>
            <Input disabled={isSubmitting} />
          </Form.Item>
        </Col>
        <Col lg={12} sm={24}>
          <Form.Item name="email" label={t('email')} rules={[{ required: !isEditing }]}>
            <Input type="email" disabled={isSubmitting} />
          </Form.Item>
        </Col>
        <Col lg={12} sm={24}>
          <Form.Item name="password" label={t('password')} rules={[{ required: !isEditing }]}>
            <Input.Password disabled={isSubmitting} autoComplete="new-password" />
          </Form.Item>
        </Col>
        <Col lg={12} sm={24}>
          <Form.Item name="approveRoles" label={t('approveRoles')}>
            <Select mode="multiple" allowClear disabled={isSubmitting}>
              <Select.Option value="wprd">{t('wprd')}</Select.Option>
              <Select.Option value="wrp">{t('wrp')}</Select.Option>
              <Select.Option value="wp">{t('wp')}</Select.Option>
              <Select.Option value="hsd">{t('hsd')}</Select.Option>
              <Select.Option value="sbu">{t('sbu')}</Select.Option>
              <Select.Option value="icd">{t('icd')}</Select.Option>
              <Select.Option value="wpi">{t('wpi')}</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col lg={12} sm={24}>
          <Form.Item name="appRole" label={t('appRole')}>
            <Select disabled={isSubmitting}>
              <Select.Option value="super_admin">{t('super_admin')}</Select.Option>
              <Select.Option value="admin">{t('admin')}</Select.Option>
              <Select.Option value="docs_approver">{t('docs_approver')}</Select.Option>
              <Select.Option value="management">{t('management')}</Select.Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Form.Item name="active" valuePropName="checked" label={t('active')}>
        <Checkbox disabled={isSubmitting} />
      </Form.Item>
      <Button htmlType="submit" type="primary" disabled={isSubmitting}>
        {t('save')}
      </Button>
    </Form>
  );
}
