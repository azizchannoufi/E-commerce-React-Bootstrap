const express = require('express');
const orderController = require('../controllers/orderController');
const authMiddleware = require('../Midelware/authMiddleware');
const router = express.Router();

// Créer ou mettre à jour une commande (Create or Update an Order)
router.post('/orders/create-or-update', orderController.createOrUpdateOrder);

// Créer une commande (Create an order)
router.post('/orders', orderController.createOrder);

// Envoyer un email (Send an email)
router.post('/email', orderController.sendEmail);

// Récupérer toutes les commandes (Get all orders)
router.get('/orders', orderController.getAllOrders);

router.get('/inactive-orders', orderController.getInactiveOrders);

// Récupérer une commande par ID (Get an order by ID)
router.get('/orders/:id', orderController.getOrderById);

// Mettre à jour une commande par ID (Update an order by ID)
router.put('/orders/:id', orderController.updateOrder);

// Supprimer une commande par ID (Delete an order by ID)
router.delete('/orders/:id', orderController.deleteOrder);

module.exports = router;
