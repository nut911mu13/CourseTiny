import { notification } from 'antd';
export const NOTIFICTION_SUCCESS = 'success';
export const NOTIFICTION_ERROR = 'error';
export const NOTIFICTION_INFO = 'info';
export const NOTIFICTION_WARNING = 'warning';
export const NOTIFICTION_WARN = 'warn';

export const openNotification = (type, message, description) => {
  const config = {
    message,
    description,
    duration: 3,
    placement: 'bottomRight'
  }
  switch (type) {
    case NOTIFICTION_SUCCESS:
      notification.success(config);
      break;
    case NOTIFICTION_ERROR:
      notification.error(config);
      break;
    case NOTIFICTION_INFO:
      notification.info(config);
      break;
    case NOTIFICTION_WARNING:
      notification.warning(config);
      break;
    case NOTIFICTION_WARN:
      notification.warn(config);
      break;
    default:
      notification.open(config);
  }
};
