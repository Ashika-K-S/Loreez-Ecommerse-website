import React, { useEffect, useState } from "react";
import api from "../utils/api";
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
  const [category, setCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("default");
  const navigate = useNavigate();

  const [categories, setCategories] = useState(["All"]);

  useEffect(() => {
    const fetchFullData = async () => {
      try {
        const catRes = await api.get("categories/");
        if (Array.isArray(catRes.data)) {
          setCategories(["All", ...catRes.data.map((c) => c.name)]);
        }

        const prodRes = await api.get("products/?no_pagination=true");
        const data = Array.isArray(prodRes.data)
          ? prodRes.data
          : prodRes.data?.results || [];

        setProducts(data);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFullData();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      category === "All" || product.category_name === category;

    const matchesSearch =
      product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category_name?.toLowerCase().includes(searchTerm.toLowerCase());

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

      <div className="min-h-screen bg-stone-50 font-sans text-gray-900">
        {/* Mini Hero Section */}
        <section className="relative h-[40vh] flex flex-col justify-center items-center text-center overflow-hidden pt-16">
          <div className="absolute inset-0 z-0 bg-stone-200">
            <img 
              src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2000&auto=format&fit=crop" 
              alt="Luxury Collection" 
              className="w-full h-full object-cover object-center opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-stone-50/0 to-stone-50"></div>
          </div>
          <div className="relative z-10 px-6 max-w-4xl mx-auto flex flex-col items-center">
            <h4 className="uppercase tracking-[0.4em] text-[10px] md:text-xs text-stone-500 mb-4">
              Our Curated
            </h4>
            <h1 className="text-4xl md:text-5xl font-serif tracking-widest text-gray-950 mb-4 uppercase">
              Collection
            </h1>
            <div className="w-16 h-[1px] bg-stone-400 mb-6"></div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-6 pb-24">
          {/* Filters & Controls */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16 border-b border-stone-200 pb-12">
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-6 py-2.5 text-[10px] uppercase tracking-[0.2em] transition-all duration-300 ${
                    category === cat
                      ? "bg-gray-900 text-white shadow-lg"
                      : "bg-white text-gray-500 border border-stone-200 hover:border-gray-950 hover:text-gray-950"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-transparent border-b border-stone-300 py-2.5 px-2 text-[10px] uppercase tracking-widest focus:outline-none focus:border-gray-900 transition-colors"
                />
              </div>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="bg-transparent border-b border-stone-300 py-2.5 text-[10px] uppercase tracking-widest focus:outline-none focus:border-gray-900 transition-colors cursor-pointer"
              >
                <option value="default">Sort By</option>
                <option value="lowToHigh">Price: Low to High</option>
                <option value="highToLow">Price: High to Low</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-pulse flex flex-col items-center">
                <div className="w-12 h-12 border-2 border-stone-200 border-t-stone-900 rounded-full animate-spin mb-4"></div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-stone-400">Loading Collection...</p>
              </div>
            </div>
          ) : sortedProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-stone-400 font-light italic">No extraordinary pieces found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
              {sortedProducts.map((product) => (
                <div
                  key={product.id}
                  className="group flex flex-col"
                >
                  <div className="relative aspect-[4/5] bg-stone-100 overflow-hidden mb-6 shadow-sm">
                    <Link to={`/product/${product.id}`}>
                      <img
                        src={product.image || "https://placehold.co/600x800?text=Loreez"}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://placehold.co/600x800?text=Image+Unavailable";
                        }}
                      />
                    </Link>
                    
                    <button
                      onClick={() => toggleWishlist(product)}
                      className="absolute top-4 right-4 z-10 p-2.5 bg-white/80 backdrop-blur-md rounded-full hover:bg-white transition-all duration-300 shadow-sm"
                    >
                      <Heart
                        size={16}
                        className={
                          wishlist.find((item) => item.product?.id === product.id)
                            ? "text-red-500 fill-red-500"
                            : "text-gray-400"
                        }
                      />
                    </button>

                    <div className="absolute bottom-0 left-0 w-full translate-y-full group-hover:translate-y-0 transition-transform duration-500 px-4 pb-4">
                      <button
                        onClick={() => addToCart(product)}
                        className="w-full bg-gray-950/90 backdrop-blur-sm text-white py-3.5 text-[10px] font-medium uppercase tracking-[0.2em] shadow-xl hover:bg-black transition-colors"
                      >
                        Quick Add
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col items-center text-center">
                    <p className="text-[9px] uppercase tracking-[0.3em] text-stone-400 mb-2">
                      {product.category_name}
                    </p>
                    <Link to={`/product/${product.id}`}>
                      <h2 className="font-serif text-lg text-gray-900 mb-2 uppercase tracking-wide group-hover:text-stone-600 transition-colors">
                        {product.name}
                      </h2>
                    </Link>
                    <p className="font-light text-stone-600 tracking-wider">
                      ₹ {Number(product.price).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ProductsPage;