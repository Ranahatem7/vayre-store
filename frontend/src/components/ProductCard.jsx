import { Link } from "react-router-dom";
import { colors, radii, shadows, spacing, fonts } from "../theme";
import { useHover } from "../hooks/useHover";
import ImagePlaceholder from "./ImagePlaceholder";

function ProductCard({ product }) {
  const [hovered, hoverProps] = useHover();
  const image = product.images?.[0];

  return (
    <Link
      to={`/product/${product.slug}`}
      {...hoverProps}
      style={{
        display: "block",
        borderRadius: radii.lg,
        overflow: "hidden",
        background: colors.surface,
        border: `1px solid ${hovered ? colors.borderStrong : colors.border}`,
        boxShadow: hovered ? shadows.md : "none",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition:
          "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          paddingTop: "125%",
          background: colors.bgAlt,
        }}
      >
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          {image ? (
            <img
              src={image}
              alt={product.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transform: hovered ? "scale(1.06)" : "scale(1)",
                transition: "transform 0.5s ease",
              }}
            />
          ) : (
            <ImagePlaceholder style={{ borderRadius: 0 }} />
          )}
        </div>
      </div>

      <div style={{ padding: spacing.md }}>
        <h3
          style={{
            fontFamily: fonts.heading,
            fontSize: 16,
            fontWeight: 500,
            color: colors.text,
            marginBottom: spacing.xs,
          }}
        >
          {product.name}
        </h3>
        <p style={{ color: colors.purple[300], fontWeight: 600, fontSize: 15 }}>
          {product.price} EGP
        </p>
      </div>
    </Link>
  );
}

export default ProductCard;
