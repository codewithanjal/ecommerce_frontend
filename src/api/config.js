const VITE_API_URL = import.meta.env.VITE_API_URL || "https://ecommerce-backend-hd6eo47c4-anjal-pandeys-projects.vercel.app";
const API_URL = VITE_API_URL.replace(/\/$/, "");
export default API_URL;

