const initialState = {
  profile: null,
  loading: false,
  error: null,
};

const userProfileReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "FETCH_USER_PROFILE_START":
      return { ...state, loading: true, error: null };
    case "FETCH_USER_PROFILE_SUCCESS":
      return { profile: action.payload, loading: false, error: null };
    case "FETCH_USER_PROFILE_FAILURE":
      return { ...state, loading: false, error: action.payload };
      case "UPDATE_USER_PROFILE":
  return { ...state, profile: action.payload };

    default:
      return state;
  }
};

export default userProfileReducer;
