import React from 'react';

function FeaturedProduct() {
  return (
    <div className="featured-product text-center text-white" style={{ backgroundImage: 'url(https://via.placeholder.com/800x400)', padding: '100px 0' }}>
      <h1 className="mb-4">Gold Big Hoops</h1>
      <p className="mb-4">€80.00</p>
      <button className="btn btn-outline-light">View Product</button>
    </div>
  );
}

export default FeaturedProduct;
