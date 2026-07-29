import Order from "../models/Order.js";
import Product from "../models/Product.js";

const LOW_STOCK_THRESHOLD = 5;

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
export const getStats = async (req, res) => {
  try {
    const [totalOrders, productCount, revenueResult, lowStockResult] =
      await Promise.all([
        Order.countDocuments(),
        Product.countDocuments(),
        // A cancelled order was never fulfilled, so its total shouldn't
        // count as revenue.
        Order.aggregate([
          { $match: { status: { $ne: "Cancelled" } } },
          { $group: { _id: null, total: { $sum: "$total" } } },
        ]),
        // $unwind turns each product's variants array into one document
        // per variant, so the $match/$count below scans every variant
        // across every product rather than just the top-level products.
        Product.aggregate([
          { $unwind: "$variants" },
          { $match: { "variants.stock": { $lt: LOW_STOCK_THRESHOLD } } },
          { $count: "count" },
        ]),
      ]);

    res.json({
      totalOrders,
      totalRevenue: revenueResult[0]?.total || 0,
      productCount,
      lowStockCount: lowStockResult[0]?.count || 0,
      lowStockThreshold: LOW_STOCK_THRESHOLD,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
