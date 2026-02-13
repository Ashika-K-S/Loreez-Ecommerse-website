import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Home = () => {
  return (
    <>
    <Navbar/>
    <div className="bg-gray-50 min-h-screen">
     
      <section className="bg-black text-yellow-400 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-wide">
          Welcome to LOREEZ Jewellery
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-6">
          Discover elegant designs and timeless pieces
        </p>
        <Link to="/products">
          <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-lg transition shadow-lg">
            Shop Now
          </button>
        </Link>

      </section>

     
      <section className="py-16 container mx-auto text-center">
        <h2 className="text-3xl font-bold text-yellow-700 mb-10 tracking-wide">
          Featured Collections
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-8">
         
          <Link to="/products?category=Necklaces">
            <div className="bg-white shadow-lg rounded-lg p-4 hover:shadow-2xl transition cursor-pointer">
              <img
                src="https://media.istockphoto.com/id/934717802/photo/traditional-indian-gold-necklace-with-earrings.jpg?s=612x612&w=0&k=20&c=j67MP0xFYPgRsUcZ4EjFIO3EMUV97S54bzIPBjNv06c="
                alt="Necklaces"
                className="mx-auto mb-4 rounded"
              />
              <p className="text-lg font-semibold text-yellow-600">Necklaces</p>
            </div>
          </Link>

          
          <Link to="/products?category=Rings">
            <div className="bg-white shadow-lg rounded-lg p-4 hover:shadow-2xl transition cursor-pointer">
              <img
                src="https://media.istockphoto.com/id/1011590288/photo/luxury-diamond-ring-in-jewelry-box-vintage-style.jpg?s=612x612&w=0&k=20&c=kclwqgkNjDyT7PlnPXqU2Dql1PIzYVUf1MV-TRED8uw="
                alt="Rings"
                className="mx-auto mb-4 rounded"
              />
              <p className="text-lg font-semibold text-yellow-600">Rings</p>
            </div>
          </Link>

        
          <Link to="/products?category=Earrings">
            <div className="bg-white shadow-lg rounded-lg p-4 hover:shadow-2xl transition cursor-pointer">
              <img
                src="https://media.istockphoto.com/id/1296634658/photo/indian-traditional-gold-wedding-earrings-on-wooden-box.jpg?s=612x612&w=0&k=20&c=I50vTgqCA1j3t9R09qk1xIjn72lLxi_prB9kQAXFdz4="
                alt="Earrings"
                className="mx-auto mb-4 rounded"
              />
              <p className="text-lg font-semibold text-yellow-600">Earrings</p>
            </div>
          </Link>

          
          <Link to="/products?category=Bangles">
            <div className="bg-white shadow-lg rounded-lg p-4 hover:shadow-2xl transition cursor-pointer">
              <img
                src="https://media.istockphoto.com/id/488548516/photo/wedding-gold-bracelets.jpg?s=612x612&w=0&k=20&c=XoNrzSBDOhllLJ3hlSgS526px-bGI7wCyiZPCgk2fxg="
                alt="Bangles"
                className="mx-auto mb-4 rounded"
              />
              <p className="text-lg font-semibold text-yellow-600">Bangles</p>
            </div>
          </Link>
        </div>
      </section>

     
      <section className="py-16 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold text-yellow-700 mb-10 tracking-wide">
          Best Sellers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white shadow-lg rounded-lg p-4 hover:shadow-2xl transition">
            <img
              src="https://media.istockphoto.com/id/494758438/photo/necklace-made-of-white-gold-with-diamonds-on-a-stand.jpg?s=612x612&w=0&k=20&c=fMufoAed2ChmurgbuAqUepdYPCt5ZjN1_qMTyk-ExQM="
              alt="Product 1"
              className="mx-auto mb-4 rounded"
            />
            <p className="text-lg font-semibold text-yellow-600">Necklace</p>
            <p className="text-yellow-700 font-bold mt-1">$1299</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-4 hover:shadow-2xl transition">
            <img
              src="https://media.istockphoto.com/id/525219470/photo/metal-diamond-hair-ring.jpg?s=612x612&w=0&k=20&c=7mNNhGZGApExDowiAezZqE24vVWtoHloI8vWsM3KH7I="
              alt="Product 2"
              className="mx-auto mb-4 rounded"
            />
            <p className="text-lg font-semibold text-yellow-600">
              Gold Bracelet
            </p>
            <p className="text-yellow-700 font-bold mt-1">$890</p>
          </div>
        </div>
      </section>
    </div>
    <Footer/>
    </>
  );
};

export default Home;