import { useState, useEffect } from "react";
import { getProducts } from "../services/productService";
import { useIsDesktop } from "../hooks/useIsDesktop";
import { colors, fonts, spacing } from "../theme";
import Button from "../components/Button";
import ProductCard from "../components/ProductCard";

function Home() {
  const isDesktop = useIsDesktop();
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const data = await getProducts();
        setFeatured(data.filter((product) => product.isFeatured));
      } catch {
        // Featured products are a bonus on the homepage, not essential —
        // fail quietly and just show nothing rather than blocking the page.
      }
    };

    fetchFeatured();
  }, []);

  return (
    <div>
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          minHeight: isDesktop ? "80vh" : "60vh",
          padding: isDesktop ? `${spacing.xxxl}px ${spacing.xxl}px` : `${spacing.xxl}px ${spacing.lg}px`,
          background: `radial-gradient(circle at 50% 30%, ${colors.purple[700]}4d, transparent 60%), ${colors.bg}`,
        }}
      >
        <h1
          style={{
            fontFamily: fonts.heading,
            fontWeight: 700,
            fontSize: isDesktop ? 88 : 52,
            letterSpacing: isDesktop ? 6 : 3,
            background: `linear-gradient(120deg, ${colors.text}, ${colors.purple[300]})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            margin: 0,
            animation: "fadeInUp 0.8s ease both",
          }}
        >
          VAYRE
        </h1>

        <p
          style={{
            marginTop: spacing.md,
            fontSize: isDesktop ? 18 : 15,
            color: colors.textMuted,
            animation: "fadeInUp 0.8s ease 0.1s both",
          }}
        >
          Considered essentials.
        </p>

        <div style={{ marginTop: spacing.xl, animation: "fadeInUp 0.8s ease 0.2s both" }}>
          <Button to="/shop">Shop the collection</Button>
        </div>
      </section>

      {featured.length > 0 && (
        <section
          style={{
            padding: isDesktop ? `${spacing.xxl}px ${spacing.xxl}px` : `${spacing.xl}px ${spacing.lg}px`,
          }}
        >
          <h2
            style={{
              fontSize: isDesktop ? 28 : 22,
              fontWeight: 500,
              color: colors.text,
              marginBottom: spacing.lg,
              textAlign: isDesktop ? "left" : "center",
            }}
          >
            Featured
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isDesktop ? "repeat(4, 1fr)" : "repeat(2, 1fr)",
              gap: isDesktop ? spacing.lg : spacing.sm,
            }}
          >
            {featured.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </section>
      )}

      <section
        style={{
          padding: isDesktop ? `${spacing.xxl}px ${spacing.xxl}px` : `${spacing.xl}px ${spacing.lg}px`,
          textAlign: "center",
        }}
      >
        <p
          style={{
            maxWidth: 640,
            margin: "0 auto",
            fontSize: isDesktop ? 20 : 16,
            lineHeight: 1.6,
            color: colors.textMuted,
          }}
        >
          Vayre is built for the in-between hours — pieces cut clean, made to
          last, and designed to disappear into how you actually move. No
          logos shouting for attention. Just considered essentials.
        </p>
      </section>

      <footer
        style={{
          borderTop: `1px solid ${colors.border}`,
          padding: isDesktop ? `${spacing.xl}px ${spacing.xxl}px` : `${spacing.lg}px ${spacing.lg}px`,
          display: "flex",
          flexDirection: isDesktop ? "row" : "column",
          alignItems: "center",
          justifyContent: "space-between",
          gap: spacing.sm,
          background: colors.bgAlt,
        }}
      >
        <span
          style={{
            fontFamily: fonts.heading,
            fontWeight: 700,
            letterSpacing: 2,
            fontSize: 16,
            color: colors.textMuted,
          }}
        >
          VAYRE
        </span>
        <span style={{ fontSize: 13, color: colors.textFaint }}>
          © {new Date().getFullYear()} Vayre. All rights reserved.
        </span>
      </footer>
    </div>
  );
}

export default Home;
