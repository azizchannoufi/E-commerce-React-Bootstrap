import React from 'react';
import { BrowserRouter , Routes, Route } from "react-router-dom";
import Home from './components/Home/Home';
import OneProduct from './components/OneProduct/OneProduct';
import Shop from './components/Shop/Shop';
import Cart from './components/Cart/Cart';
import LoginSignup from './components/Authentification/LoginSignup';
import OurStory from './components/OurStory/OurStory';
import './App.css';

const products = [
  { id: 1, name: "Line Earrings", price: "€20.00", image: "https://via.placeholder.com/200", description: "Beautiful line earrings.", sku: "LE-001", categories: ["Jewelry"] },
  { id: 2, name: "Hoop Earrings", price: "€30.00", image: "https://via.placeholder.com/200", description: "Stylish hoop earrings.", sku: "HE-002", categories: ["Jewelry"] },
  { id: 3, name: "Kamile Hair Pin Set (3)", price: "€25.00", image: "https://via.placeholder.com/200", description: "Elegant hair pin set.", sku: "HPS-003", categories: ["Hair Accessories"] },
  { id: 4, name: "Hair Pin Set of 3", price: "€15.00", image: "https://via.placeholder.com/200", description: "Simple hair pins.", sku: "HPS-004", categories: ["Hair Accessories"] },
  { id: 5, name: "Petite Necklace", price: "€40.00", image: "https://via.placeholder.com/200", description: "Delicate petite necklace.", sku: "PN-005", categories: ["Necklaces"] },
  { id: 6, name: "Yuki Hair Pin Set", price: "€10.00", image: "https://via.placeholder.com/200", description: "Yuki hair pin set.", sku: "HPS-006", categories: ["Hair Accessories"] },
];
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route  path="/" element={<Home/>}/><Route/>
        <Route path="/product/:id" element={<OneProduct products={products} />} /><Route/>
        <Route path="/shop" element={<Shop products={products} />} /><Route/>
        <Route path="/cart" element={<Cart />} /><Route/>
        <Route path="/Auth" element={<LoginSignup />} /><Route/>
        <Route path="/About" element={<OurStory />} /><Route/>
        {/* Add other routes here as needed */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
