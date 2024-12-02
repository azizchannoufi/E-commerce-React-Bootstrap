import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';

const Customers = () => {
  const [users, setUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/users');
      if (response.status === 200) {
        // Ajouter un champ commandes avec un nombre aléatoire pour chaque utilisateur
        const usersWithOrders = response.data.map(user => ({
          ...user,
          commandes: Math.floor(Math.random() * 10) + 1, // Génère un nombre entre 1 et 10
        }));
        setUsers(usersWithOrders);
      }
    } catch (e) {
      console.log(e);
    }
  };
console.log(users);

  const deleteUser = async (uid) => {
    try {
      // Suppression côté serveur (si nécessaire)
      await axios.delete(`http://localhost:3001/api/users/${uid}`);

      // Mise à jour locale de l'état après suppression
      setUsers(users.filter(user => user.uid !== uid));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div>
      <h2>Gestion des Clients</h2>
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>ID Client</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Commandes</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((client, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>Client {index + 1}</td>
              <td>{client.email}</td>
              <td>{client.commandes}</td>
              <td>
                <Button variant="danger" onClick={() => deleteUser(client.uid)}>
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

export default Customers;
