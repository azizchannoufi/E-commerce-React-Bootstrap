import React from 'react';
import ProductCard from './ProductCard';

const products = [
  { id: 1, name: "Line Earrings", price: "€20.00", image: "https://via.placeholder.com/200" },
  { id: 2, name: "Hoop Earrings", price: "€30.00", image: "https://via.placeholder.com/200" },
  { id: 3, name: "Kamile Hair Pin Set (3)", price: "€25.00", image: "https://via.placeholder.com/200" },
  { id: 4, name: "Hair Pin Set of 3", price: "€15.00", image: "https://via.placeholder.com/200" },
  { id: 5, name: "Petite Necklace", price: "€40.00", image: "https://via.placeholder.com/200" },
  { id: 6, name: "Yuki Hair Pin Set", price: "€10.00", image: "https://via.placeholder.com/200" },
];

function ProductList() {
  return (
    <div className="row">
      {products.map(product => (
        <div className="col-md-4 mb-4" key={product.id}>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}

export default ProductList;
