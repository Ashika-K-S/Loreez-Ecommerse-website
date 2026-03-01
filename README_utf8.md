2# 🛍 Loreez – Full Stack E-Commerce Platform

Loreez is a premium full-stack e-commerce web application featuring modern design, high performance, and robust administrative tools. Built with **React** (Vite), **Tailwind CSS**, and **Django REST Framework**.

---

## 🚀 Key Features

### 👤 User Experience
- **JWT-Based Authentication**: Secure login and registration with automated token refresh.
- **Dynamic Search & Filtering**: Fast, server-side product search and category-based filtering.
- **Wishlist & Cart**: Seamlessly add products to favorites or prepare for checkout.
- **Secure Checkout**: Integrated order processing flow with Razorpay support.
- **Order History**: Track your past purchases and delivery status.

### 🛠 Administrative Tools
- **Sales Analytics Dashboard**: Visual insights into revenue, top-selling products, and order statistics.
- **Complete Product Management**: Add, update (via PATCH), and delete products with automatic catalog updates.
- **User & Order Control**: Manage user statuses (Active/Blocked) and update order fulfillment stages.
- **Bulk Product View**: Specialized "no-pagination" view for administrators to manage large catalogs efficiently.

---

## 🏗 Tech Stack

| Frontend | Backend | Database |
| :--- | :--- | :--- |
| React 19 (Vite) | Django 6.0 | PostgreSQL |
| Tailwind CSS | DRF & SimpleJWT | |
| Axios Interceptors | Razorpay Gateway | |

---

## ⚙️ Local Installation Guide

### 🔹 Backend Setup
1. **Navigate to backend folder**:
   ```bash
   cd backend
   ```
2. **Create and activate virtual environment**:
   ```bash
   python -m venv venv
   venv\Scripts\activate  # Windows
   source venv/bin/activate  # Mac/Linux
   ```
3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```
4. **Setup Environment Variables**:
   Create a `.env` file in the `backend/` directory:
   ```env
   SECRET_KEY=your_django_secret_key
   DEBUG=True
   DB_NAME=your_db_name
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_HOST=localhost
   DB_PORT=5432
   RAZORPAY_KEY_ID=your_razorpay_key
   RAZORPAY_KEY_SECRET=your_razorpay_secret
   ```
5. **Run Migrations & Server**:
   ```bash
   python manage.py migrate
   python manage.py runserver
   ```
   *API available at: `http://localhost:8000/api/`*

### 🔹 Frontend Setup
1. **Navigate to frontend folder**:
   ```bash
   cd frontend
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Setup Environment Variables**:
   Create a `.env` file in the `frontend/` directory:
   ```env
   VITE_API_BASE_URL=http://localhost:8000/api/
   ```
4. **Run Development Server**:
   ```bash
   npm run dev
   ```
   *Frontend available at: `http://localhost:5173/`*

---

## 📁 Project Structure
```text
Loreez-Ecommerse-website/
├── backend/
│   ├── apps/        # Django modular apps (users, products, orders, etc.)
│   ├── config/      # Project settings and root URLs
│   └── manage.py
├── frontend/
│   ├── src/
│   │   ├── Admin/   # Back-office components
│   │   ├── Context/ # Auth and Store state management
│   │   └── Pages/   # Main customer-facing pages
│   └── vite.config.js
└── README.md
```
## 🚀 Live Demo

Frontend: https://your-frontend-link.vercel.app  
Backend API: https://your-backend-link.onrender.com

## 🔐 Authentication & Security

- JWT Access & Refresh Tokens
- Axios interceptor for automatic token refresh
- Django permission-based admin protection
- Environment variable configuration

## 🚀 Deployment

- Backend deployed on Render
- PostgreSQL hosted database
- Frontend deployed on Vercel
- Production environment variables configured
---

## 👩‍💻 Author
**Ashika K S**  
Full Stack Developer  
Kannur, Kerala, India  
GitHub: [Ashika-K-S](https://github.com/Ashika-K-S)
