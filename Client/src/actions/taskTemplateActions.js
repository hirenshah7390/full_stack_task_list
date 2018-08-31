import * as types from './actionTypes';
import {beginAjaxCall} from './ajaxStatusActions';
import { API_BASE_URL, TASK_LIST_SIZE, ACCESS_TOKEN } from '../constants';
import fetch from 'node-fetch';

const request = (options) => { 
  const headers = new Headers({
      'Content-Type': 'application/json',
  });  
 
  if(localStorage.getItem(ACCESS_TOKEN)) {
  headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN));  
  }

  const defaults = {headers: headers};
  options = Object.assign({}, defaults, options);  
  return fetch(options.url, options)
  .then(response => 
      response.json().then(json => {
          if(!response.ok) {
              return Promise.reject(json);
          }
          return json;
      })
  );
};

export function loadTaskTemplatesSuccess(taskTemplates){
  return {type: types.LOAD_TASKTEMPLATE_SUCCESS, taskTemplates};
}

export function loadTaskTemplates() { 
  return function(dispatch){
    dispatch(beginAjaxCall());
    return request({
      url: API_BASE_URL + "/taskTemplates",
      method: 'GET'
     })
      .then(taskTemplates => {       
      dispatch(loadTaskTemplatesSuccess(taskTemplates));
    }).catch(error => {
      throw(error);
    });
  };
}
