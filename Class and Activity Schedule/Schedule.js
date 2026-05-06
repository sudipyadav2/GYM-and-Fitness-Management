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

  const fetchSchedule = async () => {
    const snap = await getDocs(collection(db, "classSchedule"));
    setSchedule(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  };

  useEffect(() => {
    fetchClasses();
    fetchSchedule();
  }, []);

  const addSchedule = async () => {
    await addDoc(collection(db, "classSchedule"), form);
    setForm({ classId: "", date: "", time: "" });
    fetchSchedule();
  };

  const deleteSchedule = async (id) => {
    await deleteDoc(doc(db, "classSchedule", id));
    fetchSchedule();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Manage Class Schedule</h2>

      <div>
        <select
          name="classId"
          value={form.classId}
          onChange={(e) => setForm({ ...form, classId: e.target.value })}
        >
          <option value="">Select class</option>
          {classes.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />

        <input
          type="time"
          value={form.time}
          onChange={(e) => setForm({ ...form, time: e.target.value })}
        />

        <button onClick={addSchedule}>Add to Schedule</button>
      </div>

      <h3>Scheduled Classes</h3>
      <ul>
        {schedule.map((s) => (
          <li key={s.id} style={{ marginTop: "10px" }}>
            Class ID: {s.classId} — {s.date} at {s.time}
            <button
              onClick={() => deleteSchedule(s.id)}
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