// DRY
import { AUTH } from '../constants/actionsTypes';
import * as api from '../api/index.js';

export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });

    window.location.href = window.location.href.split('/#')[0];
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });

    window.location.href = window.location.href.split('/#')[0];
  } catch (error) {
    console.log(error);
  }
};
