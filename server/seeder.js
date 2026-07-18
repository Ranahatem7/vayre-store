import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Product from "./models/Product.js";
import products from "./data/products.js";

dotenv.config();

const importData = async () => {
  try {
    await connectDB();
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log("✅ Data imported successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Import failed:", error.message);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await connectDB();
    await Product.deleteMany();
    console.log("🗑️  Data destroyed successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Destroy failed:", error.message);
    process.exit(1);
  }
};

// Run with "-d" flag to destroy, otherwise import
if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}