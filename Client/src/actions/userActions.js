import { userConstants } from './actionTypes';
import { login as serviceLogin, signup as serviceRegister } from '../utility/APIUtils';
import { alertActions } from './alert.actions';
import {browserHistory} from 'react-router';
import { ACCESS_TOKEN } from '../constants';
import {loadTasks} from './taskActions';

export const userActions = {
    login,    
    register   
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));
        serviceLogin(username, password)
            .then(
                response => {                    
                    localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                    localStorage.setItem('username',username)
                    dispatch(success(response));
                    dispatch(loadTasks());
                    browserHistory.push('/tasks');
                },
                error => {
                    debugger;
                    if(error.status === 401) {
                        dispatch(failure('Your Username or Password is incorrect. Please try again!'));
                    dispatch(alertActions.error('Your Username or Password is incorrect. Please try again!'));
                                      
                    } else {
                    dispatch(failure(error.message || 'Sorry! Something went wrong. Please try again!'));
                    dispatch(alertActions.error(error.message || 'Sorry! Something went wrong. Please try again!'));                                        
                }
            }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}


function register(user) {
    return dispatch => {
        dispatch(request(user));

        serviceRegister(user)
            .then(
                user => { 
                    dispatch(success());
                    browserHistory.push('/login');
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

