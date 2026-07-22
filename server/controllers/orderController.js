import mongoose from "mongoose";
import Order from "../models/Order.js";
import Product from "../models/Product.js";

// @desc    Create a new order
// @route   POST /api/orders
export const createOrder = async (req, res) => {
  const { orderItems, shippingAddress, shippingFee = 0 } = req.body;

  if (!orderItems || orderItems.length === 0) {
    return res.status(400).json({ message: "No order items" });
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    let subtotal = 0;
    const resolvedItems = [];

    // Never trust quantity/price from the client — re-check stock and
    // recompute price from the DB inside the transaction so a stale
    // cart can't oversell a variant or use a stale price.
    for (const { productId, size, color, quantity } of orderItems) {
      const product = await Product.findById(productId).session(session);

      if (!product) {
        throw new Error("A product in your order no longer exists");
      }

      const variant = product.variants.find(
        (v) => v.size === size && v.color === color
      );

      if (!variant) {
        throw new Error(
          `${product.name} is no longer available in ${size}/${color}`
        );
      }

      if (variant.stock < quantity) {
        throw new Error(
          `${product.name} (${size}/${color}) only has ${variant.stock} left in stock`
        );
      }

      variant.stock -= quantity;
      await product.save({ session });

      subtotal += product.price * quantity;

      resolvedItems.push({
        product: product._id,
        name: product.name,
        slug: product.slug,
        image: product.images[0] || "",
        price: product.price,
        size,
        color,
        quantity,
      });
    }

    const total = subtotal + shippingFee;

    const [order] = await Order.create(
      [
        {
          user: req.user._id,
          orderItems: resolvedItems,
          shippingAddress,
          subtotal,
          shippingFee,
          total,
        },
      ],
      { session }
    );

    await session.commitTransaction();
    res.status(201).json(order);
  } catch (error) {
    await session.abortTransaction();
    res.status(400).json({ message: error.message });
  } finally {
    session.endSession();
  }
};

// @desc    Get logged-in user's orders
// @route   GET /api/orders/my
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get a single order by id
// @route   GET /api/orders/:id
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      return res.status(403).json({ message: "Not authorized to view this order" });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
