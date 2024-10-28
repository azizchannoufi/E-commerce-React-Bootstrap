import React from 'react';
import Navbar from '../Navbar';
import ProductList from './components/ProductList';
import Footer from '../Footer';
import FeaturedProduct from './components/FeaturedProduct';
function Home() {
    return (
      <div>
        <Navbar />
        <FeaturedProduct />
        <div className="container mt-5">
          <h2 className="text-center mb-4">Shop The Latest</h2>
          <ProductList />
        </div>
        <Footer />
      </div>
    );
  }
  
  export default Home;