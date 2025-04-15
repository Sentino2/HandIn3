import mongoose from 'mongoose';

// Define the nutrition facts subschema
const nutritionFactsSchema = new mongoose.Schema({
  fat: { type: String, default: '' },
  sugar: { type: String, default: '' },
  salt: { type: String, default: '' }
});

const cookieSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true }, 
  name: { type: String, required: true },               
  priceInCents: { type: Number, required: true },       
  isInStock: { type: Boolean, default: true, required: true },          
  ingredients: { type: [String], default: [] },                                
  nutrition: { type: nutritionFactsSchema, default: () => ({}) }
});

const Cookie = mongoose.model('Cookie', cookieSchema);

export default Cookie;
