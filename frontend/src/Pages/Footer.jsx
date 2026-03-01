import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1a1918] text-stone-300 pt-20 font-sans border-t border-stone-800">
    <div className="container mx-auto px-8 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 pb-16">
        <div>
          <h2 className="text-2xl font-serif tracking-widest uppercase text-white mb-6">Loreez</h2>
          <p className="text-sm font-light leading-relaxed text-stone-400 max-w-xs">
            Discover timeless elegance with our handcrafted fine jewelry. Curated for life's most extraordinary moments.
          </p>
        </div>
        <div>
          <h3 className="text-xs tracking-widest uppercase text-stone-500 mb-6 font-semibold">The Collection</h3>
          <ul className="space-y-4 text-sm font-light">
            <li><a href="/" className="hover:text-white transition-colors duration-300">Home</a></li>
            <li><a href="/products" className="hover:text-white transition-colors duration-300">Shop Fine Jewelry</a></li>
            <li><a href="/wishlist" className="hover:text-white transition-colors duration-300">Your Wishlist</a></li>
            <li><a href="/cart" className="hover:text-white transition-colors duration-300">Shopping Bag</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-xs tracking-widest uppercase text-stone-500 mb-6 font-semibold">Assistance</h3>
          <ul className="space-y-4 text-sm font-light">
            <li><a href="/faq" className="hover:text-white transition-colors duration-300">Frequently Asked Questions</a></li>
            <li><a href="/shipping" className="hover:text-white transition-colors duration-300">Shipping & Returns</a></li>
            <li><a href="/privacy" className="hover:text-white transition-colors duration-300">Privacy Policy</a></li>
            <li><a href="/contact" className="hover:text-white transition-colors duration-300">Contact Us</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-xs tracking-widest uppercase text-stone-500 mb-6 font-semibold">Connect</h3>
          <ul className="space-y-4 text-sm font-light text-stone-400">
            <li className="flex items-center space-x-3">
              <Phone size={14} className="text-stone-500" /> <span>+91 9778349462</span>
            </li>
            <li className="flex items-center space-x-3">
              <Mail size={14} className="text-stone-500" /> <span>support@loreez.com</span>
            </li>
            <li className="flex items-center space-x-3 items-start">
              <MapPin size={14} className="text-stone-500 mt-1" /> <span>Calicut, Kerala, India</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-stone-800 py-6">
        <div className="container mx-auto px-8 md:px-12 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-stone-500 tracking-wider">© {new Date().getFullYear()} LOREEZ FINE JEWELRY. ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-stone-500 hover:text-white transition-colors duration-300">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-stone-500 hover:text-white transition-colors duration-300">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-stone-500 hover:text-white transition-colors duration-300">
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
