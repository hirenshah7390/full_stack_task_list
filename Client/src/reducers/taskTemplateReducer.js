import * as types from '../actions/actionTypes';
import  initialState from './initialState';

export default function taskTemplateReducer(state= initialState.taskTemplates, action){  
  switch(action.type){
    case types.LOAD_TASKTEMPLATE_SUCCESS:
      return action.taskTemplates;

    default:
      return state;
  }
}
