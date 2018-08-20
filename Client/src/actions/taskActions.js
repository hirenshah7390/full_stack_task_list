import * as types from './actionTypes';
import fetch from 'node-fetch';
import {toastr} from 'react-redux-toastr';
import * as helper from '../utility/helper';
import {beginAjaxCall} from './ajaxStatusActions';
import { API_BASE_URL, POLL_LIST_SIZE, ACCESS_TOKEN } from '../constants';
import { debug } from 'util';

const request = (options) => {
  const headers = new Headers({
      'Content-Type': 'application/json',
  });  
 
  headers.append('Authorization', 'Bearer ' + ACCESS_TOKEN);  

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
    size = size || POLL_LIST_SIZE;

  return function (dispatch) {
    dispatch(beginAjaxCall());
    const username = localStorage.getItem('username');
    debugger;
    return request({
      url: API_BASE_URL + "/users/" +username+ "/userTasks?page=" + page + "&size=" + size,
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
let task = Object.assign({},
    {
      task_ID : task_ori.task_ID,
      first_name: task_ori.first_name,
      last_name: task_ori.last_name,
      email: task_ori.email,
    
    });  
  
 return function (dispatch, getState) {    
   dispatch(beginAjaxCall());
   if (task_ori.task_ID > 0) {  
      
     //save task   
      return fetch('http://localhost:5000/ors/v1/task', {
                      method: 'put',
                      headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(task)
            })
          .then(response => response.json())
          .then(savedtask => { 
           //create new task object         
          let task = Object.assign({},
            {
              task_ID : savedtask.data.task_ID,
              first_name: savedtask.data.first_name,
              last_name: savedtask.data.last_name,
              email: savedtask.data.email            
             
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
        return fetch('http://localhost:5000/ors/v1/tasks', {
                      method: 'post',
                      headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(task)
                    })
        .then(response => response.json())
        .then(savedtask => {
              newtask = savedtask.data;
             
                let task = Object.assign({},
                    {
                      task_ID : newtask.task_ID,
                      first_name: newtask.first_name,
                      last_name: newtask.last_name,
                      email: newtask.email                 
                     
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
