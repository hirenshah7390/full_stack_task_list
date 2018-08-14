import * as types from './actionTypes';
import fetch from 'node-fetch';
import {beginAjaxCall} from './ajaxStatusActions';

export function loadDegreesSuccess(units){
  return{type: types.LOAD_ACADEMICUNIT_SUCCESS, units};
}

export function loadUnits() {
    return function(dispatch){      
      dispatch(beginAjaxCall());
      return fetch('http://localhost:5000/ors/academicUnit')
      .then(response => {
        response.json()
        .then(units => {                  
          dispatch(loadDegreesSuccess(units.data));
      }).catch(error => {
        throw(error);
      });
    });
    };
  }