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
      <div className="min-h-screen pt-32 p-6 bg-stone-50 font-sans">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-serif tracking-widest text-center mb-12 text-gray-900 uppercase">
            Shopping Bag
          </h1>

          {cart.length === 0 ? (
            <div className="text-center py-20 border-y border-stone-200">
              <p className="text-stone-500 font-light mb-8">Your shopping bag is intimately empty.</p>
              <button 
                onClick={() => navigate('/products')}
                className="border-b border-gray-900 pb-1 text-sm tracking-widest uppercase font-medium hover:text-gray-500 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-0 border-t border-stone-200">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col md:flex-row justify-between items-center py-8 border-b border-stone-200 group"
                >
                  <div className="flex items-center gap-8 w-full md:w-2/3">
                    <div className="w-24 h-32 md:w-32 md:h-40 shrink-0 bg-stone-100 overflow-hidden">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-col h-full justify-between">
                      <div>
                        <p className="font-serif text-lg text-gray-900 mb-1">{item.product.name}</p>
                        <p className="text-sm text-stone-500 uppercase tracking-widest mb-4">Item #{item.product.id}</p>
                      </div>
                      
                      <div className="flex items-center border border-gray-300 w-28 justify-between px-3 py-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="text-gray-400 hover:text-gray-900 transition-colors"
                        >
                          -
                        </button>
                        <span className="text-xs font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="text-gray-400 hover:text-gray-900 transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row md:flex-col justify-between items-end w-full md:w-1/3 mt-6 md:mt-0 h-full md:h-40">
                    <p className="font-light text-lg text-gray-900 tracking-wide">
                      ₹{(Number(item.price_at_added) * Number(item.quantity)).toLocaleString()}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-xs tracking-widest uppercase text-stone-400 hover:text-gray-900 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              <div className="mt-12 flex flex-col md:flex-row justify-between items-start md:items-center p-8 bg-white border border-stone-200">
                <div className="mb-6 md:mb-0">
                  <p className="text-xs text-stone-500 uppercase tracking-widest mb-2">Subtotal</p>
                  <p className="text-3xl font-serif text-gray-900 tracking-wide">
                    ₹{totalPrice.toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full md:w-auto bg-gray-900 text-white px-10 py-4 text-sm font-medium uppercase tracking-widest hover:bg-black transition-colors duration-300"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
