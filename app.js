import express from 'express';
import mongoose from 'mongoose';
import cookieRoutes from './routes/cookieRoutes.js'; 
import { readablePrice } from './helpers/cookie-views.js'; 
import Cookie from './models/cookies.js'; 

const app = express();


app.set('view engine', 'ejs');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


mongoose.connect('mongodb://127.0.0.1:27017/cookieshop')
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.error('Database connection error:', err));


app.get('/', (req, res) => {
  res.redirect('/cookies/new');
});


app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/shop', (req, res) => {
  res.redirect('/cookies');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});


app.get('/cookies/new', (req, res) => {
  res.render('cookies/new');
});


app.get('/cookies', async (req, res) => {
  try {
    const cookies = await Cookie.find({}).exec();
    res.render('cookies/index', { 
      cookies: cookies,
      readablePrice: readablePrice
    });
  } catch (error) {
    console.error(error);
    res.render('cookies/index', { 
      cookies: [],
      readablePrice: readablePrice
    });
  }
});


app.get('/cookies/:slug', async (req, res) => {
  try {
    const slug = req.params.slug;
    const cookie = await Cookie.findOne({ slug: slug }).exec();
    if (!cookie) throw new Error('Cookie not found');

    res.render('cookies/show', { 
      cookie: cookie,
      readablePrice: readablePrice
    });
  } catch (error) {
    console.error(error);
    res.status(404).send('Could not find the cookie you\'re looking for.');
  }
});


app.get('/cookies/:slug/edit', async (req, res) => {
  try {
    const slug = req.params.slug;
    const cookie = await Cookie.findOne({ slug: slug }).exec();
    if (!cookie) throw new Error('Cookie not found');

    res.render('cookies/edit', { cookie: cookie });
  } catch (error) {
    console.error(error);
    res.status(404).send('Could not find the cookie you\'re looking for.');
  }
});


app.post('/cookies/:slug', async (req, res) => {
  try {
    const cookie = await Cookie.findOneAndUpdate(
      { slug: req.params.slug }, 
      req.body,
      { new: true }
    );

    res.redirect(`/cookies/${cookie.slug}`);
  } catch (error) {
    console.error(error);
    res.send('Error: The cookie could not be updated.');
  }
});


app.get('/cookies/:slug/delete', async (req, res) => {
  try {
    await Cookie.findOneAndDelete({ slug: req.params.slug });

    res.redirect('/cookies');
  } catch (error) {
    console.error(error);
    res.send('Error: No cookie was deleted.');
  }
});


app.use('/cookies', cookieRoutes); 


const PORT = process.env.PORT || 3737;
app.listen(PORT, () => {
  console.log(`👋 Started server on port ${PORT}`);
});
