import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const navigate = useNavigate();

  const handleBuyNow = () => {
    const checkoutItem = {
      product: {
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
      },
      price_at_added: Number(product.price),
      quantity: 1,
    };

    navigate("/checkout", {
      state: {
        items: [checkoutItem],
      },
    });
  };

    <div className="group flex flex-col cursor-pointer bg-white">
      <div className="relative overflow-hidden aspect-[4/5] bg-stone-100 mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute left-0 bottom-0 w-full translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={handleBuyNow}
            className="w-full bg-gray-900 text-white py-3 text-sm font-medium uppercase tracking-wider hover:bg-black transition-colors"
          >
            Buy Now
          </button>
        </div>
      </div>

      <div className="text-center px-2 pb-4">
        <h2 className="text-lg font-serif text-gray-900 mb-1 leading-snug">
          {product.name}
        </h2>
        <p className="text-gray-600 font-light tracking-wide">
          ₹{Number(product.price).toLocaleString()}
        </p>
      </div>
    </div>
}

export default ProductCard;
