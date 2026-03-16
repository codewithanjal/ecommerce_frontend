import React, { useEffect, useState } from "react";
import Backend from "../../layout/Backend";
import { useForm } from "react-hook-form";
import axios from "axios";

function AdminCategory() {
  const { register, handleSubmit, reset } = useForm();
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);

  const getAllCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/categories");
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const onSubmit = async (formData) => {
    try {
      if (editId) {
        await axios.put(
          `http://localhost:5000/api/categories/${editId}`,
          formData
        );
        setEditId(null);
      } else {
        await axios.post("http://localhost:5000/api/categories", formData);
      }
      reset();
      getAllCategories();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const deleteId = async (id) => {
    await axios.delete(`http://localhost:5000/api/categories/${id}`);
    getAllCategories();
  };

  const editIdCategory = (a) => {
    setEditId(a._id);
    reset({ name: a.name });
  };

  return (
    <Backend>
      {/* ===== Background Wrapper ===== */}
      <div className="relative min-h-screen overflow-hidden bg-gray-900">

        {/* Floating Background Images */}
        <img
          src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400"
          className="absolute top-10 left-10 w-40 opacity-20 rotate-12"
          alt=""
        />
        <img
          src="https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400"
          className="absolute bottom-20 right-20 w-52 opacity-20 -rotate-12"
          alt=""
        />
        <img
          src="https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400"
          className="absolute top-1/3 right-10 w-36 opacity-20 rotate-6"
          alt=""
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

        {/* ===== Main Content ===== */}
        <div className="relative z-10 p-6 space-y-6">
          <h1 className="text-3xl font-bold text-white">
            Category Management
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* ===== FORM ===== */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white/10 backdrop-blur-xl border border-white/20
              rounded-2xl shadow-2xl p-6 space-y-5 text-white"
            >
              <div>
                <h2 className="text-lg font-semibold">
                  {editId ? "Update Category" : "Add New Category"}
                </h2>
                <p className="text-sm text-gray-300">
                  Manage your ecommerce categories
                </p>
              </div>

              <div>
                <label className="text-sm">Category Name</label>
                <input
                  {...register("name", { required: true })}
                  placeholder="e.g. Electronics"
                  className="w-full mt-1 rounded-xl bg-white/20
                  border border-white/30 px-4 py-2.5
                  text-white placeholder-gray-300
                  focus:outline-none focus:ring-2
                  focus:ring-amber-400 transition"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r
                from-amber-500 to-orange-500
                py-2.5 font-semibold
                hover:from-amber-600 hover:to-orange-600
                active:scale-95 transition-all shadow-lg"
              >
                {editId ? "Update Category" : "Add Category"}
              </button>
            </form>

            {/* ===== TABLE ===== */}
            <div className="bg-white/10 backdrop-blur-xl
            border border-white/20 rounded-2xl
            shadow-2xl overflow-hidden text-white">

              <div className="px-6 py-4 border-b border-white/20">
                <h2 className="text-lg font-semibold">
                  Category List
                </h2>
              </div>

              <table className="w-full text-sm">
                <thead className="bg-white/10 uppercase text-xs">
                  <tr>
                    <th className="px-6 py-3 text-left">#</th>
                    <th className="px-6 py-3 text-left">Name</th>
                    <th className="px-6 py-3 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-white/20">
                  {data.length > 0 ? (
                    data.map((a, index) => (
                      <tr
                        key={a._id}
                        className="hover:bg-white/10 transition"
                      >
                        <td className="px-6 py-4">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 font-medium">
                          {a.name}
                        </td>
                        <td className="px-6 py-4 text-center space-x-2">
                          <button
                            onClick={() => editIdCategory(a)}
                            className="rounded-lg bg-blue-500/20
                            px-3 py-1.5 text-xs font-semibold
                            hover:bg-blue-500/40 transition"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteId(a._id)}
                            className="rounded-lg bg-red-500/20
                            px-3 py-1.5 text-xs font-semibold
                            hover:bg-red-500/40 transition"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="3"
                        className="px-6 py-10 text-center text-gray-300"
                      >
                        No categories found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

            </div>
          </div>
        </div>
      </div>
    </Backend>
  );
}

export default AdminCategory;
