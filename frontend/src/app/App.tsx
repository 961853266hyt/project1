import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Cart from './cart/page';
import Layout from '../components/Layout';
import FakeLinks from '../components/FakeLinks';
import AddOrEditProduct from '../components/products/AddOrEditProduct';
import ProductDetail from '../components/products/ProductDetail';
import AuthForm from '../components/AuthForm';
import NotFound from '../components/NotFound';


const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/fakelinks" element={<FakeLinks />} />
          <Route path="/add-product" element={<AddOrEditProduct />} />
          <Route path="/edit-product/:productID" element={<AddOrEditProduct />} />
          <Route path="/product-detail/:productID" element={<ProductDetail />} />
          <Route path="/signin" element={<AuthForm />} />
          <Route path="/signup" element={<AuthForm />} />
          <Route path="/update-password" element={<AuthForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;