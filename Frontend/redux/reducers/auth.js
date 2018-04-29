import {
  AUTH_SIGNIN_SUCCESS,
  AUTH_SIGNIN_FAILURE,
  AUTH_SIGNOUT_SUCCESS,
  AUTH_UPDATE_PROFILE_PHOTO
} from '../actions/auth';

const initialState = {
  isLoaded: false,
  isAuthenticated: null,
  userId: null,
  profilePhoto: null,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SIGNIN_SUCCESS:
      return { ...state, isAuthenticated: true, userId: action.userId, profilePhoto: action.profilePhoto };
    case AUTH_SIGNIN_FAILURE:
      return { ...state, isAuthenticated: false, userId: null, profilePhoto: null };
    case AUTH_SIGNOUT_SUCCESS:
      return { ...state, isAuthenticated: false, userId: null, profilePhoto: null };
    case AUTH_UPDATE_PROFILE_PHOTO:
      return { ...state, profilePhoto: action.profilePhoto };
    default:
      return state;
  }
}

export default auth;
