import React, {PropTypes} from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';
import {Checkbox} from 'react-bootstrap';
import CheckboxList from '../common/Chkboxlist';

const TaskForm = ({task, onSave, onChange, errors, loading}) => {
  let genders = []; 
  genders.push({ value : 1, text : 'M'});
  genders.push({ value : 2, text : 'F'});
 
  return (
    <form>
      <h3>Manage Task</h3>
      <div className="jumbotron">
        <TextInput
          name={"title"}
          label={"Title"}
          type={"text"}
          value={task.title}
          onChange={onChange}
          error={errors.first_name}/>

        <TextInput
          name={"taskStatus"}
          label={"Task Status"}
          type={"text"}
          value={task.taskStatus}
          onChange={onChange}
          error={errors.last_name}/>      
         
        
        <input
          type={"submit"}
          disabled={loading}
          value={loading ? 'Saving...' : 'Save'}
          className={"btn btn-primary"}
          onClick={onSave}/>
      </div>
    </form>
  );
};


TaskForm.propTypes = {
  task: React.PropTypes.object.isRequired, 
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired, 
  loading: React.PropTypes.bool,
  errors: React.PropTypes.object
};

export default TaskForm;
