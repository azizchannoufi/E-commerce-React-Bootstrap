import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../Navbar'; // Adjust the path according to your folder structure
import Footer from '../Footer'; // Adjust the path according to your folder structure

function OneProduct() {
  const location = useLocation();
  const { product } = location.state || {}; // Get the product from state

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div>
      <Navbar /> {/* Add the Navbar here */}
      <div className="container py-5">
        <div className="row">
          <div className="col-md-6">
            <img src={product.image} alt={product.name} className="img-fluid" />
            <div className="row mt-3">
              {product.images && product.images.length > 0 ? (
                product.images.map((img, index) => (
                  <div className="col-3" key={index}>
                    <img src={img} alt={`Product thumbnail ${index}`} className="img-fluid border" />
                  </div>
                ))
              ) : (
                <p>No additional images available.</p>
              )}
            </div>
          </div>
          
          <div className="col-md-6">
            <h1>{product.name}</h1>
            <p className="text-muted">${parseFloat(product.price).toFixed(2)}</p>
            <p>{product.description}</p>
            <div className="d-flex align-items-center mb-4">
              <button className="btn btn-outline-dark mr-2">-</button>
              <span className="px-3">1</span>
              <button className="btn btn-outline-dark ml-2">+</button>
            </div>
            <button className="btn btn-dark">Add to Cart</button>

            <div className="mt-4">
              <p><strong>SKU:</strong> {product.sku}</p>
              <p><strong>Categories:</strong> {product.categories ? product.categories.join(', ') : 'No categories available.'}</p>
            </div>
            
            <div className="mt-3">
              <a href="#" className="mr-2 text-dark"><i className="fab fa-facebook"></i></a>
              <a href="#" className="mr-2 text-dark"><i className="fab fa-twitter"></i></a>
              <a href="#" className="mr-2 text-dark"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
        </div>
      </div>
      <Footer /> {/* Add the Footer here */}
    </div>
  );
}

export default OneProduct;
