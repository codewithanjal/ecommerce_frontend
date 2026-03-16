import React, { useEffect, useState } from "react";
import Backend from "../../layout/Backend";
import axios from "axios";
import {
  FaBox,
  FaShoppingCart,
  FaUsers,
  FaMoneyBillWave,
} from "react-icons/fa";
import API_URL from "../../api/config";

function Dashboard() {

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);

  // Fetch Data
  useEffect(() => {
    fetchProducts();
    fetchOrders();
    fetchUsers();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/products`);
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/orders`);
      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/users`);
      setUsers(res.data);
    } catch (error) {
      console.log("Users API not found (optional)");
    }
  };

  // Calculate Revenue
  const totalRevenue = orders.reduce(
    (sum, order) => sum + order.totalAmount,
    0
  );

  return (
    <Backend>
      <div className="p-6 bg-gray-100 min-h-screen">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">
          Admin Dashboard
        </h2>

        {/* ===== Stats Cards ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

          <div className="bg-white p-6 rounded-2xl shadow">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500">Total Products</p>
                <h3 className="text-2xl font-bold mt-2">
                  {products.length}
                </h3>
              </div>
              <FaBox className="text-4xl text-blue-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500">Total Orders</p>
                <h3 className="text-2xl font-bold mt-2">
                  {orders.length}
                </h3>
              </div>
              <FaShoppingCart className="text-4xl text-green-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500">Total Users</p>
                <h3 className="text-2xl font-bold mt-2">
                  {users.length}
                </h3>
              </div>
              <FaUsers className="text-4xl text-purple-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500">Revenue</p>
                <h3 className="text-2xl font-bold mt-2">
                  NRs {totalRevenue.toFixed(2)}
                </h3>
              </div>
              <FaMoneyBillWave className="text-4xl text-yellow-500" />
            </div>
          </div>
        </div>

        {/* ===== Recent Orders ===== */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="text-xl font-bold mb-4 text-gray-700">
            Recent Orders
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-100 text-gray-600">
                  <th className="p-3">Customer</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 5).map((order) => (
                  <tr key={order._id} className="border-b">
                    <td className="p-3">
                      {order.customer?.name}
                    </td>
                    <td className="p-3">
                      NRs {order.totalAmount}
                    </td>
                    <td className="p-3 text-green-600 font-semibold">
                      Placed
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {orders.length === 0 && (
              <p className="text-gray-500 mt-4">
                No orders yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </Backend>
  );
}

export default Dashboard;
