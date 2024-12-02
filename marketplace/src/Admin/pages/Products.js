import React, { useEffect, useState } from 'react';
import { Table, Button, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    titre: '',
    prix: '',
    categorie: '',
    description: '',
    image: '', // Base64 ou URL temporaire
  });
  const [previewImage, setPreviewImage] = useState(null); // Aperçu de l'image

  // Fonction pour récupérer tous les produits
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

  // Gestionnaire pour sélectionner une image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct({ ...newProduct, image: reader.result }); // Stocke l'image en base64
        setPreviewImage(reader.result); // Met à jour l'aperçu
      };
      reader.readAsDataURL(file);
    }
  };

  // Fonction pour ajouter un nouveau produit
  const addProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/products', newProduct);
      if (response.status === 201) {
        setProducts([...products, response.data]); // Ajouter le nouveau produit à la liste
        setNewProduct({ titre: '', prix: '', categorie: '', description: '', image: '' }); // Réinitialiser le formulaire
        setPreviewImage(null); // Réinitialiser l'aperçu
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

      {/* Formulaire d'ajout d'un nouveau produit */}
      <Form onSubmit={addProduct} className="mb-4">
        <Row>
          <Col md={3}>
            <Form.Group controlId="formTitre">
              <Form.Label>Nom du Produit</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrez le nom"
                value={newProduct.titre}
                onChange={(e) => setNewProduct({ ...newProduct, titre: e.target.value })}
                required
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group controlId="formPrix">
              <Form.Label>Prix (€)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Prix"
                value={newProduct.prix}
                onChange={(e) => setNewProduct({ ...newProduct, prix: e.target.value })}
                required
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group controlId="formCategorie">
              <Form.Label>Catégorie</Form.Label>
              <Form.Control
                type="text"
                placeholder="Catégorie"
                value={newProduct.categorie}
                onChange={(e) => setNewProduct({ ...newProduct, categorie: e.target.value })}
                required
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Description"
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                required
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group controlId="formImage">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" accept="image/*" onChange={handleImageChange} required />
            </Form.Group>
            {previewImage && (
              <img
                src={previewImage}
                alt="Aperçu"
                style={{ width: '100px', height: '100px', marginTop: '10px' }}
              />
            )}
          </Col>
        </Row>
        <Button variant="success" type="submit" className="mt-3">
          Ajouter le produit
        </Button>
      </Form>

      {/* Tableau des produits */}
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
                  Modifier
                </Button>
                <Button variant="danger" size="sm">
                  Supprimer
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
