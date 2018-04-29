export const NOTIFICATION_SHOW = 'NOTIFICATION_SHOW';

export const showNotification = (message = '', style = 'primary') => {
 return { type: NOTIFICATION_SHOW, message, style } 
}