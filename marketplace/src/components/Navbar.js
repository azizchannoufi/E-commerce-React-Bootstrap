import React from 'react';
import { Link } from 'react-router-dom';
import usericon from '../assets/Icon_user.png';
import carticon from '../assets/shopping-cart 1.png';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3">
      <div className="container d-flex justify-content-between align-items-center">
        
        {/* Logo à gauche */}
        <Link to="/" className="navbar-brand">
          <img src="logo.png" alt="Shoppe Logo" style={{ width: '40px' }} /> {/* Remplacez 'logo.png' par le chemin de votre logo */}
        </Link>
        
        {/* Liens de navigation au centre */}
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/shop">Shop</Link> {/* Link to the Shop page */}
            </li>           
            <li className="nav-item">
              <Link className="nav-link" to="/About">Our Story</Link> {/* Add a route for this if needed */}
            </li>
          </ul>
        </div>

        {/* Icônes à droite */}
        <div className="d-flex align-items-center">
          <Link to="/cart" className="text-dark mx-3" aria-label="Panier">
            <img src={carticon} alt="Panier" style={{ width: '24px' }} />
          </Link>

          <Link to="/profile" className="text-dark mx-3" aria-label="Compte Utilisateur"> {/* Add route for User Account */}
            <img src={usericon} alt="Compte Utilisateur" style={{ width: '24px' }} />
          </Link>
        </div>

        {/* Bouton pour le menu mobile */}
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
