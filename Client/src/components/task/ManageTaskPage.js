import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActions from '../../actions/taskActions';
import TaskForm from './TaskForm';

class ManageTaskPage extends React.Component {
  constructor(props, context) {    
    super(props, context);
   
    let task = Object.assign({}, this.props.task);   

    this.state = {
      task: task,      
      errors: {}
    };
    
    this.updateTaskState = this.updateTaskState.bind(this);
    this.saveTask = this.saveTask.bind(this);  
  }
 
  componentWillReceiveProps(nextProps){
    //necessary to populate form when existing user id loaded directly
    if(this.props.task.id !== nextProps.task.id){    
      this.setState({task: Object.assign({}, nextProps.task)});      
    }   
  }

  updateTaskState(event) {    
    const field = event.target.name;
    let task = Object.assign({}, this.state.task); //maintain immutability     
        
    task[field] = event.target.type === 'checkbox' ? ((event.target.checked) ? 1 : 0) : event.target.value;
    
    return this.setState({task: task});

  }

  taskFormIsValid() {
    let formIsValid = true;
    let errors = {};
    this.setState({errors: errors});

     if(!this.state.task.title.length){
        errors.title = 'Title is required.';
       formIsValid = false;
     }

    this.setState({errors: errors});
    return formIsValid;
  }

  saveTask(event){   
    event.preventDefault();
    if(!this.taskFormIsValid()){
      return;
    }  
    let task = Object.assign({}, this.state.task);
              
    this.props.userActions.saveUser(task)
        .then(() => this.redirect());
  }

  redirect() {
    this.context.router.push('/tasks');    
  }

  render() {   
    return (
      <TaskForm 
        onChange={this.updateTaskState}
        onSave = {this.saveTask}
        task={this.state.task}        
        errors={this.state.errors}
      />
    );
  }
}

ManageTaskPage.propTypes = {
  task: PropTypes.object.isRequired,  
  userActions: PropTypes.object.isRequired
  };

ManageTaskPage.contextTypes = {
   router: PropTypes.object
 };

 function getTaskById(tasks, id) {  
   const task = tasks.filter(task => task.id === id);
   if(task.length) return task[0];
   return null;
 }

function mapStateToProps(state, ownProps) {
  const id = ownProps.params.id; //from the path '/user/:userId
  let task = 
   {
     id: 0, 
     title: '',
     taskStatus:''
    };

 if(id && state.tasks.length > 0){
    task = getTaskById(state.tasks, parseInt(id)); //comes as string from url so parsing. We can use regex in react-router v4 in future
     } 

  return {
    task: task    
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch)    
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageTaskPage);

