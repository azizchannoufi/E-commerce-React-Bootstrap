import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import usericon from '../assets/Icon_user.png';
import carticon from '../assets/shopping-cart 1.png';
import logo from '../assets/logo.png';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Vérifie si l'utilisateur est connecté
  const navigate = useNavigate(); // Permet de naviguer après déconnexion

  useEffect(() => {
    // Vérifie si le uid existe dans le localStorage
    const uid = localStorage.getItem('uid');
    setIsLoggedIn(!!uid); // Met à jour l'état en fonction de la présence de uid
  }, []);

  const handleLogout = () => {
    // Supprime le uid et le token du localStorage
    localStorage.removeItem('uid');
    localStorage.removeItem('token');

    // Met à jour l'état pour masquer le bouton de déconnexion
    setIsLoggedIn(false);

    // Redirige l'utilisateur vers la page d'accueil ou de connexion
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3">
      <div className="container d-flex justify-content-between align-items-center">

        {/* Logo à gauche */}
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="Shoppe Logo" style={{ width: '90px', backgroundColor: "#C1BC97", borderRadius: 50 }} />
        </Link>

        {/* Liens de navigation au centre */}
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
          <Link to="/cart" className="text-dark mx-3" aria-label="Panier">
            <img src={carticon} alt="Panier" style={{ width: '24px' }} />
          </Link>

          <Link to="/profile" className="text-dark mx-3" aria-label="Compte Utilisateur">
            <img src={usericon} alt="Compte Utilisateur" style={{ width: '24px' }} />
          </Link>

          {/* Bouton de déconnexion uniquement si l'utilisateur est connecté */}
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

        {/* Bouton pour le menu mobile */}
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
