import React from "react";
import InputField from "./InputField";

const UserInputFields = ({ inputValue, setInputValue }) => {
  const handleInputChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    setInputValue({ ...inputValue, [name]: value });
  };
  return (
    <>
      <InputField
        label="First Name"
        id="first-name"
        name="firstName"
        type="text"
        placeholder="First Name"
        required
        autoComplete="given-name"
        value={inputValue.name}
        onChange={handleInputChange}
      />
      <InputField
        label="Last Name"
        id="last-name"
        name="lastName"
        type="text"
        placeholder="Last Name"
        required
        autoComplete="family-name"
        value={inputValue.name}
        onChange={handleInputChange}
      />
      <InputField
        label="Email"
        id="email"
        name="email"
        type="email"
        placeholder="Email"
        required
        autoComplete="email"
        value={inputValue.name}
        onChange={handleInputChange}
      />
      <InputField
        label="New Password"
        id="new-password"
        name="password"
        type="password"
        placeholder="New password"
        required
        autoComplete="password"
        value={inputValue.name}
        onChange={handleInputChange}
      />
      <InputField
        label="Confirm New Password"
        id="confirm-password"
        name="confirmPassword"
        type="password"
        placeholder="Confirm New password"
        required
        autoComplete="password"
        value={inputValue.name}
        onChange={handleInputChange}
      />
      <InputField
        label="City"
        id="city"
        name="city"
        type="text"
        placeholder="City"
        autoComplete="address-level2"
        value={inputValue.name}
        onChange={handleInputChange}
      />
      <InputField
        label="Province"
        id="province"
        name="province"
        type="text"
        placeholder="Province"
        autoComplete="address-level1"
        value={inputValue.name}
        onChange={handleInputChange}
      />
      <InputField
        label="Country"
        id="country"
        name="country"
        type="text"
        placeholder="Country"
        autoComplete="country"
        value={inputValue.name}
        onChange={handleInputChange}
      />
    </>
  );
};
export default UserInputFields;
