import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Navbar() {
  const { totalItems } = useCart();

  return (
    <nav>
      <Link to="/">VAYRE</Link>
      <Link to="/shop">Shop</Link>
      <Link to="/cart">Cart ({totalItems})</Link>
    </nav>
  );
}

export default Navbar;