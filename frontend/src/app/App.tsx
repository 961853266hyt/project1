import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Layout from '../components/Layout';
import FakeLinks from '../components/FakeLinks';
import AddOrEditProduct from '../components/products/AddOrEditProduct';
import ProductDetail from '../components/products/ProductDetail';
import AuthForm from '../components/AuthForm';
import NotFound from '../components/NotFound';
import PrivateRoute from '../components/PrivateRoute';

import { useDispatch } from 'react-redux';
import axios from 'axios';
import { SIGN_IN } from '../redux/actions'

const JWT_KEY = 'token'
const API_URL = 'http://localhost:8000';

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem(JWT_KEY);
    if (token) {
      console.log('token found!', token);
      axios.get(`${API_URL}/api/auth/verifyToken`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        dispatch({ type: SIGN_IN, payload: response.data.user });
      })
      .catch(error => {
        console.error('Token verification failed:', error);
      });
    } else {
      console.log('no token found!');
    }
  }, [dispatch]);


  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fakelinks" element={<FakeLinks />} />
          <Route
            path="/add-product"
            element={
              <PrivateRoute>
                <AddOrEditProduct />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit-product/:productID"
            element={
              <PrivateRoute>
                <AddOrEditProduct />
              </PrivateRoute>
            }
          />
          <Route
            path="/product-detail/:productID"
            element={
              <PrivateRoute>
                <ProductDetail />
              </PrivateRoute>
            }
          />
          <Route path="/signin" element={<AuthForm />} />
          <Route path="/signup" element={<AuthForm />} />
          <Route
            path="/update-password"
            element={
                <AuthForm />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;