import { colors, fonts, radii } from "../theme";

// Shown wherever a product/order-item image is missing. Fills whatever
// box the caller sizes it into.
function ImagePlaceholder({ style }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: `linear-gradient(135deg, ${colors.purple[900]} 0%, ${colors.bgAlt} 100%)`,
        borderRadius: radii.md,
        ...style,
      }}
    >
      <span
        style={{
          fontFamily: fonts.heading,
          fontWeight: 600,
          fontSize: 40,
          letterSpacing: 2,
          color: colors.purple[400],
          opacity: 0.35,
        }}
      >
        V
      </span>
    </div>
  );
}

export default ImagePlaceholder;
