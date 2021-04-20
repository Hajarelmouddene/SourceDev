import React, { useReducer } from "react";

const initialState = {
  firstName: "",
  email: "",
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "UPDATE_FORM": {
      return {
        ...state,
        [payload.key]: payload.value,
      };
    }
  }
};

//make the onchange a helper function

const newComponent = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state);
  return (
    <form>
      <input
        type="text"
        name="firstName"
        value={state.firstName}
        onChange={(event) => {
          dispatch({
            type: "UPDATE_FORM",
            payload: { key: event.target.name, value: event.target.value },
          });
        }}
      ></input>
      <input type="email" value={state.firstName}></input>
      <button type="submit" onClick={handleSubmit}>
        Sign Up
      </button>
    </form>
  );
};

export default newComponent;
