// javascript
// file: `src/pages/CartPage.jsx`
import { Link } from "react-router-dom";
import { useState } from "react";
import { useProducts } from "../context/useProducts.js";

const PLACEHOLDER = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22600%22 height=%22400%22%3E%3Crect width=%22100%25%22 height=%22100%25%22 fill=%22%230b1220%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 fill=%22%239aa4b2%22 font-size=%2220%22 text-anchor=%22middle%22 dy=%22.3em%22%3ENo%20image%3C/text%3E%3C/svg%3E';

const fmt = (n) =>
    Number(n || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const CartPage = () => {

    const { cart, cartTotal, addToCart, decrementFromCart, removeFromCart, clearCart, state } = useProducts();
    const products = state?.products || [];
    const [processing, setProcessing] = useState(false);
    const [success, setSuccess] = useState(null);

    const handleCheckout = async () => {
        if (!cart.length) return;
        setProcessing(true);
        setTimeout(() => {
            const orderId = "ORD" + Math.random().toString(36).slice(2, 9).toUpperCase();
            clearCart();
            setProcessing(false);
            setSuccess({ orderId, total: cartTotal });
        }, 1200);
    };

    if (!cart.length) {
        return (
            <div className="container">
                <h1>Cart</h1>
                <div className="card card-hover fade-in-up" style={{ maxWidth: 640, marginTop: 12 }}>
                    <div style={{ padding: 22, textAlign: "center" }}>
                        <p className="muted">Your cart is empty.</p>
                        <Link to="/">
                            <button className="btn primary" style={{ marginTop: 12 }}>Continue shopping</button>
                        </Link>
                    </div>
                </div>

                {success && (
                    <div className="modal-overlay" onClick={() => setSuccess(null)}>
                        <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-header">
                                <h3>Purchase successful</h3>
                                <button className="btn" onClick={() => setSuccess(null)}>Close</button>
                            </div>
                            <div className="modal-content" style={{ textAlign: "center", paddingTop: 12 }}>
                                <div className="checkmark">✓</div>
                                <p style={{ marginTop: 12 }}>
                                    Thank you — your fake order <strong>{success.orderId}</strong> for <strong>${fmt(success.total)}</strong> completed.
                                </p>
                                <div className="modal-actions">
                                    <Link to="/"><button className="btn primary">Back to shop</button></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="container">
            <h1>Your Cart</h1>

            <ul className="list" style={{ marginTop: 12 }}>
                {cart.map((item) => {

                    const productFromStore = products.find((p) => p.id === item.id);
                    const imgSrc = item.image || productFromStore?.image || PLACEHOLDER;

                    return (
                        <li
                            key={item.id}
                            className="card card-hover fade-in-up"
                            style={{ display: "flex", gap: 12, alignItems: "center", padding: 12 }}
                        >
                            <img
                                src={imgSrc}
                                alt={item.title}
                                width={96}
                                height={76}
                                loading="lazy"
                                decoding="async"
                                style={{ width: 96, height: 76, objectFit: "cover", borderRadius: 8, flex: "0 0 96px", background: "rgba(255,255,255,0.02)", minWidth: 96, minHeight: 76 }}
                                onError={(e) => {
                                    e.currentTarget.onerror = null;
                                    e.currentTarget.src = PLACEHOLDER;
                                    e.currentTarget.alt = "Image not found";
                                    e.currentTarget.style.opacity = "0.6";
                                }}
                            />
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div className="card-title" style={{ alignItems: "flex-start", gap: 8 }}>
                                    <strong style={{ fontSize: 16, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.title}</strong>
                                    <span className="price" style={{ marginLeft: "auto" }}>${fmt(item.price)}</span>
                                </div>

                                <div className="card-body" style={{ marginTop: 8 }}>
                                    <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                                        <div className="muted">Quantity</div>
                                        <div style={{ display: "inline-flex", gap: 6, alignItems: "center" }}>
                                            <button
                                                className="btn"
                                                aria-label={`decrease ${item.title}`}
                                                onClick={() => decrementFromCart(item.id)}
                                                style={{ padding: "6px 10px", minWidth: 36 }}
                                            >
                                                −
                                            </button>
                                            <div style={{ minWidth: 36, textAlign: "center", fontWeight: 700 }}>{item.quantity}</div>
                                            <button
                                                className="btn"
                                                aria-label={`increase ${item.title}`}

                                                onClick={() => addToCart(productFromStore || { id: item.id, title: item.title, price: item.price, image: item.image })}
                                                style={{ padding: "6px 10px", minWidth: 36 }}
                                            >
                                                +
                                            </button>
                                        </div>

                                        <div style={{ marginLeft: "auto", textAlign: "right" }}>
                                            <div className="muted" style={{ fontSize: 13 }}>Subtotal</div>
                                            <div style={{ fontWeight: 700 }}>${fmt(item.price * item.quantity)}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card-actions" style={{ marginTop: 12 }}>
                                    <button className="btn danger" onClick={() => removeFromCart(item.id)}>Remove</button>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>

            <div className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16 }}>
                <div>
                    <div className="muted">Total</div>
                    <div style={{ fontSize: 20, fontWeight: 800 }}>${fmt(cartTotal)}</div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                    <button className="btn" onClick={clearCart} disabled={processing}>Clear cart</button>
                    <button className="btn primary" onClick={handleCheckout} disabled={processing}>
                        {processing ? "Processing..." : "Checkout"}
                    </button>
                </div>
            </div>

            {success && (
                <div className="modal-overlay" onClick={() => setSuccess(null)}>
                    <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Purchase successful</h3>
                            <button className="btn" onClick={() => setSuccess(null)}>Close</button>
                        </div>
                        <div className="modal-content" style={{ textAlign: "center", paddingTop: 12 }}>
                            <div className="checkmark">✓</div>
                            <p style={{ marginTop: 12 }}>
                                Thank you — your fake order <strong>{success.orderId}</strong> for <strong>${fmt(success.total)}</strong> completed.
                            </p>
                            <div className="modal-actions">
                                <Link to="/"><button className="btn primary">Back to shop</button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
