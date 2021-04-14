export const signUp = (user) => {
  return {
    type: "SIGN_UP",
    user,
  };
};

export const signIn = (user) => {
  return {
    type: "SIGN_IN",
    user,
  };
};

export const signOut = (user) => {
  return {
    type: "SIGN_OUT",
    user,
  };
};
