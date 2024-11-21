import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { Modal } from 'react-bootstrap'; // Assurez-vous d'avoir Bootstrap installé

// Initialize Stripe
const stripePromise = loadStripe('your-publishable-key'); // Remplacez avec votre clé publique Stripe

function Cart() {
  const [cartItems, setCartItems] = useState([]); // État pour les articles du panier
  const [totalAmount, setTotalAmount] = useState(0); // État pour le montant total
  const [checkoutType, setCheckoutType] = useState(null); // État pour le type de commande
  const [showModal, setShowModal] = useState(false); // État pour afficher le modal

  useEffect(() => {
    // Charger les articles du panier depuis localStorage
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(savedCart);

    // Calculer le montant total
    const total = savedCart.reduce((sum, item) => sum + item.prix * item.quantity, 0);
    setTotalAmount(total);
  }, []);

  const handleCloseModal = () => setShowModal(false); // Fermer le modal
  const handleShowModal = () => setShowModal(true); // Afficher le modal

  return (
    <>
      <Navbar />
      <div className="container py-5">
        <h2>Your Cart</h2>
        <div className="row">
          <div className="col-md-8">
            {cartItems.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="mb-4 d-flex align-items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: '100px', height: '100px', marginRight: '20px' }}
                  />
                  <div>
                    <h5>{item.name}</h5>
                    <p>
                      ${parseFloat(item.prix).toFixed(2)} x {item.quantity} = $ 
                      {parseFloat(item.prix * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="col-md-4">
            <h4>Total: ${totalAmount.toFixed(2)}</h4>
            {cartItems.length > 0 && !checkoutType && (
              <>
                <h5>Choose Checkout Option:</h5>
                <button
                  className="btn btn-outline-dark me-3"
                  onClick={() => setCheckoutType('pickup')}
                >
                  Pickup (Cart)
                </button>
                <button
                  className="btn btn-outline-dark"
                  onClick={() => setCheckoutType('delivery')}
                >
                  Delivery
                </button>
              </>
            )}
            {checkoutType === 'pickup' && (
              <Elements stripe={stripePromise}>
                <CheckoutForm
                  totalAmount={totalAmount}
                  onSuccess={handleShowModal} // Passez la fonction pour afficher le modal
                />
              </Elements>
            )}
            {checkoutType === 'delivery' && (
              <DeliveryForm
                totalAmount={totalAmount}
                onSuccess={handleShowModal} // Passez la fonction pour afficher le modal
              />
            )}
          </div>
        </div>
      </div>
      <Footer />

      {/* Modal de confirmation */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Commande réussie</Modal.Title>
        </Modal.Header>
        <Modal.Body>Merci pour votre confiance ! Votre commande a été passée avec succès, verifier ton email .</Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary" onClick={handleCloseModal}>
            Fermer
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function CheckoutForm({ totalAmount, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const clientSecret = 'simulated_client_secret_for_testing'; // Client secret simulé

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(true);
    localStorage.removeItem('cart'); // Vider le panier après le paiement réussi
    onSuccess(); // Afficher le modal de succès
    setLoading(true);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h5>Enter Payment Information</h5>
      <CardElement className="form-control mb-3" />
      {error && <div className="alert alert-danger">{error}</div>}
      {success ? (
        <div className="alert alert-success">Payment Successful!</div>
      ) : (
        <button type="submit" className="btn btn-primary" disabled={!stripe || loading}>
          {loading ? 'Processing...' : `Pay $${totalAmount.toFixed(2)}`}
        </button>
      )}
    </form>
  );
}

function DeliveryForm({ totalAmount }) {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);

    // Vous pouvez intégrer Stripe ou enregistrer l'adresse ici

    // Vider le panier dans localStorage
    localStorage.removeItem('cart');

    // Rafraîchir la page après avoir vidé le panier
    window.location.reload(); // Force le rechargement de la page

    alert('Delivery details submitted successfully!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h5>Enter Delivery Information</h5>
      <div className="mb-3">
        <label className="form-label">Address</label>
        <input
          type="text"
          className="form-control"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">City</label>
        <input
          type="text"
          className="form-control"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Postal Code</label>
        <input
          type="text"
          className="form-control"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          required
        />
      </div>
      {submitted && (
        <div className="alert alert-success">
          Your delivery details have been submitted!
        </div>
      )}
      <button type="submit" className="btn btn-primary">
        Submit Delivery Details
      </button>
      <h5 className="mt-3">Total: ${totalAmount.toFixed(2)}</h5>
    </form>
  );
}
export default Cart;
