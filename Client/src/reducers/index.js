import {combineReducers} from  'redux';
import tasks from './taskReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';
import {reducer as toastrReducer} from 'react-redux-toastr';

const rootReducer = combineReducers({
  tasks,
  ajaxCallsInProgress,
  toastr: toastrReducer
});

export default rootReducer;
