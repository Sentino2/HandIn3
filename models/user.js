import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
  street: { type: String, required: false },
  zip: { type: String, required: false },
  city: { type: String, required: false },
  state: { type: String, required: false },
  country: { type: String, required: false },
});

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String, required: false },
  address: addressSchema
});

export const User = mongoose.model('User', userSchema); 