import React, { useState } from 'react';
import UserInfo from './components/UserInfo';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import Navbar from '../Navbar'; 
import Footer from '../Footer'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import './UserDashbord.jsx';

function UserDashboard() {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
  });

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleSaveProduct = (product) => {
    if (product.id) {
      setProducts(products.map((p) => (p.id === product.id ? product : p)));
    } else {
      setProducts([...products, { ...product, id: Date.now() }]);
    }
    setSelectedProduct(null);
  };

  return (
    <div>
      {/* Navbar en haut */}
      <Navbar />

      {/* Contenu principal */}
      <div className="container my-5">
        <UserInfo user={user} />
        <div className="row">
          <div className="col-md-7">
            <ProductList products={products} onEditProduct={setSelectedProduct} />
          </div>
          <div className="col-md-5">
            <ProductForm onSaveProduct={handleSaveProduct} product={selectedProduct} />
          </div>
        </div>
      </div>

      {/* Footer en bas */}
      <Footer />
    </div>
  );
}

export default UserDashboard;
