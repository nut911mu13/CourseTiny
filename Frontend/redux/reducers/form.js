import {
  MODAL_SIGN_SHOW,
  MODAL_SIGN_HIDE,
  MODAL_SIGN_ERRORMSG,
  MODAL_CHANGE_KEY
} from '../actions/modal';

const initialState = {
  signForm: {
    activeKey: 'signin',
    show: false,
    errorMsg: ''
  }
}

const form = (state = initialState, action) => {
  switch (action.type) {
    case MODAL_SIGN_SHOW:
      return {
        ...state,
        signForm: {
          ...state.signForm,
          show: true
        }
      };
    case MODAL_SIGN_HIDE:
      return {
        ...state,
        signForm: {
          ...state.signForm,
          show: false
        }
      };
    case MODAL_SIGN_ERRORMSG:
      return {
        ...state,
        signForm: {
          ...state.signForm,
          errorMsg: action.errorMsg
        }
      };
    case MODAL_CHANGE_KEY:
      return {
        ...state,
        signForm: {
          ...state.signForm,
          activeKey: action.key
        }
      };
    default:
      return state;
  }
}

export default form;
