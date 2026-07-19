import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductBySlug } from "../services/productService";
import { useCart } from "../context/CartContext";

function ProductDetails() {
  const { slug } = useParams();
  const { addToCart } = useCart();

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return null;

  // Unique colors across all variants
  const colors = [...new Set(product.variants.map((v) => v.color))];

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

  return (
    <div>
      <Link to="/shop">← Back to shop</Link>

      <h1>{product.name}</h1>
      <p>{product.price} EGP</p>
      <p>{product.description}</p>

      <div>
        <h4>Color</h4>
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => handleColorSelect(color)}
            style={{
              fontWeight: selectedColor === color ? "bold" : "normal",
            }}
          >
            {color}
          </button>
        ))}
      </div>

      {selectedColor && (
        <div>
          <h4>Size</h4>
          {sizesForColor.map((variant) => (
            <button
              key={variant.size}
              onClick={() => setSelectedSize(variant.size)}
              disabled={variant.stock === 0}
              style={{
                fontWeight: selectedSize === variant.size ? "bold" : "normal",
              }}
            >
              {variant.size}
              {variant.stock === 0 && " (Sold out)"}
            </button>
          ))}
        </div>
      )}

      {selectedVariant && (
        <p>
          {selectedVariant.stock > 0
            ? `In stock: ${selectedVariant.stock}`
            : "Sold out"}
        </p>
      )}

      <button
        onClick={() => addToCart(product, selectedVariant)}
        disabled={!selectedVariant || selectedVariant.stock === 0}
      >
        Add to cart
      </button>
    </div>
  );
}

export default ProductDetails;