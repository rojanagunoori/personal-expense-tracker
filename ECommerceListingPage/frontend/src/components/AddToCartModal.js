import React from 'react';

const AddToCartModal = ({ product, onClose, onConfirm }) => (
  <div className="modal">
    <h2>Confirm Add to Cart</h2>
    <p>Are you sure you want to add {product.name} to your cart?</p>
    <button onClick={onClose}>Cancel</button>
    <button onClick={onConfirm}>Confirm</button>
  </div>
);

export default AddToCartModal;
