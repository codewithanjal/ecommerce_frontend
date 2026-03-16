import React, { useEffect, useState } from "react";
import axios from "axios";
import Backend from "../../layout/Backend";
import API_URL from "../../api/config";

function AdminOrder() {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("${API_URL}/api/orders");
      setOrders(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getOrderStatusStyle = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      case "Shipped":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-blue-100 text-blue-700";
    }
  };

  const getPaymentStatusStyle = (status) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <Backend>
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-blue-50 to-purple-100 p-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Orders Management
          </h1>
          <p className="text-gray-600 text-sm">
            Monitor and manage all customer orders
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20 text-gray-600 text-lg animate-pulse">
            Loading orders...
          </div>
        ) : orders.length === 0 ? (
          <div className="flex justify-center py-20 text-gray-600 text-lg">
            No orders found.
          </div>
        ) : (
          <div className="backdrop-blur-xl bg-white/80 rounded-3xl shadow-xl border border-white/40 overflow-hidden">

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">

                <thead className="bg-white text-gray-700 uppercase text-xs tracking-wider border-b">
                  <tr>
                    <th className="px-6 py-4 text-left">Order</th>
                    <th className="px-6 py-4 text-left">Customer</th>
                    <th className="px-6 py-4 text-left">Phone</th>
                    <th className="px-6 py-4 text-left">Total</th>
                    <th className="px-6 py-4 text-left">Payment</th>
                    <th className="px-6 py-4 text-left">Status</th>
                    <th className="px-6 py-4 text-left">Date</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr
                      key={order._id}
                      className="hover:bg-blue-50 hover:shadow-sm transition-all duration-200"
                    >
                      <td className="px-6 py-4 font-mono text-gray-700">
                        #{order._id.slice(-6)}
                      </td>

                      <td className="px-6 py-4">
                        <p className="font-semibold text-gray-800">
                          {order.customer?.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {order.customer?.email}
                        </p>
                      </td>

                      <td className="px-6 py-4 text-gray-700">
                        {order.customer?.phone}
                      </td>

                      <td className="px-6 py-4 font-bold text-gray-800">
                        NRs {order.totalAmount}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getPaymentStatusStyle(
                            order.paymentStatus
                          )}`}
                        >
                          {order.paymentStatus || "COD"}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getOrderStatusStyle(
                            order.orderStatus
                          )}`}
                        >
                          {order.orderStatus || "Placed"}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          </div>
        )}
      </div>
    </Backend>
  );
}

export default AdminOrder;
