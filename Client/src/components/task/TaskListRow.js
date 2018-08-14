import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const UserListRow = ({user}) => {
  return (
    <tr>
      <td><Link to={'/user/' + user.user_ID}>{user.first_name}</Link></td>
      <td>{user.last_name}</td>
      <td>{user.email}</td>
      <td>{user.sso}</td>
    </tr>
  );
};

UserListRow.propTypes = {
  user: PropTypes.object.isRequired
};

export default UserListRow;
