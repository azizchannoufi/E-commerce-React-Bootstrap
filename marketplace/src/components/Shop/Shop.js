import React, { useState } from 'react';
import ProductCard from '../Home/components/ProductCard';
import Navbar from '../Navbar';
import Footer from '../Footer';

function Shop({ products }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'electronics', 'clothing', 'home'];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Navbar />
      <div className="container py-5">
        <div className="row">
          <div className="col-md-3">
            <h5>Filter by Category</h5>
            <ul className="list-group">
              {categories.map((category) => (
                <li
                  key={category}
                  className={`list-group-item ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                  style={{ cursor: 'pointer' }}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </li>
              ))}
            </ul>
          </div>

          <div className="col-md-9">
            <div className="mb-4">
              <input
                type="text"
                className="form-control"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="row">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div className="col-md-4 mb-4" key={product.id}>
                    <ProductCard product={product} />
                  </div>
                ))
              ) : (
                <p>No products found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Shop;
