import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cookieshop'

console.log('Connecting to MongoDB...', { uri: MONGODB_URI.replace(/\/\/[^:]+:[^@]+@/, '//***:***@') })

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
})
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.error('MongoDB connection error:', {
      message: error.message,
      code: error.code,
      name: error.name
    })
    if (process.env.NODE_ENV === 'production') {
      console.error('Full error:', error)
    }
    process.exit(1)
  })

// Handle connection events
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', {
    message: err.message,
    code: err.code,
    name: err.name
  })
})

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected')
})

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected')
})

mongoose.connection.on('reconnected', () => {
  console.log('MongoDB reconnected')
})

// Handle process termination
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close()
    console.log('MongoDB connection closed through app termination')
    process.exit(0)
  } catch (err) {
    console.error('Error closing MongoDB connection:', err)
    process.exit(1)
  }
})

export const db = mongoose.connection 