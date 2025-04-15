import { Router } from 'express';
import { Order } from '../models/order.js';
import { User } from '../models/user.js';
import Cookie from '../models/cookies.js';

const router = Router();

// Show checkout form
router.get('/checkout', async (req, res) => {
  try {
    const cookies = await Cookie.find({ isInStock: true }).exec();
    res.render('orders/checkout', { cookies });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error loading checkout page');
  }
});

// Process checkout
router.post('/checkout', async (req, res) => {
  try {
    // Create user
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      address: {
        street: req.body.street,
        zip: req.body.zip,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country
      }
    });
    await user.save();

    // Create order
    const order = new Order({
      message: req.body.message,
      user: user._id,
      cookies: req.body.cookies || []
    });
    await order.save();

    res.redirect('/orders');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error processing order');
  }
});

// List all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate('user')
      .populate('cookies')
      .exec();
    
    res.render('orders/index', { orders });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error loading orders');
  }
});

export default router; 