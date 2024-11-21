// pages/Customers.js
import React from 'react';
import { Table } from 'react-bootstrap';

const Customers = () => (
  <div>
    <h2>Gestion des Clients</h2>
    <Table striped bordered hover className="mt-4">
      <thead>
        <tr>
          <th>ID Client</th>
          <th>Nom</th>
          <th>Email</th>
          <th>Commandes</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Client A</td>
          <td>clientA@example.com</td>
          <td>3</td>
        </tr>
        {/* Ajoutez plus de lignes de clients ici */}
      </tbody>
    </Table>
  </div>
);

export default Customers;
