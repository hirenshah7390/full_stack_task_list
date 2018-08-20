import React, {PropTypes} from 'react';
import {Link, IndexLink } from 'react-router';
import LoadingDots from './LoadingDots';
import './Header.css';

const Header = ({onLogOut}) => {  
  return (
    <div>    
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
