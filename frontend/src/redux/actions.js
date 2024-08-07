import axios from 'axios';


const API_URL = 'http://localhost:8000';


export const SET_PRODUCTS = 'SET_PRODUCTS';
// login and register logic
export const SIGN_IN = 'SIGN_IN';
export const SIGN_UP = 'SIGN_UP';
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD';
export const LOG_OUT = 'LOG_OUT';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const GET_PRODUCT_BY_ID = 'GET_PRODUCT_BY_ID';
export const GET_CART_BY_ID = 'GET_CART_BY_ID';
export const UPDATE_CART = 'UPDATE_CART';
const JWT_KEY = 'token';

export const signIn = (credentials) => async (dispatch) => {
  try {
      const response = await axios.post(`${API_URL}/api/auth/signin`, credentials);
      const { token, user } = response.data;
      localStorage.setItem(JWT_KEY, token);
      dispatch({ type: SIGN_IN, payload: user });
  } catch (error) {
    if (error.response && error.response.data) {
      console.error('Error:', error.response.data.message);
      alert('password or email incorrect!'); 
    } else {
      console.error('Error:', error.message);
      alert('An error occurred during sign-in. Please try again later.');
    }
  }

  
};

export const signUp = (credentials) => async (dispatch) => {
  try {
      const response = await axios.post(`${API_URL}/api/auth/signup`, credentials);
      const { token, user } = response.data;
      localStorage.setItem(JWT_KEY, token);
      dispatch({ type: SIGN_UP, payload: user });
  } catch (error) {
    if (error.response && error.response.data) {
      console.error('Error:', error.response.data.message);
      alert(error.response.data.message); 
    } else {
      console.error('Error:', error.message);
      alert('An error occurred during sign-up. Please try again later.');
    }
  }
}

export const updatePassword = (credentials) => async (dispatch) => {
  try {
      const response = await axios.put(`${API_URL}/api/auth/update-password`, credentials);
      dispatch({ type: UPDATE_PASSWORD, payload: response.data });
  } catch (error) {
      console.error(error);
  }
}

export const logOut = () => (dispatch) => {
  localStorage.removeItem(JWT_KEY); // remove JWT token
  dispatch({type: LOG_OUT});
};

export const setProducts = (products) => ({
  type: SET_PRODUCTS, payload: products
});

export const fetchProducts = () => {
  return (dispatch) => {
    fetch("http://localhost:8000/api/products")
      .then(response => response.json())
      .then(data => dispatch(setProducts(data)))
      .catch(error => console.error('Error fetching data:', error));
  };
};

export const addProduct = (product) => async (dispatch) => {
  try{
    const response = await axios.post(`${API_URL}/api/products`, product);
    dispatch({ type: ADD_PRODUCT, payload: response.data });
  }
  catch (error) {
    console.error(error);
  }
};

export const updateProduct = (id, product) => async (dispatch) => {
  try {
    const response = await axios.patch(`${API_URL}/api/products/${id}`, product);
    dispatch({ type: UPDATE_PRODUCT, payload: response.data });
  } catch (error) {
    console.error(error);
  }
};

export const getProductById = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/api/products/${id}`);
    dispatch({ type: GET_PRODUCT_BY_ID, payload: response.data });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getCartById = (userId) => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/api/carts/${userId}`);
    dispatch({ type: GET_CART_BY_ID, payload: response.data });
  } catch (error) {
    console.error(error);
  }
};

export const updateCart = (userId, productId, action, quantity) => async (dispatch) => {
  try {
    await axios.patch(`${API_URL}/api/carts/${userId}`, { productId, action, quantity });
    const response = await axios.get(`${API_URL}/api/carts/${userId}`);
    dispatch({ type: UPDATE_CART, payload: response.data });
  } catch (error) {
    console.error(error);
    throw error;
  }
};