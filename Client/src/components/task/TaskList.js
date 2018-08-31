import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import ReactTable from "react-table";
import "react-table/react-table.css";

const TaskList = ({tasks}) => {   
  
  return (
    <ReactTable
      data={tasks}
      columns={[
        {
          Header: "Task Id",
          accessor: "id",
          show: false
        },
        {
          Header: "Title",
          accessor: "title",
          Cell: cellInfo => (<Link to={'/task/' + cellInfo.row.id}>{cellInfo.row.title}</Link>) // Custom cell components!
        },
        {
          Header: "Status",
          accessor: "taskStatusText",
          Cell: cellInfo => (<Link to={'/task/' + cellInfo.row.id}>{cellInfo.row.taskStatusText}</Link>) // Custom cell components!
        },
        {
          Header: "Priority",
          accessor: "taskPriorityText",
          Cell: cellInfo => (<Link to={'/task/' + cellInfo.row.id}>{cellInfo.row.taskPriorityText}</Link>) // Custom cell components!
        },
        {
          Header: "Due at",
          accessor: "dueDate",
          Cell: cellInfo => (<Link to={'/task/' + cellInfo.row.id}>{cellInfo.row.dueDate}</Link>) // Custom cell components!
        }
      ]}
      
      defaultPageSize={20}
      className="-striped -highlight"
    />
  );
};

TaskList.propTypes = {
  tasks: PropTypes.array.isRequired
};

export default TaskList;
