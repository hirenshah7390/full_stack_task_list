import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';
import TaskPage from './components/task/TaskPage';
import ManageTaskPage from './components/task/ManageTaskPage';
import LoginPage from './LoginPage/LoginPage';
import RegisterPage from './RegisterPage/RegisterPage';
import { PrivateRoute } from './components/PrivateRoute';

export default (
        <Route path={"/"} component={App}>
         <IndexRoute component={LoginPage}/>
         <Route path={"login"} component={LoginPage} />
         <Route path={"register"} component={RegisterPage} />
         <Route path="tasks" component={TaskPage} />
         <Route path="task(/:id)" component={ManageTaskPage} />
         {/* <Route path={"tasks"} component={TaskPage} />
         <Route path="task(/:id)" component={ManageTaskPage} /> */}

         <Route path={"about"} component={AboutPage} />
        </Route>
  );

