import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="bg-stone-50 min-h-screen font-sans text-gray-900 pb-20">
        
        {/* Hero Section */}
        <section className="relative h-[80vh] flex flex-col justify-center items-center text-center overflow-hidden">
          {/* Subtle background overlay */}
          <div className="absolute inset-0 bg-stone-100 z-0"></div>
          
          <div className="relative z-10 px-4">
            <h4 className="uppercase tracking-[0.3em] text-sm text-gray-500 mb-6">
              The Art of Elegance
            </h4>
            <h1 className="text-5xl md:text-7xl font-serif tracking-widest text-gray-900 mb-8 uppercase leading-tight">
              Loreez <br className="hidden md:block" /> Fine Jewelry
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto font-light">
              Discover elegant designs and timeless pieces crafted for life's most extraordinary moments.
            </p>
            <Link to="/products">
              <button className="bg-gray-900 text-white font-medium uppercase tracking-widest text-sm px-10 py-4 hover:bg-black transition-colors duration-300">
                Explore Current Collection
              </button>
            </Link>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-24 max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif tracking-widest text-gray-900 uppercase">
              Curated Categories
            </h2>
            <div className="w-16 h-[1px] bg-gray-900 mx-auto mt-6"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
            {/* Necklaces */}
            <Link to="/products?category=Necklaces" className="group block">
              <div className="relative overflow-hidden aspect-[4/5] bg-stone-200 mb-6">
                <img
                  src="https://media.istockphoto.com/id/934717802/photo/traditional-indian-gold-necklace-with-earrings.jpg?s=612x612&w=0&k=20&c=j67MP0xFYPgRsUcZ4EjFIO3EMUV97S54bzIPBjNv06c="
                  alt="Necklaces"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="text-center">
                <p className="text-lg font-serif text-gray-900 uppercase tracking-widest group-hover:text-stone-500 transition-colors">
                  Necklaces
                </p>
              </div>
            </Link>

            {/* Rings */}
            <Link to="/products?category=Rings" className="group block">
              <div className="relative overflow-hidden aspect-[4/5] bg-stone-200 mb-6">
                <img
                  src="https://media.istockphoto.com/id/1011590288/photo/luxury-diamond-ring-in-jewelry-box-vintage-style.jpg?s=612x612&w=0&k=20&c=kclwqgkNjDyT7PlnPXqU2Dql1PIzYVUf1MV-TRED8uw="
                  alt="Rings"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="text-center">
                <p className="text-lg font-serif text-gray-900 uppercase tracking-widest group-hover:text-stone-500 transition-colors">
                  Rings
                </p>
              </div>
            </Link>

            {/* Earrings */}
            <Link to="/products?category=Earrings" className="group block">
              <div className="relative overflow-hidden aspect-[4/5] bg-stone-200 mb-6">
                <img
                  src="https://media.istockphoto.com/id/1296634658/photo/indian-traditional-gold-wedding-earrings-on-wooden-box.jpg?s=612x612&w=0&k=20&c=I50vTgqCA1j3t9R09qk1xIjn72lLxi_prB9kQAXFdz4="
                  alt="Earrings"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="text-center">
                <p className="text-lg font-serif text-gray-900 uppercase tracking-widest group-hover:text-stone-500 transition-colors">
                  Earrings
                </p>
              </div>
            </Link>

            {/* Bangles */}
            <Link to="/products?category=Bangles" className="group block">
              <div className="relative overflow-hidden aspect-[4/5] bg-stone-200 mb-6">
                <img
                  src="https://media.istockphoto.com/id/488548516/photo/wedding-gold-bracelets.jpg?s=612x612&w=0&k=20&c=XoNrzSBDOhllLJ3hlSgS526px-bGI7wCyiZPCgk2fxg="
                  alt="Bangles"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="text-center">
                <p className="text-lg font-serif text-gray-900 uppercase tracking-widest group-hover:text-stone-500 transition-colors">
                  Bangles
                </p>
              </div>
            </Link>
          </div>
        </section>

        {/* Featured / Best Sellers Section */}
        <section className="py-24 bg-white border-y border-stone-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16">
              <div>
                <h4 className="uppercase tracking-[0.2em] text-xs text-gray-500 mb-4">
                  Signature Pieces
                </h4>
                <h2 className="text-3xl md:text-4xl font-serif tracking-widest text-gray-900 uppercase">
                  Best Sellers
                </h2>
              </div>
              <Link
                to="/products"
                className="hidden md:inline-block border-b border-gray-900 pb-1 text-sm tracking-widest uppercase font-medium hover:text-gray-500 transition-colors"
              >
                View All
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
              {/* Product 1 */}
              <div className="group cursor-pointer">
                <div className="relative overflow-hidden aspect-[4/3] bg-stone-100 mb-6">
                  <img
                    src="https://media.istockphoto.com/id/494758438/photo/necklace-made-of-white-gold-with-diamonds-on-a-stand.jpg?s=612x612&w=0&k=20&c=fMufoAed2ChmurgbuAqUepdYPCt5ZjN1_qMTyk-ExQM="
                    alt="Best Seller 1"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-serif text-gray-900 mb-2 group-hover:text-stone-500 transition-colors">
                      Diamond Heritage Necklace
                    </h3>
                    <p className="text-sm text-gray-500 uppercase tracking-wider">
                      White Gold
                    </p>
                  </div>
                  <p className="text-gray-900 font-medium tracking-wide">$1,299</p>
                </div>
              </div>

              {/* Product 2 */}
              <div className="group cursor-pointer">
                <div className="relative overflow-hidden aspect-[4/3] bg-stone-100 mb-6">
                  <img
                    src="https://media.istockphoto.com/id/525219470/photo/metal-diamond-hair-ring.jpg?s=612x612&w=0&k=20&c=7mNNhGZGApExDowiAezZqE24vVWtoHloI8vWsM3KH7I="
                    alt="Best Seller 2"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-serif text-gray-900 mb-2 group-hover:text-stone-500 transition-colors">
                      Eternity Gold Bracelet
                    </h3>
                    <p className="text-sm text-gray-500 uppercase tracking-wider">
                      18k Yellow Gold
                    </p>
                  </div>
                  <p className="text-gray-900 font-medium tracking-wide">$890</p>
                </div>
              </div>
            </div>
            
            <div className="mt-12 text-center md:hidden">
              <Link
                to="/products"
                className="inline-block border-b border-gray-900 pb-1 text-sm tracking-widest uppercase font-medium"
              >
                View All Collection
              </Link>
            </div>
          </div>
        </section>

      </div>
      <Footer />
    </>
  );
};

export default Home;