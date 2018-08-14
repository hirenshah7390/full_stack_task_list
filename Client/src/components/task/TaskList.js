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
          Cell: cellInfo => (<Link to={'/user/' + cellInfo.row.user_ID}>{cellInfo.row.last_name}</Link>) // Custom cell components!
        },
        {
          Header: "Status",
          accessor: "taskStatus",
          Cell: cellInfo => (<Link to={'/user/' + cellInfo.row.user_ID}>{cellInfo.row.first_name}</Link>) // Custom cell components!
        }
      ]}
      defaultSorted={[
        {
          id: "taskStatus",
          desc: false
        },
        {
          id: "title",
          desc: false
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
