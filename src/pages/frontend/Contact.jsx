import React from "react";
import Frontend from "../../layout/Frontend";

function Contact() {
  return (
    <Frontend>
      {/* Blue ecommerce-style background with subtle gradient */}
      <section className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">
            Contact Us
          </h2>

          <div className="max-w-xl mx-auto bg-white p-10 rounded-2xl shadow-2xl border border-gray-200">
            <form className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full border border-gray-300 rounded-lg p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Email</label>
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full border border-gray-300 rounded-lg p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Message</label>
                <textarea
                  placeholder="Your message"
                  className="w-full border border-gray-300 rounded-lg p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition resize-none"
                  rows="6"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-xl font-semibold text-lg transition shadow-md hover:shadow-lg"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </Frontend>
  );
}

export default Contact;
