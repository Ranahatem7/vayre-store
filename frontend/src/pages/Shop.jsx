import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../services/productService";

function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Shop</h1>

      <div>
        {products.map((product) => (
          <div key={product._id}>
            <h3>{product.name}</h3>
            <p>{product.price} EGP</p>
            <Link to={`/product/${product.slug}`}>View</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shop;