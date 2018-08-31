import * as types from './actionTypes';
import fetch from 'node-fetch';
import {toastr} from 'react-redux-toastr';
import * as helper from '../utility/helper';
import {beginAjaxCall} from './ajaxStatusActions';
import { API_BASE_URL, TASK_LIST_SIZE, ACCESS_TOKEN } from '../constants';

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
            debugger;
              return Object.assign({},
                {
                  id : task.id,
                  title : task.title,    
                  taskTemplateId: task.taskTemplate.id, 
                  taskTemplateDescription : task.taskTemplate.defaultDescription,             
                  taskStatus : task.taskStatus == 'PENDING' ? 1 : task.taskStatus == 'IN_PROGRESS' ? 2 : task.taskStatus == 'FINISHED' ? 3 : null,
                  taskStatusText: task.taskStatus,
                  taskPriorityText: task.taskPriority,
                  taskPriority : task.taskPriority == 'LOW' ? 1 : task.taskPriority == 'MEDIUM' ? 2 : task.taskPriority == 'hiGH' ? 3 : null,
                  dueDate : task.dueDate,
                  isRecurring : task.isRecurring,
                  recurringPeriod : task.recurringPeriod == 'WEEKLY' ? 1 : task.recurringPeriod == 'MONTHLY' ? 2 : null,                  
                  stopDate : task.stopDate, 
                  userId : task.users[0].id           
              });
          }); 
          
          dispatch(loadTasksSuccess(result));       
      }).catch(error => {
        toastr.error('Upss.. Temporarily unavailable');
      });
  };
}

export function saveTask(task_ori) {
  
 let currentUser = JSON.parse(localStorage.getItem('currentUser'));
 let task = Object.assign({},
    {
      id : task_ori.id,
      title : task_ori.title,                  
      taskStatus : task_ori.taskStatus == 1 ? 'PENDING'  : task_ori.taskStatus == 2 ? 'IN_PROGRESS' : task_ori.taskStatus == 3 ? 'FINISHED' : null,
      taskPriority : task_ori.taskPriority == 1 ? 'LOW'  : task_ori.taskPriority == 2 ? 'MEDIUM' : task_ori.taskPriority == 3 ? 'HIGH' : null,
      taskStatusText: task_ori.taskStatusText,
      taskPriorityText: task_ori.taskPriorityText,
      dueDate : task_ori.dueDate,
      isRecurring : task_ori.isRecurring,
      stopDate : task_ori.stopDate,
      recurringPeriod : task_ori.recurringPeriod == 1 ? 'WEEKLY' :  task_ori.recurringPeriod == 2 ? 'MONTHLY' : null, 
      taskTemplate : {
        id : task_ori.taskTemplateId
      },
      users:[{
        id:task_ori.userId
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
    .then(response => {          
            dispatch(updateTaskSuccess(task)); //dispatch action
            toastr.success('Success!!','The task detail is updated');           
        }).catch(error => {
          throw(error);
        });
      }
  else {               
        //save tasks
        return request({
          url: API_BASE_URL + "/tasks",
          method: 'POST',
          body : JSON.stringify(task)
         })       
        .then(response => {                         
              let task = Object.assign({}, task_ori);
              task["id"] = response.message;
              dispatch(createTaskSuccess(task)); //dispatch action
              dispatch(loadTasks());
              toastr.success('Success!!','The task detail is created');          
        })
        .catch(error => {
          throw(error);
        });          
      }
    };
}
