import React from "react";
import styled from "styled-components";

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
    <Label htmlFor={id}>{label}</Label>
    <Input
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

const Label = styled.label`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid #edf2f7;
  height: 2.7rem;
  width: 30vw;
  margin-top: 4rem;
  margin: 2rem 0;
`;

export default InputField;
