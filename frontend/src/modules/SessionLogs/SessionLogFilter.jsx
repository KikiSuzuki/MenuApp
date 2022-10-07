import React, { useMemo } from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';

export default function SessionLogFilter({
  onChange, from, to,
}) {
  const value = useMemo(() => [
    from ? moment(from) : null,
    to ? moment(to) : null,
  ], [from, to]);

  return (
    <>
      <DatePicker.RangePicker onChange={onChange} value={value} />
    </>
  );
}
