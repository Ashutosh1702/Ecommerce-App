# 🛒 Ecommerce App

A modern, responsive ecommerce application built with React and Node.js, featuring a clean user interface and comprehensive shopping functionality.

## 🚀 Features

- **Product Catalog**: Browse products by categories (Men's, Women's, Kids)
- **Shopping Cart**: Add/remove items with quantity management
- **User Authentication**: Login and signup functionality
- **Product Details**: Detailed product pages with descriptions
- **Responsive Design**: Mobile-friendly interface
- **Order Management**: Complete checkout process with payment options
- **User Dashboard**: Track orders and manage account

## 🏗️ Project Structure

```
Ecommerce-App/
├── Backend/                 # JSON Server API
│   ├── api.json            # Database file with users, orders, products
│   └── package.json        # Backend dependencies
├── Fronted/                # React Frontend Application
│   ├── src/
│   │   ├── Components/     # Reusable UI components
│   │   │   ├── Navbar/     # Navigation component
│   │   │   ├── Hero/       # Hero section
│   │   │   ├── Popular/    # Popular products
│   │   │   ├── NewCollections/ # New collections
│   │   │   ├── Offers/     # Special offers
│   │   │   ├── Footer/     # Footer component
│   │   │   ├── Item/       # Product item component
│   │   │   ├── Carditems/  # Cart items component
│   │   │   ├── ProductDisplay/ # Product display
│   │   │   ├── ProductDescription/ # Product details
│   │   │   ├── PaymentOptions/ # Payment methods
│   │   │   └── ...         # Other components
│   │   ├── Pages/          # Main application pages
│   │   │   ├── Shop.jsx    # Home/Shop page
│   │   │   ├── ShopCategory.jsx # Category pages
│   │   │   ├── Product.jsx # Product detail page
│   │   │   ├── Cart.jsx    # Shopping cart page
│   │   │   └── LoginSignup.jsx # Authentication page
│   │   ├── Data/           # Static data files
│   │   ├── assets/         # Images and static assets
│   │   └── CSS/            # Styling files
│   ├── public/             # Public assets
│   └── package.json        # Frontend dependencies
└── README.md               # Project documentation
```

## 🛠️ Tech Stack

### Frontend
- **React 19.1.0** - UI library
- **React Router DOM** - Client-side routing
- **React Icons** - Icon components
- **Vite** - Build tool and dev server
- **CSS3** - Styling

### Backend
- **JSON Server** - Mock REST API
- **Node.js** - Runtime environment

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

## 🚀 Installation & Setup

### 1. Clone the repository
```bash
git clone <repository-url>
cd Ecommerce-App
```

### 2. Setup Backend
```bash
cd Backend
npm install
npm start
```
The backend server will run on `http://localhost:3001`

### 3. Setup Frontend
```bash
cd ../Fronted
npm install
npm run dev
```
The frontend application will run on `http://localhost:5173`

## 🎯 Available Scripts

### Backend
- `npm start` - Start the JSON server on port 3001

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔧 API Endpoints

The backend provides the following endpoints:

- `GET /users` - Get all users
- `POST /users` - Create new user
- `GET /orders` - Get all orders
- `POST /orders` - Create new order
- `GET /products` - Get all products (if implemented)

## 📱 Features Overview

### 🏠 Home Page
- Hero section with featured products
- Popular products showcase
- New collections display
- Special offers section

### 🛍️ Shopping Experience
- **Category Pages**: Browse by Men's, Women's, Kids categories
- **Product Details**: Comprehensive product information
- **Shopping Cart**: Add/remove items, quantity management
- **Checkout**: Complete purchase with payment options

### 👤 User Management
- User registration and login
- Order history tracking
- Profile management

## 🎨 Design Features

- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Clean and intuitive user interface
- **Touch-Friendly**: Optimized for mobile interactions
- **Fast Loading**: Optimized with Vite for quick development and builds

## 🔐 Authentication

The app includes a complete authentication system:
- User registration with email validation
- Secure login functionality
- Session management
- Protected routes for authenticated users

## 📦 Database Structure

The `api.json` file contains:
- **Users**: User accounts with credentials
- **Orders**: Order history with items and payment details
- **Products**: Product catalog (can be extended)

## 🚀 Deployment

### Frontend Deployment
```bash
cd Fronted
npm run build
# Deploy the dist/ folder to your hosting service
```

### Backend Deployment
The JSON server can be deployed to services like Heroku, Railway, or any Node.js hosting platform.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🐛 Known Issues

- Frontend folder is named "Fronted" (typo) - consider renaming to "Frontend"
- Additional product data may need to be added to api.json for full functionality

## 📞 Support

For support and questions, please open an issue in the repository.

---

**Happy Shopping! 🛒✨**
