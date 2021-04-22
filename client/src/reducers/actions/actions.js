export const signIn = (user) => {
  return {
    type: "SIGN_IN",
    user,
  };
};

export const signOut = () => {
  return {
    type: "SIGN_OUT",
  };
};

export const setConversation = (conversation) => {
  return {
    type: "SET_CONVERSATION",
    conversation,
  };
};

export const setConversationProfile = (profile) => {
  return {
    type: "SET_CONVERSATION_PROFILE",
    profile,
  };
};

export const setConversations = (conversations) => {
  return {
    type: "SET_CONVERSATIONS",
    conversations,
  };
};

export const setFormData = (formData) => {
  return {
    type: "SET_FORM_DATA",
    formData,
  };
};
