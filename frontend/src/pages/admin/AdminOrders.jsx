import { useState, useEffect } from "react";
import { getAllOrders, updateOrderStatus } from "../../services/orderService";

const STATUSES = ["Pending", "Paid", "Shipped", "Delivered", "Cancelled"];

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getAllOrders();
        setOrders(data);
      } catch (err) {
        setError("Could not load orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, status) => {
    try {
      const updated = await updateOrderStatus(orderId, status);
      setOrders((prev) =>
        prev.map((order) => (order._id === orderId ? updated : order))
      );
    } catch (err) {
      alert(err.response?.data?.message || "Could not update order status.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Orders</h1>

      <table>
        <thead>
          <tr>
            <th>Order</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.user?.name || "—"}</td>
              <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              <td>{order.total} EGP</td>
              <td>
                <select
                  value={order.status}
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                >
                  {STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminOrders;
