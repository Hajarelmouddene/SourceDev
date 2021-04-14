import React, { useState } from "react";
import InputField from "../../Common/InputField";
import UserInputFields from "../../Common/UserInputFields";
import { useHistory } from "react-router-dom";
import { signUp } from "../../../reducers/actions/actions";
import { useDispatch } from "react-redux";

const SignUpPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState({});
  const handleInputChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    setInputValue({ ...inputValue, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.password === inputValue.confirmPassword) {
      const requestOptions = {
        method: "POST",
        body: JSON.stringify({
          firstName: inputValue.firstName,
          lastName: inputValue.lastName,
          email: inputValue.email,
          password: inputValue.password,
          projectStartDate: inputValue.projectStartDate,
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };
      fetch("/signup/employer", requestOptions)
        .then((res) => res.json())
        .then((result) => {
          if (result.status === 200) {
            dispatch(
              signUp({
                id: result.user._id,
                firstName: result.user.firstName,
                lastName: result.user.lastName,
                email: result.email,
                projectStartDate: result.user.projectStartDate,
              })
            );
            return history.push("/");
          } else {
            return window.alert(
              "An account with this email address already exists. Please sign in.  "
            );
          }
        });
    } else {
      window.alert("passwords do not match");
      return;
    }
  };
  return (
    <form>
      {/* Get a user's firstName, lastName, email, new password, and new password confirmation  */}
      <UserInputFields inputValue={inputValue} setInputValue={setInputValue} />
      <InputField
        label="Project start date"
        id="project-start-date"
        name="projectStartDate"
        type="date"
        placeholder="Project start date"
        required
        autoComplete="url"
        min="2021-04-08"
        value={inputValue.name}
        onChange={handleInputChange}
      />
      <button type="submit" onClick={handleSubmit}>
        Sign Up
      </button>
    </form>
  );
};
export default SignUpPage;
