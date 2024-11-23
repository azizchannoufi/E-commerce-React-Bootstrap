const admin = require('../config/firebase');
const db = admin.firestore();
const productsRef = db.collection('produits');
const nodemailer = require('nodemailer');
const cloudinary = require('cloudinary').v2;
require('dotenv').config(); // Charger les variables d'environnement
// Ajouter un produit (Create a product)
exports.createProduct = async (req, res) => {
  const { categorie, description, id_user, image, prix, titre } = req.body;
  
  try {
    const productDoc = await productsRef.add({
      categorie,
      description,
      id_user,
      image,
      prix,
      titre,
    });
    res.status(201).json({ id: productDoc });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Récupérer tous les produits (Get all products)
exports.getAllProducts = async (req, res) => {
  try {
    const snapshot = await productsRef.get();
    const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer un produit par ID (Get a product by ID)
exports.getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await productsRef.doc(id).get();
    if (!doc.exists) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Récupérer tous les produits ayant le même id_user
exports.getProductsByUserId = async (req, res) => {
  const { id_user } = req.params; // Récupérer l'id_user depuis les paramètres de la requête
  try {
    const querySnapshot = await productsRef.where('id_user', '==', id_user).get();
    
    if (querySnapshot.empty) {
      return res.status(404).json({ message: 'No products found for this user' });
    }

    // Transformer les documents en un tableau d'objets
    const products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    res.status(200).json(products); // Retourner la liste des produits
  } catch (error) {
    res.status(500).json({ message: error.message }); // Gestion des erreurs
  }
};
// Mettre à jour un produit par ID (Update a product by ID)
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { categorie, description, id_user, image, prix, titre } = req.body;
  try {
    const doc = await productsRef.doc(id).get();
    if (!doc.exists) {
      return res.status(404).json({ message: 'Product not found' });
    }
    await productsRef.doc(id).update({
      categorie,
      description,
      id_user,
      image,
      prix,
      titre,
    });
    res.status(200).json({ message: 'Product updated successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer un produit par ID (Delete a product by ID)
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await productsRef.doc(id).get();
    if (!doc.exists) {
      return res.status(404).json({ message: 'Product not found' });
    }
    await productsRef.doc(id).delete();
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Configuration de Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Fonction d'upload
exports.uploadImage = async (req, res) => {
    const file = req.body.file; // Le fichier attendu en base64 ou chemin public

    // Validation du fichier
    if (!file) {
        return res.status(400).json({ error: 'Aucun fichier fourni pour l\'upload.' });
    }

    try {
        // Upload vers Cloudinary
        const result = await cloudinary.uploader.upload(file, {
            folder: 'e-commerce', // Nom du dossier dans Cloudinary
        });

        console.log('Image uploaded avec succès:', result.secure_url);

        // Retourner l'URL de l'image
        return res.status(201).json({ url: result.secure_url });
    } catch (error) {
        console.error('Erreur lors de l\'upload:', error);

        // Retourner une erreur
        return res.status(500).json({ error: 'Échec de l\'upload de l\'image.' });
    }
};


