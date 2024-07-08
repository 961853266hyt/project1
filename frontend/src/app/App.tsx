import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Layout from '../components/Layout';
import FakeLinks from '../components/FakeLinks';
import AddOrEditProduct from '../components/products/AddOrEditProduct';
import ProductDetail from '../components/products/ProductDetail';
import AuthForm from '../components/AuthForm';
import NotFound from '../components/NotFound';
import PrivateRoute from '../components/PrivateRoute';


const App: React.FC = () => {
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