import { useState, useEffect } from "react";
import { getProducts } from "../services/productService";
import { useIsDesktop } from "../hooks/useIsDesktop";
import { colors, spacing } from "../theme";
import ProductCard from "../components/ProductCard";
import PageMessage from "../components/PageMessage";

function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isDesktop = useIsDesktop();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError("Could not load products. Is the server running?");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <PageMessage>Loading...</PageMessage>;
  if (error) return <PageMessage tone="danger">{error}</PageMessage>;

  return (
    <div
      style={{
        padding: isDesktop ? `${spacing.xl}px ${spacing.xxl}px` : `${spacing.lg}px ${spacing.md}px`,
      }}
    >
      <h1
        style={{
          fontSize: isDesktop ? 36 : 26,
          fontWeight: 500,
          color: colors.text,
          marginBottom: spacing.xl,
        }}
      >
        Shop
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: isDesktop ? "repeat(4, 1fr)" : "repeat(2, 1fr)",
          gap: isDesktop ? spacing.lg : spacing.sm,
        }}
      >
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Shop;
