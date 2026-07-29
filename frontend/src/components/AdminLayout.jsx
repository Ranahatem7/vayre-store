import { Link, Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div>
      <nav>
        <Link to="/admin">Dashboard</Link>
        <Link to="/admin/products">Products</Link>
        <Link to="/admin/orders">Orders</Link>
      </nav>

      <Outlet />
    </div>
  );
}

export default AdminLayout;
