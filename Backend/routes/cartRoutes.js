import express from 'express';
import {
  getUserCart,
  addToCart,
  updateCartItemQuantity,
  removeFromCart,
} from '../controllers/cartController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, getUserCart).post(protect, addToCart);
router
  .route('/:productId')
  .put(protect, updateCartItemQuantity)
  .delete(protect, removeFromCart);

export default router;
