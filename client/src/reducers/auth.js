const initialState = {
  isSignedIn: false,
};
const auth = (state = initialState, action) => {
  switch (action.type) {
    // I don't this I need this? nothing is happening after a user signup, they are prompted to signin.
    case "SIGN_IN":
      return {
        ...state,
        ...action.user,
        isSignedIn: true,
      };
    case "SIGN_OUT":
      return {
        ...state,
        ...action.user,
        isSignedIn: false,
      };
    default:
      return state;
  }
};

export default auth;
