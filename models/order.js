import mongoose from 'mongoose';
import Cookie from './cookies.js';

const { Schema } = mongoose;

const orderSchema = new mongoose.Schema({
  message: { type: String, required: true },
  cookies: [{ type: Schema.Types.ObjectId, ref: 'Cookie' }],
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  status: { 
    type: String, 
    enum: ['pending', 'processing', 'completed', 'cancelled'],
    default: 'pending'
  },
  createdAt: { type: Date, default: Date.now }
});

export const Order = mongoose.model('Order', orderSchema); 