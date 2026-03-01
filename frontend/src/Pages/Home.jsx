import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="bg-stone-50 min-h-screen font-sans text-gray-900 pb-0">
        
        {/* Full-bleed Hero Section */}
        <section className="relative h-screen flex flex-col justify-center items-center text-center overflow-hidden">
          {/* Background Image with Dark Overlay */}
          <div className="absolute inset-0 z-0 bg-stone-900">
            <img 
              src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2070&auto=format&fit=crop" 
              alt="Luxury High Jewelry" 
              className="w-full h-full object-cover object-center scale-105 animate-[pulse_20s_ease-in-out_infinite_alternate]"
            />
            <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]"></div>
          </div>
          
          <div className="relative z-10 px-6 mt-16 max-w-4xl mx-auto flex flex-col items-center">
            <h4 className="uppercase tracking-[0.4em] text-xs text-stone-200 mb-6 drop-shadow-md">
              The Art of Elegance
            </h4>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif tracking-widest text-white mb-8 uppercase leading-[1.1] drop-shadow-lg">
              Loreez <br /> High Jewelry
            </h1>
            <p className="text-lg md:text-xl text-stone-100 mb-12 font-light tracking-wide drop-shadow-md max-w-2xl text-center">
              Discover elegant designs and timeless pieces crafted for life's most extraordinary moments.
            </p>
            <Link to="/products">
              <button className="bg-white/10 backdrop-blur-md border border-white/40 text-white font-medium uppercase tracking-[0.2em] text-xs px-10 py-5 hover:bg-white hover:text-gray-900 transition-all duration-500">
                Explore The Collection
              </button>
            </Link>
          </div>
        </section>

        {/* Brand Story Section */}
        <section className="py-24 lg:py-32 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
           <div className="order-2 lg:order-1 relative aspect-[3/4] overflow-hidden group shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1599643478524-fb405f6e8971?q=80&w=1964&auto=format&fit=crop"
                alt="Craftsmanship" 
                className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
              />
           </div>
           <div className="order-1 lg:order-2 flex flex-col justify-center">
              <h4 className="uppercase tracking-[0.3em] text-xs text-stone-500 mb-6">
                Our Heritage
              </h4>
              <h2 className="text-3xl md:text-5xl font-serif tracking-widest text-gray-900 uppercase leading-snug mb-8">
                Uncompromising <br/> Craftsmanship
              </h2>
              <p className="text-stone-600 leading-relaxed font-light mb-8 text-lg">
                For generations, Loreez has cultivated a tradition of excellence, 
                sourcing only the most extraordinary gemstones and precious metals. 
                Every piece in our atelier is born from a meticulous dance of 
                traditional artistry and modern innovation.
              </p>
              <Link to="/products" className="inline-flex items-center gap-4 text-xs font-medium uppercase tracking-[0.2em] text-gray-900 border-b border-gray-900 pb-1 hover:text-stone-500 hover:border-stone-500 transition-colors self-start">
                <span>Discover our story</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
              </Link>
           </div>
        </section>

        {/* Categories / Masterpieces Section */}
        <section className="py-24 lg:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-serif tracking-widest text-gray-900 uppercase">
                The Masterpieces
              </h2>
              <div className="w-12 h-[1px] bg-gray-900 mx-auto mt-8"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {/* Necklaces */}
              <Link to="/products?category=Necklaces" className="group block">
                <div className="relative overflow-hidden aspect-[3/4] bg-stone-100 mb-6">
                  <img
                    src="https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=1974&auto=format&fit=crop"
                    alt="Necklaces"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
                </div>
                <div className="text-center">
                  <p className="text-lg font-serif text-gray-900 uppercase tracking-widest group-hover:text-stone-500 transition-colors">
                    Necklaces
                  </p>
                </div>
              </Link>

              {/* Rings */}
              <Link to="/products?category=Rings" className="group block mt-0 lg:mt-12">
                <div className="relative overflow-hidden aspect-[3/4] bg-stone-100 mb-6">
                  <img
                    src="https://images.unsplash.com/photo-1605100804763-247f6612654e?q=80&w=1964&auto=format&fit=crop"
                    alt="Rings"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
                </div>
                <div className="text-center">
                  <p className="text-lg font-serif text-gray-900 uppercase tracking-widest group-hover:text-stone-500 transition-colors">
                    Rings
                  </p>
                </div>
              </Link>

              {/* Earrings */}
              <Link to="/products?category=Earrings" className="group block">
                <div className="relative overflow-hidden aspect-[3/4] bg-stone-100 mb-6">
                  <img
                    src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1974&auto=format&fit=crop"
                    alt="Earrings"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
                </div>
                <div className="text-center">
                  <p className="text-lg font-serif text-gray-900 uppercase tracking-widest group-hover:text-stone-500 transition-colors">
                    Earrings
                  </p>
                </div>
              </Link>

              {/* Bangles / Bracelets */}
              <Link to="/products?category=Bangles" className="group block mt-0 lg:mt-12">
                <div className="relative overflow-hidden aspect-[3/4] bg-stone-100 mb-6">
                  <img
                    src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2070&auto=format&fit=crop"
                    alt="Bracelets"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
                </div>
                <div className="text-center">
                  <p className="text-lg font-serif text-gray-900 uppercase tracking-widest group-hover:text-stone-500 transition-colors">
                    Bracelets & Bangles
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Featured / Best Sellers Section */}
        <section className="py-24 lg:py-32 bg-stone-100 border-t border-stone-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16">
              <div>
                <h4 className="uppercase tracking-[0.2em] text-xs text-stone-500 mb-4">
                  Signature Collections
                </h4>
                <h2 className="text-3xl md:text-5xl font-serif tracking-widest text-gray-900 uppercase">
                  Exquisite Selections
                </h2>
              </div>
              <Link
                to="/products"
                className="hidden md:inline-flex items-center gap-3 border-b border-gray-900 pb-1 text-xs tracking-[0.2em] uppercase font-medium hover:text-stone-500 hover:border-stone-500 transition-colors"
              >
                <span>View Entire Collection</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
              {/* Product 1 */}
              <Link to="/products" className="group cursor-pointer block">
                <div className="relative overflow-hidden aspect-[4/3] bg-white mb-6">
                  <img
                    src="https://media.istockphoto.com/id/494758438/photo/necklace-made-of-white-gold-with-diamonds-on-a-stand.jpg?s=612x612&w=0&k=20&c=fMufoAed2ChmurgbuAqUepdYPCt5ZjN1_qMTyk-ExQM="
                    alt="Diamond Heritage Necklace"
                    className="w-full h-full object-cover mix-blend-multiply transition-transform duration-1000 group-hover:scale-105"
                  />
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl md:text-2xl font-serif text-gray-900 mb-2 group-hover:text-stone-500 transition-colors">
                      Diamond Heritage Necklace
                    </h3>
                    <p className="text-xs text-stone-500 uppercase tracking-widest">
                      White Gold Collections
                    </p>
                  </div>
                  <div className="p-3 border border-stone-300 rounded-full group-hover:bg-gray-900 group-hover:text-white transition-colors duration-300">
                     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                  </div>
                </div>
              </Link>

              {/* Product 2 */}
              <Link to="/products" className="group cursor-pointer block">
                <div className="relative overflow-hidden aspect-[4/3] bg-white mb-6">
                  <img
                    src="https://media.istockphoto.com/id/525219470/photo/metal-diamond-hair-ring.jpg?s=612x612&w=0&k=20&c=7mNNhGZGApExDowiAezZqE24vVWtoHloI8vWsM3KH7I="
                    alt="Eternity Gold Bracelet"
                    className="w-full h-full object-cover mix-blend-multiply transition-transform duration-1000 group-hover:scale-105"
                  />
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl md:text-2xl font-serif text-gray-900 mb-2 group-hover:text-stone-500 transition-colors">
                      Eternity Gold Bracelet
                    </h3>
                    <p className="text-xs text-stone-500 uppercase tracking-widest">
                      18k Yellow Gold Signatures
                    </p>
                  </div>
                  <div className="p-3 border border-stone-300 rounded-full group-hover:bg-gray-900 group-hover:text-white transition-colors duration-300">
                     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                  </div>
                </div>
              </Link>
            </div>
            
            <div className="mt-16 text-center md:hidden">
              <Link
                to="/products"
                className="inline-block border-b border-gray-900 pb-1 text-xs tracking-[0.2em] uppercase font-medium"
              >
                View Entire Collection
              </Link>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-24 bg-white border-t border-stone-200">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h4 className="uppercase tracking-[0.3em] text-xs text-stone-500 mb-4">
              Join the Society
            </h4>
            <h2 className="text-3xl md:text-4xl font-serif tracking-widest text-gray-900 uppercase mb-6">
              Exclusive Previews
            </h2>
            <p className="text-stone-500 font-light mb-10 text-center">
              Subscribe to receive invitations to private views, new collection launches, and exceptional stories from the Loreez Atelier.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Your Email Address" 
                className="flex-1 bg-transparent border-b border-stone-300 py-4 px-2 focus:outline-none focus:border-gray-900 transition-colors text-gray-900 placeholder-stone-400 text-sm text-center sm:text-left"
                required
              />
              <button 
                type="submit"
                className="bg-gray-900 text-white px-8 py-4 text-xs font-medium uppercase tracking-[0.2em] hover:bg-black transition-colors"
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