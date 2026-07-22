import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { createOrder } from "../services/orderService";

function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const orderItems = items.map((item) => ({
        productId: item.productId,
        size: item.size,
        color: item.color,
        quantity: item.quantity,
      }));

      const order = await createOrder({
        orderItems,
        shippingAddress: { fullName, address, city, phone },
      });

      clearCart();
      navigate(`/orders/${order._id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Could not place order.");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div>
        <h1>Checkout</h1>
        <p>Your cart is empty.</p>
        <Link to="/shop">Continue shopping</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Checkout</h1>

      {error && <p>{error}</p>}

      <h3>Order summary</h3>
      {items.map((item) => (
        <div key={item.key}>
          <p>
            {item.name} ({item.color} / {item.size}) × {item.quantity}
          </p>
          <p>{item.price * item.quantity} EGP</p>
        </div>
      ))}
      <p>Subtotal: {subtotal} EGP</p>

      <h3>Shipping details</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullName">Full name</label>
          <input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="address">Address</label>
          <input
            id="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="city">City</label>
          <input
            id="city"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Placing order..." : "Place Order"}
        </button>
      </form>
    </div>
  );
}

export default Checkout;
