import React, { useReducer } from "react";
import UserInputFields from "../../Common/UserInputFields";
import { useHistory } from "react-router-dom";
import { Form, Button } from "../../Common/Styles";
import currentDate from "../../../Utils/getCurrentDate";

const initialFormState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  city: "",
  province: "",
  country: "",
  profilePhoto: "",
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "UPDATE_FORM_TEXT_URL_SELECTONE": {
      return {
        ...state,
        [payload.key]: payload.value,
      };
    }
    default:
      return state;
  }
};

const EmailForm = () => {
  const history = useHistory();

  const [state, dispatchLocal] = useReducer(reducer, initialFormState);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state.password === state.confirmPassword) {
      const requestOptions = {
        method: "POST",
        body: JSON.stringify({
          ...state,
          dateAccountCreated: currentDate,
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
            return history.push("/signin");
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
    <Form>
      {/* Get a user's firstName, lastName, email, new password, and new password confirmation  */}
      <UserInputFields state={state} dispatchLocal={dispatchLocal} />
      <Button type="submit" onClick={handleSubmit}>
        Sign Up
      </Button>
    </Form>
  );
};
export default EmailForm;
