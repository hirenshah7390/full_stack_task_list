import {combineReducers} from  'redux';
import users from './userReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';
import {reducer as toastrReducer} from 'react-redux-toastr';

const rootReducer = combineReducers({
  users,
  ajaxCallsInProgress,
  toastr: toastrReducer
});

export default rootReducer;
