const initialState = {};

const conversation = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CONVERSATION": {
      console.log(action);
      return {
        ...state,
        conversation: { ...action.conversation },
      };
    }
    case "SET_CONVERSATIONS": {
      return {
        ...state,
        conversations: [...action.conversations],
      };
    }
    default:
      return state;
  }
};
export default conversation;
