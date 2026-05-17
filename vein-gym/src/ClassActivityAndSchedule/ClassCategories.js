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

const TAG_OPTIONS = [
  "Strength",
  "Fitness",
  "Fat Burn",
  "Tone",
  "Target",
  "Wellness",
  "Mobility",
  "Skill"
];

export default function ClassCategories() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({
    name: "",
    image: "",
    tags: []
  });

  const [editing, setEditing] = useState(null);

  const fetchCategories = async () => {
    const snap = await getDocs(collection(db, "classCategories"));
    const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    setCategories(list);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const toggleTag = (tag) => {
    setNewCategory((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const addCategory = async () => {
    if (!newCategory.name.trim() || !newCategory.image.trim()) return;

    await addDoc(collection(db, "classCategories"), newCategory);

    setNewCategory({ name: "", image: "", tags: [] });
    fetchCategories();
  };

  const updateCategory = async () => {
    await updateDoc(doc(db, "classCategories", editing.id), editing);
    setEditing(null);
    fetchCategories();
  };

  const deleteCategory = async (id) => {
    await deleteDoc(doc(db, "classCategories", id));
    fetchCategories();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Manage Class Categories</h2>

      {/* ADD CATEGORY FORM */}
      <div
        style={{
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "10px",
          marginBottom: "30px"
        }}
      >
        <h3>Add New Category</h3>

        <input
          type="text"
          placeholder="Category name"
          value={newCategory.name}
          onChange={(e) =>
            setNewCategory({ ...newCategory, name: e.target.value })
          }
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <input
          type="text"
          placeholder="Image URL"
          value={newCategory.image}
          onChange={(e) =>
            setNewCategory({ ...newCategory, image: e.target.value })
          }
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <p>Tags:</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {TAG_OPTIONS.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              style={{
                padding: "6px 12px",
                borderRadius: "20px",
                border: "1px solid #aaa",
                background: newCategory.tags.includes(tag)
                  ? "#00e5ff"
                  : "white",
                cursor: "pointer"
              }}
            >
              {tag}
            </button>
          ))}
        </div>

        <button
          onClick={addCategory}
          style={{
            marginTop: "15px",
            padding: "10px 20px",
            background: "#00e5ff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Add Category
        </button>
      </div>

      {/* CATEGORY GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px"
        }}
      >
        {categories.map((cat) => (
          <div
            key={cat.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "15px"
            }}
          >
            {editing?.id === cat.id ? (
              <>
                <input
                  value={editing.name}
                  onChange={(e) =>
                    setEditing({ ...editing, name: e.target.value })
                  }
                  style={{ width: "100%", marginBottom: "10px" }}
                />

                <input
                  value={editing.image}
                  onChange={(e) =>
                    setEditing({ ...editing, image: e.target.value })
                  }
                  style={{ width: "100%", marginBottom: "10px" }}
                />

                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                  {TAG_OPTIONS.map((tag) => (
                    <button
                      key={tag}
                      onClick={() =>
                        setEditing((prev) => ({
                          ...prev,
                          tags: prev.tags.includes(tag)
                            ? prev.tags.filter((t) => t !== tag)
                            : [...prev.tags, tag]
                        }))
                      }
                      style={{
                        padding: "6px 12px",
                        borderRadius: "20px",
                        border: "1px solid #aaa",
                        background: editing.tags.includes(tag)
                          ? "#00e5ff"
                          : "white"
                      }}
                    >
                      {tag}
                    </button>
                  ))}
                </div>

                <button
                  onClick={updateCategory}
                  style={{
                    marginTop: "10px",
                    padding: "8px 15px",
                    background: "green",
                    color: "white",
                    border: "none",
                    borderRadius: "5px"
                  }}
                >
                  Save
                </button>

                <button
                  onClick={() => setEditing(null)}
                  style={{
                    marginLeft: "10px",
                    padding: "8px 15px",
                    background: "gray",
                    color: "white",
                    border: "none",
                    borderRadius: "5px"
                  }}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <img
                  src={cat.image}
                  alt={cat.name}
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "10px"
                  }}
                />

                <h3>{cat.name}</h3>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {cat.tags?.map((t) => (
                    <span
                      key={t}
                      style={{
                        padding: "5px 10px",
                        background: "#eee",
                        borderRadius: "15px",
                        fontSize: "12px"
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setEditing(cat)}
                  style={{
                    marginTop: "10px",
                    padding: "8px 15px",
                    background: "#00e5ff",
                    border: "none",
                    borderRadius: "5px"
                  }}
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteCategory(cat.id)}
                  style={{
                    marginLeft: "10px",
                    padding: "8px 15px",
                    background: "red",
                    color: "white",
                    border: "none",
                    borderRadius: "5px"
                  }}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
