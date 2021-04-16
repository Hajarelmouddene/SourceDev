const initialState = {};

const conversation = (state = initialState, action) => {
  switch (action.type) {
    case "GET_CONVERSATION": {
      return {
        ...state,
        ...action.conversation,
      };
    }
    default:
      return state;
  }
};
export default conversation;
