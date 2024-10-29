import React, { useState, useEffect } from 'react';

function ProductForm({ onSaveProduct, product }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null); // Nouvel état pour l'image

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setImage(product.image || null); // Initialise l'image si elle existe
    } else {
      setName('');
      setDescription('');
      setPrice('');
      setImage(null);
    }
  }, [product]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Stocke le fichier sélectionné
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveProduct({ id: product ? product.id : null, name, description, price, image });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-light rounded shadow-sm">
      <h3>{product ? 'Modifier le produit' : 'Ajouter un nouveau produit'}</h3>

      <div className="form-group mb-3">
        <label>Nom du produit</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="form-control"
        />
      </div>

      <div className="form-group mb-3">
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="form-control"
        />
      </div>

      <div className="form-group mb-3">
        <label>Prix</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="form-control"
        />
      </div>

      <div className="form-group mb-3">
        <label>Photo du produit</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="form-control"
        />
      </div>

      <button type="submit" className="btn btn-primary w-100">
        {product ? 'Mettre à jour' : 'Ajouter'}
      </button>
    </form>
  );
}

export default ProductForm;
