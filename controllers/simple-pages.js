import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.redirect('/cookies/new')
})

router.get('/about', (req, res) => {
  res.render('about')
})

router.get('/shop', (req, res) => {
  res.redirect('/cookies')
})

router.get('/contact', (req, res) => {
  res.render('contact')
})

export default router 