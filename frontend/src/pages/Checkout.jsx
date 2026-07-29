import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { createOrder } from "../services/orderService";
import { useIsDesktop } from "../hooks/useIsDesktop";
import { colors, fonts, radii, spacing } from "../theme";
import ImagePlaceholder from "../components/ImagePlaceholder";
import Button from "../components/Button";
import FormField from "../components/FormField";
import ErrorBanner from "../components/ErrorBanner";

function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const isDesktop = useIsDesktop();

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

  const pagePadding = isDesktop ? `${spacing.xl}px ${spacing.xxl}px` : `${spacing.lg}px ${spacing.md}px`;

  if (items.length === 0) {
    return (
      <div style={{ padding: pagePadding, textAlign: "center", minHeight: "50vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: spacing.md }}>
        <h1 style={{ fontSize: 28, fontWeight: 500, color: colors.text }}>Checkout</h1>
        <p style={{ color: colors.textMuted }}>Your cart is empty.</p>
        <Button to="/shop">Continue shopping</Button>
      </div>
    );
  }

  return (
    <div style={{ padding: pagePadding }}>
      <h1 style={{ fontSize: isDesktop ? 32 : 24, fontWeight: 500, color: colors.text, marginBottom: spacing.xl }}>
        Checkout
      </h1>

      {error && <ErrorBanner>{error}</ErrorBanner>}

      <div
        style={{
          display: "flex",
          flexDirection: isDesktop ? "row" : "column-reverse",
          gap: spacing.xl,
        }}
      >
        <form onSubmit={handleSubmit} style={{ flex: 1.2 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: colors.text, marginBottom: spacing.md }}>
            Shipping details
          </h3>

          <FormField
            label="Full name"
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

          <FormField
            label="Address"
            id="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />

          <FormField
            label="City"
            id="city"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />

          <FormField
            label="Phone"
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <Button type="submit" disabled={loading} style={{ width: "100%", marginTop: spacing.sm }}>
            {loading ? "Placing order..." : "Place Order"}
          </Button>
        </form>

        <div
          style={{
            flex: 1,
            height: "fit-content",
            padding: spacing.lg,
            borderRadius: radii.lg,
            background: colors.surface,
            border: `1px solid ${colors.border}`,
          }}
        >
          <h3 style={{ fontSize: 16, fontWeight: 600, color: colors.text, marginBottom: spacing.md }}>
            Order summary
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: spacing.sm }}>
            {items.map((item) => (
              <div key={item.key} style={{ display: "flex", gap: spacing.sm, alignItems: "center" }}>
                <div style={{ width: 48, height: 60, flexShrink: 0, borderRadius: radii.sm, overflow: "hidden", background: colors.bgAlt }}>
                  {item.image ? (
                    <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <ImagePlaceholder />
                  )}
                </div>

                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 13, color: colors.text, fontFamily: fonts.heading }}>
                    {item.name}
                  </p>
                  <p style={{ fontSize: 12, color: colors.textFaint }}>
                    {item.color} / {item.size} × {item.quantity}
                  </p>
                </div>

                <p style={{ fontSize: 13, color: colors.textMuted }}>{item.price * item.quantity} EGP</p>
              </div>
            ))}
          </div>

          <div style={{ borderTop: `1px solid ${colors.border}`, marginTop: spacing.md, paddingTop: spacing.md }}>
            <p style={{ fontSize: 16, fontWeight: 600, color: colors.text }}>
              Subtotal: <span style={{ color: colors.purple[300] }}>{subtotal} EGP</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
