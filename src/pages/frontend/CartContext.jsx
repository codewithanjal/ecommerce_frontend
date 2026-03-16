import { createContext, useReducer, useEffect } from "react";

export const CartContext = createContext();

const initialState = {
  cart: JSON.parse(localStorage.getItem("cart")) || [],
};

function reducer(state, action) {
  switch (action.type) {
    case "addtocart":
      const existing = state.cart.find(
        (i) => i._id === action.payload._id
      );

      if (existing) {
        return {
          ...state,
          cart: state.cart.map((i) =>
            i._id === action.payload._id
              ? { ...i, quantity: i.quantity + action.payload.quantity }
              : i
          ),
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, action.payload],
        };
      }

    case "remove":
      return {
        ...state,
        cart: state.cart.filter(
          (item) => item._id !== action.payload
        ),
      };

    case "incQty":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item._id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };

    case "decQty":
      return {
        ...state,
        cart: state.cart
          .map((item) =>
            item._id === action.payload
              ? {
                  ...item,
                  quantity: Math.max(item.quantity - 1, 1),
                }
              : item
          )
          .filter((item) => item.quantity > 0),
      };

    case "clearCart":
      localStorage.removeItem("cart"); // 🔥 important
      return { ...state, cart: [] };

    default:
      return state;
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};