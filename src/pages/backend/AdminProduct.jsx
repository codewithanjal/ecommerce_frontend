import React, { useEffect, useState } from "react";
import Backend from "../../layout/Backend";
import { useForm } from "react-hook-form";
import axios from "axios";
import API_URL from "../../api/config";

function AdminProduct() {

  const { register, handleSubmit, reset, watch } = useForm();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editId, setEditId] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  /* ================= GET DATA ================= */
  const getCategories = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/categories`);
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/products`);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getCategories();
    getProducts();
  }, []);

  /* ================= ADD/UPDATE PRODUCT ================= */
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("qty", data.qty);
      formData.append("category", data.category);

      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      }

      if (editId) {
        await axios.put(
          `${API_URL}/api/products/${editId}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        setEditId(null);
      } else {
        await axios.post(
          `${API_URL}/api/products`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      }

      reset();
      setPreviewImage(null);
      getProducts();
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= DELETE PRODUCT ================= */
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/products/${id}`);
      getProducts();
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= EDIT PRODUCT ================= */
  const editProduct = (product) => {
    setEditId(product._id);
    reset({
      title: product.title,
      description: product.description,
      price: product.price,
      qty: product.qty,
      category: product.category,
      image: null,
    });

    setPreviewImage(
      product.image
        ? `${API_URL}/uploads/${product.image}`
        : null
    );
  };

  /* ================= IMAGE PREVIEW ================= */
  const watchedImage = watch("image");
  useEffect(() => {
    if (watchedImage && watchedImage.length > 0) {
      const file = watchedImage[0];
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  }, [watchedImage]);

  return (
    <Backend>
      <div
        className="min-h-[85vh] p-8 rounded-2xl relative overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=2070&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/70 rounded-2xl"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* ================= PRODUCT FORM ================= */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/20 text-white"
          >
            <h2 className="text-3xl font-bold mb-6">
              {editId ? "Edit Product" : "Add New Product"}
            </h2>

            <div className="space-y-5">
              <input
                {...register("title", { required: true })}
                placeholder="Product Title"
                className="w-full bg-white/20 border border-white/30 rounded-xl px-4 py-3 
                placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
              />

              <textarea
                {...register("description", { required: true })}
                placeholder="Product Description"
                className="w-full bg-white/20 border border-white/30 rounded-xl px-4 py-3 h-24 
                resize-none placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
              />

              <input
                type="number"
                {...register("price", { required: true })}
                placeholder="Price"
                className="w-full bg-white/20 border border-white/30 rounded-xl px-4 py-3 
                placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
              />

              <input
                type="number"
                {...register("qty", { required: true })}
                placeholder="Quantity"
                className="w-full bg-white/20 border border-white/30 rounded-xl px-4 py-3 
                placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
              />

              <select
                {...register("category", { required: true })}
                className="w-full bg-white/20 border border-white/30 rounded-xl px-4 py-3 
                text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                <option className="text-black" value="">
                  Select Category
                </option>
                {categories.map((cat) => (
                  <option className="text-black" key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>

              <input
                type="file"
                {...register("image")}
                className="w-full bg-white/20 border border-white/30 rounded-xl px-4 py-3 text-white"
              />

              {previewImage && (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-xl mt-3 shadow-lg"
                />
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 
                py-3 rounded-xl font-semibold text-white 
                hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg"
              >
                {editId ? "Update Product" : "Add Product"}
              </button>
            </div>
          </form>

          {/* ================= PRODUCT TABLE ================= */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-x-auto text-white">
            <table className="w-full text-sm">
              <thead className="bg-white/20 uppercase text-xs text-gray-200">
                <tr>
                  <th className="px-3 py-3">SNo</th>
                  <th className="px-3 py-3">Product</th>
                  <th className="px-3 py-3">Image</th>
                  <th className="px-3 py-3">Price</th>
                  <th className="px-3 py-3">Qty</th>
                  <th className="px-3 py-3">Action</th>
                </tr>
              </thead>

              <tbody>
                {products.length ? (
                  products.map((p, i) => (
                    <tr
                      key={p._id}
                      className="border-b border-white/20 hover:bg-white/10 transition"
                    >
                      <td className="px-3 py-3 text-center">{i + 1}</td>

                      <td className="px-3 py-3">
                        <p className="font-semibold">{p.title}</p>
                        <p className="text-xs text-gray-300 truncate">
                          {p.description}
                        </p>
                      </td>

                      <td className="px-3 py-3">
                        {p.image ? (
                          <img
                            src={`${API_URL}/uploads/${p.image}`}
                            alt={p.title}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                        ) : (
                          <span className="text-gray-400 text-xs">
                            No Image
                          </span>
                        )}
                      </td>

                      <td className="px-3 py-3">Rs {p.price}</td>
                      <td className="px-3 py-3 text-center">{p.qty}</td>

                      <td className="px-3 py-3 text-center space-x-2">
                        <button
                          onClick={() => editProduct(p)}
                          className="bg-blue-500 px-3 py-1 rounded-lg text-xs hover:bg-blue-600 transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteProduct(p._id)}
                          className="bg-red-500 px-3 py-1 rounded-lg text-xs hover:bg-red-600 transition"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-10 text-gray-300">
                      No products found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </Backend>
  );
}

export default AdminProduct;
