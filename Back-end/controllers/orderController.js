const admin = require('../config/firebase');
const db = admin.firestore();
const ordersRef = db.collection('orders');

// Ajouter une commande (Create an order)
exports.createOrder = async (req, res) => {
  const { id_client, mode_paiment, prix_tot, produits, status } = req.body;
  try {
    const orderDoc = await ordersRef.add({
      id_client,
      mode_paiment,
      prix_tot,
      produits,
      status,
    });
    res.status(201).json({ id: orderDoc.id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Récupérer toutes les commandes (Get all orders)
exports.getAllOrders = async (req, res) => {
  try {
    const snapshot = await ordersRef.get();
    const orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer une commande par ID (Get an order by ID)
exports.getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await ordersRef.doc(id).get();
    if (!doc.exists) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mettre à jour une commande par ID (Update an order by ID)
exports.updateOrder = async (req, res) => {
  const { id } = req.params;
  const { id_client, mode_paiment, prix_tot, produits, status } = req.body;
  try {
    const doc = await ordersRef.doc(id).get();
    if (!doc.exists) {
      return res.status(404).json({ message: 'Order not found' });
    }
    await ordersRef.doc(id).update({
      id_client,
      mode_paiment,
      prix_tot,
      produits,
      status,
    });
    res.status(200).json({ message: 'Order updated successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer une commande par ID (Delete an order by ID)
exports.deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await ordersRef.doc(id).get();
    if (!doc.exists) {
      return res.status(404).json({ message: 'Order not found' });
    }
    await ordersRef.doc(id).delete();
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
