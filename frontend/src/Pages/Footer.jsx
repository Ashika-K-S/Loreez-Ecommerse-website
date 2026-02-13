import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-yellow-400 pt-10">
    <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-8 pb-10">
        <div>
          <h2 className="text-2xl font-bold mb-4">LOREEZ Jewellery</h2>
          <p className="text-sm text-gray-400">
            Discover timeless elegance with our handcrafted jewellery.Perfect for every occasion ✨
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li><a href="/" className="hover:text-yellow-300">Home</a></li>
            <li><a href="/products" className="hover:text-yellow-300">Products</a></li>
            <li><a href="/wishlist" className="hover:text-yellow-300">Wishlist</a></li>
            <li><a href="/cart" className="hover:text-yellow-300">Cart</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Customer Support</h3>
          <ul className="space-y-2 text-gray-400">
            <li><a href="/faq" className="hover:text-yellow-300">FAQ</a></li>
            <li><a href="/shipping" className="hover:text-yellow-300">Shipping & Returns</a></li>
            <li><a href="/privacy" className="hover:text-yellow-300">Privacy Policy</a></li>
            <li><a href="/contact" className="hover:text-yellow-300">Contact Us</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <ul className="space-y-3 text-gray-400">
            <li className="flex items-center space-x-2">
              <Phone size={16} /> <span>+91 9778349462</span>
            </li>
            <li className="flex items-center space-x-2">
              <Mail size={16} /> <span>support@loreez.com</span>
            </li>
            <li className="flex items-center space-x-2">
              <MapPin size={16} /> <span>Calicut, Kerala, India</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-700 py-4">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-gray-400">
          <p>© {new Date().getFullYear()} LOREEZ Jewellery. All rights reserved.</p>
          <div className="flex space-x-6 mt-3 md:mt-0">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <Facebook className="w-5 h-5 hover:text-white transition" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <Instagram className="w-5 h-5 hover:text-white transition" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <Twitter className="w-5 h-5 hover:text-white transition" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
