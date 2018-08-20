import React from 'react';
import { Route, Redirect } from 'react-router';
import { ACCESS_TOKEN } from '../constants';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => 
        (   
        localStorage.getItem(ACCESS_TOKEN)
            ? alert(...props)//<Component {...props} />
            : alert(props.location)// <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)