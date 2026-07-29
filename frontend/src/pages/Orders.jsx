import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getMyOrders } from "../services/orderService";
import { useIsDesktop } from "../hooks/useIsDesktop";
import { useHover } from "../hooks/useHover";
import { colors, radii, shadows, spacing } from "../theme";
import StatusBadge from "../components/StatusBadge";
import PageMessage from "../components/PageMessage";
import Button from "../components/Button";

function OrderRow({ order }) {
  const [hovered, hoverProps] = useHover();

  return (
    <Link
      to={`/orders/${order._id}`}
      {...hoverProps}
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: spacing.md,
        padding: spacing.lg,
        borderRadius: radii.lg,
        background: colors.surface,
        border: `1px solid ${hovered ? colors.borderStrong : colors.border}`,
        boxShadow: hovered ? shadows.sm : "none",
        transition: "border-color 0.2s ease, box-shadow 0.2s ease",
      }}
    >
      <div>
        <p style={{ fontSize: 14, fontWeight: 600, color: colors.text }}>
          Order #{order._id.slice(-8).toUpperCase()}
        </p>
        <p style={{ fontSize: 13, color: colors.textFaint, marginTop: 4 }}>
          {new Date(order.createdAt).toLocaleDateString()}
        </p>
      </div>

      <StatusBadge status={order.status} />

      <p style={{ fontSize: 15, fontWeight: 600, color: colors.purple[300] }}>
        {order.total} EGP
      </p>

      <span style={{ fontSize: 13, color: hovered ? colors.text : colors.textMuted }}>
        View details →
      </span>
    </Link>
  );
}

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isDesktop = useIsDesktop();

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

  if (loading) return <PageMessage>Loading...</PageMessage>;
  if (error) return <PageMessage tone="danger">{error}</PageMessage>;

  const pagePadding = isDesktop ? `${spacing.xl}px ${spacing.xxl}px` : `${spacing.lg}px ${spacing.md}px`;

  if (orders.length === 0) {
    return (
      <div style={{ padding: pagePadding, textAlign: "center", minHeight: "50vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: spacing.md }}>
        <h1 style={{ fontSize: 28, fontWeight: 500, color: colors.text }}>My orders</h1>
        <p style={{ color: colors.textMuted }}>You haven't placed any orders yet.</p>
        <Button to="/shop">Start shopping</Button>
      </div>
    );
  }

  return (
    <div style={{ padding: pagePadding }}>
      <h1 style={{ fontSize: isDesktop ? 32 : 24, fontWeight: 500, color: colors.text, marginBottom: spacing.xl }}>
        My orders
      </h1>

      <div style={{ display: "flex", flexDirection: "column", gap: spacing.md }}>
        {orders.map((order) => (
          <OrderRow key={order._id} order={order} />
        ))}
      </div>
    </div>
  );
}

export default Orders;
