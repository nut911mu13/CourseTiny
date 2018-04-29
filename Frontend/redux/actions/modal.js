import { fetchAsync } from '../../libs/helper';
import { showNotification } from './notification';

export const MODAL_SIGN_SHOW = 'MODAL_SIGN_SHOW';
export const MODAL_SIGN_HIDE = 'MODAL_SIGN_HIDE';
export const MODAL_SIGN_ERRORMSG = 'MODAL_SIGN_ERRORMSG';
export const MODAL_CHANGE_KEY = 'MODAL_CHANGE_KEY';

export const showModalSign = () => {
  return { type: MODAL_SIGN_SHOW };
}

export const hideModalSign = () => {
  return { type: MODAL_SIGN_HIDE };
}

export const changeModalKey = (key) => {
  return { type: MODAL_CHANGE_KEY, key };
}
