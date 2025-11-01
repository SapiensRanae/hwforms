import { useProducts } from "../../context/ProductContext";

const ProductTable = ({ onEdit, onDelete }) => {
  const { state } = useProducts();
  const products = state.products;

  if (!products.length) return <p>No products</p>;

  return (
    <table className="table">
      <thead>
        <tr>
          <th>#</th>
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
            <td>{p.title}</td>
            <td>{p.price}</td>
            <td>{p.description}</td>
            <td className="actions">
              <button onClick={() => onEdit(p)}>Edit</button>
              <button className="danger" onClick={() => onDelete(p.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
