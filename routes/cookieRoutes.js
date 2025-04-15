import express from 'express';
import {
  getAllCookies,
  createCookie,
  getCookieById,
  updateCookie,
  deleteCookie,
  renderEditForm
} from '../controllers/cookieController.js';

const router = express.Router();

router.get('/', getAllCookies);
router.post('/', createCookie);
router.get('/:id', getCookieById);
router.get('/:id/edit', renderEditForm);
router.put('/:id', updateCookie);
router.delete('/:id', deleteCookie);

export default router;
