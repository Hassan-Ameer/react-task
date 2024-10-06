import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Product from '../pages/products/products';
import SingleProduct from '../pages/singleProduct/singleProduct';
import Cart from '../pages/Cart';


function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Product />} />
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default Routing;
