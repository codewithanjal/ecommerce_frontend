import { Link, useNavigate } from "react-router-dom";

function Backend({ children }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/admin");
  };

  return (
    /* ===== FULL DASHBOARD BACKGROUND IMAGE ===== */
    <div
      className="flex h-screen bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1607082349566-187342175e2f?q=80&w=2070&auto=format&fit=crop')",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* ===== SIDEBAR ===== */}
      <aside className="relative z-10 w-64 bg-white/10 backdrop-blur-lg shadow-xl flex flex-col h-screen text-white">
        <div className="p-6 text-2xl font-bold border-b border-white/20">
          Dashboard
        </div>

        <nav className="flex-1 mt-4">
          <ul className="space-y-2 px-3">
            <li>
              <Link
                to="/admincategory"
                className="block px-4 py-3 rounded-lg hover:bg-white/20 transition"
              >
                Category
              </Link>
            </li>

            <li>
              <Link
                to="/adminproduct"
                className="block px-4 py-3 rounded-lg hover:bg-white/20 transition"
              >
                Product
              </Link>
            </li>

            <li>
              <Link
                to="/adminorder"
                className="block px-4 py-3 rounded-lg hover:bg-white/20 transition"
              >
                Order
              </Link>
            </li>

            <li>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 rounded-lg text-pink-400 hover:bg-white/20 transition"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* ===== MAIN SECTION ===== */}
      <div className="relative z-10 flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-white/10 backdrop-blur-lg shadow-md p-4 flex justify-between items-center text-white">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <div>User</div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Backend;
