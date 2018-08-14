import React, {PropTypes} from 'react';
import Header from './common/Header';
import {connect} from 'react-redux';
require('!style-loader!css-loader!react-redux-toastr/lib/css/react-redux-toastr.min.css');

class App extends React.Component{
  render() {
    return(
      <div className={"container-fluid"}>
        <Header
          loading={this.props.loading}
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
