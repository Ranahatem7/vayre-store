import { useState, useEffect } from "react";
import { getStats } from "../../services/adminService";

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getStats();
        setStats(data);
      } catch (err) {
        setError("Could not load dashboard stats.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Dashboard</h1>

      <div>
        <div>
          <h3>Total orders</h3>
          <p>{stats.totalOrders}</p>
        </div>

        <div>
          <h3>Total revenue</h3>
          <p>{stats.totalRevenue} EGP</p>
        </div>

        <div>
          <h3>Products</h3>
          <p>{stats.productCount}</p>
        </div>

        <div>
          <h3>Low stock (below {stats.lowStockThreshold})</h3>
          <p>{stats.lowStockCount}</p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
