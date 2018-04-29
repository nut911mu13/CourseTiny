import { combineReducers } from 'redux';
import auth from './auth';
import form from './form';

const rootReducer = combineReducers({
  auth,
  form
});

export default rootReducer;
