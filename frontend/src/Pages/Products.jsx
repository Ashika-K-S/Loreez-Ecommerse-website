import React, { useEffect, useState } from "react";
import api from "../api/api";
import { Heart } from "lucide-react";
import { useStore } from "../Context/StoreContext";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate, useSearchParams, Link } from "react-router-dom";

const ProductsPage = () => {
  const { wishlist, toggleWishlist, addToCart } = useStore();
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(initialCategory);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("default"); 
  const [currentPage, setCurrentPage] = useState(1);
  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentPage(1);
  }, [category, searchTerm]);

  useEffect(() => {
    setLoading(true);
    let url = "products/";
    const params = new URLSearchParams();
    
    if (category && category !== "All") {
      params.append("category", category.toLowerCase()); // Backend likely uses lowercase slugs
    }
    if (searchTerm) {
      params.append("search", searchTerm);
    }
    params.append("page", currentPage);

    const queryString = params.toString();
    if (queryString) {
      url += `?${queryString}`;
    }

    const fetchProducts = async () => {
      try {
        const res = await api.get(url);
        const data = res.data.results || (Array.isArray(res.data) ? res.data : []);
        setProducts(data);
        setNextUrl(res.data.next || null);
        setPrevUrl(res.data.previous || null);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, searchTerm, currentPage]);

  const categories = ["All", "Necklaces", "Rings", "Earrings", "Bangles"];

const filteredProducts = products;

const sortedProducts = [...filteredProducts].sort((a, b) => {
  const priceA = Number(a.price) || 0;
  const priceB = Number(b.price) || 0;

  if (sortOrder === "lowToHigh") return priceA - priceB;
  if (sortOrder === "highToLow") return priceB - priceA;
  return 0;
});

  if (loading) return <p className="text-center mt-10">Loading products...</p>;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-stone-50 p-6 pt-24 font-sans">
        <h1 className="text-4xl md:text-5xl font-serif tracking-widest text-center mb-10 text-gray-900 uppercase">
          Our Collection
        </h1>
        
        <div className="max-w-7xl mx-auto">
          {/* Filters & Search Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
            
            {/* Search */}
            <div className="flex w-full md:w-auto relative">
              <input
                type="text"
                placeholder="Search pieces..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-80 border-b-2 border-gray-300 bg-transparent py-2 pl-2 pr-10 focus:outline-none focus:border-gray-900 transition-colors placeholder-gray-400"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-900"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Categories */}
            <div className="flex gap-6 overflow-x-auto pb-2 w-full md:w-auto justify-start md:justify-center no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`whitespace-nowrap pb-1 tracking-wider uppercase text-sm transition-all duration-300 ${
                    category === cat
                      ? "text-gray-900 border-b-2 border-gray-900 font-medium"
                      : "text-gray-400 hover:text-gray-600 border-b-2 border-transparent"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="w-full md:w-auto">
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full md:w-auto bg-transparent border-b-2 border-gray-300 py-2 text-gray-600 focus:outline-none focus:border-gray-900 uppercase tracking-wider text-sm cursor-pointer"
              >
                <option value="default">Sort By</option>
                <option value="lowToHigh">Price: Low - High</option>
                <option value="highToLow">Price: High - Low</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {sortedProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 font-serif text-xl">No extraordinary pieces found.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                {sortedProducts.map((product) => (
                  <div key={product.id} className="group flex flex-col cursor-pointer">
                    <div className="relative overflow-hidden bg-white mb-4">
                      {/* Image */}
                      <Link to={`/product/${product.id}`}>
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </Link>
                      
                      {/* Wishlist Button */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          toggleWishlist(product);
                        }}
                        className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white"
                      >
                        <Heart
                          size={18}
                          className={`transition-colors ${
                            wishlist.find((item) => item.product?.id === product.id)
                              ? "text-red-500 fill-red-500"
                              : "text-gray-600"
                          }`}
                        />
                      </button>

                      {/* Quick Add Buttons Overlay */}
                      <div className="absolute left-0 bottom-0 w-full translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            addToCart(product);
                          }}
                          className="flex-1 bg-white text-gray-900 py-3 text-sm font-medium uppercase tracking-wider hover:bg-gray-100 transition-colors"
                        >
                          Add to Cart
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            navigate("/checkout", { 
                              state: { 
                                items: [{ 
                                  product: product, 
                                  quantity: 1, 
                                  price_at_added: product.price 
                                }] 
                              } 
                            });
                          }}
                          className="flex-1 bg-gray-900 text-white py-3 text-sm font-medium uppercase tracking-wider hover:bg-black transition-colors"
                        >
                          Buy Now
                        </button>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="text-center px-2">
                      <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">
                        {product.category_name}
                      </p>
                      <Link to={`/product/${product.id}`}>
                        <h2 className="text-lg font-serif text-gray-900 mb-1 leading-snug hover:text-stone-500 transition-colors">
                          {product.name}
                        </h2>
                      </Link>
                      <p className="text-gray-600 font-medium tracking-wide">
                        ₹{Number(product.price).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center items-center gap-8 mt-16 mb-8">
                <button
                  disabled={!prevUrl}
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  className={`uppercase tracking-wider text-sm transition-colors pb-1 border-b ${
                    prevUrl
                      ? "text-gray-900 border-gray-900 hover:text-black"
                      : "text-gray-400 border-transparent cursor-not-allowed"
                  }`}
                >
                  Previous
                </button>
                <span className="font-serif italic text-gray-500">
                  Page {currentPage}
                </span>
                <button
                  disabled={!nextUrl}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  className={`uppercase tracking-wider text-sm transition-colors pb-1 border-b ${
                    nextUrl
                      ? "text-gray-900 border-gray-900 hover:text-black"
                      : "text-gray-400 border-transparent cursor-not-allowed"
                  }`}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductsPage;
