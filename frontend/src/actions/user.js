import Axios from 'axios';
import {
  USER_CONNEXION_SUCCESS,
  USER_CONNEXION_REQUEST,
  USER_CONNEXION_FAIL,
  
  USER_DECONNEXION,

  USER_INSCRIPTION_REQUEST,
  USER_INSCRIPTION_SUCCESS,
  USER_INSCRIPTION_FAIL,


  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,


  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,

} from '../constants/user';

export const inscription  = (nom, email, mdp) => async (dispatch) => {
  dispatch({ type: USER_INSCRIPTION_REQUEST, payload: { email, mdp } });
  try {
    const { data } = await Axios.post('/api/users/inscription', {
      nom,
      email,
      mdp,
    });
    dispatch({ type: USER_INSCRIPTION_SUCCESS, payload: data });
    dispatch({ type: USER_CONNEXION_SUCCESS, payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_INSCRIPTION_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const connexion = (email, mdp) => async (dispatch) => {
  dispatch({ type: USER_CONNEXION_REQUEST, payload: { email, mdp } });
  try {
    const { data } = await Axios.post('/api/users/connexion', { email, mdp });
    dispatch({ type: USER_CONNEXION_SUCCESS, payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_CONNEXION_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const deconnexion = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  localStorage.removeItem('panierItems');
  localStorage.removeItem('adresseLivraison');
  dispatch({ type: USER_DECONNEXION });
};

export const detailsUser = (userId) => async (dispatch, getState) => {
  dispatch({ type: USER_DETAILS_REQUEST, payload: userId });
  const {
    userConnexion: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(`/api/users/${userId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_DETAILS_FAIL, payload: message });
  }
};


export const updateUserProfile = (user) => async (dispatch, getState) => {
  dispatch({ type: USER_UPDATE_PROFILE_REQUEST, payload: user });
  const {
    userConnexion: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(`/api/users/profile`, user, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
    dispatch({ type: USER_CONNEXION_SUCCESS, payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_UPDATE_PROFILE_FAIL, payload: message });
  }
};