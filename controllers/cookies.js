import { Router } from 'express'
import { body, validationResult } from 'express-validator'
import Cookie from '../models/cookies.js'
import { readablePrice } from '../helpers/cookie-views.js'
import { formatPrice } from '../view-models/cookieViewModel.js'

const router = Router()

// Validation middleware
const validateCookie = [
  body('name')
    .isString()
    .isLength({ min: 1, max: 256 })
    .withMessage('Name must be between 1 and 256 characters')
    .trim()
    .escape(),
  
  body('slug')
    .isString()
    .isLength({ min: 1, max: 256 })
    .withMessage('Slug must be between 1 and 256 characters')
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .withMessage('Slug must contain only lowercase letters, numbers, and hyphens')
    .trim()
    .escape(),
  
  body('priceInCents')
    .isInt({ min: 0 })
    .withMessage('Price must be a positive integer')
    .toInt()
]

router.get('/', async (req, res) => {
  try {
    const cookies = await Cookie.find({}).exec()
    res.render('cookies/index', { 
      cookies: cookies,
      readablePrice: readablePrice
    })
  } catch (error) {
    console.error(error)
    res.render('cookies/index', { 
      cookies: [],
      readablePrice: readablePrice
    })
  }
})

router.get('/new', (req, res) => {
  res.render('cookies/new')
})

router.post('/', validateCookie, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).render('cookies/new', {
        errors: errors.array(),
        cookie: req.body
      })
    }

    const newCookie = new Cookie(req.body)
    await newCookie.save()
    res.redirect(`/cookies/${newCookie.slug}`)
  } catch (error) {
    console.error(error)
    res.status(400).render('cookies/new', {
      errors: [{ msg: 'Error: The cookie could not be created.' }],
      cookie: req.body
    })
  }
})

router.get('/:slug', async (req, res) => {
  try {
    const slug = req.params.slug
    const cookie = await Cookie.findOne({ slug: slug }).exec()
    if (!cookie) throw new Error('Cookie not found')

    res.render('cookies/show', { 
      cookie: cookie,
      readablePrice: readablePrice
    })
  } catch (error) {
    console.error(error)
    res.status(404).send('Could not find the cookie you\'re looking for.')
  }
})

router.get('/:slug/edit', async (req, res) => {
  try {
    const slug = req.params.slug
    const cookie = await Cookie.findOne({ slug: slug }).exec()
    if (!cookie) throw new Error('Cookie not found')

    res.render('cookies/edit', { 
      cookie: cookie,
      formatPrice: formatPrice
    })
  } catch (error) {
    console.error(error)
    res.status(404).send('Could not find the cookie you\'re looking for.')
  }
})

router.post('/:slug', validateCookie, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).render('cookies/edit', {
        errors: errors.array(),
        cookie: { ...req.body, slug: req.params.slug }
      })
    }

    const cookie = await Cookie.findOneAndUpdate(
      { slug: req.params.slug }, 
      req.body,
      { new: true }
    )

    res.redirect(`/cookies/${cookie.slug}`)
  } catch (error) {
    console.error(error)
    res.status(400).render('cookies/edit', {
      errors: [{ msg: 'Error: The cookie could not be updated.' }],
      cookie: { ...req.body, slug: req.params.slug }
    })
  }
})

router.get('/:slug/delete', async (req, res) => {
  try {
    await Cookie.findOneAndDelete({ slug: req.params.slug })
    res.redirect('/cookies')
  } catch (error) {
    console.error(error)
    res.send('Error: No cookie was deleted.')
  }
})

export default router 