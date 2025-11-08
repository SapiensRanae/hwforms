import { useMemo, useState } from "react";
import { useProducts } from "../context/useProducts";
import Modal from "./Modal";

const ProductList = () => {
    const { state, loading, error, addToCart } = useProducts();
    const products = state.products;
    const [selected, setSelected] = useState(null);
    const [success, setSuccess] = useState(false);

    const [search, setSearch] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [sort, setSort] = useState("none");

    const handleBuy = (product) => {
        setSelected(product);
        setSuccess(false);
    };

    const closeModal = () => {
        setSelected(null);
        setSuccess(false);
    };

    const confirmPurchase = () => {
        setSuccess(true);
        setTimeout(() => closeModal(), 1200);
    };

    const filtered = useMemo(() => {
        let list = [...products];
        if (search.trim()) {
            const q = search.toLowerCase();
            list = list.filter(p => p.title.toLowerCase().includes(q));
        }
        const min = Number(minPrice);
        const max = Number(maxPrice);
        if (!Number.isNaN(min) && minPrice !== "") list = list.filter(p => p.price >= min);
        if (!Number.isNaN(max) && maxPrice !== "") list = list.filter(p => p.price <= max);

        switch (sort) {
            case "price_asc": list.sort((a, b) => a.price - b.price); break;
            case "price_desc": list.sort((a, b) => b.price - a.price); break;
            case "title_asc": list.sort((a, b) => a.title.localeCompare(b.title)); break;
            case "title_desc": list.sort((a, b) => b.title.localeCompare(a.title)); break;
            default: break;
        }
        return list;
    }, [products, search, minPrice, maxPrice, sort]);

    if (loading) return <p className="muted">Loading products...</p>;
    if (error) return <p className="error">{error}</p>;
    if (!products.length) return <p>No products</p>;

    return (
        <>
            <div className="filters">
                <input placeholder="Search by name" value={search} onChange={(e) => setSearch(e.target.value)} />
                <input type="number" placeholder="Min price" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
                <input type="number" placeholder="Max price" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
                <select value={sort} onChange={(e) => setSort(e.target.value)}>
                    <option value="none">No sort</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                    <option value="title_asc">Title: A → Z</option>
                    <option value="title_desc">Title: Z → A</option>
                </select>
            </div>

            <ul className="list">
                {filtered.map((p, idx) => (
                    <li key={p.id} className="card card-hover fade-in" style={{ animationDelay: `${idx * 60}ms` }}>
                        {p.image ? (
                            <div className="card-image">
                                <img
                                    src={p.image}
                                    alt={p.title}
                                    loading="lazy"
                                    style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: 8 }}
                                    onError={(e) => { e.currentTarget.style.opacity = "0.3"; e.currentTarget.alt = "Image not found"; }}
                                />
                            </div>
                        ) : (
                            <div className="card-image placeholder" style={{
                                width: "100%", height: 140, background: "#eee",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                borderRadius: 8, fontSize: 12, color: "#666"
                            }}>
                                No image
                            </div>
                        )}
                        <div className="card-title">
                            <strong>{p.title}</strong>
                            <span className="price">${p.price}</span>
                        </div>
                        <div className="card-body">{p.description}</div>
                        <div className="card-actions">
                            <button className="btn" onClick={() => addToCart(p)}>Add to cart</button>
                            <button className="btn buy" onClick={() => handleBuy(p)}>Buy</button>
                        </div>
                    </li>
                ))}
            </ul>

            <Modal open={!!selected} onClose={closeModal} title={success ? "Success" : selected?.title || ""}>
                {!success ? (
                    <div className="purchase">
                        <p>Buy <strong>{selected?.title}</strong> for <strong>${selected?.price}</strong>?</p>
                        <div className="modal-actions">
                            <button className="btn" onClick={closeModal}>Cancel</button>
                            <button className="btn primary" onClick={confirmPurchase}>Confirm</button>
                        </div>
                    </div>
                ) : (
                    <div className="purchase success fade-in-up">
                        <div className="checkmark" aria-hidden>✓</div>
                        <p>Purchase completed!</p>
                    </div>
                )}
            </Modal>
        </>
    );
};

export default ProductList;
