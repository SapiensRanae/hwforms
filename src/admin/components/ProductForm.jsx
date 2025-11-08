import { useEffect, useState } from "react";

const empty = { title: "", price: "", description: "", image: "" };

const ProductForm = ({ onAdd, onSave, editing }) => {
    const [form, setForm] = useState(empty);

    useEffect(() => {
        if (editing) {
            setForm({
                title: editing.title,
                price: editing.price,
                description: editing.description,
                image: editing.image || ""
            });
        } else {
            setForm(empty);
        }
    }, [editing]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "price") {
            const num = value === "" ? "" : Math.max(0, Number(value));
            setForm(f => ({ ...f, price: num }));
        } else {
            setForm(f => ({ ...f, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.title || !form.description) return;
        if (form.price === "" || Number(form.price) < 0) return;
        const payload = { ...form, price: Number(form.price) };
        if (editing) {
            onSave({ ...editing, ...payload });
        } else {
            onAdd(payload);
        }
        setForm(empty);
    };

    return (
        <form onSubmit={handleSubmit} className="form">
            <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Name"
            />
            <input
                name="price"
                type="number"
                min="0"
                value={form.price}
                onChange={handleChange}
                placeholder="Price (>= 0)"
            />
            <input
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Description"
            />
            <input
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="Image URL (/images/xxx.jpg or https://)"
            />
            <button
                type="submit"
                className={editing ? "btn primary" : "btn"}
            >
                {editing ? "Save changes" : "Add product"}
            </button>
        </form>
    );
};

export default ProductForm;