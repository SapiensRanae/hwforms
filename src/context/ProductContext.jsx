import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { productReducer, initialState } from "../reducer/productReducer";

const ProductContext = createContext();

const API_BASE = "http://localhost:3001";

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/products`);
        if (!res.ok) throw new Error(`Failed to load products: ${res.status}`);
        const data = await res.json();
        dispatch({ type: "SET_PRODUCTS", payload: data });
        setError("");
      } catch (e) {
        console.error(e);
        setError("Could not load products. Is json-server running on port 3001?");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <ProductContext.Provider value={{ state, dispatch, loading, error, api: API_BASE }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
