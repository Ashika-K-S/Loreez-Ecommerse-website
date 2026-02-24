import React, { useEffect, useState } from "react";
import api from "../api/api";
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
      <div className="min-h-screen bg-gray-50 p-6 pt-24">
        <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="relative group">
            {product.discount && (
              <span className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full font-bold text-sm">
                {product.discount}% OFF
              </span>
            )}
            <img
              src={product.image || "/images/placeholder.jpg"}
              alt={product.name}
              className="w-full h-[400px] object-cover rounded-md shadow group-hover:scale-105 transition-transform"
            />
            <button
              onClick={() => toggleWishlist(product)}
              className={`absolute top-3 right-3 p-2 rounded-full ${
                wishlist.find((item) => item.product?.id === product.id)
                  ? "bg-red-100 text-red-500"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              <Heart
                size={24}
                fill={
                  wishlist.find((item) => item.product?.id === product.id)
                    ? "red"
                    : "none"
                }
              />
            </button>
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <p className="text-gray-500 mb-2">{product.category_name}</p>
              <div className="flex items-center gap-2 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={16}
                    color={star <= Math.round(avgRating) ? "#FFD700" : "#ccc"}
                  />
                ))}
                <span className="text-gray-600 ml-2">
                  ({reviews.length} reviews)
                </span>
              </div>

              <p className="text-2xl font-bold text-yellow-600 mb-2">
                ₹{Number(product.price).toLocaleString()}
              </p>

              <div className="flex items-center gap-4 mb-4">
                <span className="font-semibold">Quantity:</span>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 border rounded"
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 border rounded"
                >
                  +
                </button>
              </div>

              <div className="flex gap-4 mb-4">
                <button
                  onClick={() => addToCart({ ...product, quantity })}
                  className="flex-1 bg-yellow-400 text-white py-2 rounded-md font-semibold hover:bg-yellow-500 transition"
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
                  className="flex-1 bg-green-600 text-white py-2 rounded-md font-semibold hover:bg-green-700 transition"
                >
                  Buy Now
                </button>
              </div>

              {/* Reviews Section */}
              <div className="mt-6">
                <h2 className="text-2xl font-semibold mb-3">Reviews</h2>
                {reviews.length === 0 ? (
                  <p>No reviews yet.</p>
                ) : (
                  <>
                    <ul className="space-y-2">
                      {reviews.map((review) => (
                        <li key={review.id} className="border p-3 rounded">
                          <p className="font-semibold">
                            {review.name} ({review.rating}⭐)
                          </p>
                          <p>{review.comment}</p>
                        </li>
                      ))}
                    </ul>

                    {/* Pagination */}
                    <div className="flex justify-center items-center gap-2 mt-4">
                      <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                        className="px-3 py-1 border rounded disabled:opacity-50"
                      >
                        Prev
                      </button>
                      {Array.from({ length: totalPages }, (_, i) => (
                        <button
                          key={i + 1}
                          onClick={() => setCurrentPage(i + 1)}
                          className={`px-3 py-1 border rounded ${
                            currentPage === i + 1
                              ? "bg-yellow-400 text-white"
                              : "bg-white"
                          }`}
                        >
                          {i + 1}
                        </button>
                      ))}
                      <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                        className="px-3 py-1 border rounded disabled:opacity-50"
                      >
                        Next
                      </button>
                    </div>
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
