import { useEffect, useState } from "react";

const empty = { title: "", price: "", description: "" };

const ProductForm = ({ onAdd, onSave, editing }) => {
  const [form, setForm] = useState(empty);

  useEffect(() => {
    if (editing) {
      setForm({ title: editing.title, price: editing.price, description: editing.description });
    } else {
      setForm(empty);
    }
  }, [editing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: name === "price" ? Number(value) : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.description) return;
    if (Number(form.price) <= 0) return;
    if (editing) {
      onSave({ ...editing, ...form });
    } else {
      onAdd(form);
    }
    setForm(empty);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input name="title" value={form.title} onChange={handleChange} placeholder="Name" />
      <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Price" />
      <input name="description" value={form.description} onChange={handleChange} placeholder="Description" />
      <button type="submit">{editing ? "Save changes" : "Add product"}</button>
    </form>
  );
};

export default ProductForm;
