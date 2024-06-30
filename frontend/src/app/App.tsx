import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Cart from './cart/page';
import Layout from '../components/Layout';
import FakeLinks from '../components/FakeLinks';
import AddProduct from '../components/AddProduct';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/fakelinks" element={<FakeLinks />} />
          <Route path="/addproduct" element={<AddProduct />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;