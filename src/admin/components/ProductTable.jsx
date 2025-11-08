import { useProducts } from "../../context/useProducts";

const ProductTable = ({ onEdit, onDelete }) => {
    const { state } = useProducts();
    const products = state.products;

    if (!products.length) return <p>No products</p>;

    return (
        <table className="table">
            <thead>
            <tr>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Description</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {products.map((p, idx) => (
                <tr key={p.id}>
                    <td>{idx + 1}</td>
                    <td>
                        {p.image ? (
                            <img
                                src={p.image}
                                alt={p.title}
                                style={{ width: 50, height: 50, objectFit: "cover", borderRadius: 4 }}
                                onError={(e) => { e.currentTarget.style.opacity = "0.3"; e.currentTarget.alt = "Image not found"; }}
                            />
                        ) : (
                            <span>—</span>
                        )}
                    </td>
                    <td>{p.title}</td>
                    <td>{p.price}</td>
                    <td>{p.description}</td>
                    <td className="actions">
                        <button className="btn" onClick={() => onEdit(p)}>Edit</button>
                        <button className="btn danger" onClick={() => onDelete(p.id)}>Delete</button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default ProductTable;