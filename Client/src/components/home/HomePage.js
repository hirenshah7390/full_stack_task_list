import React from 'react';
import {Link} from 'react-router';

class HomePage extends React.Component{
  render() {
      return(
         <div className="jumbotron">
           <h3>Task List</h3>
           <p>Tasks...</p>
           <Link to="about" className="btn btn-primary btn-sm">Add New</Link>
         </div>
      );
  }
}

export default HomePage;
