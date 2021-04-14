import React, { useState } from "react";
import InputField from "../Common/InputField";
import { useDispatch } from "react-redux";
import { signIn } from "../../reducers/actions/actions";
import { useHistory } from "react-router-dom";

const SignIn = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState({});

  const handleInputChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    setInputValue({ ...inputValue, [name]: value });
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
    console.log(inputValue.email);
    console.log(inputValue.password);
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      body: JSON.stringify({
        email: inputValue.email,
        password: inputValue.password,
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
          console.log(result.user);
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
    <>
      <button onClick={handleGoogleSignIn}>Sign In with Google</button>
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
        label="Password"
        id="password"
        name="password"
        type="password"
        placeholder="Password"
        required
        autoComplete="password"
        value={inputValue.name}
        onChange={handleInputChange}
      />
      <button type="submit" onClick={handleSignIn}>
        Sign in
      </button>
    </>
  );
};
export default SignIn;
