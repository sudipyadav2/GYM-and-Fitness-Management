import { useState, useEffect } from "react";
import { db } from "../Firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "firebase/firestore";

export default function Schedule() {
  const [classes, setClasses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [schedule, setSchedule] = useState([]);

  const [form, setForm] = useState({
    classId: "",
    date: "",
    time: ""
  });

  const fetchClasses = async () => {
    const snap = await getDocs(collection(db, "classes"));
    setClasses(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  };

  const fetchCategories = async () => {
    const snap = await getDocs(collection(db, "classCategories"));
    setCategories(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  };

  const fetchSchedule = async () => {
    const snap = await getDocs(collection(db, "classSchedule"));
    setSchedule(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  };

  useEffect(() => {
    fetchClasses();
    fetchCategories();
    fetchSchedule();
  }, []);

  const getCategory = (name) =>
    categories.find((c) => c.name === name) || {};

  const addSchedule = async () => {
    if (!form.classId || !form.date || !form.time) return;

    await addDoc(collection(db, "classSchedule"), form);
    setForm({ classId: "", date: "", time: "" });
    fetchSchedule();
  };

  const deleteSchedule = async (id) => {
    await deleteDoc(doc(db, "classSchedule", id));
    fetchSchedule();
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2 style={{ marginBottom: "20px" }}>Manage Class Schedule</h2>

      {/* ADD SCHEDULE FORM */}
      <div
        style={{
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "12px",
          marginBottom: "30px",
          background: "white",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
        }}
      >
        <h3 style={{ marginBottom: "15px" }}>Add Class to Schedule</h3>

        {/* CLASS SELECT */}
        <select
          name="classId"
          value={form.classId}
          onChange={(e) => setForm({ ...form, classId: e.target.value })}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc"
          }}
        >
          <option value="">Select class</option>
          {classes.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name} — {c.category}
            </option>
          ))}
        </select>

        {/* DATE */}
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc"
          }}
        />

        {/* TIME */}
        <input
          type="time"
          value={form.time}
          onChange={(e) => setForm({ ...form, time: e.target.value })}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc"
          }}
        />

        <button
          onClick={addSchedule}
          style={{
            width: "100%",
            padding: "12px",
            background: "#00e5ff",
            border: "none",
            borderRadius: "6px",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          Add to Schedule
        </button>
      </div>

      {/* SCHEDULE LIST */}
      <h3 style={{ marginBottom: "15px" }}>Scheduled Classes</h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "20px"
        }}
      >
        {schedule.map((s) => {
          const cls = classes.find((c) => c.id === s.classId);
          const cat = cls ? getCategory(cls.category) : {};

          return (
            <div
              key={s.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "12px",
                overflow: "hidden",
                background: "white",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
              }}
            >
              {/* IMAGE */}
              {cat.image && (
                <img
                  src={cat.image}
                  alt={cls?.name}
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover"
                  }}
                />
              )}

              <div style={{ padding: "15px" }}>
                <h3 style={{ margin: "0 0 10px 0" }}>
                  {cls?.name || "Unknown Class"}
                </h3>

                {/* TAGS */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "8px",
                    marginBottom: "10px"
                  }}
                >
                  {cat.tags?.map((t) => (
                    <span
                      key={t}
                      style={{
                        padding: "5px 10px",
                        background: "#f0f0f0",
                        borderRadius: "15px",
                        fontSize: "12px"
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <p style={{ margin: "5px 0" }}>
                  <strong>Date:</strong> {s.date}
                </p>

                <p style={{ margin: "5px 0" }}>
                  <strong>Time:</strong> {s.time}
                </p>

                <button
                  onClick={() => deleteSchedule(s.id)}
                  style={{
                    marginTop: "10px",
                    width: "100%",
                    padding: "10px",
                    background: "red",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer"
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
