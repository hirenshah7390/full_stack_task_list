import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as taskActions from '../../actions/taskActions';
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
    this.updateDateState = this.updateDateState.bind(this);
    this.updateStopDateState = this.updateStopDateState.bind(this);
    this.saveTask = this.saveTask.bind(this);  
  }
 
  componentWillReceiveProps(nextProps){
    //necessary to populate form when existing user id loaded directly
    if(this.props.task.id !== nextProps.task.id){    
      this.setState({task: Object.assign({}, nextProps.task)});      
    }   
  }

  updateTaskState(event) { 
    let task = Object.assign({}, this.state.task); //maintain immutability
    if(event.target.name === 'taskTemplateId')
    { 
      if(event.target.value == '')   
      task['taskTemplateDescription'] =  '' 
      else{
        let template = this.props.taskTemplates.filter(t => t.value == event.target.value);
        task['taskTemplateDescription'] = template[0].defaultDescription;
      } 
    }

    task[event.target.name] = event.target.type === 'checkbox' ? ((event.target.checked) ? 1 : 0) : event.target.value;
    return this.setState({task: task});    
  }

  updateDateState(value){
    let task = Object.assign({}, this.state.task);
    task["dueDate"] = value;
    return this.setState({task: task});
  }

  updateStopDateState(value){
    let task = Object.assign({}, this.state.task);
    task["stopDate"] = value;
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

     if(!this.state.task.taskTemplateId)
     {
      errors.taskTemplate = 'Template is required.';
      formIsValid = false;
     }
     if(!this.state.task.taskStatus)
     {
      errors.taskStatus = 'Task status is required.';
      formIsValid = false;
     }
     if(!this.state.task.taskPriority)
     {
      errors.taskPriority = 'Task priority is required.';
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
    this.props.taskActions.saveTask(task)
        .then(() => this.redirect());
  }

  redirect() {
    this.context.router.push('/tasks');    
  }

  render() {   
    return (
      <TaskForm 
        taskTemplates={this.props.taskTemplates}
        onChange={this.updateTaskState}
        onDateChange = {this.updateDateState}
        onStopDateChange = {this.updateStopDateState}
        onSave = {this.saveTask}
        task={this.state.task}        
        errors={this.state.errors}
      />
    );
  }
}

ManageTaskPage.propTypes = {
  task: PropTypes.object.isRequired, 
  taskTemplates: PropTypes.array.isRequired, 
  taskActions: PropTypes.object.isRequired
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
     taskStatus:'',
     taskStatusText:'',
     taskPriorityText:'',
     taskPriority:'',
     taskTemplateId : 0, 
     taskTemplateDescription : '',
     userId : '',    
     dueDate : '',
     isRecurring: 0,    
     stopDate : '', 
     recurringPeriod : '' 
    };

 if(id && state.tasks.length > 0){
    task = getTaskById(state.tasks, parseInt(id)); //comes as string from url so parsing. We can use regex in react-router v4 in future
     } 

 const taskTemplatesFormattedForDropdown = state.taskTemplates.map(taskTemplate => {
      return {
        value: taskTemplate.id,
        text: taskTemplate.title,
        defaultDescription : taskTemplate.defaultDescription
      };
    });

  return {
    task: task,
    taskTemplates: taskTemplatesFormattedForDropdown    
  };
}

function mapDispatchToProps(dispatch) {
  return {
    taskActions: bindActionCreators(taskActions, dispatch)    
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageTaskPage);

