import { message } from 'antd';

export function showErrorMessage(content) {
  message.error({
    content,
    className: 'custom-notification custom-notification-error',
    duration: 5,
  });
}

export function showSuccessMessage(content) {
  message.success({
    content,
    className: 'custom-notification custom-notification-success',
    duration: 5,
  });
}

export function showInfoMessage(content) {
  message.info({
    content,
    className: 'custom-notification custom-notification-info',
    duration: 5,
  });
}
