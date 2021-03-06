import {combineReducers} from  'redux';
import tasks from './taskReducer';
import taskTemplates from './taskTemplateReducer'
import ajaxCallsInProgress from './ajaxStatusReducer';
import {reducer as toastrReducer} from 'react-redux-toastr';
import  authentication  from './authenticationReducer';
import  registration from './registrationReducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
  tasks,
  taskTemplates,
  authentication,
  registration,
  alert,
  ajaxCallsInProgress,
  toastr: toastrReducer
});

export default rootReducer;
