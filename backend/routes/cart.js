import express from "express";
import Cart from "../models/Cart.js";
import { authenticate } from "../middleware/authMiddleware.js";
import Product from "../models/Product.js";

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
  const { productId, quantity } = req.body;

  // Validate request body
  if (!productId || !quantity) {
    return res
      .status(400)
      .json({ message: "ProductId and quantity are required" });
  }

  try {
    // Check if the product exists in the database
    const productExists = await Product.findById(productId);
    if (!productExists) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      cart = new Cart({ userId: req.user.id, products: [] });
    }

    // Check if the product already exists in the cart
    const productIndex = cart.products.findIndex((p) =>
      p.productId.equals(productId)
    );
    if (productIndex > -1) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({ productId, quantity });
    }

    await cart.save();
    res.status(201).json({ message: "Product added to cart" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/", authenticate, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate(
      "products.productId"
    );

    if (!cart) {
      return res.status(404).json({ message: "Cart is empty" });
    }

    const productsWithDetails = cart.products.map((item) => {
      if (!item.productId) {
        return null; // Handle cases where productId is null
      }
      return {
        _id: item._id,
        product: {
          id: item.productId._id,
          name: item.productId.name,
          price: item.productId.price,
          description: item.productId.description,
        },
        quantity: item.quantity,
      };
    });

    // Remove null items
    const filteredProducts = productsWithDetails.filter(
      (item) => item !== null
    );

    res.status(200).json({
      userId: cart.userId,
      products: filteredProducts,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
