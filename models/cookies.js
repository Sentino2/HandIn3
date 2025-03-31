import mongoose from 'mongoose';

const cookieSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true }, 
  name: { type: String, required: true },               
  priceInCents: { type: Number, required: true },       
  isInStock: { type: Boolean, default: true },          
  ingredients: [String],                                
});

const Cookie = mongoose.model('Cookie', cookieSchema);

export default Cookie;
