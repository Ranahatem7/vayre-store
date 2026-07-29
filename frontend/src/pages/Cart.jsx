import { useCart } from "../context/CartContext";
import { useIsDesktop } from "../hooks/useIsDesktop";
import { useHover } from "../hooks/useHover";
import { colors, fonts, radii, spacing } from "../theme";
import ImagePlaceholder from "../components/ImagePlaceholder";
import Button from "../components/Button";

function QtyButton({ children, disabled, onClick }) {
  const [hovered, hoverProps] = useHover();

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      {...hoverProps}
      style={{
        width: 28,
        height: 28,
        borderRadius: radii.pill,
        border: `1px solid ${hovered && !disabled ? colors.borderStrong : colors.border}`,
        background: "transparent",
        color: disabled ? colors.textFaint : colors.text,
        fontSize: 16,
        lineHeight: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "border-color 0.2s ease",
      }}
    >
      {children}
    </button>
  );
}

function Cart() {
  const { items, updateQuantity, removeFromCart, clearCart, subtotal } = useCart();
  const isDesktop = useIsDesktop();

  const pagePadding = isDesktop ? `${spacing.xl}px ${spacing.xxl}px` : `${spacing.lg}px ${spacing.md}px`;

  if (items.length === 0) {
    return (
      <div style={{ padding: pagePadding, textAlign: "center", minHeight: "50vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: spacing.md }}>
        <h1 style={{ fontSize: 28, fontWeight: 500, color: colors.text }}>Your cart</h1>
        <p style={{ color: colors.textMuted }}>Your cart is empty.</p>
        <Button to="/shop">Continue shopping</Button>
      </div>
    );
  }

  return (
    <div style={{ padding: pagePadding }}>
      <h1 style={{ fontSize: isDesktop ? 32 : 24, fontWeight: 500, color: colors.text, marginBottom: spacing.xl }}>
        Your cart
      </h1>

      <div style={{ display: "flex", flexDirection: "column", gap: spacing.md }}>
        {items.map((item) => (
          <div
            key={item.key}
            style={{
              display: "flex",
              flexDirection: isDesktop ? "row" : "column",
              gap: spacing.md,
              padding: spacing.md,
              borderRadius: radii.lg,
              background: colors.surface,
              border: `1px solid ${colors.border}`,
            }}
          >
            <div
              style={{
                width: isDesktop ? 96 : "100%",
                height: isDesktop ? 120 : 160,
                flexShrink: 0,
                borderRadius: radii.md,
                overflow: "hidden",
                background: colors.bgAlt,
              }}
            >
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <ImagePlaceholder />
              )}
            </div>

            <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <h3 style={{ fontFamily: fonts.heading, fontSize: 16, fontWeight: 500, color: colors.text }}>
                  {item.name}
                </h3>
                <p style={{ fontSize: 13, color: colors.textMuted, marginTop: spacing.xs }}>
                  {item.color} / {item.size}
                </p>
                <p style={{ fontSize: 14, color: colors.purple[300], fontWeight: 600, marginTop: spacing.xs }}>
                  {item.price} EGP
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: spacing.sm,
                  flexWrap: "wrap",
                  gap: spacing.sm,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: spacing.sm }}>
                  <QtyButton
                    onClick={() => updateQuantity(item.key, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    −
                  </QtyButton>

                  <span style={{ minWidth: 20, textAlign: "center", color: colors.text, fontSize: 14 }}>
                    {item.quantity}
                  </span>

                  <QtyButton
                    onClick={() => updateQuantity(item.key, item.quantity + 1)}
                    disabled={item.quantity >= item.stock}
                  >
                    +
                  </QtyButton>
                </div>

                <span style={{ fontSize: 14, color: colors.textMuted }}>
                  Line total: <strong style={{ color: colors.text }}>{item.price * item.quantity} EGP</strong>
                </span>

                <button
                  onClick={() => removeFromCart(item.key)}
                  style={{
                    background: "none",
                    border: "none",
                    color: colors.danger,
                    fontSize: 13,
                    padding: 0,
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: spacing.xl,
          padding: spacing.lg,
          borderRadius: radii.lg,
          background: colors.surface,
          border: `1px solid ${colors.border}`,
          display: "flex",
          flexDirection: isDesktop ? "row" : "column",
          alignItems: isDesktop ? "center" : "stretch",
          justifyContent: "space-between",
          gap: spacing.md,
        }}
      >
        <h3 style={{ fontSize: 20, fontWeight: 600, color: colors.text }}>
          Subtotal: <span style={{ color: colors.purple[300] }}>{subtotal} EGP</span>
        </h3>

        <div style={{ display: "flex", flexDirection: isDesktop ? "row" : "column", gap: spacing.sm }}>
          <Button variant="ghost" onClick={clearCart}>Clear cart</Button>
          <Button variant="ghost" to="/shop">Continue shopping</Button>
          <Button to="/checkout">Checkout</Button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
