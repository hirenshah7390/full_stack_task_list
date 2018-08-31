import React, {PropTypes} from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';
import {Checkbox} from 'react-bootstrap';
import CheckboxList from '../common/Chkboxlist';
import DatePicker from 'react-bootstrap-date-picker';

const TaskForm = ({task, taskTemplates, onSave, onChange, onDateChange, onStopDateChange, errors, loading}) => {
  debugger;
  let status = []; 
  status.push({ value : 1, text : 'PENDING'});
  status.push({ value : 2, text : 'IN_PROGRESS'});
  status.push({ value : 3, text : 'FINISHED'}); 

  let priority = [];
  priority.push({ value : 1, text : 'LOW'});
  priority.push({ value : 2, text : 'MEDIUM'});
  priority.push({ value : 3, text : 'HIGH'});  
  
  let recPeriod = [];
  recPeriod.push({ value : 1, text : 'WEEKLY'});
  recPeriod.push({ value : 2, text : 'MONTHLY'});

  let users = [];
  users.push({value : 1, text: 'test'})
  users.push({value : 2, text: 'hirentest'})
  
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
          error={errors.title}/>

        <SelectInput
          name={"taskTemplateId"}
          label={"Template"}
          type={"text"}
          value={parseInt(task.taskTemplateId)}
          defaultOption={"Select Template"}
          options={taskTemplates}
          onChange={onChange} 
          error={errors.taskTemplate}
        />

        <label htmlFor={"taskDescription"}>Description</label><br />
        <textarea readOnly
        name="taskDescription" 
        value={task.taskTemplateDescription}
        cols="40" 
        rows="5">
        </textarea><br />

        <SelectInput
          name={"taskStatus"}
          label={"Task Status"}
          type={"text"}
          value={parseInt(task.taskStatus)}
          defaultOption={"Select Status"}
          options={status}
          onChange={onChange}
          error={errors.status}/> 

         <SelectInput
          name={"taskPriority"}
          label={"Task Priority"}
          type={"text"}
          value={parseInt(task.taskPriority)}
          defaultOption={"Select Priority"}
          options={priority}
          onChange={onChange}
          error={errors.status}/> 

          <SelectInput
          name={"userId"}
          label={"Assigned To"}
          type={"text"}
          value={parseInt(task.userId)}
          defaultOption={"Select Assignee"}
          options={users}
          onChange={onChange}
          error={errors.assignedUser}/>  

         <Checkbox
          name="isRecurring"
          className={"form-check"}
          value={parseInt(task.isRecurring)}
          checked={task.isRecurring}
          onChange={onChange}><b>Is Reccuring ?</b>
         </Checkbox>

          <SelectInput
          name={"recurringPeriod"}
          label={"Recurring Period"}
          type={"text"}
          value={parseInt(task.recurringPeriod)}
          defaultOption={"Select Period"}
          options={recPeriod}
          onChange={onChange}
          error={errors.recurringPeriod}/> 

          <label htmlFor={"stopDate"}>Stop-Date</label>
           <DatePicker 
           name={"stopDate"}
           label={"Stop Date"} 
           value={task.stopDate} 
           onChange={onStopDateChange} 
           error={errors.stopDate}
           />   
         <br /> 
          
          <label htmlFor={"dueDate"}>Due-Date</label>
           <DatePicker 
           name={"dueDate"}
           label={"Due Date"} 
           value={task.dueDate} 
           onChange={onDateChange} 
           error={errors.dueDate}
           />   
         <br />
        
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
  taskTemplates: React.PropTypes.array,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired, 
  loading: React.PropTypes.bool,
  errors: React.PropTypes.object
};

export default TaskForm;
