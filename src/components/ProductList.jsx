import { useState } from "react";
import { useProducts } from "../context/ProductContext";
import Modal from "./Modal";

const ProductList = () => {
  const { state, loading, error } = useProducts();
  const products = state.products;
  const [selected, setSelected] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleBuy = (product) => {
    setSelected(product);
    setSuccess(false);
  };

  const closeModal = () => {
    setSelected(null);
    setSuccess(false);
  };

  const confirmPurchase = () => {
    // Fake purchase confirmation
    setSuccess(true);
    // Auto-close after a short delay
    setTimeout(() => {
      closeModal();
    }, 1200);
  };

  if (loading) return <p className="muted">Loading products...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!products.length) return <p>No products</p>;
  return (
    <>
      <ul className="list">
        {products.map((p, idx) => (
          <li key={p.id} className="card card-hover fade-in" style={{ animationDelay: `${idx * 60}ms` }}>
            <div className="card-title">
              <strong>{p.title}</strong>
              <span className="price">${p.price}</span>
            </div>
            <div className="card-body">{p.description}</div>
            <div className="card-actions">
              <button className="btn buy" onClick={() => handleBuy(p)}>Buy</button>
            </div>
          </li>
        ))}
      </ul>

      <Modal open={!!selected} onClose={closeModal} title={success ? "Success" : selected?.title || ""}>
        {!success ? (
          <div className="purchase">
            <p>Buy <strong>{selected?.title}</strong> for <strong>${selected?.price}</strong>?</p>
            <div className="modal-actions">
              <button className="btn" onClick={closeModal}>Cancel</button>
              <button className="btn primary" onClick={confirmPurchase}>Confirm</button>
            </div>
          </div>
        ) : (
          <div className="purchase success fade-in-up">
            <div className="checkmark" aria-hidden>✓</div>
            <p>Purchase completed!</p>
          </div>
        )}
      </Modal>
    </>
  );
};

export default ProductList;
