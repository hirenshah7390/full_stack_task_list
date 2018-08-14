import {combineReducers} from  'redux';
import tasks from './userReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';
import {reducer as toastrReducer} from 'react-redux-toastr';

const rootReducer = combineReducers({
  tasks,
  ajaxCallsInProgress,
  toastr: toastrReducer
});

export default rootReducer;
