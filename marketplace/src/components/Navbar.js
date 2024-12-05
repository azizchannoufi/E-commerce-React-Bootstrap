import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import usericon from '../assets/Icon_user.png';
import carticon from '../assets/shopping-cart 1.png';
import logo from '../assets/logo.png';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Vérifie si l'utilisateur est connecté
  const [cartCount, setCartCount] = useState(0); // Nombre d'articles dans le panier
  const navigate = useNavigate();

  useEffect(() => {
    // Vérifie si l'utilisateur est connecté
    const uid = localStorage.getItem('uid');
    setIsLoggedIn(!!uid);

    // Met à jour le nombre d'articles dans le panier
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(totalItems);
    };

    // Ajoute un écouteur pour surveiller les modifications du panier
    window.addEventListener('storage', updateCartCount);
    updateCartCount(); // Mise à jour initiale

    return () => {
      window.removeEventListener('storage', updateCartCount);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('uid');
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3">
      <div className="container d-flex justify-content-between align-items-center">
        {/* Logo */}
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="Shoppe Logo" style={{ width: '90px', backgroundColor: "#C1BC97", borderRadius: 50 }} />
        </Link>

        {/* Liens de navigation */}
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/shop">Shop</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/About">Our Story</Link>
            </li>
          </ul>
        </div>

        {/* Icônes à droite */}
        <div className="d-flex align-items-center">
          {/* Panier avec badge */}
          <Link to="/cart" className="text-dark mx-3 position-relative" aria-label="Panier" style={{ position: 'relative' }}>
  <img src={carticon} alt="Panier" style={{ width: '24px' }} />
  {cartCount > 0 && (
    <span
      className="position-absolute"
      style={{
        top: '-5px',
        right: '-10px',
        backgroundColor: '#dc3545', // Rouge
        color: '#fff', // Blanc
        borderRadius: '50%',
        padding: '5px 8px',
        fontSize: '8px',
        fontWeight: 'bold',
        zIndex: 10, // Assurez-vous qu'il est suffisamment élevé
      }}
    >
      {cartCount}
    </span>
  )}
</Link>

          {/* Icône utilisateur */}
          <Link to="/profile" className="text-dark mx-3" aria-label="Compte Utilisateur">
            <img src={usericon} alt="Compte Utilisateur" style={{ width: '24px' }} />
          </Link>

          {/* Bouton de déconnexion */}
          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="btn btn-outline-danger ml-3"
              style={{ fontSize: '14px' }}
            >
              Logout
            </button>
          )}
        </div>

        {/* Menu mobile */}
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
