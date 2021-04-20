import React, { useReducer } from "react";
import InputField from "../Common/InputField";
import { useDispatch } from "react-redux";
import { signIn } from "../../reducers/actions/actions";
import { useHistory } from "react-router-dom";
import { Form, Button } from "../Common/Styles";

const initialFormState = {
  email: "",
  password: "",
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "UPDATE_FORM": {
      return {
        ...state,
        [payload.key]: payload.value,
      };
    }
    default:
      return state;
  }
};

const SignIn = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [state, dispatchLocal] = useReducer(reducer, initialFormState);

  const handleInputChange = (event) => {
    dispatchLocal({
      type: "UPDATE_FORM",
      payload: { key: event.target.name, value: event.target.value },
    });
  };

  const handleGoogleSignIn = () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
    fetch("/auth/google", requestOptions)
      .then((res) => res.json())
      .then((result) => result);
  };

  const handleSignIn = (event) => {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      body: JSON.stringify({
        //send just the state here?
        email: state.email,
        password: state.password,
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    fetch("/auth/login", requestOptions)
      .then((res) => res.json())
      .then((result) => {
        if (result.status === 200) {
          dispatch(
            signIn({
              firstName: result.user.firstName,
              lastName: result.user.lastName,
              id: result.user._id,
            })
          );
          return history.push("/");
        } else if (result.status === 400) {
          window.alert(
            "Invalid password. Please enter again or reset your password."
          );
        } else if (result.status === 404) {
          window.alert(
            "No account was found with this email address. Please sign Up."
          );
        }
      });
  };

  return (
    <Form style={{ height: " calc(100vh - 184px - 64px)" }}>
      <Button onClick={handleGoogleSignIn}>Sign In with Google</Button>
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
        label="Password"
        id="password"
        name="password"
        type="password"
        placeholder="Password"
        required
        autoComplete="off"
        value={state.password}
        onChange={handleInputChange}
      />
      <Button type="submit" onClick={handleSignIn}>
        Sign in
      </Button>
    </Form>
  );
};
export default SignIn;
