import * as types from './actionTypes';
import fetch from 'node-fetch';
import {toastr} from 'react-redux-toastr';
import * as helper from '../utility/helper';
import {beginAjaxCall} from './ajaxStatusActions';
import { API_BASE_URL, POLL_LIST_SIZE, ACCESS_TOKEN } from '../constants';

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

export function loadUsersSuccess(users) {
  return {type: types.LOAD_USERS_SUCCESS, users};
}

export function createUserSuccess(user) {  
  return {type: types.CREATE_USER_SUCCESS, user};
}

export function updateUserSuccess(user) {
  return {type: types.UPDATE_USER_SUCCESS, user};
}

export function loadUsers(page, size) { 

    page = page || 0;
    size = size || POLL_LIST_SIZE;
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return request({
      url: API_BASE_URL + "/users/test/userTasks?page=" + page + "&size=" + size,
      method: 'GET'
     })
      .then(response => {
        response.json().then(tasks => {          
          const result = tasks.data.map(task => {
              return Object.assign({},
                {
                  id : task.id,
                  title : task.title,                  
                  users : task.users                
              });
          }); 
          dispatch(loadUsersSuccess(result));
        });
      }).catch(error => {
        toastr.error('Upss.. Temporarily unavailable');
      });
  };
}

export function saveUser(user_ori) {
let user = Object.assign({},
    {
      user_ID : user_ori.user_ID,
      first_name: user_ori.first_name,
      last_name: user_ori.last_name,
      email: user_ori.email,
     // dob: user_ori.dob,
      sex: user_ori.sex == 1 ? 'M' : user_ori.sex == 2 ? 'F' : '',
      SSO: user_ori.SSO,
      title_ID: user_ori.title_ID , 
      degree_ID: user_ori.degree_ID,  
      position_ID: user_ori.position_ID,
      department_ID: user_ori.department_ID,
      au_ID: user_ori.au_ID,
      institution_ID: user_ori.institution_ID 
    });  
  
 return function (dispatch, getState) {    
   dispatch(beginAjaxCall());
   if (user_ori.user_ID > 0) {
    
      let userFunctions = user_ori['user_functions'];     
      //remove de-selected functions
      return fetch('http://localhost:5000/ors/v1/user/function', {
                      method: 'delete',
                      headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(userFunctions.filter(f => f.ors_function_ID === -1))
                    })   
    .then(response => response.json())
    //Add selected Functions
    .then(deleteFunctions => { 
      return fetch('http://localhost:5000/ors/v1/user/function', {
                    method: 'post',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userFunctions.filter(f => f.user_function_ID === 0))
                  })
      .then(response => response.json())   
      .then(savedFunctions => {
     //save user   
      return fetch('http://localhost:5000/ors/v1/user', {
                      method: 'put',
                      headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(user)
            })
          .then(response => response.json())
          .then(savedUser => { 
           //create new user object         
          let user = Object.assign({},
            {
              user_ID : savedUser.data.user_ID,
              first_name: savedUser.data.first_name,
              last_name: savedUser.data.last_name,
              email: savedUser.data.email,
             // dob: savedUser.dob,
              sex: savedUser.data.sex == 'M' ? 1 : savedUser.data.sex  == 'F' ? 2 : 0,
              SSO: savedUser.data.SSO,
              title_ID: savedUser.data.title_ID,
              degree_ID: savedUser.data.degree_ID,
              position_ID: savedUser.data.position_ID,
              department_ID: savedUser.data.department_ID,
              au_ID: savedUser.data.au_ID,
              institution_ID: savedUser.data.institution_ID,
              user_functions: savedUser.data.user_functions,
              functions: (savedUser.data.user_functions !== undefined) ? savedUser.data.user_functions.map(funct => {
                return funct.ors_function.ors_function;
              }).join(',') : []
            });
            
            dispatch(updateUserSuccess(user)); //dispatch action
            toastr.success('Success!!','The user detail is updated');
            });
          });
        }).catch(error => {
          throw(error);
        });
      }
  else {
        let newUser = {};       
        //save users
        return fetch('http://localhost:5000/ors/v1/users', {
                      method: 'post',
                      headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(user)
                    })
        .then(response => response.json())
        .then(savedUser => {
              newUser = savedUser.data;
              let userFunctions = user_ori['user_functions'];     
              userFunctions = userFunctions.map(f => {
                return {
                  user_function_ID : 0,
                  ors_function_ID : f.ors_function_ID,
                  user_ID : newUser.user_ID
                };
              });
              //save user functions
              return fetch('http://localhost:5000/ors/v1/user/function', {
                  method: 'post',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(userFunctions)
                })
                .then(response => response.json())
                .then(savedFunctions => { 
                // create user new object 
                let user = Object.assign({},
                    {
                      user_ID : newUser.user_ID,
                      first_name: newUser.first_name,
                      last_name: newUser.last_name,
                      email: newUser.email,
                   //   dob: newUser.dob,
                      sex: newUser.sex == 'M' ? 1 : newUser.sex  == 'F' ? 2 : 0,
                      SSO: newUser.SSO,
                      title_ID: newUser.title_ID,
                      degree_ID: newUser.degree_ID,
                      position_ID: newUser.position_ID,
                      department_ID: newUser.department_ID,
                      au_ID:  newUser.au_ID,
                      institution_ID: newUser.institution_ID,
                      user_functions: savedFunctions.data,                                         
                      functions: (savedFunctions.data !== undefined) ? savedFunctions.data.map(funct => {
                        return funct.ors_function.ors_function;
                      }).join(',') : []
                    });  
              dispatch(createUserSuccess(user)); //dispatch action
              toastr.success('Success!!','The user detail is created');
          });
        })
        .catch(error => {
          throw(error);
        });          
      }
    };
}
