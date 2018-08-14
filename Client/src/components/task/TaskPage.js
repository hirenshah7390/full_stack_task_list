import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as userActions from '../../actions/userActions';
import {bindActionCreators} from 'redux';
import TaskList from './TaskList';
import {browserHistory} from 'react-router';

class TaskPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.redirectToAddTaskPage = this.redirectToAddTaskPage.bind(this);
  }

  redirectToAddTaskPage() {
    browserHistory.push('/task');
  }

  render() {
    const {tasks} = this.props;
    return (
      <div>
        <div className="form-group">
          <h3>Tasks</h3>
          <input type={"submit"}
                 value={"Add Task"}
                 className={"btn btn-primary"}
                 onClick={this.redirectToAddTaskPage}/>
        </div>
        <TaskList tasks={tasks}/>
      </div>
    );
  }
}

//PropTypes validation
TaskPage.propTypes = {
  tasks: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

// Redux  connect and related functions
function mapStateToProps(state, ownProps) {
  return {
    tasks: state.tasks //pointing to users in root reducer // state is state inside store
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskPage);
