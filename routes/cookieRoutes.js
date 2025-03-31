import express from 'express';
import Cookie from '../models/cookies.js'; 

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const cookies = await Cookie.find();
    res.json(cookies);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch cookies' });
  }
});


router.post('/', async (req, res) => {
  try {
    const newCookie = new Cookie(req.body);
    await newCookie.save();
    res.status(201).json(newCookie);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create cookie' });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const foundCookie = await Cookie.findById(req.params.id);
    if (!foundCookie) {
      return res.status(404).json({ error: 'Cookie not found' });
    }
    res.json(foundCookie);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch cookie' });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const updatedCookie = await Cookie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCookie) {
      return res.status(404).json({ error: 'Cookie not found' });
    }
    res.json(updatedCookie);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update cookie' });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const deletedCookie = await Cookie.findByIdAndDelete(req.params.id);
    if (!deletedCookie) {
      return res.status(404).json({ error: 'Cookie not found' });
    }
    res.json({ message: 'Cookie deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete cookie' });
  }
});

export default router;
