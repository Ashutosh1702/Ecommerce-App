import asyncHandler from 'express-async-handler';
import Cart from '../models/Cart.js';

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
const getUserCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate(
    'items.product',
    'name image price countInStock'
  );

  if (cart) {
    res.json(cart);
  } else {
    // Return empty cart if not found
    res.json({ items: [] });
  }
});

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;

  let cart = await Cart.findOne({ user: req.user._id });

  if (cart) {
    // Update existing cart
    const itemIndex = cart.items.findIndex(
      (p) => p.product.toString() === productId
    );

    if (itemIndex > -1) {
      // Product exists in cart, update quantity
      cart.items[itemIndex].quantity += Number(quantity);
    } else {
      // Product does not exist, append
      cart.items.push({ product: productId, quantity });
    }
  } else {
    // Create new cart for user
    cart = await Cart.create({
      user: req.user._id,
      items: [{ product: productId, quantity }],
    });
  }

  await cart.save();
  // Return the updated cart populated
  const updatedCart = await Cart.findOne({ user: req.user._id }).populate(
    'items.product',
    'name image price countInStock'
  );
  
  res.status(201).json(updatedCart);
});

// @desc    Update cart item quantity
// @route   PUT /api/cart/:productId
// @access  Private
const updateCartItemQuantity = asyncHandler(async (req, res) => {
  const { quantity } = req.body;
  const { productId } = req.params;

  const cart = await Cart.findOne({ user: req.user._id });

  if (cart) {
    const itemIndex = cart.items.findIndex(
      (p) => p.product.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = Number(quantity);
      await cart.save();
      
      const updatedCart = await Cart.findOne({ user: req.user._id }).populate(
        'items.product',
        'name image price countInStock'
      );
      res.json(updatedCart);
    } else {
      res.status(404);
      throw new Error('Item not found in cart');
    }
  } else {
    res.status(404);
    throw new Error('Cart not found');
  }
});

// @desc    Remove item from cart
// @route   DELETE /api/cart/:productId
// @access  Private
const removeFromCart = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  const cart = await Cart.findOne({ user: req.user._id });

  if (cart) {
    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );
    await cart.save();
    
    const updatedCart = await Cart.findOne({ user: req.user._id }).populate(
      'items.product',
      'name image price countInStock'
    );
    res.json(updatedCart);
  } else {
    res.status(404);
    throw new Error('Cart not found');
  }
});

export { getUserCart, addToCart, updateCartItemQuantity, removeFromCart };
