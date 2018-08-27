import * as types from './actionTypes';
import fetch from 'node-fetch';
import {toastr} from 'react-redux-toastr';
import * as helper from '../utility/helper';
import {beginAjaxCall} from './ajaxStatusActions';
import { API_BASE_URL, TASK_LIST_SIZE, ACCESS_TOKEN } from '../constants';

const request = (options) => {
  debugger;
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

export function loadTasksSuccess(tasks) {
  return {type: types.LOAD_TASKS_SUCCESS, tasks};
}

export function createTaskSuccess(task) {  
  return {type: types.CREATE_TASK_SUCCESS, task};
}

export function updateTaskSuccess(task) {
  return {type: types.UPDATE_TASK_SUCCESS, task};
}

export function loadTasks(page, size) { 

    page = page || 0;
    size = size || TASK_LIST_SIZE;

  return function (dispatch) {
    dispatch(beginAjaxCall());
    const username = localStorage.getItem('username');    
    return request({
      url: API_BASE_URL + "/users/" +username+ "/tasks?page=" + page + "&size=" + size,
      method: 'GET'
     })
      .then(response => {                            
          const result = response.content.map(task => {
              return Object.assign({},
                {
                  id : task.id,
                  title : task.title,                  
                  taskStatus : task.taskStatus,
                  taskPriority : task.taskPriority,
                  dueDate : task.dueDate             
              });
          }); 
          
          dispatch(loadTasksSuccess(result));       
      }).catch(error => {
        toastr.error('Upss.. Temporarily unavailable');
      });
  };
}

export function saveTask(task_ori) {
 let currentUser = localStorage.getItem('currentUser') ;
let task = Object.assign({},
    {
      id : task_ori.id,
      title : task_ori.title,                  
      taskStatus : task_ori.taskStatus,
      taskPriority : task_ori.taskPriority,
      dueDate : task_ori.dueDate,
      taskTemplate : task_ori.taskTemplate,
      users:[{
        id:currentUser.id
      }]     
    });  
  
 return function (dispatch, getState) {    
   dispatch(beginAjaxCall());
   if (task_ori.id > 0) {  
      
     //save task   
     return request({
      url: API_BASE_URL + "/tasks",
      method: 'POST',
      body : JSON.stringify(task)
     })
          .then(response => response.json())
          .then(savedtask => { 
           //create new task object         
          let task = Object.assign({},
            {
              id : savedtask.id,
              title : savedtask.title,                  
              taskStatus : savedtask.taskStatus,
              taskPriority : savedtask.taskPriority,
              dueDate : savedtask.dueDate             
            });
            
            dispatch(updateTaskSuccess(task)); //dispatch action
            toastr.success('Success!!','The task detail is updated');           
        }).catch(error => {
          throw(error);
        });
      }
  else {
        let newtask = {};       
        //save tasks
        return request({
          url: API_BASE_URL + "/tasks",
          method: 'POST',
          body : JSON.stringify(task)
         })
        .then(response => response.json())
        .then(savedtask => {
              newtask = savedtask.data;
             
                let task = Object.assign({},
                    {
                      id : newtask.id,
                      title : newtask.title,                  
                      taskStatus : newtask.taskStatus,
                      taskPriority : newtask.taskPriority,
                      dueDate : newtask.dueDate                    
                     
                    });  
              dispatch(createTaskSuccess(task)); //dispatch action
              toastr.success('Success!!','The task detail is created');          
        })
        .catch(error => {
          throw(error);
        });          
      }
    };
}
