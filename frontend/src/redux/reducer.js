import { SET_PRODUCTS } from './actions';

const initialState = {
  products: [],
  user: {
    role: 'admin',
    _id: '6671626f5993eb8b87c0c194'
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
    default:
      return state;
  }
};

export default rootReducer;