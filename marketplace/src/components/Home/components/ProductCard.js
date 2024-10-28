import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';

function ProductCard({ product }) {
  const navigate = useNavigate();

  const handleViewProduct = () => {
    // Pass the product object as state when navigating
    navigate(`/product/${product.id}`, { state: { product } });
  };

  return (
    <div
      className="card border-0 shadow-sm position-relative"
      style={{ overflow: 'hidden', cursor: 'pointer' }}
      onMouseEnter={(e) => e.currentTarget.classList.add('hover')}
      onMouseLeave={(e) => e.currentTarget.classList.remove('hover')}
      onClick={handleViewProduct} // Add click event here
    >
      <img src={product.image} className="card-img-top" alt={product.name} />

      {/* Overlay icon for viewing product */}
      <div
        className="overlay d-flex justify-content-center align-items-center"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          opacity: 0,
          transition: 'opacity 0.3s',
        }}
      >
        <FaEye color="white" size={24} />
      </div>

      <div className="card-body text-center">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text text-muted">${product.price}</p>
        <button className="btn btn-outline-dark">Add to Cart</button>
      </div>
    </div>
  );
}

export default ProductCard;
