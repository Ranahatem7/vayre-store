import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useIsDesktop } from "../hooks/useIsDesktop";
import { useHover } from "../hooks/useHover";
import { colors, fonts, radii, spacing } from "../theme";

function NavLink({ to, children }) {
  const [hovered, hoverProps] = useHover();

  return (
    <Link
      to={to}
      {...hoverProps}
      style={{
        fontSize: 14,
        fontWeight: 500,
        color: hovered ? colors.text : colors.textMuted,
        transition: "color 0.2s ease",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </Link>
  );
}

function LogoutButton({ onClick }) {
  const [hovered, hoverProps] = useHover();

  return (
    <button
      onClick={onClick}
      {...hoverProps}
      style={{
        background: "none",
        border: `1px solid ${hovered ? colors.borderStrong : colors.border}`,
        borderRadius: radii.pill,
        color: hovered ? colors.text : colors.textMuted,
        fontSize: 13,
        fontWeight: 500,
        padding: "6px 14px",
        transition: "color 0.2s ease, border-color 0.2s ease",
      }}
    >
      Logout
    </button>
  );
}

function Navbar() {
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isDesktop = useIsDesktop();
  const [logoHovered, logoHoverProps] = useHover();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: spacing.md,
        padding: isDesktop ? `${spacing.md}px ${spacing.xxl}px` : `${spacing.sm}px ${spacing.md}px`,
        background: "rgba(11, 10, 16, 0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${colors.border}`,
      }}
    >
      <Link
        to="/"
        {...logoHoverProps}
        style={{
          fontFamily: fonts.heading,
          fontWeight: 700,
          fontSize: isDesktop ? 24 : 20,
          letterSpacing: 3,
          background: `linear-gradient(120deg, ${colors.text}, ${colors.purple[300]})`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          opacity: logoHovered ? 0.8 : 1,
          transition: "opacity 0.2s ease",
        }}
      >
        VAYRE
      </Link>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: isDesktop ? spacing.lg : spacing.sm,
          flexWrap: "wrap",
          justifyContent: "flex-end",
        }}
      >
        <NavLink to="/shop">Shop</NavLink>

        {user && <NavLink to="/orders">Orders</NavLink>}
        {user?.isAdmin && <NavLink to="/admin">Admin</NavLink>}

        <NavLink to="/cart">
          Cart
          <span
            style={{
              marginLeft: 6,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: 18,
              height: 18,
              padding: "0 5px",
              borderRadius: radii.pill,
              background: colors.purple[500],
              color: colors.text,
              fontSize: 11,
              fontWeight: 600,
            }}
          >
            {totalItems}
          </span>
        </NavLink>

        {user ? (
          <>
            {isDesktop && (
              <span style={{ fontSize: 14, color: colors.textFaint }}>
                {user.name}
              </span>
            )}
            <LogoutButton onClick={handleLogout} />
          </>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
