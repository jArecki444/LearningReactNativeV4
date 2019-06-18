import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER_START
  } from './types';
  import firebase from 'firebase';
  import { Actions } from 'react-native-router-flux';
  
  export const emailChanged = text => {
    return {
      type: EMAIL_CHANGED,
      payload: text
    };
  };
  
  export const passwordChanged = text => {
    return {
      type: PASSWORD_CHANGED,
      payload: text
    };
  };
  
  export const loginUser = ({ email, password }) => {
    return dispatch => {
      dispatch({ type: LOGIN_USER_START });
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => loginUserSuccess(dispatch, user))
        .catch(error => {
          console.log('actions error', error);
          firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(user => loginUserSuccess(dispatch, user))
            .catch(() => loginUserFail(dispatch));
        });
    };
  };
  
  const loginUserSuccess = (dispatch, user) => {
    dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: user
    });
  
    Actions.main(null);
  };
  
  const loginUserFail = (dispatch, user) => {
    dispatch({
      type: LOGIN_USER_FAIL,
      payload: user
    });
  };
  