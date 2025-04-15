import Cookie from '../models/cookies.js';
import { formatCookieForView, formatPrice } from '../view-models/cookieViewModel.js';

export const getAllCookies = async (req, res) => {
  try {
    const cookies = await Cookie.find();
    const formattedCookies = cookies.map(cookie => formatCookieForView(cookie));
    res.json(formattedCookies);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch cookies' });
  }
};

export const createCookie = async (req, res) => {
  try {
    const newCookie = new Cookie(req.body);
    await newCookie.save();
    res.status(201).json(formatCookieForView(newCookie));
  } catch (err) {
    res.status(400).json({ error: 'Failed to create cookie' });
  }
};

export const getCookieById = async (req, res) => {
  try {
    const foundCookie = await Cookie.findById(req.params.id);
    if (!foundCookie) {
      return res.status(404).json({ error: 'Cookie not found' });
    }
    res.json(formatCookieForView(foundCookie));
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch cookie' });
  }
};

export const updateCookie = async (req, res) => {
  try {
    const updatedCookie = await Cookie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCookie) {
      return res.status(404).json({ error: 'Cookie not found' });
    }
    res.json(formatCookieForView(updatedCookie));
  } catch (err) {
    res.status(400).json({ error: 'Failed to update cookie' });
  }
};

export const deleteCookie = async (req, res) => {
  try {
    const deletedCookie = await Cookie.findByIdAndDelete(req.params.id);
    if (!deletedCookie) {
      return res.status(404).json({ error: 'Cookie not found' });
    }
    res.json({ message: 'Cookie deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete cookie' });
  }
};

// New function to handle the edit view
export const renderEditForm = async (req, res) => {
  try {
    const cookie = await Cookie.findById(req.params.id);
    if (!cookie) {
      return res.status(404).json({ error: 'Cookie not found' });
    }
    res.render('cookies/edit', { 
      cookie: cookie,
      formatPrice: formatPrice // Pass the formatPrice function to the view
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch cookie' });
  }
}; 