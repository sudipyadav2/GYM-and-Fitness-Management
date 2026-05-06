import { useState, useEffect } from "react";
import { db } from "../Firebase";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";

export default function ViewClasses() {
  const [classes, setClasses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [filter, setFilter] = useState("");

  const fetchData = async () => {
    const classSnap = await getDocs(collection(db, "classes"));
    const catSnap = await getDocs(collection(db, "classCategories"));
    const scheduleSnap = await getDocs(collection(db, "classSchedule"));

    setClasses(classSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
    setCategories(catSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
    setSchedule(scheduleSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredClasses = filter
    ? classes.filter((c) => c.category === filter)
    : classes;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Available Classes</h2>

      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="">All Categories</option>
        {categories.map((c) => (
          <option key={c.id} value={c.name}>{c.name}</option>
        ))}
      </select>

      <ul>
        {filteredClasses.map((cls) => {
          const classSchedule = schedule.filter((s) => s.classId === cls.id);

          return (
            <li key={cls.id} style={{ marginTop: "15px" }}>
              <strong>{cls.name}</strong> — {cls.category}
              <p>{cls.description}</p>
              <p>Instructor: {cls.instructor}</p>

              <p>
                <strong>Schedule:</strong>
                {classSchedule.length === 0
                  ? " No schedule yet"
                  : classSchedule.map((s) => (
                      <span key={s.id}> {s.date} at {s.time} </span>
                    ))}
              </p>

              <Link to={`/class/register/${cls.id}`}>
                <button>Register</button>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}