import { useEffect, useMemo, useReducer, useState } from "react";
import { productReducer, initialState } from "../reducer/productReducer";
import { ProductContext } from "./context";


export const ProductProvider = ({ children }) => {
    const [state, dispatch] = useReducer(productReducer, initialState);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [cart, setCart] = useState(() => {
        try {
            const saved = localStorage.getItem("cart");
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        setCart((prev) => {
            const exists = prev.find((item) => item.id === product.id);
            if (exists) {
                return prev.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { id: product.id, title: product.title, price: product.price, quantity: 1 }];
        });
    };

    const removeFromCart = (id) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    };

    const decrementFromCart = (id) => {
        setCart((prev) =>
            prev
                .map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
                .filter((item) => item.quantity > 0)
        );
    };

    const clearCart = () => setCart([]);

    const cartCount = useMemo(() => cart.reduce((sum, i) => sum + i.quantity, 0), [cart]);
    const cartTotal = useMemo(() => cart.reduce((sum, i) => sum + i.price * i.quantity, 0), [cart]);

    useEffect(() => {
        async function load() {
            try {
                setLoading(true);
                const res = await fetch(`http://localhost:3001/products`);
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
        <ProductContext.Provider
            value={{
                state,
                dispatch,
                loading,
                error,
                api: "http://localhost:3001",
                cart,
                addToCart,
                removeFromCart,
                decrementFromCart,
                clearCart,
                cartCount,
                cartTotal,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};

export default ProductProvider;


