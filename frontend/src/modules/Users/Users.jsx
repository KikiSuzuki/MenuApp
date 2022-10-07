import React, { useState } from 'react';
import {
  Card, Table,
} from 'antd';
import { useTranslation } from 'react-i18next';
import {
  useGetUsersQuery,
} from '../../store/api';
import { ApiState } from '../../shared/components';

export default function Users() {
  const { t, i18n } = useTranslation('users');

  const {
    data, error, isLoading, isFetching,
  } = useGetUsersQuery();

  return (
    <div className="flex flex-column gap-2 w-100">
      <Card title={t('users')} className="responsive-card sm-p-0">
        <ApiState error={error} isLoading={isLoading}>
          <Table rowKey="_id" dataSource={data} loading={isFetching} scroll={{ x: true }}>
            <Table.Column key="login" dataIndex="login" title={t('login')}  />
            <Table.Column key="lastname" dataIndex="lastname" title={t('lastname')} />
            <Table.Column key="firstname" dataIndex="firstname" title={t('firstname')}/>
            <Table.Column key="middlename" dataIndex="middlename" title={t('middlename')} />
            <Table.Column key="phone" dataIndex="phone" title={t('phone')} />
          </Table>
        </ApiState>
      </Card>
    </div>
  );
}
