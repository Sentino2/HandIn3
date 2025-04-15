# Cookie Shop 🍪

A delightful web application for managing and ordering cookies, built with Node.js, Express, and MongoDB.

## Features

- **Cookie Management**
  - Create, read, update, and delete cookies
  - Track cookie inventory (in stock/out of stock)
  - Detailed cookie information including ingredients and nutrition facts
  - Beautiful, responsive UI with a cookie-themed design

- **Order System**
  - User-friendly checkout process
  - Order tracking with multiple statuses (pending, processing, completed, cancelled)
  - Customer information and delivery address management
  - Multiple cookie selection per order

- **Data Relationships**
  - One-to-Many relationships (User to Orders)
  - Many-to-Many relationships (Orders to Cookies)
  - Nested data structures (User's address)

## Tech Stack

- **Backend**
  - Node.js
  - Express.js
  - MongoDB with Mongoose
  - EJS templating engine

- **Frontend**
  - HTML5
  - CSS3
  - JavaScript
  - Responsive design

## Project Structure

```
.
├── config/              # Configuration files
├── controllers/         # Route controllers
├── models/             # MongoDB models
├── public/             # Static files
├── views/              # EJS templates
│   ├── cookies/        # Cookie-related views
│   ├── orders/         # Order-related views
│   └── partials/       # Reusable view components
└── app.js              # Main application file
```

## Models

### Cookie Model
```javascript
{
  slug: String,
  name: String,
  priceInCents: Number,
  isInStock: Boolean,
  ingredients: [String],
  nutrition: {
    fat: String,
    sugar: String,
    salt: String
  }
}
```

### User Model
```javascript
{
  email: String,
  name: String,
  address: {
    street: String,
    zip: String,
    city: String,
    state: String,
    country: String
  }
}
```

### Order Model
```javascript
{
  message: String,
  cookies: [ObjectId],
  user: ObjectId,
  status: String,
  createdAt: Date
}
```

## Getting Started

1. **Prerequisites**
   - Node.js (v14 or higher)
   - MongoDB
   - npm or yarn

2. **Installation**
   ```bash
   # Clone the repository
   git clone [repository-url]

   # Install dependencies
   npm install

   # Set up environment variables
   cp .env.example .env
   ```

3. **Configuration**
   - Update the `.env` file with your MongoDB connection string
   - Configure the port and other settings as needed

4. **Running the Application**
   ```bash
   # Start the development server
   npm start

   # The application will be available at http://localhost:3000
   ```

## API Endpoints

### Cookies
- `GET /cookies` - List all cookies
- `GET /cookies/new` - Show new cookie form
- `POST /cookies` - Create a new cookie
- `GET /cookies/:slug` - Show cookie details
- `GET /cookies/:slug/edit` - Show edit form
- `POST /cookies/:slug` - Update a cookie

### Orders
- `GET /orders` - List all orders
- `GET /orders/checkout` - Show checkout form
- `POST /orders/checkout` - Create a new order

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with ❤️ for cookie lovers everywhere
- Inspired by the joy of baking and sharing cookies
- Special thanks to all contributors and cookie enthusiasts