// pages/Products.js
import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/products');
      if (response.status === 200) {
        setProducts(response.data);
      }
    } catch (e) {
      console.log('Error:', e);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Gestion des Produits</h2>
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Nom du Produit</th>
            <th>Prix (€)</th>
            <th>Catégorie</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <img
                  src={product.image}
                  alt={product.titre}
                  style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                />
              </td>
              <td>{product.titre}</td>
              <td>{parseFloat(product.prix).toFixed(2)}</td>
              <td>{product.categorie}</td>
              <td>{product.description}</td>
              <td>
                <Button variant="primary" size="sm" className="me-2">
                  Edit
                </Button>
                <Button variant="danger" size="sm">
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Products;
