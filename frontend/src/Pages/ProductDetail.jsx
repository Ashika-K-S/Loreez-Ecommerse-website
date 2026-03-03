import React, { useEffect, useState } from "react";
import api from "../utils/api";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Heart, Star } from "lucide-react";
import { useStore } from "../Context/StoreContext";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { wishlist, toggleWishlist, addToCart } = useStore();

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  // pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const reviewsPerPage = 3;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}/`);
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // NOTE: Backend currently doesn't have a reviews endpoint. 
        // Commenting out or returning empty array to avoid 404s.
        // const res = await api.get(`/reviews?productId=${id}&_page=${currentPage}&_limit=${reviewsPerPage}`);
        // setReviews(res.data);
        // const totalCount = res.headers["x-total-count"];
        // if (totalCount) setTotalPages(Math.ceil(totalCount / reviewsPerPage));
        setReviews([]);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    };
    fetchReviews();
  }, [id, currentPage]);

  if (loading) return <p className="text-center mt-10">Loading product...</p>;
  if (!product) return <p className="text-center mt-10">Product not found.</p>;

  const avgRating = reviews.length
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-stone-50 font-sans pt-32 pb-24">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          {/* Product Image */}
          <div className="relative group overflow-hidden">
            {product.discount && (
              <span className="absolute top-4 left-4 z-10 bg-gray-900 text-white px-3 py-1 text-xs uppercase tracking-widest font-medium">
                {product.discount}% OFF
              </span>
            )}
            <img
              src={product.image || "https://placehold.co/600x800?text=Loreez"}
              alt={product.name}
              className="w-full aspect-[4/5] object-cover transition-transform duration-700 hover:scale-105"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://placehold.co/600x800?text=Image+Currently+Unavailable";
              }}
            />
            <button
              onClick={() => toggleWishlist(product)}
              className="absolute top-4 right-4 z-10 p-3 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors duration-300"
            >
              <Heart
                size={20}
                className={
                  wishlist.find((item) => item.product?.id === product.id)
                    ? "text-red-500 fill-red-500"
                    : "text-gray-600"
                }
              />
            </button>
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-center">
            <div className="mb-8">
              <p className="text-xs text-gray-500 uppercase tracking-[0.2em] mb-3">
                {product.category_name}
              </p>
              <h1 className="text-4xl lg:text-5xl font-serif text-gray-900 mb-6 leading-tight">
                {product.name}
              </h1>
              <p className="text-2xl font-light text-gray-900 mb-6 tracking-wide">
                ₹{Number(product.price).toLocaleString()}
              </p>
              
              <div className="flex items-center gap-2 mb-8">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={14}
                      className={star <= Math.round(avgRating) ? "text-yellow-600 fill-yellow-600" : "text-gray-300"}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500 font-light ml-2 uppercase tracking-wide">
                  ({reviews.length} reviews)
                </span>
              </div>

              {/* Description Placeholder if you add it later */}
              <p className="text-stone-500 font-light leading-relaxed mb-10">
                Meticulously crafted with extraordinary attention to detail, this piece embodies the essence of modern elegance. A timeless addition to your collection.
              </p>

              {/* Actions */}
              <div className="flex items-center gap-6 mb-10">
                <div className="flex items-center border border-gray-300 w-32 justify-between px-4 py-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    -
                  </button>
                  <span className="text-sm font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button
                  onClick={() => addToCart({ ...product, quantity })}
                  className="flex-1 border-2 border-gray-900 bg-transparent text-gray-900 py-4 text-sm font-medium uppercase tracking-widest hover:bg-gray-900 hover:text-white transition-colors duration-300"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() =>
                    navigate("/Checkout", {
                      state: { 
                        items: [{ 
                          product: product, 
                          quantity: quantity, 
                          price_at_added: product.price 
                        }] 
                      },
                    })
                  }
                  className="flex-1 bg-gray-900 text-white py-4 text-sm font-medium uppercase tracking-widest hover:bg-black transition-colors duration-300"
                >
                  Buy Now
                </button>
              </div>

              {/* Reviews Section */}
              <div className="border-t border-stone-200 pt-10">
                <h2 className="text-xl font-serif text-gray-900 mb-6 uppercase tracking-wider">Client Reviews</h2>
                {reviews.length === 0 ? (
                  <p className="text-stone-500 font-light italic">Be the first to review this extraordinary piece.</p>
                ) : (
                  <>
                    <ul className="space-y-6">
                      {reviews.map((review) => (
                        <li key={review.id} className="border-b border-stone-100 pb-6">
                          <div className="flex justify-between items-center mb-2">
                            <p className="font-medium text-sm text-gray-900 uppercase tracking-wider">
                              {review.name}
                            </p>
                            <div className="flex">
                              {Array.from({length: 5}).map((_, i) => (
                                <Star
                                  key={i}
                                  size={12}
                                  className={i < review.rating ? "text-yellow-600 fill-yellow-600" : "text-gray-200"}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-stone-500 font-light text-sm">{review.comment}</p>
                        </li>
                      ))}
                    </ul>

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="flex items-center gap-4 mt-8">
                        <button
                          disabled={currentPage === 1}
                          onClick={() => setCurrentPage(currentPage - 1)}
                          className="text-xs uppercase tracking-widest text-gray-500 hover:text-gray-900 disabled:opacity-30 transition-colors"
                        >
                          Prev
                        </button>
                        <div className="flex gap-2">
                          {Array.from({ length: totalPages }, (_, i) => (
                            <button
                              key={i + 1}
                              onClick={() => setCurrentPage(i + 1)}
                              className={`text-xs ${
                                currentPage === i + 1
                                  ? "text-gray-900 font-medium"
                                  : "text-gray-400"
                              }`}
                            >
                              {i + 1}
                            </button>
                          ))}
                        </div>
                        <button
                          disabled={currentPage === totalPages}
                          onClick={() => setCurrentPage(currentPage + 1)}
                          className="text-xs uppercase tracking-widest text-gray-500 hover:text-gray-900 disabled:opacity-30 transition-colors"
                        >
                          Next
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetailPage;
