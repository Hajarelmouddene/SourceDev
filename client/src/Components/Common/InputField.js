import React from "react";

const InputField = ({
  label,
  id,
  name,
  type,
  placeholder,
  required,
  autoComplete,
  value,
  onChange,
  min,
}) => (
  <div>
    <label htmlFor={id}>{label}</label>
    <input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      required={required}
      autoComplete={autoComplete}
      value={value}
      onChange={onChange}
      min={min}
    />
  </div>
);

export default InputField;
