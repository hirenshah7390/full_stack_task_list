import React, {PropTypes} from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';
import {Checkbox} from 'react-bootstrap';
import CheckboxList from '../common/Chkboxlist';

const TaskForm = ({task, onSave, onChange, loading, errors}) => {
  let genders = []; 
  genders.push({ value : 1, text : 'M'});
  genders.push({ value : 2, text : 'F'});
 
  return (
    <form>
      <h3>Manage Task</h3>
      <div className="jumbotron">
        <TextInput
          name={"title"}
          label={"title"}
          type={"text"}
          value={task.title}
          onChange={onChange}
          error={errors.first_name}/>

        <TextInput
          name={"taskStatus"}
          label={"taskStatus"}
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
  user: React.PropTypes.object.isRequired,  
  loading: React.PropTypes.bool,
  errors: React.PropTypes.object
};

export default TaskForm;
