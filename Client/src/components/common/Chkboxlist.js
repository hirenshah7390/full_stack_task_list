import React, {PropTypes} from 'react';
import SelectInput from "./SelectInput";
import {Checkbox} from 'react-bootstrap';

const CheckboxList = ({name,label, values,onChange}) => {
    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <div className = "list-group-item form-group">
        {values.map((value) => (
            <Checkbox
              name={name}
              key={value.value}
              className={"form-check"}
              value={value.value}
              checked={value.checked}
              onChange={onChange}>
              {value.label}
            </Checkbox>
        ))}
        </div>
      </div>
    );
};

CheckboxList.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  values: PropTypes.array.isRequired
};

export default CheckboxList;
