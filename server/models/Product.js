import mongoose from "mongoose";


const variantSchema = new mongoose.Schema(
  {
    size: {
      type: String,
      required: true,
      enum: ["XS", "S", "M", "L", "XL", "XXL"],
    },
    color: {
      type: String,
      required: true,
      trim: true,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
  },
  { _id: false } 
);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      required: true,
      enum: ["men", "women", "unisex"],
    },
    subcategory: {
      type: String,
      required: true,
      enum: ["t-shirts", "hoodies", "shirts", "pants", "jackets", "accessories"],
    },
    images: [
      {
        type: String, 
      },
    ],
    variants: [variantSchema],
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true } 
);

const Product = mongoose.model("Product", productSchema);

export default Product;