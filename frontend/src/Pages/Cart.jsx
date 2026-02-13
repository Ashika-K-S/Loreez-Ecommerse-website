import { useNavigate } from "react-router-dom";
import { useStore } from "../Context/StoreContext";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useStore();

  
  const navigate = useNavigate();

  const totalPrice = cart.reduce(
  (acc, item) =>
    acc + Number(item.price_at_added) * Number(item.quantity),
  0
);

  const handleCheckout = () => {
  if (cart.length === 0) {
   
    navigate("/checkout", { state: { items: [] } });
  } else {
   
    navigate("/checkout", { state: { items: cart } });
  }

};

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24 p-6 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6 text-center text-yellow-700">
          Your Cart
        </h1>

        {cart.length === 0 ? (
          <div className="text-center mt-20">
            <p className="text-gray-500">Your cart is empty.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded shadow hover:shadow-lg transition"
              >
                <div className="flex items-center gap-4 w-full md:w-1/2">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div>
                    <p className="font-semibold text-lg">{item.product.name}</p>
                    <p className="text-yellow-600 font-bold mt-1">
                      ₹{Number(item.price_at_added).toLocaleString()}
                    </p>
                    <div className="flex items-center mt-2 space-x-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
                      >
                        -
                      </button>
                      <span className="px-2">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end mt-4 md:mt-0 space-y-2">
                  <p className="font-bold text-lg">
                    ₹{(Number(item.price_at_added) * Number(item.quantity)).toLocaleString()}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="mt-6 flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded shadow">
              <div className="text-xl font-bold">
                Total: ₹{totalPrice.toLocaleString()}
              </div>
              <button
                onClick={handleCheckout}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded mt-4 md:mt-0"
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
