import express from 'express';
import './config/database.js';
import { PORT } from './config/app.js';
import simpleRoutes from './controllers/simple-pages.js';
import cookiesRoutes from './controllers/cookies.js';
import orderRoutes from './controllers/orders.js';

const app = express();

// Middleware
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.use('/', simpleRoutes);
app.use('/cookies', cookiesRoutes);
app.use('/orders', orderRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// 404 handler
app.use((req, res) => {
  res.status(404).send('Page not found');
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