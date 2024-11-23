import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';
import axios from 'axios'
function OneProduct() {
  const location = useLocation();
  const { product } = location.state || {}; // Get the product from state

  const [quantity, setQuantity] = useState(1); // Initialize quantity state
  const [userId,setUserId]=useState(localStorage.getItem('uid'))
  const [oneUser, setOneUser] = useState(null); // Initialisez à null pour éviter les erreurs

  const getOneUser = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/users/${userId}`);
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
  useEffect(()=>{
    getOneUser()
  },[])
  const sendEmail=async()=>{
    try{
      const response=await axios.post("http://localhost:3001/api/email",{
        recipientEmail:oneUser.email,
        subject:"Nouvelle Commande Acheter !!",
        message:""
      })
    }catch(e){}
  }
  if (!product) {
    return <p>Product not found</p>;
  }
  // Handlers for incrementing and decrementing quantity
  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrease = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1)); // Ensure quantity doesn't go below 1
  };

  // Handler for adding to cart
  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || []; // Retrieve existing cart or initialize
    const existingProductIndex = cart.findIndex(
      (item) => item.id === product.id
    );

    if (existingProductIndex !== -1) {
      // Update quantity if product already in cart
      cart[existingProductIndex].quantity += quantity;
    } else {
      // Add new product to cart
      cart.push({
        id: product.id,
        name: product.name,
        image: product.image,
        prix: product.prix,
        quantity,
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart)); // Save updated cart to localStorage
    alert('Product added to cart successfully!');
  };

  return (
    <div>
      <Navbar />
      <div className="container py-5">
        <div className="row">
          <div className="col-md-6">
            <img src={product.image} alt={product.name} className="img-fluid" />
          </div>
          
          <div className="col-md-6">
            <h1>{product.name}</h1>
            <p className="text-muted">${parseFloat(product.prix).toFixed(2)}</p>
            <div className="d-flex align-items-center mb-4">
              <button
                className="btn btn-outline-dark mr-2"
                onClick={handleDecrease}
              >
                -
              </button>
              <span className="px-3">{quantity}</span>
              <button
                className="btn btn-outline-dark ml-2"
                onClick={handleIncrease}
              >
                +
              </button>
            </div>
            <button className="btn btn-dark" onClick={handleAddToCart}>
              Add to Cart
            </button>

            <div className="mt-4">
              <p><strong>Description:</strong> {product.description}</p>
              <p><strong>Categories:</strong> {product.categorie}</p>
            </div>
            
            <div className="mt-3">
              <a href="#" className="mr-2 text-dark"><i className="fab fa-facebook"></i></a>
              <a href="#" className="mr-2 text-dark"><i className="fab fa-twitter"></i></a>
              <a href="#" className="mr-2 text-dark"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default OneProduct;
