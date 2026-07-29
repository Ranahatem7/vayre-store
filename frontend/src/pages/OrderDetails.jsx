import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getOrderById } from "../services/orderService";
import { useIsDesktop } from "../hooks/useIsDesktop";
import { colors, fonts, radii, spacing } from "../theme";
import ImagePlaceholder from "../components/ImagePlaceholder";
import StatusBadge from "../components/StatusBadge";
import PageMessage from "../components/PageMessage";

function OrderDetails() {
  const { id } = useParams();
  const isDesktop = useIsDesktop();

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

  if (loading) return <PageMessage>Loading...</PageMessage>;
  if (error) return <PageMessage tone="danger">{error}</PageMessage>;
  if (!order) return null;

  const pagePadding = isDesktop ? `${spacing.xl}px ${spacing.xxl}px` : `${spacing.lg}px ${spacing.md}px`;

  return (
    <div style={{ padding: pagePadding }}>
      <Link
        to="/orders"
        style={{ fontSize: 13, color: colors.textFaint, display: "inline-block", marginBottom: spacing.lg }}
      >
        ← Back to my orders
      </Link>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: spacing.md,
          marginBottom: spacing.xl,
        }}
      >
        <div>
          <h1 style={{ fontSize: isDesktop ? 28 : 22, fontWeight: 500, color: colors.text }}>
            Order #{order._id.slice(-8).toUpperCase()}
          </h1>
          <p style={{ fontSize: 13, color: colors.textFaint, marginTop: 4 }}>
            Placed on {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>

        <StatusBadge status={order.status} />
      </div>

      <div style={{ display: "flex", flexDirection: isDesktop ? "row" : "column", gap: spacing.xl }}>
        <div style={{ flex: 1.2 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: colors.text, marginBottom: spacing.md }}>
            Items
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: spacing.sm }}>
            {order.orderItems.map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: spacing.md,
                  padding: spacing.md,
                  borderRadius: radii.md,
                  background: colors.surface,
                  border: `1px solid ${colors.border}`,
                }}
              >
                <div style={{ width: 56, height: 70, flexShrink: 0, borderRadius: radii.sm, overflow: "hidden", background: colors.bgAlt }}>
                  {item.image ? (
                    <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <ImagePlaceholder />
                  )}
                </div>

                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: fonts.heading, fontSize: 14, color: colors.text }}>{item.name}</p>
                  <p style={{ fontSize: 13, color: colors.textFaint, marginTop: 2 }}>
                    {item.color} / {item.size} × {item.quantity}
                  </p>
                </div>

                <p style={{ fontSize: 14, color: colors.purple[300], fontWeight: 600 }}>
                  {item.price * item.quantity} EGP
                </p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: spacing.lg }}>
          <div style={{ padding: spacing.lg, borderRadius: radii.lg, background: colors.surface, border: `1px solid ${colors.border}` }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: colors.text, marginBottom: spacing.sm }}>
              Shipping address
            </h3>
            <p style={{ fontSize: 14, color: colors.textMuted, lineHeight: 1.7 }}>
              {order.shippingAddress.fullName}
              <br />
              {order.shippingAddress.address}
              <br />
              {order.shippingAddress.city}
              <br />
              {order.shippingAddress.phone}
            </p>
          </div>

          <div style={{ padding: spacing.lg, borderRadius: radii.lg, background: colors.surface, border: `1px solid ${colors.border}` }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: colors.text, marginBottom: spacing.sm }}>
              Totals
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 14, color: colors.textMuted }}>
              <p style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Subtotal</span> <span>{order.subtotal} EGP</span>
              </p>
              <p style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Shipping</span> <span>{order.shippingFee} EGP</span>
              </p>
              <p style={{ display: "flex", justifyContent: "space-between", fontSize: 16, fontWeight: 600, color: colors.text, borderTop: `1px solid ${colors.border}`, paddingTop: 8, marginTop: 4 }}>
                <span>Total</span> <span style={{ color: colors.purple[300] }}>{order.total} EGP</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
