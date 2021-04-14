import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../reducers/actions/actions";

const SignOut = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleSignOut = () => {
    dispatch(signOut(user));
  };
  return <button onClick={handleSignOut}>Logout</button>;
};

export default SignOut;
