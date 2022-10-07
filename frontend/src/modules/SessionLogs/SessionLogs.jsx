import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Table } from 'antd';
import moment from 'moment';
import { useGetSessionLogsQuery } from '../../store/api';
import { ApiState } from '../../shared/components';
import { formatUser } from '../../shared/functions';
import SessionLogFilter from './SessionLogFilter';
import styles from './SessionLog.module.css';

export default function SessionLogs() {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const { data, error, isLoading } = useGetSessionLogsQuery({ page, startDate, endDate });
  const renderDate = useCallback((date) => (date ? moment(date).format('DD.MM.YYYY HH:mm') : '-'), []);
  const renderUser = useCallback((user) => `${user.login} - ${formatUser(user)}`, []);

  return (
    <Card title="Логи" className="responsive-card sm-p-0">
      <ApiState error={error} isLoading={isLoading}>
        <div className={styles.grid}>
          <Card title="Фильтры">
            <SessionLogFilter
              onChange={(_, dates) => { setStartDate(dates[0]); setEndDate(dates[1]); }}
              from={startDate}
              to={endDate}
            />
          </Card>
        </div>
        <Table
          dataSource={data?.logs}
          size="middle"
          bordered
          rowKey="_id"
          pagination={{
            pageSize: 10,
            total: data?.count,
            onChange: setPage,
          }}
        >
          <Table.Column title="Пользователь" dataIndex="user" key="user" render={renderUser} />
          <Table.Column title="Время входа" dataIndex="createdAt" key="createdAt" render={renderDate} />
          <Table.Column title="IP" dataIndex="ip" key="ip" />
        </Table>
      </ApiState>
    </Card>
  );
}
