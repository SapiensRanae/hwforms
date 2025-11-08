import {useProducts} from "../context/useProducts.js";

const CartPage = () => {
  const { cart, cartTotal, addToCart, decrementFromCart, removeFromCart, clearCart } = useProducts();

  if (!cart.length) {
    return (
      <div>
        <h1>Cart</h1>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Your Cart</h1>
      <ul className="list">
        {cart.map((item) => (
          <li key={item.id} className="card">
            <div className="card-title">
              <strong>{item.title}</strong>
              <span className="price">${item.price}</span>
            </div>
            <div className="card-body">
              <div className="row">
                <div>Quantity: {item.quantity}</div>
                <div>Subtotal: ${item.price * item.quantity}</div>
              </div>
            </div>
            <div className="card-actions">
              <button className="btn" onClick={() => decrementFromCart(item.id)}>-</button>
              <button className="btn" onClick={() => addToCart({ id: item.id, title: item.title, price: item.price })}>+</button>
              <button className="btn danger" onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <strong>Total: ${cartTotal}</strong>
        <div>
          <button className="btn" onClick={clearCart}>Clear cart</button>
          <button className="btn primary" onClick={() => alert('Checkout not implemented')}>Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
