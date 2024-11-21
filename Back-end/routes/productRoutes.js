const express = require('express');
const productController = require('../controllers/productController');
const authMiddleware = require('../Midelware/authMiddleware');
const router = express.Router();

// Créer un produit (Create a product)
router.post('/products',  productController.createProduct);

router.post('/uploadimg',  productController.uploadImage);

// Récupérer tous les produits (Get all products)
router.get('/products',  productController.getAllProducts);

// Récupérer un produit par ID (Get a product by ID)
router.get('/products/:id',  productController.getProductById);

router.get('/productsUser/:id_user',  productController.getProductsByUserId);

// Mettre à jour un produit par ID (Update a product by ID)
router.put('/products/:id',  productController.updateProduct);

// Supprimer un produit par ID (Delete a product by ID)
router.delete('/products/:id',  productController.deleteProduct);

module.exports = router;
