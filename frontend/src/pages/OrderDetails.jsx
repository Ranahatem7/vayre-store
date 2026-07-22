import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getOrderById } from "../services/orderService";

function OrderDetails() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const data = await getOrderById(id);
        setOrder(data);
      } catch (err) {
        setError(err.response?.data?.message || "Order not found.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!order) return null;

  return (
    <div>
      <Link to="/orders">← Back to my orders</Link>

      <h1>Order #{order._id}</h1>
      <p>Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
      <p>Status: {order.status}</p>

      <h3>Items</h3>
      {order.orderItems.map((item, index) => (
        <div key={index}>
          <p>
            {item.name} ({item.color} / {item.size}) × {item.quantity}
          </p>
          <p>{item.price * item.quantity} EGP</p>
        </div>
      ))}

      <h3>Shipping address</h3>
      <p>{order.shippingAddress.fullName}</p>
      <p>{order.shippingAddress.address}</p>
      <p>{order.shippingAddress.city}</p>
      <p>{order.shippingAddress.phone}</p>

      <h3>Totals</h3>
      <p>Subtotal: {order.subtotal} EGP</p>
      <p>Shipping: {order.shippingFee} EGP</p>
      <p>Total: {order.total} EGP</p>
    </div>
  );
}

export default OrderDetails;
