import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getMyOrders } from "../services/orderService";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getMyOrders();
        setOrders(data);
      } catch (err) {
        setError("Could not load orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  if (orders.length === 0) {
    return (
      <div>
        <h1>My orders</h1>
        <p>You haven't placed any orders yet.</p>
        <Link to="/shop">Start shopping</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>My orders</h1>

      {orders.map((order) => (
        <div key={order._id}>
          <p>Order #{order._id}</p>
          <p>{new Date(order.createdAt).toLocaleDateString()}</p>
          <p>Status: {order.status}</p>
          <p>Total: {order.total} EGP</p>
          <Link to={`/orders/${order._id}`}>View details</Link>
        </div>
      ))}
    </div>
  );
}

export default Orders;
