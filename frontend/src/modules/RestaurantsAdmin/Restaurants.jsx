import React, {
  useCallback, useState,
} from 'react';
import {
  Card, Table, Dropdown, Button, Menu,
  Row, Col,
} from 'antd';
import {
  useGetRestaurantsQuery, usePostRestaurantsMutation, useDeleteRestaurantsMutation
} from '../../store/api';
import { ApiState } from '../../shared/components';
import { RestaurantForm } from './RestaurantsForm';

export default function Restaurants() {
  const {
    isLoading, error, data, isFetching,
  } = useGetRestaurantsQuery();
  const [
    postRestaurant,
    { isLoading: isSubmitting, isSuccess, error: postError },
  ] = usePostRestaurantsMutation();
  // const [
  //   deleteRestaurant,
  //   { error: deleteError, isLoading: isDeleting },
  // ] = useDeleteRestaurantsMutation();

  const renderActionsMenu = useCallback((row) => {
    const handleMenuClick = ({ key }) => {
      if (key === `delete-${row._id}`) {
        // deleteRestaurant(row._id);
      }
    };
    return (
      <Dropdown
        placement="bottom"
        overlay={(
          <Menu
            onClick={handleMenuClick}
            items={[
              { key: `delete-${row._id}`, label: 'delete' }
            ]}
          />
        )}
      >
        <Button>actions</Button>
      </Dropdown>
    );
  });

  return (
    <Row gutter={[32, 32]}>
      <Col xl={16} lg={24}>
        <Card title='restaurants' className="responsive-card sm-p-0">
          <ApiState isLoading={isLoading} error={error}>
            <Table
              loading={isFetching}
              dataSource={data}
              size="middle"
              bordered
              rowKey="_id"
              scroll={{ x: true }}
              pagination={{
                pageSize: 10,
                showSizeChanger: false,
              }}
            >
              <Table.Column
                title="ID"
                dataIndex="_id"
                key="id"
              />
              <Table.Column
                title='name'
                dataIndex="name"
                key="name"
              />
              <Table.Column
                title="phone"
                dataIndex="phone"
                key="phone"
              />
              <Table.Column key="actions" render={renderActionsMenu} fixed="right" />
            </Table>
          </ApiState>
        </Card>
      </Col>
      <Col xl={8} lg={24} className="flex-1">
        <Card title='newRestaurant' className="responsive-card">
          <RestaurantForm
            onSubmit={postRestaurant}
          />
        </Card>
      </Col>
    </Row>
  );
}
