import { useEffect, useState } from "react";
import { useProducts } from "../context/useProducts";
import ProductForm from "../admin/components/ProductForm";
import ProductTable from "../admin/components/ProductTable";

const AdminPage = () => {
  const { dispatch, api } = useProducts();
  const [editing, setEditing] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [login, setLogin] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("isAdmin");
    setIsAdmin(stored === "true");
  }, []);

  const handleAdd = async (product) => {
    try {
      setSaving(true);
      const res = await fetch(`${api}/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      if (!res.ok) throw new Error("Failed to add product");
      const created = await res.json();
      dispatch({ type: "ADD_PRODUCT", payload: created });
      setEditing(null);
      setError("");
    } catch (e) {
      console.error(e);
      setError("Could not add product.");
    } finally {
      setSaving(false);
    }
  };

  const handleSave = async (product) => {
    try {
      setSaving(true);
      const res = await fetch(`${api}/products/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      if (!res.ok) throw new Error("Failed to save product");
      const updated = await res.json();
      dispatch({ type: "EDIT_PRODUCT", payload: updated });
      setEditing(null);
      setError("");
    } catch (e) {
      console.error(e);
      setError("Could not save product.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setSaving(true);
      const res = await fetch(`${api}/products/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete product");
      dispatch({ type: "DELETE_PRODUCT", payload: id });
      if (editing && editing.id === id) setEditing(null);
      setError("");
    } catch (e) {
      console.error(e);
      setError("Could not delete product.");
    } finally {
      setSaving(false);
    }
  };

  const handleAuthChange = (e) => {
    const { name, value } = e.target;
    setLogin((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Minimal demo auth: admin / admin
    if (login.username === "admin" && login.password === "admin") {
      localStorage.setItem("isAdmin", "true");
      setIsAdmin(true);
      setError("");
    } else {
      setError("Invalid credentials (use admin/admin)");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    setIsAdmin(false);
  };

  if (!isAdmin) {
    return (
      <div className="container">
        <h1>Admin Login</h1>
        <form onSubmit={handleLogin} className="form">
          <input
            name="username"
            placeholder="Username"
            value={login.username}
            onChange={handleAuthChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={login.password}
            onChange={handleAuthChange}
          />
          <button type="submit">Login</button>
          {error && <div className="error">{error}</div>}
        </form>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="header-row">
        <h1>Admin: Product Management</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
      {error && <div className="error">{error}</div>}
      {saving && <div className="muted">Saving...</div>}
      <ProductForm onAdd={handleAdd} onSave={handleSave} editing={editing} />
      <hr />
      <ProductTable onEdit={setEditing} onDelete={handleDelete} />
    </div>
  );
};

export default AdminPage;
