import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const { items, updateQuantity, removeFromCart, clearCart, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <div>
        <h1>Your cart</h1>
        <p>Your cart is empty.</p>
        <Link to="/shop">Continue shopping</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Your cart</h1>

      {items.map((item) => (
        <div key={item.key}>
          <h3>{item.name}</h3>
          <p>
            {item.color} / {item.size}
          </p>
          <p>{item.price} EGP</p>

          <div>
            <button
              onClick={() => updateQuantity(item.key, item.quantity - 1)}
              disabled={item.quantity <= 1}
            >
              −
            </button>

            <span> {item.quantity} </span>

            <button
              onClick={() => updateQuantity(item.key, item.quantity + 1)}
              disabled={item.quantity >= item.stock}
            >
              +
            </button>
          </div>

          <p>Line total: {item.price * item.quantity} EGP</p>

          <button onClick={() => removeFromCart(item.key)}>Remove</button>
        </div>
      ))}

      <hr />

      <h3>Subtotal: {subtotal} EGP</h3>

      <button onClick={clearCart}>Clear cart</button>
      <Link to="/shop">Continue shopping</Link>
    </div>
  );
}

export default Cart;