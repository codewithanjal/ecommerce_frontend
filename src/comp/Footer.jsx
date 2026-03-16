import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-4 gap-8">

        {/* About */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-orange-400">
            About Us
          </h3>
          <p className="text-sm text-gray-300">
            We provide high quality products at affordable prices.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-orange-400">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Customer Service */} 
        <div>
          <h3 className="text-lg font-semibold mb-4 text-orange-400">
            Customer Service
          </h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>Help Center</li>
            <li>Returns</li>
            <li>Shipping Info</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-orange-400">
            Contact
          </h3>
          <p className="text-sm text-gray-300">support@shopeasy.com</p>
          <p className="text-sm text-gray-300">+977-9800000000</p>
        </div>
      </div>

      {/* Bottom */}
      <div className="bg-gray-800 text-center py-4 text-sm text-gray-400">
        © 2026 ShopEasy. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
