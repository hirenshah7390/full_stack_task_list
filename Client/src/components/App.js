import React, {PropTypes} from 'react';
import Header from './common/Header';
import {connect} from 'react-redux';
import { ACCESS_TOKEN } from '../constants';
import {browserHistory} from 'react-router';
require('!style-loader!css-loader!react-redux-toastr/lib/css/react-redux-toastr.min.css');

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      isAuthenticated: false,
      isLoading: false
    }
    this.handleLogout = this.handleLogout.bind(this);        
  }

  handleLogout() {
    localStorage.removeItem(ACCESS_TOKEN);
    browserHistory.push('/login');
  }

  render() {
    return(
      <div className={"container-fluid"}>
        <Header         
          onLogOut={this.handleLogout}
        />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state, ownProps) {  
   return{
      loading: state.ajaxCallsInProgress > 0
   };
}

export default connect(mapStateToProps)(App);
