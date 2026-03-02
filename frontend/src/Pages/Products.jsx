import React, { useEffect, useState } from "react";
import api from "../api/api";
import { Heart } from "lucide-react";
import { useStore } from "../Context/StoreContext";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const ProductsPage = () => {
  const { wishlist, toggleWishlist, addToCart } = useStore();
  const { user } = useAuth();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authRequired, setAuthRequired] = useState(false);

  const [category, setCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("default");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        setAuthRequired(true);
        setLoading(false);
        return;
      }

      try {
        const res = await api.get("/products/?page=1");

        const data = Array.isArray(res.data)
          ? res.data
          : res.data?.results || [];

        setProducts(data);
        setAuthRequired(false);
      } catch (err) {
        console.error("Error fetching products:", err);

        if (err?.response?.status === 401) {
          setAuthRequired(true);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [user]);

  const categories = ["All", "Necklaces", "Rings", "Earrings", "Bangles"];

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      category === "All" || product.category === category;

    const matchesSearch =
      product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "lowToHigh") return a.price - b.price;
    if (sortOrder === "highToLow") return b.price - a.price;
    return 0;
  });

  if (loading)
    return <p className="text-center mt-10">Loading products...</p>;

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 p-6 pt-24">
        <h1 className="text-3xl font-bold text-center mb-8 text-yellow-700">
          Our Products
        </h1>

        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-5 py-2 rounded-full font-semibold border-2 ${
                category === cat
                  ? "bg-yellow-400 text-white border-yellow-500 shadow-lg"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
            >
              {cat}
            </button>
          ))}

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="px-5 py-2 rounded-full font-semibold border-2 bg-white text-gray-700 border-gray-300"
          >
            <option value="default">Sort by</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>

        {authRequired ? (
          <div className="text-center mt-10 space-y-3">
            <p className="text-lg font-semibold text-red-600">
              Login required to view products.
            </p>
            <button
              onClick={() => navigate("/login")}
              className="bg-yellow-500 text-white px-5 py-2 rounded-md hover:bg-yellow-600"
            >
              Go to Login
            </button>
          </div>
        ) : sortedProducts.length === 0 ? (
          <p className="text-center mt-10">No products found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <div
                key={product.id}
                className="relative bg-white p-4 rounded-lg shadow flex flex-col"
              >
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`absolute top-2 right-2 p-2 rounded-full ${
                    wishlist.find((item) => item.id === product.id)
                      ? "bg-red-100 text-red-500"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  <Heart
                    size={20}
                    fill={
                      wishlist.find((item) => item.id === product.id)
                        ? "red"
                        : "none"
                    }
                  />
                </button>

                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-md"
                  />
                </Link>

                <h2 className="mt-4 font-semibold">{product.name}</h2>
                <p className="text-yellow-700 font-bold">
                  ₹ {product.price}
                </p>

                <button
                  onClick={() => addToCart(product)}
                  className="mt-3 bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default ProductsPage;