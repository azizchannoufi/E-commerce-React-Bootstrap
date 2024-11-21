// pages/Orders.js
import React from 'react';
import { Table } from 'react-bootstrap';

const Orders = () => (
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
        <tr>
          <td>1</td>
          <td>Client A</td>
          <td>€150</td>
          <td>Livré</td>
        </tr>
        {/* Ajoutez plus de lignes de commandes ici */}
      </tbody>
    </Table>
  </div>
);

export default Orders;
