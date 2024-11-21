const admin = require('../config/firebase');
const db = admin.firestore();

// Créer un utilisateur (Create a user)
exports.createUser = async (req, res) => {
  const { email, password, full_name, role } = req.body;
  try {
    // Étape 1 : Créer l'utilisateur dans Authentication
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    const uid = userRecord.uid; // Le même UID généré par Firebase Authentication

    // Étape 2 : Stocker des données supplémentaires dans Firestore
    await db.collection('users').doc(uid).set({
      full_name,      // Nom complet
      role,           // Rôle de l'utilisateur
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(201).json({ uid, message: 'User created successfully!' });
  } catch (error) {
    console.error('Error creating user:', error.message);
    res.status(400).json({ message: error.message });
  }
};
// Récupérer tous les utilisateurs (Get all users)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await admin.auth().listUsers();
    res.status(200).json(users.users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer un utilisateur par ID (Get a user by UID)
exports.getUserById = async (req, res) => {
  const { uid } = req.params;
  try {
    // 1. Obtenir les informations de l'utilisateur via Firebase Auth
    const userRecord = await admin.auth().getUser(uid);

    // 2. Rechercher les informations supplémentaires de l'utilisateur dans la base de données
    const userData = await db.collection('users').doc(uid).get();  // Utilisez votre méthode de récupération de données appropriée

    if (!userData.exists) {
      return res.status(404).json({ message: 'User data not found in database' });
    }

    // 3. Fusionner les données Firebase Auth avec les données de la base de données
    const user = {
      ...userRecord.toJSON(),  // Les informations de l'utilisateur de Firebase Auth
      ...userData.data(),      // Les informations supplémentaires de la base de données
    };

    // 4. Retourner les données fusionnées à l'utilisateur
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: 'User not found' });
  }
};

// Mettre à jour un utilisateur par ID (Update a user by UID)
exports.updateUser = async (req, res) => {
  const { uid } = req.params;
  const { email, password } = req.body;
  try {
    // Create a user update object
    const updates = {};
    if (email) updates.email = email;
    if (password) updates.password = password;

    const userRecord = await admin.auth().updateUser(uid, updates);
    res.status(200).json({ message: 'User updated successfully', user: userRecord });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer un utilisateur par ID (Delete a user by UID)
exports.deleteUser = async (req, res) => {
  const { uid } = req.params;
  try {
    await admin.auth().deleteUser(uid);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.verifyToken = async (req, res) => {
  const { token } = req.body;
  try {
    // Verify the token sent from the client
    const decodedToken = await admin.auth().verifyIdToken(token);

    // Optional: Fetch user details from Firestore or other sources
    const user = await admin.auth().getUser(decodedToken.uid);

    res.status(200).json({
      uid: user.uid,
      email: user.email,
      message: 'Token verified successfully!',
    });
  } catch (error) {
    console.error('Token verification error:', error.message);
    res.status(401).json({ message: 'Invalid token' });
  }
};
exports.getUserDataByEmail = async (req, res) => {
  const { email } = req.params; // Utiliser l'email passé en paramètre
  try {
    // 1. Rechercher l'utilisateur dans la base de données en fonction de l'email
    const userData = await db.collection('users').where('email', '==', email).get();

    if (userData.empty) {
      return res.status(404).json({ message: 'User not found in database' });
    }

    // 2. Retourner les données de l'utilisateur trouvées dans la base de données
    const user = userData.docs[0].data(); // Récupère les données du premier utilisateur trouvé

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching user data' });
  }
};