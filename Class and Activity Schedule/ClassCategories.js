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

export default function ClassCategories() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");

  const fetchCategories = async () => {
    const snap = await getDocs(collection(db, "classCategories"));
    const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    setCategories(list);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const addCategory = async () => {
    if (!newCategory.trim()) return;

    await addDoc(collection(db, "classCategories"), {
      name: newCategory
    });

    setNewCategory("");
    fetchCategories();
  };

  const updateCategory = async (id) => {
    await updateDoc(doc(db, "classCategories", id), {
      name: editingName
    });

    setEditingId(null);
    setEditingName("");
    fetchCategories();
  };

  const deleteCategory = async (id) => {
    await deleteDoc(doc(db, "classCategories", id));
    fetchCategories();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Manage Class Categories</h2>

      <div>
        <input
          type="text"
          placeholder="New category name"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button onClick={addCategory}>Add</button>
      </div>

      <ul>
        {categories.map((cat) => (
          <li key={cat.id} style={{ marginTop: "10px" }}>
            {editingId === cat.id ? (
              <>
                <input
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                />
                <button onClick={() => updateCategory(cat.id)}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </>
            ) : (
              <>
                {cat.name}
                <button
                  onClick={() => {
                    setEditingId(cat.id);
                    setEditingName(cat.name);
                  }}
                  style={{ marginLeft: "10px" }}
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteCategory(cat.id)}
                  style={{ marginLeft: "10px", color: "red" }}
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}