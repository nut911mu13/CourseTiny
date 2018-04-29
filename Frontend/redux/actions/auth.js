import { fetchAsync } from '../../libs/helper';
import {
  NOTIFICTION_SUCCESS,
  NOTIFICTION_ERROR,
  openNotification,
} from '../../libs/notification';

export const AUTH_CHECK_REQUEST = 'AUTH_CHECK_REQUEST';
export const AUTH_CHECK_SUCCESS = 'AUTH_CHECK_SUCCESS';
export const AUTH_CHECK_FAILURE = 'AUTH_CHECK_FAILURE';

export const AUTH_SIGNIN_SUCCESS = 'AUTH_SIGNIN_SUCCESS';
export const AUTH_SIGNIN_FAILURE = 'AUTH_SIGNIN_FAILURE';

export const AUTH_SIGNOUT_REQUEST = 'AUTH_SIGNOUT_REQUEST';
export const AUTH_SIGNOUT_SUCCESS = 'AUTH_SIGNOUT_SUCCESS';
export const AUTH_SIGNOUT_FAILURE = 'AUTH_SIGNOUT_FAILURE';

export const AUTH_UPDATE_PROFILE_PHOTO = 'AUTH_UPDATE_PROFILE_PHOTO';

export const checkAuth = () => {
  return (dispatch) => {
    dispatch({ type: AUTH_CHECK_REQUEST });
    return fetchAsync('auth/check', { method: 'GET' })
      .then(({ status, data }) => {
        switch (status) {
          case 200:
            dispatch({ type: AUTH_SIGNIN_SUCCESS, userId: data.userId, profilePhoto: data.profilePhoto });
            return dispatch({ type: AUTH_CHECK_SUCCESS });
          default:
            dispatch({ type: AUTH_SIGNIN_FAILURE });
            return dispatch({ type: AUTH_CHECK_FAILURE, error: data.error });
        }
      },
      (error) => {
        openNotification(NOTIFICTION_ERROR, 'error', error.message);
      });
  };
};

export const updateProfilePhoto = (imagePath) => {
  return { type: AUTH_UPDATE_PROFILE_PHOTO, profilePhoto: imagePath };
}

export const signedIn = (data) => {
  return { type: AUTH_SIGNIN_SUCCESS, userId: data.userId, profilePhoto: data.profilePhoto };
};

export const signOut = () => {
  return (dispatch) => {
    dispatch({ type: AUTH_SIGNOUT_REQUEST });
    return fetchAsync('auth/signout', { method: 'GET' })
    .then(({ status, data }) => {
      switch (status) {
        case 200:
          openNotification(NOTIFICTION_SUCCESS, 'signed out successfully', 'you have signed out.');
          return dispatch({ type: AUTH_SIGNOUT_SUCCESS });
        default:
          return dispatch({ type: AUTH_SIGNOUT_FAILURE, error: data.error });
      }
    },
    (error) => {
      openNotification(NOTIFICTION_ERROR, 'error', error.message);
    })
  }
}
