import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  // Générer des données fictives pour les commandes
  const generateRandomOrders = () => {
    const statuses = ['En attente', 'En cours', 'Livré', 'Annulé'];
    const clients = ['Client A', 'Client B', 'Client C', 'Client D', 'Client E'];
    const randomOrders = Array.from({ length: 10 }, (_, index) => ({
      id: index + 1,
      client: clients[Math.floor(Math.random() * clients.length)],
      total: `€${(Math.random() * 500 + 50).toFixed(2)}`, // Total entre 50€ et 550€
      status: statuses[Math.floor(Math.random() * statuses.length)],
    }));
    setOrders(randomOrders);
  };

  useEffect(() => {
    generateRandomOrders();
  }, []);

  return (
    <div>
      <h2>Gestion des Commandes</h2>
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>ID Commande</th>
            <th>Client</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.client}</td>
              <td>{order.total}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Orders;
