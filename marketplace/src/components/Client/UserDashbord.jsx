import React, { useEffect, useState } from 'react';
import UserInfo from './components/UserInfo';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import Navbar from '../Navbar';
import Footer from '../Footer';
import Login from '../Authentification/LoginSignup'; // Composant LoginSignup
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function UserDashboard() {
  const [userId, setUserId] = useState(null); // Utilisateur non connecté au départ
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [oneUser, setOneUser] = useState(null); // Initialisez à null pour éviter les erreurs

  



  const handleLogin = (userInfo) => {
    setUserId(userInfo); // Met à jour l'utilisateur après connexion
  };
// console.log(userId.email);

  useEffect(() => {
    // Si l'utilisateur est connecté, récupérer ses informations
    if (userId) {
      const getOneUser = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/api/users/${userId.uid}`);
          if (response.status === 200) {
            setOneUser(response.data); // Mettre à jour l'état avec les données de l'utilisateur
      console.log(response.data);
      
          } else {
            console.log("Erreur lors de la récupération des informations de l'utilisateur");
          }
        } catch (e) {
          console.error('Erreur dans la récupération de l\'utilisateur:', e);
          alert('Erreur dans la récupération de l\'utilisateur');
        }
      };

      getOneUser(); // Appel de la fonction pour récupérer les informations

      const ProductOfUser=async ()=>{
        try{
          const response=await axios.get('http://localhost:3001/api/productsUser/'+userId.uid)
          if(response.status==200){
            setProducts(response.data)
            console.log(response.data);
            
          }
          else{
            console.log("Erreur lors de la récupération des produits")
          }
        }catch(e){
          console.error('Erreur dans la récupération des produits:', e);
        }
      }
      ProductOfUser()
    }


  }, [userId,products]); // Dépendance seulement sur userId

  // Si l'utilisateur n'est pas connecté, afficher le composant de connexion
  if (!userId) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div>
      {/* Navbar en haut */}
      <Navbar />

      {/* Contenu principal */}
      <div className="container my-5">
        {oneUser ? (
          <>
            <UserInfo user={oneUser}  />
            <div className="row">
              <div className="col-md-7">
                <ProductList products={products} onEditProduct={setSelectedProduct} />
              </div>
              <div className="col-md-5">
                {/* Si l'utilisateur est un vendeur, afficher le formulaire d'ajout de produit */}
                {oneUser.role === 'vendeur' && (
                  <ProductForm  product={selectedProduct} userId={userId.uid} />
                )}
                {oneUser.role === 'visiteur' && (
                  <div className="alert alert-info">
                    <h5>Bienvenue, {oneUser.full_name} !</h5>
                    <p>Vous êtes un visiteur et vous ne pouvez pas ajouter de nouveaux produits.</p>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div>Chargement des informations utilisateur...</div> // Afficher un message pendant le chargement
        )}
      </div>

      {/* Footer en bas */}
      <Footer />
    </div>
  );
}

export default UserDashboard;
