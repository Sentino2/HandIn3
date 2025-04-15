import mongoose from 'mongoose'
import { MONGODB_URI } from './app.js'

mongoose.connect(MONGODB_URI)
  .then(() => console.log('💽 Database connected'))
  .catch(error => console.error(error))

export const db = mongoose.connection 