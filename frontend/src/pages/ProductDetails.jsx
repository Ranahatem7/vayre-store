import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductBySlug } from "../services/productService";
import { useCart } from "../context/CartContext";
import { useIsDesktop } from "../hooks/useIsDesktop";
import { useHover } from "../hooks/useHover";
import { colors, fonts, radii, spacing } from "../theme";
import ImagePlaceholder from "../components/ImagePlaceholder";
import Button from "../components/Button";
import PageMessage from "../components/PageMessage";

function ColorChip({ color, selected, onClick }) {
  const [hovered, hoverProps] = useHover();

  return (
    <button
      onClick={onClick}
      {...hoverProps}
      style={{
        padding: "8px 18px",
        borderRadius: radii.pill,
        fontSize: 13,
        fontWeight: 500,
        border: `1px solid ${
          selected ? colors.purple[400] : hovered ? colors.borderStrong : colors.border
        }`,
        background: selected ? `${colors.purple[500]}22` : "transparent",
        color: selected ? colors.purple[200] : colors.textMuted,
        transition: "all 0.2s ease",
      }}
    >
      {color}
    </button>
  );
}

function SizeButton({ size, selected, disabled, soldOut, onClick }) {
  const [hovered, hoverProps] = useHover();

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      {...hoverProps}
      style={{
        minWidth: 52,
        padding: "10px 14px",
        borderRadius: radii.md,
        fontSize: 13,
        fontWeight: 600,
        border: `1px solid ${
          selected
            ? colors.purple[400]
            : hovered && !disabled
              ? colors.borderStrong
              : colors.border
        }`,
        background: selected ? `${colors.purple[500]}22` : "transparent",
        color: soldOut ? colors.textFaint : selected ? colors.purple[200] : colors.text,
        textDecoration: soldOut ? "line-through" : "none",
        opacity: soldOut ? 0.5 : 1,
        transition: "all 0.2s ease",
      }}
    >
      {size}
    </button>
  );
}

function ProductDetails() {
  const { slug } = useParams();
  const { addToCart } = useCart();
  const isDesktop = useIsDesktop();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await getProductBySlug(slug);
        setProduct(data);
      } catch (err) {
        setError("Product not found.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  if (loading) return <PageMessage>Loading...</PageMessage>;
  if (error) return <PageMessage tone="danger">{error}</PageMessage>;
  if (!product) return null;

  // Unique colors across all variants
  const colorOptions = [...new Set(product.variants.map((v) => v.color))];

  // Sizes available for the selected color
  const sizesForColor = product.variants.filter(
    (v) => v.color === selectedColor
  );

  // The exact variant the customer picked
  const selectedVariant = product.variants.find(
    (v) => v.color === selectedColor && v.size === selectedSize
  );

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setSelectedSize(""); // reset size — it may not exist in the new color
  };

  const image = product.images?.[0];

  return (
    <div
      style={{
        padding: isDesktop ? `${spacing.xl}px ${spacing.xxl}px` : `${spacing.lg}px ${spacing.md}px`,
      }}
    >
      <Link
        to="/shop"
        style={{ fontSize: 13, color: colors.textFaint, display: "inline-block", marginBottom: spacing.lg }}
      >
        ← Back to shop
      </Link>

      <div
        style={{
          display: "flex",
          flexDirection: isDesktop ? "row" : "column",
          gap: isDesktop ? spacing.xxl : spacing.lg,
        }}
      >
        <div
          style={{
            flex: isDesktop ? "0 0 46%" : "none",
            position: "relative",
            width: "100%",
            paddingTop: isDesktop ? "56%" : "110%",
            borderRadius: radii.lg,
            overflow: "hidden",
            background: colors.bgAlt,
          }}
        >
          <div style={{ position: "absolute", inset: 0 }}>
            {image ? (
              <img
                src={image}
                alt={product.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <ImagePlaceholder style={{ borderRadius: 0 }} />
            )}
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <h1
            style={{
              fontFamily: fonts.heading,
              fontSize: isDesktop ? 34 : 26,
              fontWeight: 500,
              color: colors.text,
              marginBottom: spacing.sm,
            }}
          >
            {product.name}
          </h1>

          <p
            style={{
              fontSize: 22,
              fontWeight: 600,
              color: colors.purple[300],
              marginBottom: spacing.lg,
            }}
          >
            {product.price} EGP
          </p>

          <p
            style={{
              color: colors.textMuted,
              lineHeight: 1.6,
              marginBottom: spacing.xl,
            }}
          >
            {product.description}
          </p>

          <div style={{ marginBottom: spacing.lg }}>
            <h4 style={{ fontSize: 13, fontWeight: 600, color: colors.textFaint, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: spacing.sm }}>
              Color
            </h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: spacing.sm }}>
              {colorOptions.map((color) => (
                <ColorChip
                  key={color}
                  color={color}
                  selected={selectedColor === color}
                  onClick={() => handleColorSelect(color)}
                />
              ))}
            </div>
          </div>

          {selectedColor && (
            <div style={{ marginBottom: spacing.lg }}>
              <h4 style={{ fontSize: 13, fontWeight: 600, color: colors.textFaint, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: spacing.sm }}>
                Size
              </h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: spacing.sm }}>
                {sizesForColor.map((variant) => (
                  <SizeButton
                    key={variant.size}
                    size={variant.size}
                    selected={selectedSize === variant.size}
                    disabled={variant.stock === 0}
                    soldOut={variant.stock === 0}
                    onClick={() => setSelectedSize(variant.size)}
                  />
                ))}
              </div>
            </div>
          )}

          {selectedVariant && (
            <p
              style={{
                fontSize: 13,
                color: selectedVariant.stock > 0 ? colors.textMuted : colors.danger,
                marginBottom: spacing.lg,
              }}
            >
              {selectedVariant.stock > 0
                ? `In stock: ${selectedVariant.stock}`
                : "Sold out"}
            </p>
          )}

          <Button
            onClick={() => addToCart(product, selectedVariant)}
            disabled={!selectedVariant || selectedVariant.stock === 0}
            style={{ width: isDesktop ? "auto" : "100%" }}
          >
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
