import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="bg-stone-50 min-h-screen font-sans text-gray-900 pb-0">
        
        {/* Adjusted Hero Section Height */}
        <section className="relative h-[75vh] flex flex-col justify-center items-center text-center overflow-hidden">
          {/* Working High-Quality Background Image */}
          <div className="absolute inset-0 z-0 bg-stone-900">
            <img 
              src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2000&auto=format&fit=crop" 
              alt="Luxury Diamond Ring" 
              className="w-full h-full object-cover object-center scale-100 opacity-70 animate-[pulse_15s_ease-in-out_infinite_alternate]"
            />
            <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]"></div>
          </div>
          
          <div className="relative z-10 px-6 mt-8 max-w-4xl mx-auto flex flex-col items-center">
            <h4 className="uppercase tracking-[0.4em] text-[10px] md:text-xs text-stone-200 mb-4 drop-shadow-md">
              The Art of Elegance
            </h4>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif tracking-widest text-white mb-6 uppercase leading-[1.1] drop-shadow-lg">
              Loreez <br /> High Jewelry
            </h1>
            <p className="text-base md:text-lg text-stone-100 mb-8 font-light tracking-wide max-w-xl text-center">
              Discover elegant designs and timeless pieces crafted for life's most extraordinary moments.
            </p>
            <Link to="/products">
              <button className="bg-white/10 backdrop-blur-md border border-white/40 text-white font-medium uppercase tracking-[0.2em] text-[10px] px-8 py-4 hover:bg-white hover:text-gray-900 transition-all duration-500">
                Explore The Collection
              </button>
            </Link>
          </div>
        </section>

        {/* Brand Story Section (Reduced Padding) */}
        <section className="py-16 lg:py-24 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
           <div className="order-2 lg:order-1 relative aspect-[4/3] overflow-hidden group shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1611085583191-a3b1a6a2e24a?q=80&w=2000&auto=format&fit=crop"
                alt="Jewelry Atelier" 
                className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
              />
           </div>
           <div className="order-1 lg:order-2 flex flex-col justify-center">
              <h4 className="uppercase tracking-[0.3em] text-[10px] text-stone-500 mb-4">
                Our Heritage
              </h4>
              <h2 className="text-3xl md:text-4xl font-serif tracking-widest text-gray-900 uppercase mb-6">
                Master Craftsmanship
              </h2>
              <p className="text-stone-600 leading-relaxed font-light mb-6 text-base">
                Loreez has cultivated a tradition of excellence, 
                sourcing extraordinary gemstones and precious metals. 
                Every piece is born from meticulous traditional artistry.
              </p>
              <Link to="/products" className="inline-flex items-center gap-4 text-xs font-medium uppercase tracking-[0.2em] text-gray-900 border-b border-gray-900 pb-1 hover:text-stone-500 hover:border-stone-500 transition-colors self-start">
                <span>Discover our story</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
              </Link>
           </div>
        </section>



        {/* Newsletter Section (Reduced Padding) */}
        <section className="py-16 lg:py-20 bg-stone-100 border-t border-stone-200">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <h4 className="uppercase tracking-[0.3em] text-[10px] text-stone-500 mb-3">
              Join the Society
            </h4>
            <h2 className="text-2xl md:text-3xl font-serif tracking-widest text-gray-900 uppercase mb-4">
              Exclusive Previews
            </h2>
            <p className="text-stone-500 font-light mb-8 text-sm max-w-md mx-auto">
              Subscribe to receive invitations to private views and new collection launches.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Email Address" 
                className="flex-1 bg-transparent border-b border-stone-300 py-3 px-2 focus:outline-none focus:border-gray-900 transition-colors text-gray-900 placeholder-stone-400 text-sm"
                required
              />
              <button 
                type="submit"
                className="bg-gray-900 text-white px-8 py-3 text-[10px] font-medium uppercase tracking-[0.2em] hover:bg-black transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>

      </div>
      <Footer />
    </>
  );
};

export default Home;