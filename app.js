import express from 'express';
import './config/database.js';
import { PORT } from './config/app.js';
import simpleRoutes from './controllers/simple-pages.js';
import cookiesRoutes from './controllers/cookies.js';
import orderRoutes from './controllers/orders.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.use('/', simpleRoutes);
app.use('/cookies', cookiesRoutes);
app.use('/orders', orderRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error details:', {
    message: err.message,
    stack: err.stack,
    status: err.status || 500
  });
  
  if (process.env.NODE_ENV === 'production') {
    res.status(500).render('error', {
      message: 'Something went wrong!',
      error: {}
    });
  } else {
    res.status(500).render('error', {
      message: err.message,
      error: err
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).render('error', {
    message: 'Page not found',
    error: {}
  });
});

// Start server only if not in Vercel environment
if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || PORT;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

// Export for Vercel
export default app;