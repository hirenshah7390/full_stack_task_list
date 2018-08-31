import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router';
import routes from './routes';
import './styles/styles.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import ReduxToastr from 'react-redux-toastr';
import {ACCESS_TOKEN } from './constants';
import {loadTasks} from './actions/taskActions';
import {loadTaskTemplates} from "./actions/taskTemplateActions";

const store = configureStore();

if(localStorage.getItem(ACCESS_TOKEN))
{
 store.dispatch(loadTasks());
 store.dispatch(loadTaskTemplates());
}

render(
  <Provider store={store}>
    <div>
    <Router history={browserHistory} routes={routes} />
    <ReduxToastr
      timeOut={5000}
      newestOnTop={false}
      preventDuplicates
      position="top-left"
      transitionIn="fadeIn"
      transitionOut="fadeOut"
      progressBar/>
    </div>
  </Provider>,
   document.getElementById('app')
);
