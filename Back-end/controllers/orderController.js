const admin = require('../config/firebase');
const db = admin.firestore();
const ordersRef = db.collection('orders');
const nodemailer = require('nodemailer');
require('dotenv').config(); // Charger les variables d'environnement

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
exports.sendEmail = async (req, res) => {
  const { recipientEmail, subject, message } = req.body; // Déstructuration correcte de req.body

  // Vérification des champs requis
  if (!recipientEmail || !subject || !message) {
      return res.status(400).json({ error: 'Tous les champs sont requis : recipientEmail, subject, message.' });
  }

  try {
      // Configurer le transporteur pour l'envoi d'e-mails
      const transporter = nodemailer.createTransport({
          service: 'gmail', // Utilisez un service comme Gmail ou un serveur SMTP
          auth: {
              user: process.env.EMAIL_USER, // Remplacez par votre adresse email
              pass: process.env.EMAIL_PASS, // Utilisez un mot de passe d'application sécurisé
          },
      });

      // Configurer les options de l'e-mail
      const mailOptions = {
          from: process.env.EMAIL_USER, // L'expéditeur
          to: recipientEmail, // Le destinataire
          subject: subject, // Sujet de l'email
          text: message, // Contenu textuel de l'email
      };

      // Envoyer l'e-mail
      await transporter.sendMail(mailOptions);
      console.log('E-mail envoyé avec succès à :', recipientEmail);

      // Retourner une réponse de succès
      return res.status(200).json({ message: 'E-mail envoyé avec succès.' });
  } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'e-mail :', error);

      // Retourner une réponse d'erreur
      return res.status(500).json({ error: 'Échec de l\'envoi de l\'e-mail.' });
  }
};
exports.createOrUpdateOrder = async (req, res) => {
  const { id_client, mode_paiment, prix_tot, produits, status } = req.body;
  try {
    // Rechercher une commande existante avec le même id_client et un status actif (true)
    const existingOrderSnapshot = await ordersRef
      .where('id_client', '==', id_client)
      .where('status', '==', true)
      .get();

    if (!existingOrderSnapshot.empty) {
      // Une commande existante est trouvée, la mettre à jour
      const existingOrderDoc = existingOrderSnapshot.docs[0];
      const existingData = existingOrderDoc.data();

      // Fusionner les nouveaux produits avec les produits existants
      const updatedProducts = [...existingData.produits, ...produits];

      // Calculer le nouveau prix total
      const updatedPrixTot = existingData.prix_tot + prix_tot;

      // Mettre à jour la commande
      await ordersRef.doc(existingOrderDoc.id).update({
        produits: updatedProducts,
        prix_tot: updatedPrixTot,
        mode_paiment, // Mettre à jour si le mode de paiement a changé
      });

      return res.status(200).json({ 
        message: 'Order updated successfully', 
        id: existingOrderDoc.id 
      });
    } else {
      // Aucune commande active, en créer une nouvelle
      const newOrderDoc = await ordersRef.add({
        id_client,
        mode_paiment,
        prix_tot,
        produits,
        status,
      });

      return res.status(201).json({ 
        message: 'New order created successfully', 
        id: newOrderDoc.id 
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Récupérer toutes les commandes avec un status false
exports.getInactiveOrders = async (req, res) => {
  try {
    const snapshot = await ordersRef.where('status', '==', false).get();

    if (snapshot.empty) {
      return res.status(404).json({ message: 'No inactive orders found' });
    }

    const orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
