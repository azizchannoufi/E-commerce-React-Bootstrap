// src/pages/Cart.js
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import ProductCard from '../Home/components/ProductCard';
import Navbar from '../Navbar';
import Footer from '../Footer';

// Initialize Stripe
const stripePromise = loadStripe('your-publishable-key'); // Replace with your Stripe publishable key

// Dummy Cart Data
const cartItems = [
  { id: 1, name: 'Product 1', price: 20, category: 'electronics' },
  { id: 2, name: 'Product 2', price: 15, category: 'clothing' },
];
const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);

function Cart() {
  return (
    <>
      <Navbar />
      <div className="container py-5">
        <h2>Your Cart</h2>
        <div className="row">
          <div className="col-md-8">
            {cartItems.map((item) => (
              <ProductCard product={item} key={item.id} />
            ))}
          </div>
          <div className="col-md-4">
            <h4>Total: ${totalAmount.toFixed(2)}</h4>
            <Elements stripe={stripePromise}>
              <CheckoutForm totalAmount={totalAmount} />
            </Elements>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

function CheckoutForm({ totalAmount }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // Simulate clientSecret (replace with actual API call in a real project)
  const clientSecret = 'simulated_client_secret_for_testing';

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (!stripe || !elements) {
      setError("Stripe hasn't loaded yet.");
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: cardElement },
    });

    if (error) {
      setError(error.message);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      setSuccess(true);
    }

    setLoading(false);
  };

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

export default Cart;
