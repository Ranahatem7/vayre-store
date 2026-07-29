import express from "express";
import {
  getProducts,
  getProductBySlug,
  createProduct,
  getAdminProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.get("/admin", protect, admin, getAdminProducts);
router.route("/:slug").get(getProductBySlug);
router
  .route("/:id")
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

export default router;