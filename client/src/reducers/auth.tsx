const initialState = null;

const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "AUTH":
      return action.payload;
    case "SET_USER": 
      return action.payload;
    case "LOGOUT":
      return null;
    default:
      return state;
  }
};

export default userReducer;
