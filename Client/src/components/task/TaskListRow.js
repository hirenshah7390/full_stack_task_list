import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const TaskListRow = ({task}) => {
  return (
    <tr>
      <td><Link to={'/user/' + task.id}>{task.title}</Link></td>
      <td>{task.taskStatus}</td>      
    </tr>
  );
};

TaskListRow.propTypes = {
  task: PropTypes.object.isRequired
};

export default TaskListRow;
