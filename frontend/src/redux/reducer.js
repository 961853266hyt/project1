import { SET_PRODUCTS, ADD_PRODUCT, UPDATE_PRODUCT, GET_PRODUCT_BY_ID } from './actions';

const initialState = {
  products: [],
  user: {
    role: 'admin',
    // _id: '6671626f5993eb8b87c0c194'
    _id: '667162335993eb8b87c0c192'
    // role: 'user',
    // _id: '667162885993eb8b87c0c197'
  }
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        products: action.payload
      };
    case ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload]
      };
    case UPDATE_PRODUCT:
      return {
        ...state,
        products: state.products.map((product) =>
          product._id === action.payload._id ? action.payload : product
        ),
      };
    case GET_PRODUCT_BY_ID:
      return {
        ...state,
        product: action.payload,
      };
    // case SIGN_IN:
    // case SIGN_UP:	
    //   return {
    //     ...state,
    //     user: action.payload
    //   };
    default:
      return state;
  }
};

export default rootReducer;