import React from 'react'

const CustumDateInput = (props) => {
  const inputStyle = {
    width: 90,
  };
  const handleChange = (syntheticEvent) => {
    const date = {
      day: props.value.getDate(),
      month: props.value.getMonth(),
      year: props.value.getFullYear(),
    };
    date[syntheticEvent.target.getAttribute("data-section")] = Number(
      syntheticEvent.target.value
    );
    const value = new Date(date.year, date.month, date.day);
    props.onChange({
      value,
      syntheticEvent,
      target: this,
    });
  };
  return (
    <div>
      <input
        style={inputStyle}
        type="number"
        data-section="day"
        value={props.value.getDate()}
        onChange={handleChange}
      />
      <input
        style={inputStyle}
        type="number"
        data-section="month"
        value={props.value.getMonth()}
        onChange={handleChange}
      />
      <input
        style={inputStyle}
        type="number"
        data-section="year"
        value={props.value.getFullYear()}
        onChange={handleChange}
      />
    </div>
  );
};

export default CustumDateInput

