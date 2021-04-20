import React from "react";
import PropTypes from "prop-types";

const Checkbox = ({
  type = "checkbox",
  id,
  name,
  checked = false,
  onChange,
}) => (
  <input
    type={type}
    id={id}
    name={name}
    checked={checked}
    onChange={onChange}
  />
);

Checkbox.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

export default Checkbox;
