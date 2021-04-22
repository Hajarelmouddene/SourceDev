const initialState = {};

const conversationProfile = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CONVERSATION_PROFILE": {
      return {
        ...state,
        profile: { ...action.profile },
      };
    }
    default:
      return state;
  }
};
export default conversationProfile;
