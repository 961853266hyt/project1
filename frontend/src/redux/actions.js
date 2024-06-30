export const SET_PRODUCTS = 'SET_PRODUCTS';

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