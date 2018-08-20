import React, {PropTypes} from 'react';
import {Link, IndexLink } from 'react-router';
import LoadingDots from './LoadingDots';
import './Header.css';

const Header = ({loading, onLogOut}) => {  
  return (
    <div>
    <nav>
      {/*<IndexLink to={"/"} activeClassName={"active"}>Home</IndexLink>
      {"|"} */}
      <Link to={"/Login"} activeClassName={"active"}>Login</Link>
      {"|"}
      <Link to={"/about"} activeClassName={"active"}>About</Link>
      {loading && <LoadingDots interval={500} dots={20}/>}
    </nav>
    <div className="topnav-right">
          <input
          type={"submit"}         
          className={"btn btn-primary"}
          value={'Logout'}
          onClick={onLogOut}/>  
    </div>
  </div>
  );
};

Header.propTypes = {
  loading: PropTypes.bool.isRequired
};

export default Header;
