import React from "react";
import InputField from "./InputField";

const UserInputFields = ({ state, dispatchLocal }) => {
  const handleInputChange = (event) => {
    dispatchLocal({
      type: "UPDATE_FORM_TEXT_URL_SELECTONE",
      payload: { key: event.target.name, value: event.target.value },
    });
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
        value={state.firstName}
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
        value={state.lastName}
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
        value={state.email}
        onChange={handleInputChange}
      />
      <InputField
        label="New Password"
        id="new-password"
        name="password"
        type="password"
        placeholder="New password"
        required
        autoComplete="off"
        value={state.password}
        onChange={handleInputChange}
      />
      <InputField
        label="Confirm New Password"
        id="confirm-password"
        name="confirmPassword"
        type="password"
        placeholder="Confirm New password"
        required
        autoComplete="off"
        value={state.confirmPassword}
        onChange={handleInputChange}
      />
      <InputField
        label="City"
        id="city"
        name="city"
        type="text"
        placeholder="City"
        autoComplete="address-level2"
        value={state.city}
        onChange={handleInputChange}
      />
      <InputField
        label="Province"
        id="province"
        name="province"
        type="text"
        placeholder="Province"
        autoComplete="address-level1"
        value={state.province}
        onChange={handleInputChange}
      />
      <InputField
        label="Country"
        id="country"
        name="country"
        type="text"
        placeholder="Country"
        autoComplete="country"
        value={state.country}
        onChange={handleInputChange}
      />
    </>
  );
};
export default UserInputFields;
