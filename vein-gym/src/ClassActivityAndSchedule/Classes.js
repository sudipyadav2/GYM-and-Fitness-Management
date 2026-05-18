import { useState, useEffect } from "react";
import { db } from "../Firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc
} from "firebase/firestore";

export default function Classes() {
  const [categories, setCategories] = useState([]);
  const [classes, setClasses] = useState([]);

  const [form, setForm] = useState({
    name: "",
    category: "",
    trainer: "",
    capacity: "",
    description: ""
  });

  const [editingId, setEditingId] = useState(null);

  const fetchCategories = async () => {
    const snap = await getDocs(collection(db, "classCategories"));
    setCategories(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  };

  const fetchClasses = async () => {
    const snap = await getDocs(collection(db, "classes"));
    setClasses(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  };

  useEffect(() => {
    fetchCategories();
    fetchClasses();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addClass = async () => {
    await addDoc(collection(db, "classes"), form);
    setForm({ name: "", category: "", trainer: "", capacity: "", description: "" });
    fetchClasses();
  };

  const updateClass = async () => {
    await updateDoc(doc(db, "classes", editingId), form);
    setEditingId(null);
    setForm({ name: "", category: "", trainer: "", capacity: "", description: "" });
    fetchClasses();
  };

  const deleteClass = async (id) => {
    await deleteDoc(doc(db, "classes", id));
    fetchClasses();
  };

  return (
    <div style={{ padding: "20px",marginTop: "40px" }}>
      <h2>Manage Classes</h2>

      <div>
        <input name="name" placeholder="Class name" value={form.name} onChange={handleChange} />
        <select name="category" value={form.category} onChange={handleChange}>
          <option value="">Select category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.name}>{c.name}</option>
          ))}
        </select>
        <input name="trainer" placeholder="Trainer" value={form.trainer} onChange={handleChange} />
        <input name="capacity" placeholder="Capacity" value={form.capacity} onChange={handleChange} />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} />

        {editingId ? (
          <button onClick={updateClass}>Save Changes</button>
        ) : (
          <button onClick={addClass}>Add Class</button>
        )}
      </div>

      <h3>Existing Classes</h3>
      <ul>
        {classes.map((cls) => (
          <li key={cls.id} style={{ marginTop: "10px" }}>
            <strong>{cls.name}</strong> — {cls.category}  
            <button
              onClick={() => {
                setEditingId(cls.id);
                setForm(cls);
              }}
              style={{ marginLeft: "10px" }}
            >
              Edit
            </button>
            <button
              onClick={() => deleteClass(cls.id)}
              style={{ marginLeft: "10px", color: "red" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}