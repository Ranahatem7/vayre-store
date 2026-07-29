import { Link } from "react-router-dom";
import { useHover } from "../hooks/useHover";
import { colors, radii, fonts, shadows } from "../theme";

const VARIANTS = {
  primary: {
    base: {
      background: `linear-gradient(120deg, ${colors.purple[500]}, ${colors.purple[600]})`,
      color: colors.text,
      border: "1px solid transparent",
    },
    hover: { boxShadow: shadows.glow, transform: "translateY(-1px)" },
  },
  ghost: {
    base: {
      background: "transparent",
      color: colors.textMuted,
      border: `1px solid ${colors.border}`,
    },
    hover: { color: colors.text, borderColor: colors.borderStrong },
  },
  danger: {
    base: {
      background: "transparent",
      color: colors.danger,
      border: `1px solid ${colors.danger}55`,
    },
    hover: { background: colors.dangerBg },
  },
};

// Shared CTA styling for every page. Renders a <Link> when `to` is
// given, otherwise a <button> — same look either way.
function Button({ variant = "primary", disabled, style, to, children, ...props }) {
  const [hovered, hoverProps] = useHover();
  const v = VARIANTS[variant];

  const computedStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: fonts.body,
    fontWeight: 600,
    fontSize: 14,
    padding: "12px 24px",
    borderRadius: radii.pill,
    transition:
      "transform 0.2s ease, box-shadow 0.2s ease, color 0.2s ease, border-color 0.2s ease, background 0.2s ease",
    opacity: disabled ? 0.45 : 1,
    ...v.base,
    ...(hovered && !disabled ? v.hover : {}),
    ...style,
  };

  if (to) {
    return (
      <Link to={to} {...hoverProps} style={computedStyle}>
        {children}
      </Link>
    );
  }

  return (
    <button disabled={disabled} {...hoverProps} {...props} style={computedStyle}>
      {children}
    </button>
  );
}

export default Button;
