import express from "express";
import {
  getProducts,
  getProductBySlug,
  createProduct,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.route("/:slug").get(getProductBySlug);

export default router;