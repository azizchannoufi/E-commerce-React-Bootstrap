import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';

function ProductCard({ product }) {
  const navigate = useNavigate();

  const handleViewProduct = () => {
    // Pass the product object as state when navigating
    navigate(`/product/${product.id}`, { state: { product } });
  };

  const handleAddToCart = () => {
    // Récupérer le panier existant dans le localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Vérifier si le produit est déjà dans le panier
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      // Si le produit existe, augmenter sa quantité
      existingProduct.quantity += 1;
    } else {
      // Ajouter le produit avec une quantité initiale de 1
      cart.push({ ...product, quantity: 1 });
    }

    // Mettre à jour le localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart!');
  };

  return (
    <div
      className="card border-0 shadow-sm position-relative"
      style={{ overflow: 'hidden', cursor: 'pointer' }}
      onMouseEnter={(e) => e.currentTarget.classList.add('hover')}
      onMouseLeave={(e) => e.currentTarget.classList.remove('hover')}
    >
      <img src={product.image} className="card-img-top" alt={product.titre} />

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
        onClick={handleViewProduct} // Add click event here
      >
        <FaEye color="white" size={24} />
      </div>

      <div className="card-body text-center">
        <h5 className="card-title">{product.titre}</h5>
        <p className="card-text text-muted">${product.prix}</p>
        <button
          className="btn btn-outline-dark"
          onClick={(e) => {
            e.stopPropagation(); // Prevent click event from propagating to parent
            handleAddToCart();
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
