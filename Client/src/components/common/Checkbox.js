import React, { Component, PropTypes } from 'react';

const Checkbox = ({label, handleCheckboxChange}) => {
  let isChecked= false;

    this.setState(({isChecked}) => (
      {
        isChecked: !isChecked
      }
    ));

 return (
      <div className="checkbox">
        <label>
          <input
            type="checkbox"
            value={label}
            checked={this.isChecked}
            onChange={handleCheckboxChange}
          />
          {label}
        </label>
      </div>
    );
};

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired
};

export default Checkbox;
