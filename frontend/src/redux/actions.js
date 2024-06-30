import axios from 'axios';

export const SET_PRODUCTS = 'SET_PRODUCTS';

// login and register logic
export const SIGN_IN = 'SIGN_IN';
export const SIGN_UP = 'SIGN_UP';
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD';
export const LOG_OUT = 'LOG_OUT';

const API_URL = 'http://localhost:8000';

export const signIn = (credentials) => async (dispatch) => {
  try {
      const response = await axios.post(`${API_URL}/signin`, credentials);
      dispatch({ type: SIGN_IN, payload: response.data });
  } catch (error) {
      console.error(error);
  }
};

export const signUp = (credentials) => async (dispatch) => {
  try {
      const response = await axios.post(`${API_URL}/signup`, credentials);
      dispatch({ type: SIGN_UP, payload: response.data });
  } catch (error) {
      console.error(error);
  }
}

export const updatePassword = (credentials) => async (dispatch) => {
  try {
      const response = await axios.put(`${API_URL}/update-password`, credentials);
      dispatch({ type: UPDATE_PASSWORD, payload: response.data });
  } catch (error) {
      console.error(error);
  }
}

export const setProducts = (products) => ({
  type: SET_PRODUCTS,
  payload: products
});

export const fetchProducts = () => {
  return (dispatch) => {
    fetch("http://localhost:8000/api/products")
      .then(response => response.json())
      .then(data => dispatch(setProducts(data)))
      .catch(error => console.error('Error fetching data:', error));
  };
};