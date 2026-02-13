import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StoreProvider } from "./Context/StoreContext";
import Register from "./Pages/RegisterPage";
import Login from "./Pages/LoginPage";
import Home from "./Pages/Home";
import Navbar from "./Pages/Navbar";
import ProductsPage from "./Pages/Products";
import Wishlist from "./Pages/Wishlist";
import CartPage from "./Pages/Cart";
import Checkout from "./Pages/Checkout";
import ProductCard from "./Pages/BuyNow";
import Footer from "./Pages/Footer";
import { AuthProvider } from "./Context/AuthContext";
import ProtectedRoute from "./Pages/Protect";
import ProductDetailPage from "./Pages/ProductDetail";
import ProfilePage from "./Pages/ProfilePage";
import OrderPage from "./Pages/Order";
import Dashboard from "./Admin/Dashboard";
import DashboardHome from "./Admin/DashBoardHome";
import ProductManagement from "./Admin/ProductManagement";
import OrderManagement from "./Admin/OrderManagement";
import UserManagement from "./Admin/UserMangement";

function App() {
  return (
    <AuthProvider>
      <StoreProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/wishlist"
            element={
              <ProtectedRoute>
                <Wishlist />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <OrderPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <Dashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardHome />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="products" element={<ProductManagement />} />
            <Route path="orders" element={<OrderManagement />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
        </Routes>

        <ToastContainer position="top-right" autoClose={2000} />
      </StoreProvider>
    </AuthProvider>
  );
}
export default App;
