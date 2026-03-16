// src/layout/Frontend.jsx
import React from "react";
import Header from "../comp/Header.jsx";
import Footer from "../comp/Footer.jsx";

function Frontend({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header /> {/* Navbar + Cart + Categories */}

      <main className="flex-grow">
        {children}
      </main>

      <Footer />
    </div>
  );
}

export default Frontend;