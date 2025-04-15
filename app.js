import express from 'express';
import './config/database.js';
import { PORT } from './config/app.js';
import simpleRoutes from './controllers/simple-pages.js';
import cookiesRoutes from './controllers/cookies.js';
import orderRoutes from './controllers/orders.js';

const app = express();

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/', simpleRoutes);
app.use('/cookies', cookiesRoutes);
app.use('/orders', orderRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});