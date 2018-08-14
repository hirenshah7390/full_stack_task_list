import * as types from '../actions/actionTypes';
import  initialState from './initialState';

export default function userReducer(state= initialState.tasks, action){
    switch(action.type){
    case types.LOAD_USERS_SUCCESS:
      return action.tasks;

    case types.CREATE_USER_SUCCESS:        
      return[
        ...state,
        Object.assign({},action.task)
      ];

    case types.UPDATE_USER_SUCCESS:
      return[
        ...state.filter(task => task.id !== action.task.id),
        Object.assign({},action.task)
      ];

    default:
      return state;
  }
}
