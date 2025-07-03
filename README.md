
# 🍔 FOOD DELIVERY MERN STACK APP

A full-stack food delivery web application that allows users to browse food items, add them to cart, place orders with Stripe payment integration, and track order statuses. Built using the MERN stack: **MongoDB, Express, React, and Node.js**.

---

## 🚀 Live Demo

> Coming Soon – Deploy frontend on [Vercel](https://vercel.com/) and backend on [Render](https://render.com/) or [Railway](https://railway.app/).

---

## 🧱 Tech Stack

| Layer        | Technology                         |
|--------------|-------------------------------------|
| Frontend     | React.js, Axios, Context API        |
| Backend      | Node.js, Express.js, JWT, Mongoose  |
| Database     | MongoDB Atlas                       |
| Payment      | Stripe API                          |
| Authentication | JWT                               |
| Hosting      | Vercel (Frontend), Render (Backend) |

---

## 📁 Project Structure

### Frontend

```
src/
├── Pages/
│   ├── Home.jsx
│   ├── Cart.jsx
│   ├── PlaceOrder.jsx
│   └── MyOrders.jsx
├── Context/
│   └── StoreContext.js
├── assets/
└── App.jsx, main.jsx
```

### Backend

```
backend/
├── controller/
│   ├── userController.js
│   ├── orderController.js
│   ├── cartController.js
├── route/
│   ├── user.route.js
│   ├── food.route.js
│   ├── order.route.js
├── model/
│   ├── userModel.js
│   ├── orderModel.js
│   ├── foodModel.js
├── middleware/
│   └── auth.js
├── config/
│   └── connectDB.js
└── index.js
```

---

## 🌟 Features

### User

- 🔐 Register/Login
- 🍱 Browse food items by category
- 🛒 Add/Remove items to cart
- 💳 Place orders with Stripe
- 🔍 Track order status
- 📦 View order history

### Admin

- ➕ Add/Edit/Delete food items
- 📋 View all orders
- 🚚 Update order status

---

## 🔐 Authentication

- **JWT-based** login system.
- Protected API routes.
- Role-based access for admin/user.

---

## 🧾 API Endpoints

### 🔐 Auth Routes

| Route              | Method | Description         |
|--------------------|--------|---------------------|
| `/api/user/register` | POST | Register new user   |
| `/api/user/login`    | POST | Login + Get token   |

### 🛒 Cart Routes

| Route              | Method | Description           |
|--------------------|--------|-----------------------|
| `/api/cart/add`    | POST   | Add item to cart      |
| `/api/cart/remove` | POST   | Remove item from cart |
| `/api/cart/get`    | POST   | Get user cart         |

### 📦 Order Routes

| Route                   | Method | Description                |
|--------------------------|--------|----------------------------|
| `/api/order/place`      | POST   | Place new order (Stripe)   |
| `/api/order/verify`     | POST   | Verify payment success     |
| `/api/order/userorders` | POST   | Get current user's orders  |
| `/api/order/list`       | GET    | Get all orders (admin)     |
| `/api/order/status`     | POST   | Update order status        |

---

## 🗄️ Database Models

### 📍 User

```js
{
  name: String,
  email: String,
  password: String,
  role: "user" | "admin",
  cartData: Object
}
```

### 📦 Order

```js
{
  userId: String,
  items: Array,
  amount: Number,
  address: Object,
  status: String,
  date: Date,
  payment: Boolean
}
```

### 🍱 Food

```js
{
  name: String,
  price: Number,
  category: String,
  description: String,
  image: String
}
```

---

## 🧠 How It Works

1. **User Login/Register** → JWT Token stored in localStorage
2. **Browse Menu** → Fetch from `/api/food/list`
3. **Add to Cart** → Updates both frontend & backend
4. **Place Order** → Stripe checkout session created
5. **Payment Redirect** → On success/failure, verify endpoint is triggered
6. **Track Orders** → `/userorders` API fetches past orders

---

## 🛠️ Setup Instructions

### Backend

```bash
cd backend
npm install
npm run start
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### .env (Backend)

```env
PORT=4000
MONGODB_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
```

---

## 🌐 Deployment Tips

* **Frontend**: Use [Vercel](https://vercel.com/) – just link your GitHub repo.
* **Backend**: Use [Render](https://render.com/) – set environment variables and deploy Node app.
* **MongoDB Atlas**: Use a free cluster.
* **Stripe**: Use test keys for dev, live keys for production.

---

## 🧱 Future Enhancements

* Add reviews & ratings
* SMS/Email notifications
* Delivery tracking with maps
* Coupon & discount system
* Razorpay support for India

---

## 🖼️ Screenshots (Optional)

> Add UI preview, Stripe checkout page, Admin panel

---

## 👨‍💻 Author

**Mugil Anand**  
GitHub: [@Mugilanandam](https://github.com/Mugilanandam)  
Email: [mugil@example.com](mailto:mugil@example.com)

---

## 📄 License

This project is licensed under the MIT License.
